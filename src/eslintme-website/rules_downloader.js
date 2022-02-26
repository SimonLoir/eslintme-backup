/**
 * This file
 */
const all = require('eslint/conf/eslint-all').rules;
const fs = require('fs');
const fetch = require('node-fetch');
const keys = Object.keys(all);
let out = {};
const baseURL =
    'https://raw.githubusercontent.com/eslint/eslint/main/docs/rules/$name.md';

async function get(url) {
    return await (await fetch(url)).text();
}

async function download() {
    console.log('Downloading rules data from github.');
    out = {};
    for (let i = 0; i < keys.length; i++) {
        const rule = keys[i];
        const url = baseURL.replace('$name', rule);
        try {
            fs.writeFileSync(`public/rules/${rule}.md`, await get(url));
        } catch (error) {
            console.error('Failed', error);
        }
    }
}

download();
