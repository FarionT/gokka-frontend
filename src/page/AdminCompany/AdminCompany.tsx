import { useNavigate } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminCompany.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useLoader } from '../../utils/userLoader';
import { checkPermission, useErrorHandler } from '../../utils/getAuth';
import { getCompanyData, updateCompanyData } from '../../services/company.services';

const AdminCompany = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const permissionUpdate = checkPermission('company', 'update');

  const fetchData = async () => {
    try {
      showLoader();
      const res = await getCompanyData()
      if (res.status === 200) {
        const data = res.data.data;
        setAddress(data.address);
        setPhoneNumber(data.phone_number);
        setEmail(data.email);
        setDescription(data.description);
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbData = [
    { label: 'Company', href: '/admin/v1/company' }
  ];

  const handleSubmit = async () => {
    showLoader();
    const body = {
      address: address,
      phone_number: phoneNumber,
      email: email,
      description: description
    }
    const res = await updateCompanyData(body);
    if (res.status === 200) {
      Toast('Success Updating Data', 'success', res.data.message)
      navigate('/admin/v1/company')
    } else handleErrorResponse(res)
    hideLoader()
  }

  const isDisabled = () => {
    const addressFilled = address !== '';
    const phoneNumberFilled = phoneNumber !== '';
    const emailFilled = email !== '';
    const descriptionFilled = description !== '';

    if(addressFilled && phoneNumberFilled && emailFilled && descriptionFilled) {
      return false;
    } else return true;
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Company</div>
      <div className='pb-5 gap-5 flex flex-col'>
        <div className='flex gap-10'>
          <InputField 
            label='Address'
            placeholder='Address'
            className='w-72'
            type='textarea'
            value={address}
            onChange={(e: any) => setAddress(e)}
            disabled={!permissionUpdate}       
          />
          <InputField 
            label='Phone Number'
            placeholder='Phone Number'
            type='text'
            className='w-72'
            value={phoneNumber}
            onChange={(e: any) => {
              setPhoneNumber(e);
            }}       
            disabled={!permissionUpdate}  
          />
          <InputField 
            label='Email'
            placeholder='Email'
            type='text'
            className='w-72'
            value={email}
            onChange={(e: any) => {
              setEmail(e);
            }}     
            disabled={!permissionUpdate}   
          />     
        </div>
        <div className='flex gap-10'>
          <InputField 
            label='Description'
            placeholder='Description'
            type='textarea'
            className='w-108'
            value={description}
            onChange={(e: any) => {
              setDescription(e);
            }}    
            disabled={!permissionUpdate}    
          />
        </div>
      </div>
      <div className='flex justify-end gap-5 mt-5'>
        {/* <AdminButton color='secondary' onClick={() => navigate('/admin/v1/recipes')}>Back</AdminButton> */}
        {permissionUpdate ? <AdminButton disabled={isDisabled()} onClick={handleSubmit}>Save</AdminButton> : <></>}
      </div>
    </div>
  )
}

export default AdminCompany;