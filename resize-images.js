import sharp from 'sharp';
import fs from 'fs';

const images = [
  {
    input: 'public/projects/design.webp',
    output: 'public/optimized/design.webp',
    width: 1120,
    height: 592,
  },
  {
    input: 'public/projects/tracker.webp',
    output: 'public/optimized/tracker.webp',
    width: 1120,
    height: 642,
  },
  {
    input: 'public/images/gio_profile.webp',
    output: 'public/optimized/gio_profile.webp',
    width: 1050,
    height: 1050,
  },
  {
    input: 'public/projects/amazon.webp',
    output: 'public/optimized/amazon.webp',
    width: 1120,
    height: 646,
  },
];

async function resizeImages() {
  if (!fs.existsSync('public/optimized')) {
    fs.mkdirSync('public/optimized', { recursive: true });
  }

  for (const img of images) {
    await sharp(img.input)
      .resize(img.width, img.height, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(img.output);

    console.log(`✅ Resized: ${img.output} (${img.width}x${img.height})`);
  }
  console.log('Done! Check public/optimized/ folder.');
}

resizeImages().catch(console.error);