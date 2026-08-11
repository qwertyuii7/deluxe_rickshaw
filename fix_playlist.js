const fs = require('fs');

const playlist = JSON.parse(fs.readFileSync('data/playlist.json', 'utf8'));

const updated = playlist.map(track => {
  if (track.titleHi === undefined && track.title) {
    track.titleHi = track.title;
    // Keep 'title' just in case, or remove it. We will just set titleHi.
  }
  if (track.artist === undefined && track.subtitle) {
    track.artist = track.subtitle;
  }
  if (track.vibe === undefined) {
    track.vibe = "Auto Rickshaw FM Banger 🛺";
  }
  return track;
});

fs.writeFileSync('data/playlist.json', JSON.stringify(updated, null, 2));
console.log('Fixed playlist.json');
