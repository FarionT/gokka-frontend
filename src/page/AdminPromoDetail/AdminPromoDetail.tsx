import { useNavigate, useSearchParams } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminPromoDetail.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { getProductByCategory, getProductById, getProductCategory } from '../../services/product.services';
import { useLoader } from '../../utils/userLoader';
import { checkPermission, useErrorHandler } from '../../utils/getAuth';
import { createPromo, getPromoById, updatePromo } from '../../services/promo.services';

const AdminPromoDetail = () => {
  const { showLoader, hideLoader } = useLoader();
  const [price, setPrice] = useState<any>(null);
  const [productId, setProductId] = useState('');
  const [discount, setDiscount] = useState<any>(null);
  const [finalPrice, setFinalPrice] = useState<any>(null);
  const [productOptions, setProductOptions] = useState<any>([]);
  const [description, setDescription] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productSubcategoryId, setProductSubcategoryId] = useState('');
  const [productVariantId, setProductVariantId] = useState('')
  const [productCategories, setProductCategories] = useState<any>([]);
  const [productSubcategories, setProductSubcategories] = useState<any>([]);
  const [productVariants, setProductVariants] = useState<any>([]);
  const handleErrorResponse = useErrorHandler();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const permissionRead = checkPermission('promo', 'read');

  const fetchData = async () => {
    if (!id) return
    try {
      showLoader();
      const res = await getPromoById(id)
      if (res.status === 200) {
        const data = res.data.data;
        const finalPrice = Math.round(data.price * (100 - data.discount) / 100)
        setPrice(data.price);
        setProductId(data.product_id)
        setProductCategoryId(data.product_category_id)
        setProductSubcategoryId(data.product_subcategory_id)
        setProductVariantId(data.product_variant_id)
        setDiscount(data.discount);
        setFinalPrice(finalPrice);
        setDescription(data.description);
      }
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (permissionRead) {
      if (!id) return
      fetchData();
    } else {
      navigate('/admin/v1/dashboard')
    }
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
    { label: 'Promo', href: '/admin/v1/promos' },
    { label: 'Detail', href: '/about' },
  ];

  const handleSubmit = async () => {
    const form = {
      product_variant_id: productVariantId,
      price,
      discount,
      description
    }
    showLoader()
    if (id) {
      const res = await updatePromo(id, form);
      if (res.status === 200) {
        Toast('Success', 'success', res.data.message)
        navigate('/admin/v1/promos')
      } else handleErrorResponse(res)
    } else {
      const res = await createPromo(form)
      if (res.status === 201) {
        Toast('Success', 'success', res.data.message)
        navigate('/admin/v1/promos')
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

  const getProductVariant = async () => {
    if (!productId) return 
    try {
      showLoader()
      const res = await getProductById(productId);
      if (res.status === 200) {
        const data = res.data.data;
        setProductVariants(data.product_variants.map((product: any) => ({ label: product.name, value: product.id })))
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

  useEffect(() => {
    const finalPrice = Math.round(price * (100 - discount) / 100);
    setFinalPrice(finalPrice)
  }, [price, discount])

  const isDisabled = () => {
    const priceFilled = price !== null;
    const discountFilled = discount !== null;
    const productVariantIdFilled = productVariantId !== '';
    const descriptionFilled = description !== '';

    if(priceFilled && discountFilled && productVariantIdFilled && descriptionFilled) {
      return false;
    } else return true;
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>{id ? 'Update Promo' : 'Create Promo'}</div>
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
            label='Product Variant'
            disabled={productId === ''}
            placeholder='Product'
            type='dropdown'
            className='w-72'
            options={productVariants}
            value={productVariantId}
            onChange={(e: any) => {
              setProductVariantId(e);
            }}       
          />
        </div>
        <div className='flex gap-10'>
          <InputField 
            label='Price'
            placeholder='Price'
            type='number'
            className='w-72'
            value={price}
            onChange={(e: any) => {
              setPrice(e);
            }}       
          />
          <InputField 
            label='Discount (%)'
            placeholder='Discount (%)'
            type='number'
            className='w-72'
            value={discount}
            onChange={(e: any) => {
              setDiscount(e);
            }}       
          />
          <InputField 
            label='Final Price'
            placeholder='Final Price'
            type='number'
            disabled
            className='w-72'
            value={finalPrice}
            onChange={(e: any) => {
              setFinalPrice(e);
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
      </div>
      <div className='flex justify-end gap-5 mt-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/recipes')}>Back</AdminButton>
        <AdminButton disabled={isDisabled()} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminPromoDetail;