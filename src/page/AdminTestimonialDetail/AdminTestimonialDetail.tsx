import { useNavigate, useSearchParams } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminTestimonialDetail.scss';

// Importing Images
import Jam from '../../assets/Logo/Jam.svg';
import { useEffect, useState } from 'react';
import { getProductByCategory, getProductById, getProductCategory } from '../../services/product.services';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';
import { createTestimonial, getTestimonialById, updateTestimonial } from '../../services/testimonial.services';

const AdminTestimonialDetail = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [comment, setComment] = useState('');
  const [star, setStar] = useState('');
  const [date, setDate] = useState('');
  const [productOptions, setProductOptions] = useState<any>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productSubcategoryId, setProductSubcategoryId] = useState('');
  const [productVariantId, setProductVariantId] = useState('');
  const [productCategories, setProductCategories] = useState<any>([]);
  const [productSubcategories, setProductSubcategories] = useState<any>([]);
  const [productVariant, setProductVariant] = useState<any>([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id');

  const starOptions = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ]

  const fetchData = async () => {
    if (!id) return
    try {
      showLoader();
      const res = await getTestimonialById(id)
      if (res.status === 200) {
        const data = res.data.data;
        const mainImage = await fetch(data.path)
        const blob = await mainImage.blob();
        const mainFile = new File([blob], data.file_name, {
          type: blob.type
        })
        setName(data.name);
        setProductVariantId(data.product_variant_id)
        setProductId(data.product_id)
        setProductCategoryId(data.product_category_id)
        setProductSubcategoryId(data.product_subcategory_id)
        setDate(data.date);
        setStar(data.star);
        setComment(data.comment);
        setMainImage(mainFile);
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (!id) return
    fetchData();
  }, [id]);

  const breadcrumbData = [
    { label: 'Recipe', href: '/admin/v1/recipes' },
    { label: 'Detail', href: '/about' },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('comment', comment);
    formData.append('star', star);
    formData.append('product_variant_id', productVariantId);
    if (mainImage) {
      formData.append('main', mainImage);
    }
    showLoader()
    if (id) {
      const res = await updateTestimonial(id, formData);
      if (res.status === 200) {
        Toast('Success Updating Data', 'success', res.data.message)
        navigate('/admin/v1/testimonials')
      } else handleErrorResponse(res)
    } else {
      const res = await createTestimonial(formData)
      if (res.status === 201) {
        Toast('Success Creating Data', 'success', res.data.message)
        navigate('/admin/v1/testimonials')
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

  const getProductVariant = async () => {
    if (!productId) return 
    try {
      showLoader()
      const res = await getProductById(productId);
      if (res.status === 200) {
        const data = res.data.data;
        setProductVariant(data.product_variants.map((product: any) => ({ label: product.name, value: product.id })))
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }
  useEffect(() => {
    getProductVariant();
  }, [productId])

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
    const dateFilled = date !== '';
    const commentFilled = comment !== '';
    const starFilled = star !== null;
    const categorySelected = productCategoryId !== '';
    const subcategorySelected = productSubcategoryId !== '';
    const productSelected = productId !== '';
    const mainImageFilled = mainImage;
    const productVariantSelected = productVariantId !== '';

    if(nameFilled && dateFilled && commentFilled && starFilled && categorySelected && subcategorySelected && mainImageFilled && productSelected && productVariantSelected) {
      return false;
    } else return true;
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>{id ? 'Update Testimonial' : 'Create Testimonial'}</div>
      <div className='pb-5 gap-5 flex flex-col'>
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
          <InputField 
            label='Variant'
            disabled={productId === ''}
            placeholder='Variant'
            type='dropdown'
            className='w-72'
            options={productVariant}
            value={productVariantId}
            onChange={(e: any) => {
              setProductVariantId(e);
            }}       
          />
        </div>
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
            label='Comment'
            placeholder='Comment'
            type='text'
            className='w-72'
            value={comment}
            onChange={(e: any) => {
              setComment(e);
            }}       
          />
          <InputField 
            label='Star'
            placeholder='Star'
            type='dropdown'
            className='w-72'
            options={starOptions}
            value={star}
            onChange={(e: any) => {
              setStar(e);
            }}       
          />
          <InputField 
            label='Date'
            placeholder='Date'
            type='text'
            className='w-72'
            value={date}
            onChange={(e: any) => {
              setDate(e);
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
          {mainImage && (<img src={mainImage ? URL.createObjectURL(mainImage!) : Jam} className='w-64 border-1' />)}
        </div>
      </div>
      <div className='flex justify-end gap-5 mt-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/testimonials')}>Back</AdminButton>
        <AdminButton disabled={isDisabled()} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminTestimonialDetail;