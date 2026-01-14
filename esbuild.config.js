import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';

const production = process.argv.includes('--production') || process.argv.includes('--omit=dev');
const watch = process.argv.includes('--watch');
const clean = process.argv.includes('--clean');
const outputDir = 'dist';

/**
 * @returns {import('esbuild').Plugin}
 */
function esbuildProblemMatcherPlugin(deleteOutput = false) {
  return {
    name: 'esbuild-problem-matcher',

    setup(build) {
      build.onStart(() => {
        console.log('[watch] build started');
        if (!deleteOutput) return;

        // clean output dist
        const deletedDir = path.join(import.meta.dirname, outputDir);
        fs.rmSync(deletedDir, { recursive: true, force: true });
      });   
      build.onEnd((result) => {
        result.errors.forEach(({ text, location }) => {
          console.error(`✘ [ERROR] ${text}`);
          console.error(`    ${location.file}:${location.line}:${location.column}:`);
        });
        console.log('[watch] build finished');
      });
    }
  };
}

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    format: 'esm',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    sourceRoot: '../src',
    platform: 'browser',
    globalName: 'Shiki',
    outbase: 'src',
    outdir: outputDir,
    allowOverwrite: true,
    external: ['dom'],
    logLevel: 'silent',
    tsconfig: 'tsconfig.json',
    plugins: [
      /* add to the end of plugins array */
      esbuildProblemMatcherPlugin(clean)
    ]
  });
  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
