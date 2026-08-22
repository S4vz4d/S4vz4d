#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync(new URL('../assets/', import.meta.url), { recursive: true });

const PALETTE = {
  bg: '#0A1128',
  grid: '#1B3A5C',
  accent: '#4FD1E8',
  textSecondary: '#8AA9C4',
  textPrimary: '#E8F1F8',
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

divider('ABOUT', 'about');
divider('STACK & COMPETENCIES', 'stack');
divider('FEATURED PROJECTS', 'projects');
divider('EXPERIENCE', 'experience');
divider('CERTIFICATIONS', 'certifications');
divider('LIVE STATS', 'stats');

console.log('Dividers generated.');

export { PALETTE, FONT_STACK, assetPath, gridBackground, cornerBrackets, rulerTicks, divider };
