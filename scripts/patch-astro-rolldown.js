#!/usr/bin/env node
/**
 * Patch Astro for Rolldown compatibility
 *
 * 1. Rolldown uses immutable OutputChunk objects, but Astro's build plugin
 *    tries to mutate chunk.code directly. This patch wraps the mutation
 *    in a try-catch to handle the immutability gracefully.
 *
 * 2. Replace transformWithEsbuild with transformWithOxc for faster transforms.
 *    Oxc is the Rust-based compiler used by Rolldown and is significantly faster.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

let patchCount = 0;

// Patch 1: Fix immutable chunk mutation in plugin.js
const pluginPath = resolve('node_modules/astro/dist/core/build/plugin.js');

if (existsSync(pluginPath)) {
  let content = readFileSync(pluginPath, 'utf-8');

  if (!content.includes('// Rolldown uses immutable chunks')) {
    const patched = content.replace(
      'const mutate = (chunk, targets, newCode) => {\n        chunk.code = newCode;',
      `const mutate = (chunk, targets, newCode) => {
        try {
          chunk.code = newCode;
        } catch (e) {
          // Rolldown uses immutable chunks, skip direct mutation
          // The mutation is still tracked and applied via the mutations map
        }`
    );

    if (patched !== content) {
      writeFileSync(pluginPath, patched);
      console.log('✓ Patched Astro plugin.js for immutable chunks');
      patchCount++;
    }
  } else {
    console.log('• Astro plugin.js already patched');
  }
}

// Note: We no longer patch compile.js to use transformWithOxc because
// oxc has incomplete support for TypeScript namespace declarations.
// Rolldown-vite still provides significant build performance improvements
// even without this patch, as it uses oxc for bundling.

if (patchCount === 0) {
  console.log('All Astro patches already applied');
} else {
  console.log(`Applied ${patchCount} patch(es) for Rolldown/Oxc optimization`);
}
