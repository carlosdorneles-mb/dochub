const fs = require('fs');
const jsonfile = require('jsonfile');

const manifestPath = './public/manifest.webmanifest';
const ngswConfigPath = './ngsw-config.json';
const newVersion = process.env.npm_package_version; // Pega a versão do package.json

// Atualiza a versão no arquivo version.ts
fs.writeFileSync('src/environments/version.ts', `export const version = '${newVersion}';\n`);

// Atualiza a versão no arquivo ngsw-config.json
jsonfile.readFile(ngswConfigPath, (err, ngswConfig) => {
  if (err) {
    console.error('Error reading ngsw-config.json:', err);
    process.exit(1);
  }

  ngswConfig.appData.version = newVersion;

  jsonfile.writeFile(ngswConfigPath, ngswConfig, {spaces: 2}, (err) => {
    if (err) {
      console.error('Error writing ngsw-config.json:', err);
      process.exit(1);
    }
    console.log(`ngsw-config.json version updated to ${newVersion}`);
  });
});

// Atualiza a versão no arquivo manifest.webmanifest
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
