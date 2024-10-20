import { build } from "esbuild";
// @ts-ignore bug resolveJsonModule
import { version } from "./package.json";

const banner = `
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @source       https://github.com/VincentBriand44/markAsViewed
// @downloadURL  https://raw.githubusercontent.com/VincentBriand44/markAsViewed/refs/heads/main/dist/markAsViewed.user.js
// @updateURL    https://raw.githubusercontent.com/VincentBriand44/markAsViewed/refs/heads/main/dist/markAsViewed.user.js
// @match        https://www.crunchyroll.com/*
// @match        http*://adkami.com/anime*?kaddon*
// @match        http*://*.adkami.com/anime*?kaddon*
// @match        http*://adkami.com/video?search=*&kaddon=*
// @match        http*://*.adkami.com/video?search=*&kaddon=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==
`;

build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	minifySyntax: false,
	minifyWhitespace: false,
	sourcemap: false,
	target: "esNext",
	outfile: "dist/markAsViewed.user.js",
	banner: {
		js: banner,
	},
}).catch(() => process.exit(1));
