const jsonfile = require('jsonfile');
const manifestPath = './public/manifest.webmanifest';

const newVersion = process.env.npm_package_version; // Pega a versão do package.json

jsonfile.readFile(manifestPath, (err, manifest) => {
  if (err) {
    console.error('Error reading manifest:', err);
    process.exit(1);
  }

  manifest.version = newVersion;

  jsonfile.writeFile(manifestPath, manifest, {spaces: 2}, (err) => {
    if (err) {
      console.error('Error writing manifest:', err);
      process.exit(1);
    }
    console.log(`Manifest version updated to ${newVersion}`);
  });
});
