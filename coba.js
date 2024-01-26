const { SHA256 } = require('crypto-js');

const data = {
  "jenispaket": "Tidak",
  "jeniswajibpilihan": "W",
  "kodemk": "TI22W3405",
  "namamk": "Keselamatan dan Kesehatan Kerja",
  "programstudi": "Teknik Industri",
  "semester": "4",
  "sksmk": "2",
  "tahunkurikulum": "222"
};


const dataString = JSON.stringify(data);
const hash = SHA256(dataString).toString();

console.log("hash:", hash)

// Membandingkan hash dengan hash yang diberikan
if (hash === '655d05855f0351b791949574c3e3ddad01b13fb960ef8101d95174ec4579b0d6') {
  console.log('Nilai data sesuai dengan hash yang diberikan.');
} else {
  console.log('Nilai data tidak sesuai dengan hash yang diberikan.');
}