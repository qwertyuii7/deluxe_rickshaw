const https = require('https');
const fs = require('fs');

const songs = [
  { q: "Pyar Kiya To Nibhana Major", hindi: "प्यार किया तो निभाना", subtitle: "Major Saab" },
  { q: "Ho Nahin Sakta Diljale", hindi: "हो नहीं सकता", subtitle: "Diljale" },
  { q: "Chalti Hai Kya 9 Se 12", hindi: "चलती है क्या 9 से 12", subtitle: "Judwaa" },
  { q: "Aankh Marey O Ladka Tere Mere Sapne", hindi: "आँख मारे", subtitle: "Tere Mere Sapne" },
  { q: "Ek Sanam Chahiye Aashiqui", hindi: "एक सनम चाहिए", subtitle: "Aashiqui" },
  { q: "Main Khiladi Tu Anari title", hindi: "मैं खिलाड़ी तू अनाड़ी", subtitle: "Main Khiladi Tu Anari" },
  { q: "Dil Ka Qaraar Sangharsh", hindi: "दिल का क़रार", subtitle: "Sangharsh" },
  { q: "Bholi Bhali Ladki Khiladi", hindi: "भोली भाली लड़की", subtitle: "Sabse Bada Khiladi" },
  { q: "Ankhiyon Se Goli Maare", hindi: "अँखियों से गोली मारे", subtitle: "Dulhe Raja" },
  { q: "Truckan Wale Ranjit Bawa", hindi: "ट्रक वाले", subtitle: "Ranjit Bawa" },
  { q: "Drivery Gurnam Bhullar", hindi: "ड्राइवरी", subtitle: "Gurnam Bhullar" },
  { q: "Tralle Ravinder", hindi: "ट्राले", subtitle: "Ravinder Grewal" },
  { q: "Putt Jattan De Mankirt", hindi: "पुत्त जट्टां दे", subtitle: "Mankirt Aulakh" },
  { q: "Driver Mehkma", hindi: "ड्राइवर महकमा", subtitle: "Chandra Brar" },
  { q: "8 Parche", hindi: "8 पर्चे", subtitle: "Baani Sandhu" },
  { q: "Mere Sapno Ki Rani", hindi: "मेरे सपनो की रानी", subtitle: "Aradhana" },
  { q: "Yeh Sham Mastani", hindi: "ये शाम मस्तानी", subtitle: "Kati Patang" },
  { q: "Zindagi Ek Safar Hai Suhana", hindi: "ज़िन्दगी एक सफर है सुहाना", subtitle: "Andaz" },
  { q: "Musafir Hoon Yaron", hindi: "मुसाफिर हूँ यारों", subtitle: "Parichay" },
  { q: "Aate Jate Khoobsurat Awara", hindi: "आते जाते खूबसूरत आवारा", subtitle: "Anurodh" }
];

async function searchSong(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.jiosaavn.com/api.php?__call=autocomplete.get&query=${encodeURIComponent(query)}&_format=json&_marker=0&ctx=android`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.songs && parsed.songs.data && parsed.songs.data.length > 0) {
            resolve(parsed.songs.data[0].id);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const existingPlaylist = JSON.parse(fs.readFileSync('data/playlist.json', 'utf8'));
  let idCounter = existingPlaylist.length > 0 ? Math.max(...existingPlaylist.map(t => t.id)) + 1 : 1;

  for (const song of songs) {
    console.log(`Searching for: ${song.q}`);
    const jioId = await searchSong(song.q);
    
    if (jioId) {
      console.log(`Found ID: ${jioId}`);
      existingPlaylist.push({
        id: idCounter++,
        title: song.hindi,
        subtitle: song.subtitle,
        jiosaavnId: jioId,
        youtubeCandidates: []
      });
    } else {
      console.log(`Not found: ${song.q}`);
    }
    
    // Add small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync('data/playlist.json', JSON.stringify(existingPlaylist, null, 2));
  console.log('Done updating playlist.json');
}

run();
