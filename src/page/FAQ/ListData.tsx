// import ui kit
import { Button } from "../../ui-kit";

// import logo
import NoHalal from "../../assets/Logo/NoHalal.png";
import NoPIRT from "../../assets/Logo/NoPIRT.svg";
import RightNumbering from "../../assets/Logo/RightNumbering.svg";
import Tiktok from "../../assets/Logo/Tiktok.svg";
import Instagram from "../../assets/Logo/Instagram.svg";
import Shopee from "../../assets/Logo/Shopee.svg";
import Blibli from "../../assets/Logo/Blibli.svg";
import Lazada from "../../assets/Logo/Lazada.svg";
import Tokopedia from "../../assets/Logo/Tokopedia.svg";

const FAQData = [
  {
    question: "Bagaimana cara membeli produk Gokka secara online?",
    answer: (
      <div className="flex flex-col gap-6">
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <img src={Shopee} className="h-8" />
            <div className="text-xs">Shopee</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Blibli} className="h-8" />
            <div className="text-xs">Blibli</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Lazada} className="h-8" />
            <div className="text-xs">Lazada</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Tokopedia} className="h-8" />
            <div className="text-xs">Tokopedia</div>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>
            Mau nikmatin Gokka? Gampang banget! Ikuti langkah-langkahnya, ya!
          </div>
        </div>
        <div className="flex gap-5 items-center font-bold">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>
            Kalau Sudah Punya Akun:
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div>1.</div>
            <div>Buka aplikasi atau website favorit kamu (Shopee, Blibli, Lazada, atau Tokopedia).</div>
          </div>
          <div className="flex items-center gap-3">
            <div>2.</div>
            <div>Login dulu ke akun kamu. Ketik "Gokka" di kolom pencarian.<br/>Pilih produk Gokka yang kamu mau. </div>
          </div>
          <div className="flex items-center gap-3">
            <div>3.</div>
            <div>Tentuin berapa banyak produk yang mau dibeli.</div>
          </div>
          <div className="flex items-center gap-3">
            <div>4.</div>
            <div>Klik Beli Sekarang atau masukin ke keranjang dulu.</div>
          </div>
          <div className="flex items-center gap-3">
            <div>5.</div>
            <div>Lanjut pilih metode pembayaran yang paling nyaman buat kamu.</div>
          </div>
          <div className="flex items-center gap-3">
            <div>6.</div>
            <div>Selesaikan pembayaran.</div>
          </div>
          <div className="flex items-center gap-3">
            <div>7.</div>
            <div>Setelah pembayaran dikonfirmasi, Senin - Minggu - Orderan yang masuk dibawah jam 17:00 akan dikirim di hari yang sama.</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "Apakah Produk Gokka Halal?",
    answer: (
      <div className="flex flex-col gap-6">
        <div className="flex gap-5 items-center">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>
            Tenang aja, semuanya udah halal, jadi bisa dinikmati bareng siapa
            pun, kapan pun!
          </div>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center text-sm md:text-base">
            <img src={NoPIRT} className="h-16 pb-2" />
            <div className="text-center">Nomor P-IRT:</div>
            <div className="text-center font-bold">2073671040052-26</div>
          </div>
          <div className="w-2 h-full bg-white"></div>
          <div className="flex flex-col items-center text-sm md:text-base">
            <img src={NoHalal} className="h-16 pb-2" />
            <div className="text-center">Nomor Halal:</div>
            <div className="text-center font-bold">36110006299010322</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "Berapa komposisi gula & stevia dalam produk Gokka?",
    answer: (
      <div className="flex flex-col">
        <div className="flex gap-5 items-center">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>
            Tenang aja, produk kami aman di konsumsi dengan kandungan sebagai
            berikut, untuk sirup cair & bubuk:
          </div>
        </div>
        <div className="ps-10 pt-4">
          ➤ Gula (55%)<br/>
          ➤ Air (32%)<br/>
          ➤ Perisa/Essence (5%) <br/>
          ➤ Stevia ({'<'}1%) <br/>
          ➤ Potassium Sorbat (5%)
        </div>
      </div>
    ),
  },
  {
    question: "Apakah Produk Gokka Gluten Free?",
    answer: (
      <div className="flex flex-col">
        <div className="flex gap-5 items-center">
          <img src={RightNumbering} className="w-10" />
          <div>Ya, semua produk Gokka, bebas dari gluten.</div>
        </div>
      </div>
    ),
  },
  {
    question: "Apakah Produk Gokka mengandung kafein?",
    answer: (
      <div className="flex flex-col">
        <div className="flex gap-5 items-center">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>Tidak, semua produk Gokka, tidak mengandung kafein.</div>
        </div>
      </div>
    ),
  },
  {
    question: "Bagaimana cara menggunakan produk?",
    answer: (
      <div className="flex flex-col gap-6">
        <div className="flex gap-5 items-center">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>Kunjungi artikel resep kami untuk cara penggunaannya.</div>
        </div>
        <a className="flex justify-center" href='/resep'>
          <Button className="w-fit font-bold mx-auto">Kunjungi</Button>
        </a>
      </div>
    ),
  },
  {
    question: "Apakah Gokka memiliki toko ritel offline?",
    answer: (
      <div className="flex flex-col gap-6">
        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center">
            <img src={Tiktok} className="h-8" />
            <div className="text-xs">Tiktok</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Instagram} className="h-8" />
            <div className="text-xs">Instagram</div>
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center">
            <img src={Shopee} className="h-8" />
            <div className="text-xs">Shopee</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Blibli} className="h-8" />
            <div className="text-xs">Blibli</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Lazada} className="h-8" />
            <div className="text-xs">Lazada</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Tokopedia} className="h-8" />
            <div className="text-xs">Tokopedia</div>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="w-10">
            <img src={RightNumbering} className="w-full" />
          </div>
          <div>
            Saat ini kami masih belum memiliki toko ritel offline. Namun, kami
            memiliki media sosial, yaitu Instagram, dan Tiktok. Serta platform
            e-commerce, yaitu Shoope, Blibli, Lazada, dan Tokopedia.
          </div>
        </div>
      </div>
    ),
  },
];

export { FAQData };
