const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 1. Decode Source PNG
function decodePng(filePath) {
  const buf = fs.readFileSync(filePath);
  let offset = 8;
  const idatChunks = [];
  let width = 0, height = 0;

  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4;
  const stride = width * bpp;
  const pixels = Buffer.alloc(width * height * 4);

  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const rawRow = y * (stride + 1) + 1;
    const outRow = y * stride;
    const prevOutRow = (y - 1) * stride;

    for (let x = 0; x < stride; x++) {
      const rawVal = raw[rawRow + x];
      const left = x >= bpp ? pixels[outRow + x - bpp] : 0;
      const up = y > 0 ? pixels[prevOutRow + x] : 0;
      const upleft = (y > 0 && x >= bpp) ? pixels[prevOutRow + x - bpp] : 0;

      let val = 0;
      if (filter === 0) val = rawVal;
      else if (filter === 1) val = (rawVal + left) & 0xff;
      else if (filter === 2) val = (rawVal + up) & 0xff;
      else if (filter === 3) val = (rawVal + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) val = (rawVal + paeth(left, up, upleft)) & 0xff;

      pixels[outRow + x] = val;
    }
  }

  return { width, height, pixels };
}

// 2. Encode to PNG
function encodePng(width, height, rgbaBuffer) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None
    rgbaBuffer.copy(rawData, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const deflated = zlib.deflateSync(rawData, { level: 9 });

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    let c = -1;
    for (let i = 4; i < 8 + len; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
      }
    }
    buf.writeInt32BE(~c, 8 + len);
    return buf;
  }

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    header,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// 3. Render High-Contrast App Icon
function createPwaIcon(size, srcLogo, isMaskable = false) {
  const canvas = Buffer.alloc(size * size * 4);

  // Crop logo bounding box
  const minX = 5, maxX = 330, minY = 16, maxY = 293;
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // Safe zone sizing: For maskable icon, logo must be in the central 70% safe zone
  const maxLogoSize = isMaskable ? size * 0.68 : size * 0.76;
  const scale = Math.min(maxLogoSize / cropW, maxLogoSize / cropH);
  const targetW = Math.round(cropW * scale);
  const targetH = Math.round(cropH * scale);
  const startX = Math.round((size - targetW) / 2);
  const startY = Math.round((size - targetH) / 2);

  // Step A: Draw Executive Dark Navy Background with Radial Glow
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Normalized coordinates from center (-1 to 1)
      const nx = (x - size / 2) / (size / 2);
      const ny = (y - size / 2) / (size / 2);
      const distFromCenter = Math.sqrt(nx * nx + ny * ny);

      // Distance from top-center light source
      const lx = (x - size * 0.5) / (size * 0.5);
      const ly = (y - size * 0.35) / (size * 0.5);
      const lightDist = Math.sqrt(lx * lx + ly * ly);

      // Base gradient: #141C48 at upper center down to #060914 at edges
      const t = Math.min(1, lightDist * 0.7);
      let r = Math.round(20 * (1 - t) + 6 * t);
      let g = Math.round(28 * (1 - t) + 9 * t);
      let b = Math.round(72 * (1 - t) + 20 * t);

      // Pink ambient aura behind right side of emblem (#EE0088)
      const prx = (x - size * 0.62) / (size * 0.35);
      const pry = (y - size * 0.50) / (size * 0.35);
      const pinkDist = Math.sqrt(prx * prx + pry * pry);
      if (pinkDist < 1.0) {
        const pinkFactor = Math.pow(1 - pinkDist, 2) * 0.38;
        r = Math.min(255, Math.round(r + 238 * pinkFactor));
        g = Math.min(255, Math.round(g + 0 * pinkFactor));
        b = Math.min(255, Math.round(b + 136 * pinkFactor));
      }

      // Indigo/Cyan ambient aura behind left side of emblem (#3E58E8)
      const blx = (x - size * 0.38) / (size * 0.35);
      const bly = (y - size * 0.50) / (size * 0.35);
      const blueDist = Math.sqrt(blx * blx + bly * bly);
      if (blueDist < 1.0) {
        const blueFactor = Math.pow(1 - blueDist, 2) * 0.35;
        r = Math.min(255, Math.round(r + 62 * blueFactor));
        g = Math.min(255, Math.round(g + 88 * blueFactor));
        b = Math.min(255, Math.round(b + 232 * blueFactor));
      }

      // Subtle luminous center backlight (#FFFFFF)
      const cx = (x - size * 0.5) / (size * 0.28);
      const cy = (y - size * 0.5) / (size * 0.28);
      const centerDist = Math.sqrt(cx * cx + cy * cy);
      if (centerDist < 1.0) {
        const centerFactor = Math.pow(1 - centerDist, 2) * 0.16;
        r = Math.min(255, Math.round(r + 255 * centerFactor));
        g = Math.min(255, Math.round(g + 255 * centerFactor));
        b = Math.min(255, Math.round(b + 255 * centerFactor));
      }

      // Subtle metallic border highlight inside bounds
      if (!isMaskable && (x === 1 || x === size - 2 || y === 1 || y === size - 2)) {
        r = Math.min(255, r + 45);
        g = Math.min(255, g + 45);
        b = Math.min(255, b + 65);
      }

      canvas[idx] = r;
      canvas[idx + 1] = g;
      canvas[idx + 2] = b;
      canvas[idx + 3] = 255;
    }
  }

  // Step B: Sample Rescaled Logo Pixels with Bilinear Filtering
  const rescaledLogo = Buffer.alloc(targetW * targetH * 4);
  for (let ty = 0; ty < targetH; ty++) {
    const srcY = minY + (ty / targetH) * cropH;
    const y0 = Math.floor(srcY);
    const y1 = Math.min(srcLogo.height - 1, y0 + 1);
    const fy = srcY - y0;

    for (let tx = 0; tx < targetW; tx++) {
      const srcX = minX + (tx / targetW) * cropW;
      const x0 = Math.floor(srcX);
      const x1 = Math.min(srcLogo.width - 1, x0 + 1);
      const fx = srcX - x0;

      const idx00 = (y0 * srcLogo.width + x0) * 4;
      const idx10 = (y0 * srcLogo.width + x1) * 4;
      const idx01 = (y1 * srcLogo.width + x0) * 4;
      const idx11 = (y1 * srcLogo.width + x1) * 4;

      const destIdx = (ty * targetW + tx) * 4;

      for (let c = 0; c < 4; c++) {
        const top = srcLogo.pixels[idx00 + c] * (1 - fx) + srcLogo.pixels[idx10 + c] * fx;
        const bottom = srcLogo.pixels[idx01 + c] * (1 - fx) + srcLogo.pixels[idx11 + c] * fx;
        rescaledLogo[destIdx + c] = Math.round(top * (1 - fy) + bottom * fy);
      }
    }
  }

  // Step C: High-Contrast Platinum/White Rim Backlight (Halo)
  // Dilate the alpha mask by a radius to create a clean luminous halo behind the logo
  const haloRadius = Math.max(2, Math.round(size * 0.015));
  const haloMask = Buffer.alloc(targetW * targetH);

  for (let ty = 0; ty < targetH; ty++) {
    for (let tx = 0; tx < targetW; tx++) {
      const a = rescaledLogo[(ty * targetW + tx) * 4 + 3];
      if (a > 30) {
        for (let dy = -haloRadius; dy <= haloRadius; dy++) {
          const hy = ty + dy;
          if (hy < 0 || hy >= targetH) continue;
          for (let dx = -haloRadius; dx <= haloRadius; dx++) {
            const hx = tx + dx;
            if (hx < 0 || hx >= targetW) continue;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= haloRadius) {
              const hidx = hy * targetW + hx;
              const intensity = Math.round((1 - dist / haloRadius) * (a / 255) * 180);
              if (intensity > haloMask[hidx]) {
                haloMask[hidx] = intensity;
              }
            }
          }
        }
      }
    }
  }

  // Blend Halo onto Canvas (Luminous Platinum White/Pink edge glow)
  for (let ty = 0; ty < targetH; ty++) {
    const cy = startY + ty;
    if (cy < 0 || cy >= size) continue;
    for (let tx = 0; tx < targetW; tx++) {
      const cx = startX + tx;
      if (cx < 0 || cx >= size) continue;

      const haloAlpha = haloMask[ty * targetW + tx] / 255;
      if (haloAlpha > 0.01) {
        const canvasIdx = (cy * size + cx) * 4;
        const haloR = 255, haloG = 255, haloB = 255; // Crisp Platinum White
        const blend = haloAlpha * 0.42;

        canvas[canvasIdx] = Math.round(canvas[canvasIdx] * (1 - blend) + haloR * blend);
        canvas[canvasIdx + 1] = Math.round(canvas[canvasIdx + 1] * (1 - blend) + haloG * blend);
        canvas[canvasIdx + 2] = Math.round(canvas[canvasIdx + 2] * (1 - blend) + haloB * blend);
      }
    }
  }

  // Step D: Blend Rescaled Logo onto Canvas with Contrast Boosting
  for (let ty = 0; ty < targetH; ty++) {
    const cy = startY + ty;
    if (cy < 0 || cy >= size) continue;

    for (let tx = 0; tx < targetW; tx++) {
      const cx = startX + tx;
      if (cx < 0 || cx >= size) continue;

      const logoIdx = (ty * targetW + tx) * 4;
      const alpha = rescaledLogo[logoIdx + 3] / 255;

      if (alpha > 0.005) {
        const canvasIdx = (cy * size + cx) * 4;
        let lr = rescaledLogo[logoIdx];
        let lg = rescaledLogo[logoIdx + 1];
        let lb = rescaledLogo[logoIdx + 2];

        // Contrast Enhancement: If it's the royal blue part (#334499), brighten slightly
        // so it looks vivid, energetic and sharp on dark OLED mobile screens
        if (lb > lr && lb > lg && lr < 100) {
          lr = Math.min(255, Math.round(lr * 1.15 + 15));
          lg = Math.min(255, Math.round(lg * 1.15 + 20));
          lb = Math.min(255, Math.round(lb * 1.12 + 25));
        }

        // Vibrant Pink part (#EE0088): keep punchy and vivid
        if (lr > 180 && lb > 80 && lg < 60) {
          lr = Math.min(255, Math.round(lr * 1.05 + 10));
          lb = Math.min(255, Math.round(lb * 1.05 + 10));
        }

        // Standard alpha composite
        canvas[canvasIdx] = Math.round(canvas[canvasIdx] * (1 - alpha) + lr * alpha);
        canvas[canvasIdx + 1] = Math.round(canvas[canvasIdx + 1] * (1 - alpha) + lg * alpha);
        canvas[canvasIdx + 2] = Math.round(canvas[canvasIdx + 2] * (1 - alpha) + lb * alpha);
      }
    }
  }

  return encodePng(size, size, canvas);
}

