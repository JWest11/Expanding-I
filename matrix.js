
function beginMatrix() {
    const wf = window.innerWidth * 2/3;
    const matrixingH1 = document.getElementById("matrixing-h1");
    const matrixingH1Rect = matrixingH1.getBoundingClientRect();
    const w0 = matrixingH1Rect.width;
    const h0 = matrixingH1Rect.height;
    const theta = Math.atan((wf - w0) / h0);

    const deltaX = matrixingH1Rect.x + matrixingH1Rect.width / 2 - window.innerWidth / 2;

    matrixingH1.style.transform = `skew(${theta}rad) translate(${-1 * deltaX}px)`;
    setTimeout(() => {
        const matrixContent = document.getElementById("matrix-content");
        matrixContent.style.left = `${window.innerWidth / 2 - wf / 2}px`
        matrixContent.style.top = `${matrixingH1Rect.top}px`;
        matrixContent.style.width = `${wf}px`
        matrixContent.style.height = `${h0}px`
        const newRect = matrixingH1.getBoundingClientRect();
        const x0 = newRect.left;
        const y0 = newRect.top;
        const x2 = newRect.right;
        const y2 = newRect.bottom;
        matrixContent.style.clipPath = `polygon(0% 0%, 0% 10%, 100% 100%, 100% 90%)`;
        
    }, 1000)
    
}