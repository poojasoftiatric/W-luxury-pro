const Jimp = require('jimp');

async function clean() {
  const file = 'public/assets/cars/rr_body.png';
  const img = await Jimp.read(file);
  const w = img.bitmap.width;
  const h = img.bitmap.height;

  img.scan(0, 0, w, h, function(x, y, idx) {
    // 1. Remove bottom right watermark
    if (x > w * 0.8 && y > h * 0.8) {
      this.bitmap.data[idx + 3] = 0; // Transparent
    }
    
    // 2. Remove bottom center grey background (between tires)
    // The tires are roughly between 10%-25% and 75%-90% horizontally
    if (x > w * 0.28 && x < w * 0.72 && y > h * 0.74) {
      this.bitmap.data[idx + 3] = 0; // Transparent
    }
    
    // 3. Remove far left and far right bottom corners just in case
    if (x < w * 0.1 && y > h * 0.85) {
      this.bitmap.data[idx + 3] = 0;
    }
    if (x > w * 0.9 && y > h * 0.85) {
      this.bitmap.data[idx + 3] = 0;
    }
    
    // 4. Crush blacks: if a pixel is very dark, make it pure black for screen blend mode
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx+1];
    const b = this.bitmap.data[idx+2];
    if (r < 25 && g < 25 && b < 25) {
        this.bitmap.data[idx] = 0;
        this.bitmap.data[idx+1] = 0;
        this.bitmap.data[idx+2] = 0;
    }
  });

  await img.writeAsync(file);
  console.log('Cleaned rr_body.png');
}
clean();
