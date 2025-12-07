import { useNavigate, useSearchParams } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminRecipeDetail.scss';

// Importing Images
import Jam from '../../assets/Logo/Jam.svg';
import { useEffect, useState } from 'react';
import { createRecipe, getRecipeById, updateRecipe } from '../../services/recipe.services';
import { getProductByCategory, getProductCategory } from '../../services/product.services';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';

const AdminRecipeDetail = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [time, setTime] = useState('');
  const [productOptions, setProductOptions] = useState<any>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [recipeSteps, setRecipeSteps] = useState<any>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<any>([]);
  const [description, setDescription] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productSubcategoryId, setProductSubcategoryId] = useState('');
  const [productCategories, setProductCategories] = useState<any>([]);
  const [productSubcategories, setProductSubcategories] = useState<any>([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const fetchData = async () => {
    if (!id) return
    try {
      showLoader();
      const res = await getRecipeById(id)
      if (res.status === 200) {
        const data = res.data.data;
        const mainImage = await fetch(data.path)
        const blob = await mainImage.blob();
        const mainFile = new File([blob], data.file_name, {
          type: blob.type
        })
        setName(data.name);
        setProductId(data.product_id)
        setProductCategoryId(data.product_category_id)
        setProductSubcategoryId(data.product_subcategory_id)
        setTime(data.time);
        setMainImage(mainFile);
        setDescription(data.description);
        setRecipeIngredients(data.recipe_ingredients || []);
        const childrenFilePromises = data.recipe_steps.map(
          async (item: any) => {
            if (item.path) {
              const response = await fetch(item.path);
              const blob = await response.blob();
              const file =  new File([blob], item.file_name, {
                type: blob.type,
              });
              return { ...item, path: file }
            } else {
              return;
            }
          }
        );
        const actualChildrenFiles = await Promise.all(childrenFilePromises);

        setRecipeSteps(actualChildrenFiles.filter(Boolean));
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (!id) return
    fetchData();
  }, [id]);

  // useEffect(() => {
  //   getProductCategory().then((res: any) => {
  //     if (res.status === 200) {
  //       const data = res.data.data;
  //       setProductCategories(data);
  //     }
  //   })
  // }, [])

  const breadcrumbData = [
    { label: 'Recipe', href: '/admin/v1/recipes' },
    { label: 'Detail', href: '/about' },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('time', time);
    formData.append('product_id', productId);
    formData.append('description', description);
    if (mainImage) {
      formData.append('main', mainImage);
    }
    recipeSteps.forEach((variant: any) => {
      formData.append(`children`, variant.path);
    });
    formData.append('recipe_ingredients', JSON.stringify(recipeIngredients));
    formData.append('recipe_steps', JSON.stringify(recipeSteps));
    showLoader()
    if (id) {
      const res = await updateRecipe(id, formData);
      if (res.status === 200) {
        Toast('Success Updating Data', 'success', res.data.message)
        navigate('/admin/v1/recipes')
      } else handleErrorResponse(res)
    } else {
      const res = await createRecipe(formData)
      if (res.status === 201) {
        Toast('Success Creating Data', 'success', res.data.message)
        navigate('/admin/v1/recipes')
      } else handleErrorResponse(res)
    }
    hideLoader()
  }

  useEffect(() => {
    getProductCategory().then((res: any) => {
      if (res.status === 200) {
        const data = res.data.data;
        setProductCategories(data);
      } else handleErrorResponse(res)
    })
  }, [])

  const handleFileChange = (file: string | number | File | null) => {
    // We only care about the File or null in this case
    if (file instanceof File || file === null) {
      setMainImage(file);
    }
    // Optionally, you might handle error states if it's not a file/null
  };

  const handleDataVariantChange = (index: number, field: string, value: any) => {
    setRecipeSteps((prevVariants: any) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value
      };
      return updatedVariants;
    });
  }
  
  const handleDataCompositionChange = (index: number, field: string, value: any) => {
    setRecipeIngredients((prevVariants: any) => {
      const updatedComposition = [...prevVariants];
      updatedComposition[index] = {
        ...updatedComposition[index],
        [field]: value
      };
      return updatedComposition;
    });
  }

  useEffect(() => {
    const productSubcategories = productCategories.find((category: any) => category.id === productCategoryId)?.product_subcategories || [];
    setProductSubcategories(productSubcategories);
    // setProductSubcategoryId('');
  }, [productCategories, productCategoryId]);

  const getAllProductByCategory = async() => {
    try {
      showLoader()
      const res = await getProductByCategory(productCategoryId, productSubcategoryId)
      if (res.status === 200) {
        const data = res.data.data;
        setProductOptions(data.rows.map((product: any) => ({ label: product.name, value: product.id })))
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    getAllProductByCategory();
  }, [productSubcategoryId])

  const isDisabled = () => {
    const nameFilled = name !== '';
    const timeFilled = time !== '';
    const categorySelected = productCategoryId !== '';
    const subcategorySelected = productSubcategoryId !== '';
    const descriptionFilled = description !== '';
    const recipeStepsFilled = recipeSteps.every((step: any) => step.name !== '' && (step.path instanceof File || typeof(step.path) === 'string') && step.description !== '');
    const recipeIngredientsFilled = recipeIngredients.every((ingredient: any) => ingredient.name !== '');

    if(recipeSteps.length > 0) {  
      if(nameFilled && timeFilled && categorySelected && subcategorySelected && recipeStepsFilled && descriptionFilled && recipeIngredientsFilled) {
        return false;
      } else return true;
    } else return true;
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>{id ? 'Update Recipe' : 'Create Recipe'}</div>
      <div className='pb-5 gap-5 flex flex-col'>
        <div className='flex gap-10'>
          <InputField 
            label='Name'
            placeholder='Name'
            className='w-72'
            type='text'
            value={name}
            onChange={(e: any) => setName(e)}       
          />
          <InputField 
            label='Time'
            placeholder='Time'
            type='text'
            className='w-72'
            value={time}
            onChange={(e: any) => {
              setTime(e);
            }}       
          />
        </div>
        <div className='flex gap-10'>
          <InputField 
            label='Category'
            placeholder='Category'
            className='w-72'
            type='dropdown'
            options={productCategories.map((category: any) => ({ label: category.name, value: category.id }))}
            value={productCategoryId}
            onChange={(e: any) => setProductCategoryId(e)}       
          />
          <InputField 
            label='Subcategory'
            placeholder='Subcategory'
            disabled={productCategoryId === ''}
            type='dropdown'
            className='w-72'
            options={productSubcategories.map((category: any) => ({ label: category.name, value: category.id }))}
            value={productSubcategoryId}
            onChange={(e: any) => {
              setProductSubcategoryId(e);
            }}        
          />
          <InputField 
            label='Product'
            disabled={productCategoryId === '' || productSubcategoryId === ''}
            placeholder='Product'
            type='dropdown'
            className='w-72'
            options={productOptions}
            value={productId}
            onChange={(e: any) => {
              setProductId(e);
            }}       
          />
        </div>
        <div className='flex gap-10'>
          {/* <InputField 
            label='Subcategory'
            disabled={productCategoryId === ''}
            placeholder='Subcategory'
            type='dropdown'
            className='w-72'
            value={productSubcategoryId}
            options={productSubcategories.map((category: any) => ({ label: category.name, value: category.id }))}
            onChange={(e: any) => {
              setProductSubcategoryId(e);
            }}       
          /> */}
          <InputField 
            label='Description'
            placeholder='Description'
            type='textarea'
            className='w-96'
            value={description}
            onChange={(e: any) => {
              setDescription(e);
            }}       
          />
        </div>
        <div>
          <InputField
            label="Main Picture"
            type="file" // Set the type to 'file'
            value={mainImage} // Pass the state value
            onChange={handleFileChange} // Pass the state setter function
            className="mb-6"
          />
          {mainImage && <img src={mainImage ? URL.createObjectURL(mainImage!) : Jam} className='w-64 border-1' />}
        </div>
      </div>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-2xl font-medium'>Product Ingredients</div>
        <div>
          <AdminButton onClick={() => {
            const newIngredient = {
              id: Date.now(), // Unique ID for the variant
              name: '',
            };
            setRecipeIngredients([...recipeIngredients, newIngredient]);
          }}>Add Ingredients</AdminButton>
        </div>
      </div>
      <div className='flex flex-col gap-1 p-5 mb-10 border border-slate-300 rounded-md'>
        {recipeIngredients.length > 0 ? recipeIngredients.map((composition: any, index: any) => (
          <div key={index} className='flex justify-between items-center gap-5'>
            <InputField 
              label=''
              placeholder='Name'
              type='text'
              className='w-72'
              value={composition.name}
              onChange={(e: any) => {
                handleDataCompositionChange(index, 'name', e)
              }}       
            />
            <AdminButton className='self-center' color='destructive' onClick={() => setRecipeIngredients((prev: any) => prev.filter((_: any, i: any) => i !== index))}>Delete</AdminButton>
          </div>
        )) : <div>No ingredients added yet.</div>}
      </div>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-2xl font-medium'>Recipe Steps</div>
        <div>
          <AdminButton onClick={() => {
            const newVariant = {
              id: Date.now(), // Unique ID for the variant
              step: recipeSteps.length + 1,
              name: '',
              file: null,
              description: ''
            };
            setRecipeSteps([...recipeSteps, newVariant]);
          }}>Add Step</AdminButton>
        </div>
      </div>
      <div className='flex flex-col gap-10'>
        {recipeSteps.length > 0 ? recipeSteps.map((variant: any, index: any) => (
          <div key={index} className='border border-slate-300 rounded-md p-5 flex gap-5 justify-between items-start'>
            <div className='flex gap-5'>
              <InputField 
                label='Step'
                placeholder='Step'
                type='number'
                className='w-20'
                value={variant.step}
                onChange={(e: any) => {
                  handleDataVariantChange(index, 'step', e)
                }}       
              />
              <InputField 
                label='Name'
                placeholder='Name'
                type='text'
                className='w-72'
                value={variant.name}
                onChange={(e: any) => {
                  handleDataVariantChange(index, 'name', e)
                }}       
              />
              <InputField 
                label='Description'
                placeholder='Description'
                type='textarea'
                className='w-72'
                value={variant.description}
                onChange={(e: any) => {
                  handleDataVariantChange(index, 'description', e)
                }}       
              />
              <InputField
                label="Variant Picture"
                type="file" // Set the type to 'file'
                fileType='video'
                value={variant.file} // Pass the state value
                onChange={(e: any) => {
                  handleDataVariantChange(index, 'path', e)
                }} // Pass the state setter function
                className="mb-6"
              />
              <video controls src={variant.path instanceof File ? URL.createObjectURL(variant.path) : variant.path} className='w-64 h-32 object-contain border-1' />
            </div>
            <AdminButton className='self-start' color='destructive' onClick={() => setRecipeSteps((prev: any) => prev.filter((_: any, i: any) => i !== index))}>Delete</AdminButton>
          </div>
        )) : <div>No steps added yet.</div>}
      </div>
      <div className='flex justify-end gap-5 mt-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/recipes')}>Back</AdminButton>
        <AdminButton disabled={isDisabled()} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminRecipeDetail;