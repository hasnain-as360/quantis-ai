const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');

const dir = 'D:/Energy/public/inspo';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

try {
  execSync(`"${ffmpeg}" -i "D:/Energy/web.mp4" -vf "fps=1/4" -vframes 8 -q:v 2 "${dir}/frame_%02d.jpg"`);
  console.log('Frames extracted successfully');
} catch (e) {
  console.error('Extraction error:', e.message);
}
