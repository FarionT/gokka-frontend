import { useNavigate, useSearchParams } from 'react-router';
import { createFAQ, getFAQById, updateFAQ } from '../../services/faq.services';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminFAQDetail.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useLoader } from '../../utils/userLoader';

const AdminFAQDetail = () => {
  const { showLoader, hideLoader } = useLoader();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const fetchData = async () => {
    if (!id) return
    try {
      showLoader()
      const res = await getFAQById(id)
      if (res.status === 200) {
        const data = res.data.data;
        setQuestion(data.question);
        setAnswer(data.answer);
      }
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (!id) return
    fetchData();
  }, [id]);

  const breadcrumbData = [
    { label: 'FAQ', href: '/admin/v1/faq' },
    { label: 'Detail', href: '/about' },
  ];

  const handleSubmit = async () => {
    const data = {
      question,
      answer
    }
    try {
      showLoader()
      if (id) {
        const res = await updateFAQ(id, data)
        if (res.status === 200) {
          navigate('/admin/v1/faq')
        } else {
          Toast('Failed Updating Data', 'error', res.data.message)
        }
      } else {
        const res = await createFAQ(data)
        if (res.status === 201) {
          navigate('/admin/v1/faq')
        } else {
          Toast('Failed Creating Data', 'error', res.data.message)
        }
      }
    } finally {
      hideLoader()
    }
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>{id ? 'Update FAQ' : 'Create FAQ'}</div>
      <div className='pb-5 gap-5 flex flex-col'>
        <InputField 
          label='Question'
          placeholder='Question'
          type='textarea'
          value={question}
          onChange={(e: any) => setQuestion(e)}       
        />
        <InputField 
          label='Answer'
          placeholder='Answer'
          type='textarea'
          value={answer}
          onChange={(e: any) => setAnswer(e)}       
        />
      </div>
      <div className='flex justify-end gap-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/faq')}>Back</AdminButton>
        <AdminButton disabled={question === '' && answer === ''} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminFAQDetail;