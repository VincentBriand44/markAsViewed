import { type BuildOptions, type SameShape, build, context } from "esbuild";
import { version } from "./package.json";

const banner = `
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      ${process.env.NODE_ENV === "development" ? `${version}-dev` : version}
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @source       https://github.com/VincentBriand44/markAsViewed
// @downloadURL  https://github.com/VincentBriand44/markAsViewed/raw/refs/heads/main/dist/markAsViewed.user.js
// @updateURL    https://github.com/VincentBriand44/markAsViewed/raw/refs/heads/main/dist/markAsViewed.user.js
// @match        http*://*.crunchyroll.com/*
// @match        http*://*.animationdigitalnetwork.com/video/*
// @match        http*://*.netflix.com/watch/*
// @match        http*://*.adkami.com/anime*?kaddon*
// @match        http*://*.adkami.com/video?search=*&kaddon=*
// @match        http*://anime-sama.fr/catalogue/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==
`;

const buildOptions: SameShape<BuildOptions, BuildOptions> = {
	entryPoints: ["src/index.ts"],
	bundle: true,
	minifySyntax: process.env.NODE_ENV !== "development",
	minifyWhitespace: process.env.NODE_ENV !== "development",
	sourcemap: process.env.NODE_ENV === "development",
	target: "esNext",
	outfile: "dist/markAsViewed.user.js",
	banner: {
		js: banner,
	},
	loader: {
		".svg": "text",
	},
};

if (process.env.NODE_ENV === "development") {
	const ctx = await context(buildOptions);
	await ctx.watch();
} else {
	build(buildOptions).catch(() => process.exit(1));
}
