const undefinedGraph = (rad, numOfVertex, matrix) => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const numberOfVertex = numOfVertex;
    const radius = rad;
    canvas.width = 1000;
    canvas.height = 600;
    console.log(radius, numberOfVertex)
    const width = 1000;
    const height = 600;
    const arrOfVertex = [];

    function fillLinesWithVertex(firstL, thirdL) {
        const secondL = 3;
        const dx1 = Math.floor(width / firstL) - radius;
        const dx2 = Math.floor(width / secondL);
        const dx3 = Math.floor(width / thirdL) - radius;
        const dy = Math.floor(width / (2 * firstL)) + 100;
        let x = dx1;
        let y = 50;
        let circleNumber = 1;

        let dx2Counter = 0;
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

    function drawGraph(numberOfVertex) {
        let temp = numberOfVertex - 3;
        let tempForFun;
        if(temp % 2 === 0){
            tempForFun = temp / 2;
            fillLinesWithVertex(tempForFun, tempForFun);
        } else {
            let second =  Math.floor(temp / 2);
            let first = temp - second;
            fillLinesWithVertex(first, second);
        }
    }

    function drawLoopedLine(x , y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius-10, 0, Math.PI * 2); 
        ctx.stroke(); 
        ctx.closePath();
    }

    function drawCurve(x1, y1, x2, y2) {
        const controlPointX = (x1 + x2) / 2;
        const controlPointY = (y1 + y2)/4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(controlPointX, controlPointY, x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    function drawArrow(x2, y2, angle) {
        const arrowSize = 15;
        ctx.save();
        ctx.translate(x2, y2);
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillStyle ='black';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, arrowSize / 2);
        ctx.lineTo(-arrowSize, -arrowSize / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawEdgeLine(x1, y1, x2, y2){
        arrOfVertex.forEach((elem) => {
            if(elem.x === (x1+x2)/2 && elem.y === (y1+y2)/2){
                drawCurve(x1, y1, x2, y2);
            }    
        })

        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke(); 
        ctx.closePath();
    }

    function drawGraphEdges(matrix) {
        for (let i = 0; i < numberOfVertex; i++) {
            for (let j = 0; j < numberOfVertex; j++) {
                if (matrix[i][j] === 1 && i === j) {
                    drawLoopedLine(arrOfVertex[j].x - (2 * radius - 10), arrOfVertex[i].y, radius);
                } else if (matrix[i][j] === 1) {
                    drawEdgeLine(arrOfVertex[i].x, arrOfVertex[i].y, arrOfVertex[j].x, arrOfVertex[j].y);
                }
            }
        }
    }

    drawGraph(numberOfVertex);
    drawGraphEdges(matrix);
}

export default undefinedGraph;
