const https = require('https');
const songs = [
  'Tum To Thehre Pardesi',
  'Lollipop Lagelu',
  'Aashiq Banaya Aapne',
  'Jeeta Tha Jiske Liye',
  'Kajra Re',
  'Ek Ladki Ko Dekha',
  'Didi Tera Devar Deewana',
  'Chaiyya Chaiyya'
];

async function searchYoutube(query) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/results?search_query=' + encodeURIComponent(query), {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
          let m;
          const ids = new Set();
          while ((m = regex.exec(data)) !== null) {
            ids.add(m[1]);
          }
          resolve({ query, ids: Array.from(ids).slice(0, 3) });
        } catch (e) {
          resolve({ query, error: e.message });
        }
      });
    }).on('error', (e) => resolve({ query, error: e.message }));
  });
}

async function run() {
  for (let s of songs) {
    console.log(JSON.stringify(await searchYoutube(s)));
  }
}
run();
