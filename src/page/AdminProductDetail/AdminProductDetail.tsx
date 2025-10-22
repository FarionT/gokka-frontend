import { useNavigate, useSearchParams } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminProductDetail.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { createProduct, getProductById, getProductCategory, updateProduct } from '../../services/product.services';
import { useLoader } from '../../utils/userLoader';

const AdminProductDetail = () => {
  const { showLoader, hideLoader } = useLoader();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productSubcategoryId, setProductSubcategoryId] = useState('');
  const [productCategories, setProductCategories] = useState<any>([]);
  const [productSubcategories, setProductSubcategories] = useState<any>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [productVariants, setProductVariants] = useState<any>([]);
  const [productCompositions, setProductCompositions] = useState<any>([]);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const fetchData = async () => {
    if (!id) return
    try {
      showLoader();
      const res = await getProductById(id)
      if (res.status === 200) {
        const data = res.data.data;
        const mainImage = await fetch(data.path)
        const blob = await mainImage.blob();
        const mainFile = new File([blob], 'main', {
          type: blob.type
        })
        setName(data.name);
        setColor(data.color);
        setMainImage(mainFile)
        setProductCategoryId(data.product_category_id);
        setProductSubcategoryId(data.product_subcategory_id);
        setDescription(data.description);
        setProductCompositions(data.product_compositions || []);
        const childrenFilePromises = data.product_variants.map(
          async (item: any) => {
            if (item.path) {
              const response = await fetch(item.path);
              const blob = await response.blob();
              const file =  new File([blob], 'children', {
                type: blob.type,
              });
              return { ...item, path: file }
            } else {
              return;
            }
          }
        );
        const actualChildrenFiles = await Promise.all(childrenFilePromises);
        setProductVariants(actualChildrenFiles.filter(Boolean));
      }
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (!id) return
    fetchData();
  }, [id]);

  const getProductCategoryFunc = async () => {
    try {
      showLoader()
      const res = await getProductCategory()
      if (res.status === 200) {
        const data = res.data.data;
        setProductCategories(data);
      }
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    getProductCategoryFunc();
  }, [])

  const breadcrumbData = [
    { label: 'Product', href: '/admin/v1/products' },
    { label: 'Detail', href: '/about' },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('color', color);
    formData.append('product_category_id', productCategoryId);
    formData.append('product_subcategory_id', productSubcategoryId);
    formData.append('description', description);
    if (mainImage) {
      formData.append('main', mainImage);
    }
    productVariants.forEach((variant: any) => {
      formData.append(`children`, variant.path);
    });
    formData.append('product_variants', JSON.stringify(productVariants));
    formData.append('product_compositions', JSON.stringify(productCompositions));
    showLoader()
    if (id) {
      const res = await updateProduct(id, formData)
      if (res.status === 200) {
        navigate('/admin/v1/products')
        Toast('Sukses', 'success', 'Done')
      } else {
        Toast('Failed Updating Data', 'error', res.data.message)
      }
    } else {
      const res = await createProduct(formData)
      if (res.status === 201) {
        navigate('/admin/v1/products')
      } else {
        Toast('Failed Creating Data', 'error', res.data.message)
      }
    }
    hideLoader()
  }

  const handleFileChange = (file: string | number | File | null) => {
    // We only care about the File or null in this case
    if (file instanceof File || file === null) {
      setMainImage(file);
    }
    // Optionally, you might handle error states if it's not a file/null
  };

  useEffect(() => {
    const productSubcategories = productCategories.find((category: any) => category.id === productCategoryId)?.product_subcategories || [];
    setProductSubcategories(productSubcategories);
    // setProductSubcategoryId('');
  }, [productCategories, productCategoryId])

  const handleDataVariantChange = (index: number, field: string, value: any) => {
    setProductVariants((prevVariants: any) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value
      };
      return updatedVariants;
    });
  }
  
  const handleDataCompositionChange = (index: number, field: string, value: any) => {
    setProductCompositions((prevVariants: any) => {
      const updatedComposition = [...prevVariants];
      updatedComposition[index] = {
        ...updatedComposition[index],
        [field]: value
      };
      return updatedComposition;
    });
  }

  const isDisabled = () => {
    const nameFilled = name !== '';
    const colorFilled = color !== '';
    const categorySelected = productCategoryId !== '';
    const subcategorySelected = productSubcategoryId !== '';
    const descriptionFilled = description !== '';
    const productVariantsFilled = productVariants.every((variant: any) => variant.name !== '' && (variant.path instanceof File || typeof(variant.path) === 'string'));
    const productCompositionsFilled = productVariants.every((composition: any) => composition.name !== '');

    if(productVariants.length > 0) {  
      if(nameFilled && colorFilled && categorySelected && subcategorySelected && productVariantsFilled && descriptionFilled && productCompositionsFilled) {
        return false;
      } else return true;
    } else return true;
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>{id ? 'Update Product' : 'Create Product'}</div>
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
            label='Color'
            placeholder='Color'
            type='color'
            className='w-72'
            value={color}
            onChange={(e: any) => {
              setColor(e);
            }}       
          />
        </div>
        <div className='flex gap-10'>
          <InputField 
            label='Category'
            placeholder='Category'
            type='dropdown'
            className='w-72'
            value={productCategoryId}
            options={productCategories.map((category: any) => ({ label: category.name, value: category.id }))}
            onChange={(e: any) => {
              setProductCategoryId(e);
            }}       
          />
          <InputField 
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
          />
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
          <img src={mainImage ? URL.createObjectURL(mainImage!) : ''} className='w-64 border-1' />
        </div>
      </div>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-2xl font-medium'>Product Compositions</div>
        <div>
          <AdminButton onClick={() => {
            const newComposition = {
              id: Date.now(), // Unique ID for the variant
              name: '',
            };
            setProductCompositions([...productCompositions, newComposition]);
          }}>Add Compositions</AdminButton>
        </div>
      </div>
      <div className='flex flex-col gap-1 p-5 mb-10 border border-slate-300 rounded-md'>
        {productCompositions.length > 0 ? productCompositions.map((composition: any, index: any) => (
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
            <AdminButton className='self-center' color='destructive' onClick={() => setProductCompositions((prev: any) => prev.filter((item: any, i: any) => i !== index))}>Delete</AdminButton>
          </div>
        )) : <div>No compositions added yet.</div>}
      </div>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-2xl font-medium'>Product Variants</div>
        <div>
          <AdminButton onClick={() => {
            const newVariant = {
              id: Date.now(), // Unique ID for the variant
              name: '',
              file: null
            };
            setProductVariants([...productVariants, newVariant]);
          }}>Add Variant</AdminButton>
        </div>
      </div>
      <div className='flex flex-col gap-10'>
        {productVariants.length > 0 ? productVariants.map((variant: any, index: any) => (
          <div key={index} className='border border-slate-300 rounded-md p-5 flex gap-5 justify-between items-start'>
            <div className='flex gap-5'>
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
                label="Variant Picture"
                type="file" // Set the type to 'file'
                value={variant.file} // Pass the state value
                onChange={(e: any) => {
                  handleDataVariantChange(index, 'path', e)
                }} // Pass the state setter function
                className="mb-6"
              />
              <img src={variant.path instanceof File ? URL.createObjectURL(variant.path) : variant.path} className='w-64 h-32 object-contain border-1' />
            </div>
            <AdminButton className='self-start' color='destructive' onClick={() => setProductVariants((prev: any) => prev.filter((item: any, i: any) => i !== index))}>Delete</AdminButton>
          </div>
        )) : <div>No variants added yet.</div>}
      </div>
      <div className='flex justify-end gap-5 mt-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/products')}>Back</AdminButton>
        <AdminButton disabled={isDisabled()} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminProductDetail;