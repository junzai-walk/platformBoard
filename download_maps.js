const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'src', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  try {
    console.log('Starting downloads...');
    await download('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json', path.join(assetsDir, 'world.json'));
    await download('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/usa.json', path.join(assetsDir, 'usa.json'));
    console.log('All downloads completed!');
  } catch (err) {
    console.error('Download failed:', err);
    process.exit(1);
  }
}

main();
