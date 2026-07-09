const https = require('https');
const fs = require('fs');
https.get('https://realcar.miami/', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    fs.writeFileSync('realcar_out.html', data);
    console.log('done');
  });
});
