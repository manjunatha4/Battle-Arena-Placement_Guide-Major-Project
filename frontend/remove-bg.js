import { Jimp } from 'jimp';

async function removeDarkBackground() {
  const imagePath = './src/assets/spider-hero.png';
  console.log('Loading image...');
  try {
    const image = await Jimp.read(imagePath);
    console.log('Processing pixels...');
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      if (red < 50 && green < 50 && blue < 50) {
        const maxVal = Math.max(red, green, blue);
        const alpha = Math.max(0, Math.min(255, (maxVal - 15) * 8));
        this.bitmap.data[idx + 3] = alpha;
      }
    });

    console.log('Saving image...');
    await image.write(imagePath);
    console.log('Background removed successfully!');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

removeDarkBackground();
