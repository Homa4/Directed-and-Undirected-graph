import definedGraph from './script2.js'
import undefinedGraph from './script.js'
import generateSymmetricBinaryMatrix  from './matrixGenerator.js';

const radius = document.querySelector(".radius");
const numOfVertex = document.querySelector(".numberOfVertex");
const button = document.querySelector(".buttonUndef");



button.addEventListener("click", () => {
    const matrix = generateSymmetricBinaryMatrix(numOfVertex.value);
    undefinedGraph(radius.value, numOfVertex.value, matrix); 
    definedGraph(radius.value, numOfVertex.value, matrix); 
});

console.log(numOfVertex.value);