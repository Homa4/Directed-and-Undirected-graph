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
    const arrOfVertexDx2 = [];

    canvas.width = width;
    canvas.height = height;

    function fillLinesWithVertex(firstL, thirdL) {
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
                if(line === 0){
                    x+=dx1;
                } else if(line === 1){
                    x+=dx2;
                    arrOfVertexDx2.push({x,y});
                } else{
                    x+=dx3;
                }
            }

            y += dy;
            x = dx1;
        }
    }

    function generateMisRange(cord, radius){
        const resArr = [];
        let temp = cord;
        for (let i = 0; i < radius; i++) {
            temp--;
            resArr.push(temp);
        }
    
        resArr.reverse();
        resArr.push(cord);
        temp = cord;
    
        for (let i = 0; i < radius; i++) {
            temp++;
            resArr.push(temp);
        }
        return resArr;
    }
    
    function chekingIfHasMis(cordX, radius) {
        const arr = generateMisRange(cordX, radius);
        return arrOfVertexDx2.some(elem => arr.includes(elem.x));
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
        if (temp % 2 === 0) {
            tempForFun = temp / 2;
            fillLinesWithVertex(tempForFun, tempForFun);
        } else {
            let second =  Math.floor(temp / 2);
            let first = temp - second;
            fillLinesWithVertex(first, second);
        }
    }

    function drawLoopedLine(x, y, radius, angle) {
        ctx.beginPath();
        ctx.arc(x + 7, y, radius - 10, Math.PI / 6, (Math.PI * 11) / 6);
        ctx.stroke();
        ctx.closePath();
    }

    function drawCurve(start, end, arrowDistance = 20, bendAngle = Math.PI / 8) {
        let midX = (start.x + end.x) / 2;
        let midY = (start.y + end.y) / 2;

        let distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

        let newEndX = end.x - (end.x - start.x) / distance ;
        let newEndY = end.y - (end.y - start.y) / distance ;

        let controlX, controlY;
        if (start.x !== end.x && start.y !== end.y) {
            controlX = midX + Math.cos(bendAngle) * (midY - start.y);
            controlY = midY + Math.sin(bendAngle) * (midX - start.x);
        } else if (start.x === end.x) {
            controlX = midX + 100;
            controlY = midY;
        } else {
            controlX = midX;
            controlY = midY + 100;
        }

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
        ctx.stroke();
    }

    function drawCurveArrow(start, end) {
        drawCurve(start, end);
    }

    function drawStraitLine(start, end){
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.stroke(); 
                ctx.closePath();
    }

    function drawEdgeLine(x1, y1, x2, y2, radius){
        let hasMis = chekingIfHasMis((x1+x2)/2, radius);
    
        arrOfVertex.forEach((elem) => {
            if (elem.x === (x1 + x2)/2 && elem.y === (y1 + y2) / 2) {
                drawCurveArrow({ x: x1, y: y1 }, { x: x2, y: y2 });
            } else if (hasMis && elem.y === (y1 + y2) / 2) {
                console.log('it working');
                drawCurveArrow({ x: x1, y: y1 }, { x: x2, y: y2 });
            } else {
                drawStraitLine({ x: x1, y: y1 }, { x: x2, y: y2 });
            }
        });
    }
    

        

    function drawGraphEdges() {
        for (let i = 0; i < numberOfVertex; i++) {
            for (let j = 0; j < numberOfVertex; j++) {
                if (matrix[i][j] === 1 && i === j) {
                    drawLoopedLine(arrOfVertex[j].x - (2 * radius - 10), arrOfVertex[i].y, radius);
                } else if (matrix[i][j] === 1) {
                    drawEdgeLine(arrOfVertex[i].x, arrOfVertex[i].y, arrOfVertex[j].x, arrOfVertex[j].y, radius);
                }
            }
        }
    }

    drawGraph(numberOfVertex);
    drawGraphEdges();
    console.log(arrOfVertexDx2);
}

export default undefinedGraph;
