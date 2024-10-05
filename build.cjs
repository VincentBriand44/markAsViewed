const esbuild = require('esbuild');
const fs = require('fs');

const banner = fs.readFileSync('banner.js', 'utf8');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minifySyntax: true,
  minifyWhitespace: true,
  sourcemap: false,
  target: "esNext",
  outfile: 'dist/markAsViewed.user.js',
  banner: {
    js: banner,
  },
}).catch(() => process.exit(1));
