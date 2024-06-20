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

const callbackRun = document.querySelector(".callback-run")
const promisesRun = document.querySelector(".promises-run")
const awaitRun = document.querySelector(".await-run")

const callbackOutput = document.querySelector(".callback-output")
const promisesOutput = document.querySelector(".promises-output")
const awaitOutput = document.querySelector(".await-output")

const callback = `function fetchData(url, callback) {
    // behind the scene XMLHttpRequest is being used to output on the "Run" button click 
    let data = fetchingdata(url)
    callback(data);
  }
  
function handleResponse(data) {
    console.log(data);
}
  
fetchData("https://catfact.ninja/fact", handleResponse);
  
console.log("Code Execution Complete!")
`;


const promises = `function makeXHRRequest() {
    return fetch("https://catfact.ninja/fact")
        .then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
        })
}

console.log("Code Execution Complete!")
`

const asyncAwait = `async function makeXHRRequest() {
    let response = await fetch("https://catfact.ninja/fact");
    let data = await response.json()

    console.log(data)
}

makeXHRRequest()


console.log("Code Execution Complete!")
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

callbackRun.addEventListener("click", () => {
    function makeXHRRequest(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true); // bool ensures its async
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error(`Request error ${xhr.status}`))
               }   
            }
        }
        xhr.send();    
    }

    makeXHRRequest("https://catfact.ninja/fact", (error, data) => {
        if (error) {
            console.log(error)
        } else {
            callbackOutput.textContent += `\n${data}`;
            console.log(data)
        }
    })
    callbackOutput.textContent = "Code Execution Complete!";

})

promisesRun.addEventListener("click", () => {
    function makeXHRRequest() {
        return fetch("https://catfact.ninja/fact")
            .then(response => {
                return response.json()
            }).then(data => {
                promisesOutput.textContent += `\n${JSON.stringify(data)}`;
            })
    }

    makeXHRRequest();
    promisesOutput.textContent = "Code Execution Complete!";
})

awaitRun.addEventListener("click", () => {
    async function makeXHRRequest() {
        let response = await fetch("https://catfact.ninja/fact");
        let data = await response.json()

        awaitOutput.textContent += `\n${JSON.stringify(data)}`;
    }

    makeXHRRequest()
    awaitOutput.textContent = "Code Execution Complete!";

})