const definedGraph = (rad2, numOfVertex2, matrix) => {
    const canvas = document.querySelector(".canvas2");
const ctx = canvas.getContext('2d');
const numberOfVertex = numOfVertex2;
const radius = rad2;
canvas.width = 1000;
canvas.height = 600;

const width = 1000;
const height = 600;
const arrOfVertex = [];

function fillLinsWithVertex(firstL, thirdL) {
    const secondL = 3;
    const dx1 = Math.floor(width / firstL) - radius;
    const dx2 = Math.floor(width / secondL);
    const dx3 = Math.floor(width / thirdL) - radius;
    const dy = Math.floor(width / (2 * firstL)) + 100;
    let x = dx1;
    let y = 50;
    let circleNumber = 1;

    for (let line = 0; line < 3; line++) {
        let currentLineCount = line === 0 ? firstL : (line === 1 ? secondL : thirdL);

        for (let i = 0; i < currentLineCount; i++) {
            arrOfVertex.push({ x, y });
            drawCircle(x, y, circleNumber++, radius);
            x += line === 0 ? dx1 : (line === 1 ? dx2 : dx3);
        }

        y += dy;
        x = dx1;
    }
}

 function drawCircle(x, y, num, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); 
    ctx.fillStyle = 'purple'; 
    ctx.fill(); 
    ctx.closePath();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(num, x, y);
}

function drawGraph(numberOfVertex){
    let temp = numberOfVertex - 3;
    let tempForFun;
    if(temp % 2 === 0){
        tempForFun = temp / 2;
        fillLinsWithVertex(tempForFun, tempForFun);
    } else {
        let second =  Math.floor(temp / 2);
        let first = temp - second;
        fillLinsWithVertex(first, second);
    }
}


function drawArrow(x2, y2,angle) {
    const arrowSize = 15;
    const gapX = Math.cos(angle) * radius;
    const gapY = Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo(x2-gapX, y2-gapY);
    ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI / 6)-gapX, y2 - arrowSize * Math.sin(angle - Math.PI / 6)-gapY);
    ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI / 6)-gapX, y2 - arrowSize * Math.sin(angle + Math.PI / 6)-gapY);
    ctx.closePath();
    ctx.fill();
}

function drawSelfArrow(centerX, centerY, radius, angle) {
    const funAngle = angle * Math.PI / 180;
    const arrowX = centerX + radius * Math.cos(funAngle);
    const arrowY = centerY + radius * Math.sin(funAngle)-10;

    ctx.save();
    ctx.translate(arrowX, arrowY);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 15);
    ctx.lineTo(-5, 15);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.restore();
}

function drawLoopedLine(x , y, radius, angle) {
    ctx.beginPath();
    ctx.arc(x, y, radius-10, 0, Math.PI * 2); 
    ctx.stroke(); 
    ctx.closePath();
    ctx.rotate(angle);
    drawSelfArrow(x, y, radius-10, angle);
}

function drawCurve(x1, y1, x2, y2, angle) {
    const controlPointX = (x1 + x2) / 2;
    const controlPointY = (y1 + y2)/4;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(controlPointX, controlPointY, x2, y2);
    ctx.stroke();
    drawArrow(x2, y2, angle);
    ctx.closePath();
}

function drawEdgeLine(x1, y1, x2, y2, angle){
    arrOfVertex.forEach((elem) => {
        if(elem.x === (x1+x2)/2 && elem.y === (y1+y2)/2){
            drawCurve(x1, y1, x2, y2, angle);
            drawArrow(x2, y2, angle);
        }    
    })

    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke(); 
    drawArrow(x2, y2, angle);
    ctx.closePath();
}

function drawGraphEdges() {
    for (let i = 0; i < numberOfVertex; i++) {
        for (let j = 0; j < numberOfVertex; j++) {
            if (matrix[i][j] === 1 && i === j) {
                const angle = Math.atan2(arrOfVertex[j].y - arrOfVertex[i].y, arrOfVertex[j].x - arrOfVertex[i].x);
                drawLoopedLine(arrOfVertex[j].x - (2 * radius - 10), arrOfVertex[i].y, radius, angle);
            } else if (matrix[i][j] === 1) {
                const angle = Math.atan2(arrOfVertex[j].y - arrOfVertex[i].y, arrOfVertex[j].x - arrOfVertex[i].x);
                drawEdgeLine(arrOfVertex[i].x, arrOfVertex[i].y, arrOfVertex[j].x, arrOfVertex[j].y, angle);
            }
        }
    }
}




drawGraph(numberOfVertex);
drawGraphEdges();
console.log(arrOfVertex);
}

export default definedGraph;

