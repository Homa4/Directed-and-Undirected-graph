function generateSymmetricBinaryMatrix(size) {
    const matrix = [];
    const variant = 3318;
    const variantStr = variant.toString();
    const n1 = Number(variantStr[0]);
    const n2 = Number(variantStr[1]);
    const n3 = Number(variantStr[2]);
    const n4 = Number(variantStr[3]);

    const n = 10 + n3;
    const koef = 1 - n3 * 0.02 - n4 * 0.005 - 0.25;
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j <= i; j++) {
            let elem = Math.floor(Math.random() * 2 * koef);
            matrix[i][j] = elem;
            matrix[j][i] = elem; 
        }
    }
    console.log(matrix);
    return matrix; 
}

export default generateSymmetricBinaryMatrix ; 
