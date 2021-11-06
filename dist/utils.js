"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBetween = exports.replaceSpacesWithSlashes = void 0;
function replaceSpacesWithSlashes(text) {
    return text.replace(/[ ]/g, "/");
}
exports.replaceSpacesWithSlashes = replaceSpacesWithSlashes;
function randomBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
}
exports.randomBetween = randomBetween;
