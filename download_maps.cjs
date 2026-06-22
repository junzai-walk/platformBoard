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
    const worldDest = path.join(assetsDir, 'world.json');
    if (fs.existsSync(worldDest) && fs.statSync(worldDest).size > 10000) {
      console.log('world.json already exists and is valid, skipping download.');
    } else {
      const worldUrls = [
        'https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json',
        'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.9.0/map/json/world.json',
        'https://raw.githubusercontent.com/apache/echarts/4.9.0/map/json/world.json'
      ];
      let downloadedWorld = false;
      for (const url of worldUrls) {
        try {
          console.log(`Trying to download World map from: ${url}`);
          await download(url, worldDest);
          downloadedWorld = true;
          break;
        } catch (err) {
          console.log(`Failed to download World map from ${url}: ${err.message}`);
        }
      }
      if (!downloadedWorld) {
        throw new Error('All World map URLs failed.');
      }
    }

    const usaDest = path.join(assetsDir, 'usa.json');
    if (fs.existsSync(usaDest) && fs.statSync(usaDest).size > 10000) {
      console.log('usa.json already exists and is valid, skipping download.');
    } else {
      const usaUrls = [
        'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
        'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json',
        'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.9.0/map/json/USA.json',
        'https://raw.githubusercontent.com/apache/echarts/4.9.0/map/json/USA.json',
        'https://raw.githubusercontent.com/apache/echarts/master/map/json/USA.json',
        'https://cdn.jsdelivr.net/npm/echarts@3.8.5/map/json/USA.json'
      ];

      let downloadedUsa = false;
      for (const url of usaUrls) {
        try {
          console.log(`Trying to download USA map from: ${url}`);
          await download(url, usaDest);
          downloadedUsa = true;
          break;
        } catch (err) {
          console.log(`Failed to download USA map from ${url}: ${err.message}`);
        }
      }

      if (!downloadedUsa) {
        throw new Error('All USA map URLs failed.');
      }
    }

    console.log('All downloads completed!');
  } catch (err) {
    console.error('Download failed:', err);
    process.exit(1);
  }
}

main();
