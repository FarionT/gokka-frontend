import { useNavigate } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminContentBeranda.scss';

// Importing Images
import Jam from '../../assets/Logo/Jam.svg';
import { useEffect, useState } from 'react';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';
import { getBerandaData, updateBerandaData } from '../../services/content.services';

const AdminContentBeranda = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      showLoader();
      const res = await getBerandaData()
      if (res.status === 200) {
        const data = res.data.data;
        const mainImage = await fetch(data.beranda_pemilik_path)
        const blob = await mainImage.blob();
        const mainFile = new File([blob], data.beranda_pemilik_file_name, {
          type: blob.type
        })
        setTitle(data.beranda_pemilik_title);
        setDescription(data.beranda_pemilik_description)
        setMainImage(mainFile);
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbData = [
    { label: 'Recipe', href: '/admin/v1/recipes' },
    { label: 'Detail', href: '/about' },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('beranda_pemilik_title', title);
    formData.append('beranda_pemilik_description', description);
    if (mainImage) {
      formData.append('main', mainImage);
    }
    showLoader()
    const res = await updateBerandaData(formData);
    if (res.status === 200) {
      Toast('Success Updating Data', 'success', res.data.message)
      navigate('/admin/v1/contents')
    } else handleErrorResponse(res)
    hideLoader()
  }

  const handleFileChange = (file: string | number | File | null) => {
    // We only care about the File or null in this case
    if (file instanceof File || file === null) {
      setMainImage(file);
    }
    // Optionally, you might handle error states if it's not a file/null
  };

  const isDisabled = () => {
    const titleFilled = title !== '';
    const descriptionFilled = description !== '';
    const mainImageFilled = mainImage;

    if(titleFilled && descriptionFilled && mainImageFilled) {
      return false;
    } else return true;
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Beranda Data</div>
      <div className='pb-5 gap-5 flex flex-col'>
        <div className='flex gap-10'>
          <InputField 
            label='Title'
            placeholder='Title'
            className='w-72'
            type='text'
            value={title}
            onChange={(e: any) => setTitle(e)}       
          />
          <InputField 
            label='Description'
            placeholder='Description'
            type='textarea'
            className='w-108'
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

export default AdminContentBeranda;