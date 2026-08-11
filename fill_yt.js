const fs = require('fs');
const ytSearch = require('yt-search');

async function run() {
  const playlist = JSON.parse(fs.readFileSync('data/playlist.json', 'utf8'));
  let updated = false;
  
  for (const track of playlist) {
    if (track.id >= 9) {
      if (!track.defaultSource) {
        track.defaultSource = "youtube";
        updated = true;
      }
      
      if (!track.youtubeCandidates || track.youtubeCandidates.length === 0) {
        console.log(`Fetching YT for: ${track.titleHi} ${track.artist}`);
        try {
          const r = await ytSearch(`${track.titleHi} ${track.artist} song`);
          const videos = r.videos.slice(0, 3);
          const ids = videos.map(v => v.videoId);
          
          if (ids.length > 0) {
            track.youtubeCandidates = ids;
            updated = true;
            console.log(`Found IDs: ${ids.join(', ')}`);
          } else {
            console.log(`No videos found for ${track.titleHi}`);
          }
        } catch (err) {
          console.error(`Error searching ${track.titleHi}`, err);
        }
      }
    }
  }
  
  if (updated) {
    fs.writeFileSync('data/playlist.json', JSON.stringify(playlist, null, 2));
    console.log('Playlist updated with YouTube IDs and defaultSource.');
  } else {
    console.log('No updates needed.');
  }
}

run();
