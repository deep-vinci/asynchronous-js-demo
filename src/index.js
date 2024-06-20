import "./style.css";

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';


hljs.registerLanguage('javascript', javascript);


const codeBlocks = document.querySelectorAll("pre");

const callback = `var fs = require('fs')
fs.readFile('config.txt', finishedReading)

function finishedReading(error, data) {
    // handle error here
    console.log(data)
}
`

const codeSnippets = {
  callback,
  promises: `function helloWorld() {
    console.log('promises');
  }`,
  asyncAwait: `function helloWorld() {
    console.log('async and await');
  }`
};


codeBlocks.forEach((codeBlock, index) => {
  const snippetKey = Object.keys(codeSnippets)[index];
  const codeElement = document.createElement("code");
  codeElement.textContent = codeSnippets[snippetKey];
  codeBlock.prepend(codeElement);
});

hljs.highlightAll();

