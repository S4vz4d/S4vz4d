#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync(new URL('../assets/', import.meta.url), { recursive: true });

const PALETTE = {
  bg: '#0D0D0D',
  grid: '#2E2E2E',
  accent: '#E5E5E5',
  textSecondary: '#9A9A9A',
  textPrimary: '#FFFFFF',
};

const FONT_STACK = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";

function assetPath(name) {
  return new URL(`../assets/${name}`, import.meta.url);
}

function gridBackground(width, height, spacing = 40) {
  let lines = '';
  for (let x = spacing; x < width; x += spacing) {
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${PALETTE.grid}" stroke-width="1" opacity="0.35" />\n`;
  }
  for (let y = spacing; y < height; y += spacing) {
    lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${PALETTE.grid}" stroke-width="1" opacity="0.35" />\n`;
  }
  return lines;
}

function cornerBrackets(width, height, size = 24, inset = 12, color = PALETTE.accent) {
  const bracket = (x1, y1, x2, y2, x3, y3) =>
    `<polyline points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="none" stroke="${color}" stroke-width="2" />`;
  return [
    bracket(inset, inset + size, inset, inset, inset + size, inset),
    bracket(width - inset - size, inset, width - inset, inset, width - inset, inset + size),
    bracket(inset, height - inset - size, inset, height - inset, inset + size, height - inset),
    bracket(width - inset - size, height - inset, width - inset, height - inset, width - inset, height - inset - size),
  ].join('\n');
}

function rulerTicks(x1, x2, y, tickHeight, color) {
  let ticks = '';
  for (let x = x1; x <= x2; x += 20) {
    ticks += `<line x1="${x}" y1="${y - tickHeight / 2}" x2="${x}" y2="${y + tickHeight / 2}" stroke="${color}" stroke-width="1" />\n`;
  }
  return ticks;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function banner() {
  const width = 1200;
  const height = 300;
  const midX = width / 2;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${PALETTE.bg}" />
  ${gridBackground(width, height)}
  ${cornerBrackets(width, height)}
  <text x="${midX}" y="120" text-anchor="middle" font-family="${FONT_STACK}" font-size="14" letter-spacing="4" fill="${PALETTE.accent}">// SECURITY_PROFILE</text>
  <text x="${midX}" y="175" text-anchor="middle" font-family="${FONT_STACK}" font-size="48" font-weight="700" letter-spacing="6" fill="${PALETTE.textPrimary}">MIGUEL GONZÁLEZ</text>
  <line x1="${midX - 220}" y1="200" x2="${midX + 220}" y2="200" stroke="${PALETTE.accent}" stroke-width="1" />
  ${rulerTicks(midX - 220, midX + 220, 200, 6, PALETTE.accent)}
  <text x="40" y="${height - 20}" font-family="${FONT_STACK}" font-size="11" fill="${PALETTE.textSecondary}">X:0 Y:0</text>
  <text x="${width - 40}" y="${height - 20}" text-anchor="end" font-family="${FONT_STACK}" font-size="11" fill="${PALETTE.textSecondary}">${width}x${height}</text>
</svg>`;
  writeFileSync(assetPath('banner.svg'), svg);
}

function footer() {
  const width = 1200;
  const height = 90;
  const boxX = width - 260;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="10" x2="${width}" y2="10" stroke="${PALETTE.grid}" stroke-width="1" />
  <rect x="${boxX}" y="24" width="220" height="54" fill="none" stroke="${PALETTE.accent}" stroke-width="1" />
  <line x1="${boxX}" y1="42" x2="${boxX + 220}" y2="42" stroke="${PALETTE.accent}" stroke-width="1" />
  <text x="${boxX + 10}" y="37" font-family="${FONT_STACK}" font-size="11" fill="${PALETTE.textSecondary}">DRAWN BY: S4VZ4D</text>
  <text x="${boxX + 10}" y="55" font-family="${FONT_STACK}" font-size="11" fill="${PALETTE.textSecondary}">SCALE: 1:1</text>
  <text x="${boxX + 10}" y="70" font-family="${FONT_STACK}" font-size="11" fill="${PALETTE.textSecondary}">REV: 2026.08</text>
</svg>`;
  writeFileSync(assetPath('footer.svg'), svg);
}

function divider(label, slug) {
  const width = 1200;
  const height = 60;
  const midY = height / 2;
  const charWidth = 9.6; // monospace char width at font-size 16
  const text = `// ${label}`;
  const textWidth = text.length * charWidth;
  const boxX = 60;
  const boxWidth = textWidth + 32;
  const escapedText = escapeXml(text);

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="${midY}" x2="${width}" y2="${midY}" stroke="${PALETTE.grid}" stroke-width="1" />
  ${rulerTicks(0, width, midY, 8, PALETTE.grid)}
  <polyline points="0,${midY - 10} 0,${midY} 10,${midY}" fill="none" stroke="${PALETTE.accent}" stroke-width="2" />
  <polyline points="${width - 10},${midY} ${width},${midY} ${width},${midY - 10}" fill="none" stroke="${PALETTE.accent}" stroke-width="2" />
  <rect x="${boxX}" y="${midY - 16}" width="${boxWidth}" height="32" fill="${PALETTE.bg}" />
  <text x="${boxX + 16}" y="${midY + 5}" font-family="${FONT_STACK}" font-size="16" font-weight="700" letter-spacing="2" fill="${PALETTE.accent}">${escapedText}</text>
</svg>`;
  writeFileSync(assetPath(`divider-${slug}.svg`), svg);
}

banner();
footer();

divider('ABOUT', 'about');
divider('STACK & COMPETENCIES', 'stack');
divider('FEATURED PROJECTS', 'projects');
divider('EXPERIENCE', 'experience');
divider('CERTIFICATIONS', 'certifications');
divider('LIVE STATS', 'stats');

console.log('Banner, footer, and dividers generated.');

export { PALETTE, FONT_STACK, assetPath, gridBackground, cornerBrackets, rulerTicks, divider };
