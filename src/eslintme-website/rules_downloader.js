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

async function get(url, rule) {
    console.log(url);
    try {
        fs.writeFileSync(
            `public/rules/${rule}.md`,
            await (await fetch(url)).text()
        );
        console.log('Success', rule);
        return;
    } catch (error) {
        console.error('Failed', rule);
        return;
    }
}

async function download() {
    console.log('Downloading rules data from github.');
    const all = [];
    for (let i = 0; i < keys.length; i++) {
        const rule = keys[i];
        const url = baseURL.replace('$name', rule);
        all.push(get(url, rule));
    }

    await Promise.all(all);
    console.log('Finished');
}

download();
