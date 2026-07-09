const fs = require('fs');
const data = fs.readFileSync('realcar_out.html', 'utf8');
const matches = data.match(/https:\/\/[^"']+\.jpg/gi);
if(matches) {
  const unique = [...new Set(matches)];
  const banners = unique.filter(u => u.includes('main_banner_images') || u.includes('vertical_banner_images'));
  const originals = banners.filter(u => u.includes('/original/'));
  console.log(originals.slice(0, 8).join('\n'));
}
