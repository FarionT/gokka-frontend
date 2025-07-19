import { Accordion, Accordions } from "../../ui-kit";
import "./FAQ.scss";
import { FAQData } from "./ListData";

const FAQ = () => {
  return (
    <div className="faq">
      <div className="text-center text-white pb-2">Layanan FAQ</div>
      <div className="text-center gradient-gold text-4xl md:text-6xl font-bold pb-6">Kamu Perlu Bantuan apa?</div>
      <div className="text-center flex font-semibold gradient-gold gradient-gold-line pb-8 md:pb-14">Pertanyaan yang sering ditanyakan</div>
      <Accordions allowMultipleOpen >
        {FAQData.map((data, index) => (
          <Accordion title={data.question} key={index}>
            {data.answer}
          </Accordion>
        ))}
      </Accordions>
    </div>
  );
};

export default FAQ;
