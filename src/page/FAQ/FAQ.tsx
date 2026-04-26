import { useEffect, useState } from "react";
import { Accordion, Accordions } from "../../ui-kit";
import "./FAQ.scss";
import { getAllFAQ } from "../../services/faq.services";
import { useLoader } from "../../utils/userLoader";
import { useErrorHandler } from "../../utils/getAuth";

const FAQ = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [data, setData] = useState<any>([])
  const fetchData = async () => {
    try {
      showLoader();
      const res = await getAllFAQ();
      if (res.status === 200) {
        const datas = res.data.data;
        setData(datas)
      } else handleErrorResponse(res)
    } finally {
      hideLoader();
    }

  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="faq">
      <div className="text-center text-sm md:text-base text-white pb-2">Layanan FAQ</div>
      <div className="text-center gradient-gold text-3xl md:text-4xl lg:text-5xl font-bold pb-8">Kamu Perlu Bantuan apa?</div>
      <div className="text-center flex font-semibold gradient-gold gradient-gold-line pb-8 md:pb-14 whitespace-nowrap">Pertanyaan yang sering ditanyakan</div>
      <Accordions allowMultipleOpen >
        {data.map((item: any) => (
          <Accordion title={item.question} key={data.id}>
            {item.answer}
          </Accordion>
        ))}
      </Accordions>
    </div>
  );
};

export default FAQ;