// 4. Main Execution
const logoPath = path.join(__dirname, '..', 'public', 'ipsur-logo.png');
const publicDir = path.join(__dirname, '..', 'public');

console.log('Reading source logo:', logoPath);
const srcLogo = decodePng(logoPath);
console.log(`Source decoded: ${srcLogo.width}x${srcLogo.height}`);

// Generate 512x512 Standard
console.log('Generating 512x512 icon...');
const icon512 = createPwaIcon(512, srcLogo, false);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

// Generate 512x512 Maskable (Safe Zone for Android Adaptive Icons)
console.log('Generating 512x512 Maskable icon...');
const iconMaskable = createPwaIcon(512, srcLogo, true);
fs.writeFileSync(path.join(publicDir, 'icon-maskable-512.png'), iconMaskable);

// Generate 192x192 Standard
console.log('Generating 192x192 icon...');
const icon192 = createPwaIcon(192, srcLogo, false);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

// Generate 180x180 Apple Touch Icon (iOS Safari)
console.log('Generating 180x180 Apple Touch icon...');
const iconApple = createPwaIcon(180, srcLogo, false);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconApple);

// Generate favicon 96x96
console.log('Generating 96x96 favicon...');
const icon96 = createPwaIcon(96, srcLogo, false);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), icon96);

console.log('All PWA mobile icons generated successfully!');
