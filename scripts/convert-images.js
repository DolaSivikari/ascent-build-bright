#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to AVIF and WebP formats with multiple sizes
 * 
 * Usage: node scripts/convert-images.js
 * 
 * Dependencies: sharp (install with: npm install sharp)
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = 'public/assets';
const SRC_DIR = 'src/assets';
const SIZES = [640, 1024, 1920, 2560]; // Responsive sizes
const AVIF_QUALITY = 80;
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 90;

async function processImage(inputPath, outputDir, filename) {
  const name = basename(filename, extname(filename));
  
  console.log(`Processing: ${filename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate multiple sizes
    for (const width of SIZES) {
      // Skip if original is smaller than target width
      if (metadata.width && metadata.width < width) continue;
      
      const resizedImage = sharp(inputPath).resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
      
      // AVIF (best compression, modern browsers)
      await resizedImage
        .clone()
        .avif({ quality: AVIF_QUALITY })
        .toFile(join(outputDir, `${name}-${width}w.avif`));
      
      // WebP (good compression, wide support)
      await resizedImage
        .clone()
        .webp({ quality: WEBP_QUALITY })
        .toFile(join(outputDir, `${name}-${width}w.webp`));
    }
    
    // Optimized JPEG fallback (original size)
    await sharp(inputPath)
      .jpeg({ quality: JPEG_QUALITY, progressive: true })
      .toFile(join(outputDir, `${name}-optimized.jpg`));
    
    console.log(`✓ Completed: ${filename}`);
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
}

async function processDirectory(inputDir, outputDir) {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  const files = await readdir(inputDir);
  const imageFiles = files.filter(file => 
    ['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())
  );
  
  console.log(`\nFound ${imageFiles.length} images in ${inputDir}\n`);
  
  for (const file of imageFiles) {
    await processImage(join(inputDir, file), outputDir, file);
  }
}

async function main() {
  console.log('=== Image Optimization Script ===\n');
  
  // Process public assets
  if (existsSync(PUBLIC_DIR)) {
    console.log('Processing public assets...');
    await processDirectory(PUBLIC_DIR, join(PUBLIC_DIR, 'optimized'));
  }
  
  // Process src assets
  if (existsSync(SRC_DIR)) {
    console.log('\nProcessing src assets...');
    await processDirectory(SRC_DIR, join(SRC_DIR, 'optimized'));
  }
  
  console.log('\n=== Optimization Complete ===');
  console.log('\nNext steps:');
  console.log('1. Review optimized images in */optimized directories');
  console.log('2. Update image references in components to use OptimizedImage');
  console.log('3. Delete original large images after verification');
}

main().catch(console.error);
