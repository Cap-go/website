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

// Patch 2: Replace transformWithEsbuild with transformWithOxc in compile.js
const compilePath = resolve('node_modules/astro/dist/vite-plugin-astro/compile.js');

if (existsSync(compilePath)) {
  let content = readFileSync(compilePath, 'utf-8');

  if (!content.includes('transformWithOxc')) {
    // Replace import
    let patched = content.replace(
      'import { transformWithEsbuild } from "vite";',
      'import { transformWithOxc } from "vite";'
    );

    // Replace first usage (main compile)
    patched = patched.replace(
      /esbuildResult = await transformWithEsbuild\(transformResult\.code, compileProps\.filename, \{[\s\S]*?\.\.\.compileProps\.viteConfig\.esbuild,[\s\S]*?loader: "ts",[\s\S]*?sourcemap: "external",[\s\S]*?tsconfigRaw: \{[\s\S]*?compilerOptions: \{[\s\S]*?\/\/ Ensure client:only imports are treeshaken[\s\S]*?verbatimModuleSyntax: false,[\s\S]*?importsNotUsedAsValues: "remove"[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}\);/,
      `esbuildResult = await transformWithOxc(transformResult.code, compileProps.filename, {
      lang: "ts",
      sourcemap: true
    });`
    );

    // Replace second usage (error handling)
    patched = patched.replace(
      /await transformWithEsbuild\(frontmatter, id, \{[\s\S]*?loader: "ts",[\s\S]*?target: "esnext",[\s\S]*?sourcemap: false[\s\S]*?\}\);/,
      `await transformWithOxc(frontmatter, id, {
        lang: "ts",
        sourcemap: false
      });`
    );

    if (patched !== content) {
      writeFileSync(compilePath, patched);
      console.log('✓ Patched Astro compile.js to use transformWithOxc');
      patchCount++;
    } else {
      console.log('! Could not patch compile.js - pattern may have changed');
    }
  } else {
    console.log('• Astro compile.js already uses transformWithOxc');
  }
}

if (patchCount === 0) {
  console.log('All Astro patches already applied');
} else {
  console.log(`Applied ${patchCount} patch(es) for Rolldown/Oxc optimization`);
}
