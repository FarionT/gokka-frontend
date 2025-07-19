import { Accordion, Accordions } from '../../ui-kit';
import './FAQ.scss';

const FAQData = [
  {
    question: 'Bagaimana cara membeli produk Gokka secara online?',
    answer: <div>hehe</div>
  }
]

const FAQ = () => {
  return (
    <div className='faq'>
      <div>
        <Accordions allowMultipleOpen={false} className=''>
          {FAQData.map((data, index) => (
            <Accordion title={data.question} key={index}>
              <div>hehe</div>
            </Accordion>
          ))}
        </Accordions>
      </div>
    </div>
  )
}

export default FAQ;