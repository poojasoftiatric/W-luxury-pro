const fs = require('fs');
const path = require('path');

async function scrape() {
  try {
    let res = await fetch('https://www.car-logos.org/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    let html = await res.text();
    let matches = html.match(/<img[^>]+src="([^"]+)"[^>]*>/g);
    if(matches) {
      matches.forEach(m => {
        let src = m.match(/src="([^"]+)"/)[1];
        if (src.includes('logo') || src.includes('uploads')) {
          console.log(src);
        }
      });
    }
  } catch(e) { console.log(e.message); }
}
scrape();
