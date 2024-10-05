const esbuild = require('esbuild');
const {version} = require('package.json')

const banner = `
// ==UserScript==
// @name         Your Script Name
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Your script description
// @match        https://example.com/*
// @grant        none
// ==/UserScript==
`

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minifySyntax: true,
  minifyWhitespace: true,
  sourcemap: false,
  target: "esNext",
  outfile: `dist/markAsViewed-v${version}.user.js`,
  banner: {
    js: banner,
  },
}).catch(() => process.exit(1));
