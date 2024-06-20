import "./style.css";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import txt from './async.txt'; 

hljs.registerLanguage('javascript', javascript);


const codeBlocks = document.querySelectorAll("pre");

const asyncTextBlock = document.querySelector(".async-text").innerHTML = `${txt}`
const callbackTextBlock = document.querySelector(".callback-text")
const promisesTextBlock = document.querySelector(".promises-text")
const awaitTextBlock = document.querySelector(".await-text")

const callback = `console.log(1)

fs.readFile('config.txt', finishedReading)

const finishedReading = (error, data) => {
    // handle error here
    console.log(data)
}

console.log(2)
`;


const promises = `console.log(1)

let readConfigFile = new Promise(function(resolve, reject) {

    // read the file

    if(file) {
        resolve('Success!');
    }
    else {
        reject('Failure!');
    }
});

p.then(result => { 
    console.log(result)
}).catch(err => {
    console.erorr(err)
}).finally(function() {
   console.log("Process Done!")
});

console.log(2)
`

const asyncAwait = `console.log(1)

import { promises as fs } from "fs";

const readConfigFile = async () => {
    const result = await readFile('config.txt','binary')
    console.log(result)
}

console.log(2)
`

const codeSnippets = {
  callback,
  promises,
  asyncAwait
};


codeBlocks.forEach((codeBlock, index) => {
  const snippetKey = Object.keys(codeSnippets)[index];
  const codeElement = document.createElement("code");
  codeElement.textContent = codeSnippets[snippetKey];
  codeBlock.prepend(codeElement);
});

hljs.highlightAll();