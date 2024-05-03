
function generateSymmetricBinaryMatrix1(size) {
    const matrix2 = [];
    const matrix1 = [];

    const variant = 3318;
    const variantStr = variant.toString();
    const n1 = Number(variantStr[0]);
    const n2 = Number(variantStr[1]);
    const n3 = Number(variantStr[2]);
    const n4 = Number(variantStr[3]);

    const n = 10 + n3;
    const kof = 1 - n3 * 0.02 - n4 * 0.005 - 0.25;

    for (let i = 0; i < size; i++) {
        matrix2[i] = [];
        for (let j = 0; j < size; j++) {
            let elem = Math.floor(Math.random() * 2 * kof);
            matrix2[i][j] = elem;
        }
    }

    for (let i = 0; i < size; i++) {
        matrix1[i] = [];
        for (let j = 0; j < size; j++) {
            matrix1[i][j] = Math.max(matrix2[i][j], matrix2[j][i]); 
        }
    }

    console.log(matrix1);
    return [matrix2, matrix1];
}





export default generateSymmetricBinaryMatrix1 ; 
