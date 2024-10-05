const esbuild = require("esbuild");
const { version } = require("./package.json");

const banner = `
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @match        https://www.crunchyroll.com/*
// @match        https://www.adkami.com/video?search=*&kaddon=*
// @match        https://www.adkami.com/anime*?kaddon*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==
`;

esbuild
	.build({
		entryPoints: ["src/index.ts"],
		bundle: true,
		minifySyntax: true,
		minifyWhitespace: true,
		sourcemap: false,
		target: "esNext",
		outfile: `dist/markAsViewed-v${version}.user.js`,
		banner: {
			js: banner,
		},
	})
	.catch(() => process.exit(1));
