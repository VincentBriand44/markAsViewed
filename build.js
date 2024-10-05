"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var esbuild_1 = require("esbuild");
var package_json_1 = require("./package.json");
var banner = "\n// ==UserScript==\n// @name         Mark as viewed\n// @namespace    http://tampermonkey.net/\n// @version      ".concat(package_json_1.version, "\n// @description  Mark as viewed on AdKami from Crunchyroll\n// @author       Kanon\n// @match        https://www.crunchyroll.com/*\n// @match        https://www.adkami.com/video?search=*&kaddon=*\n// @match        https://www.adkami.com/anime*?kaddon*\n// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com\n// @grant        none\n// ==/UserScript==\n");
(0, esbuild_1.build)({
    entryPoints: ["src/index.ts"],
    bundle: true,
    minifySyntax: true,
    minifyWhitespace: true,
    sourcemap: false,
    target: "esNext",
    outfile: "dist/markAsViewed-v".concat(package_json_1.version, ".user.js"),
    banner: {
        js: banner,
    },
}).catch(function () { return process.exit(1); });
