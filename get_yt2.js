const https = require('https');
const songs = ['Ek Ladki Ko Dekha To Aisa Laga 1942', 'Didi Tera Devar Deewana hum aapke hain koun', 'Chaiyya Chaiyya dil se'];
async function searchYoutube(query) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/results?search_query=' + encodeURIComponent(query), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = ''; res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g; let m; const ids = new Set();
        while ((m = regex.exec(data)) !== null) ids.add(m[1]);
        resolve({ query, ids: Array.from(ids).slice(0, 3) });
      });
    }).on('error', (e) => resolve({ query, error: e.message }));
  });
}
async function run() { for (let s of songs) console.log(JSON.stringify(await searchYoutube(s))); }
run();
