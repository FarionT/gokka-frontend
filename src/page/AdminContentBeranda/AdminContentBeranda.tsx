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
  const [banners, setBanners] = useState<any>([])

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
        const childrenFilePromises = data.beranda_banner.map(
          async (item: any) => {
            if (item) {
              const response = await fetch(item.path);
              const blob = await response.blob();
              const file =  new File([blob], item.file_name, {
                type: blob.type,
              });
              return {
                file,
                position: item.position
              }
            } else {
              return;
            }
          }
        );
        const actualChildrenFiles = await Promise.all(childrenFilePromises);
        setBanners(actualChildrenFiles.filter(Boolean));
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbData = [
    { label: 'Content', href: '/admin/v1/contents' },
    { label: 'Beranda', href: '/admin/v1/contents/beranda' },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('beranda_pemilik_title', title);
    formData.append('beranda_pemilik_description', description);
    if (mainImage) {
      formData.append('main', mainImage);
    }
    banners.map((banner: any) => {
      formData.append('banner', banner.file);
      formData.append('banner_position', banner.position)
    })
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

  const handleDataVariantChange = (index: number, field: string, value: any) => {
    setBanners((prevVariants: any) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value
      };
      return updatedVariants;
    });
  }

  const isDisabled = () => {
    const titleFilled = title !== '';
    const descriptionFilled = description !== '';
    const mainImageFilled = mainImage;
    const bannerHasNull = banners.filter((item: any) => item === null).length == 0;
    const bannerFilled = banners.every((step: any) => step.position !== '' && (step.file instanceof File || typeof(step.file) === 'string'));

    if(titleFilled && descriptionFilled && mainImageFilled && bannerFilled && bannerHasNull) {
      return false;
    } else return true;
  }

  const positionOption = [
    { label: 'Top', value: 'top' },
    { label: 'Center', value: 'center' },
    { label: 'Bottom', value: 'bottom' },
  ]

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Beranda Data</div>
      <div className='pt-3 pb-10'>
        <div className='flex justify-between items-center mb-5'>
          <div className='text-2xl font-normal'>Banner</div>
          <div>
            <AdminButton onClick={() => {
              const newBanner = {
                position: '',
                file: null
              };
              setBanners([...banners, newBanner]);
            }}>Add Banner</AdminButton>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          {banners.length > 0 ? banners.map((banner: any, index: any) => (
            <div key={index} className='border border-slate-300 rounded-md p-5 flex gap-5 justify-between items-start'>
              <div className='flex gap-5'>
                <InputField
                  label="Variant Picture"
                  type="file" // Set the type to 'file'
                  fileType='image'
                  value={banner.file} // Pass the state value
                  onChange={(e: any) => {
                    handleDataVariantChange(index, 'file', e)
                  }} // Pass the state setter function
                  className="mb-6"
                />
                <img src={banner.file ? URL.createObjectURL(banner.file) : banner.file} className='w-64 h-32 object-contain border-1' />
                <InputField
                  label="Position"
                  placeholder='Select a Position'
                  type="dropdown" 
                  options={positionOption}
                  value={banner.position} // Pass the state value
                  onChange={(e: any) => {
                    handleDataVariantChange(index, 'position', e)
                  }} // Pass the state setter function
                  className="mb-6"
                />
              </div>
              <AdminButton className='self-start' color='destructive' onClick={() => setBanners((prev: any) => prev.filter((_: any, i: any) => i !== index))}>Delete</AdminButton>
            </div>
          )) : <div>No banners added yet.</div>}
        </div>
      </div>
      <hr/>
      <div className='py-3'>
        <div className='text-2xl font-normal py-3'>Tentang Kami</div>
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
      </div>
      <div className='flex justify-end gap-5 mt-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/testimonials')}>Back</AdminButton>
        <AdminButton disabled={isDisabled()} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminContentBeranda;