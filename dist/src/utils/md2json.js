"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const front_matter_1 = __importDefault(require("front-matter"));
// const fs = require('fs');
// const yaml = require('front-matter');
// Path for markdown files to read
const markdownPath = `${process.cwd()}/src/content/markdown`;
// Path for JSON files to write
const jsonPath = `${process.cwd()}/src/content/json`;
function getFiles(contentType) {
    return fs_1.default.readdirSync(`${markdownPath}/${contentType}`, 'utf8');
}
function getContent(contentType) {
    let content = [];
    const files = getFiles(contentType);
    files.map((file, i) => {
        content[i] = front_matter_1.default(fs_1.default.readFileSync(`${markdownPath}/${contentType}/${file}`, 'utf8'));
    });
    return content;
}
function createJsonFile(contentType) {
    const content = getContent(contentType);
    fs_1.default.writeFileSync(`${jsonPath}/${contentType}.json`, JSON.stringify(content), {
        encoding: 'utf8'
    });
}
function extractAll() {
    let content = [];
    let directories = [];
    let files = [];
    // get directory names
    directories = fs_1.default.readdirSync(`${markdownPath}`, 'utf8');
    // get files in each directory
    directories.map((dir) => {
        files[dir] = fs_1.default.readdirSync(`${markdownPath}/${dir}`, 'utf8');
    });
    console.log(files);
    // get files for each directory
    // directories.map((dir, i) => {
    //   content[i] = yaml(
    //     fs.readFileSync(`${markdownPath}/${dir}`, 'utf8')
    //   );
    // });
    // console.log(content);
    // fs.writeFileSync(`${jsonPath}/content.json`, JSON.stringify(content), {
    //   encoding: 'utf8'
    // });
}
// createJsonFile('pages');
// createJsonFile('posts');
extractAll();
//# sourceMappingURL=md2json.js.map