const Jimp = require('jimp');

async function processImage() {
  try {
    const imagePath = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\ff51b373-1417-494c-b80a-a09370e3ac5d\\rolls_royce_green_1783488830555.png';
    const outputPath = 'c:\\Users\\User\\Desktop\\W Luxury Redesign\\frontend\\public\\assets\\cars\\rolls_royce.png';
    
    console.log('Loading image...');
    const img = await Jimp.read(imagePath);
    
    // We assume the top-left pixel is the background color, or we know it's green.
    // Let's check the distance to #00FF00
    
    console.log('Processing pixels...');
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Chroma key logic: if green is significantly higher than red and blue
      // or if it's very close to 0, 255, 0.
      if (g > 150 && r < 100 && b < 100) {
        this.bitmap.data[idx + 3] = 0; // set alpha to 0
      }
    });
    
    console.log('Autocropping...');
    img.autocrop();
    
    console.log('Resizing to 900x318 (contain)...');
    img.contain(900, 318);
    
    console.log('Saving...');
    await img.writeAsync(outputPath);
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
