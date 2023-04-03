let currentMatrixTranslateX = 0;
let currentMatrixtranslateY = 0;
let currentMatrixScaleX = 0;
let currentMatrixScaleY = 0;


function beginMatrix() {
    const H1Element = document.getElementById("matrixing-h1");
    const iRect = H1Element.getBoundingClientRect();
    let deltaX = iRect.left - (window.innerWidth / 2) + (iRect.width/2);
    let deltaY = iRect.top - (window.innerHeight / 10);
    H1Element.style.transform = `translateX(${-deltaX}px) translateY(${-deltaY}px) scaleX(10) scaleY(0.2)`;
    H1Element.style.backgroundColor = "white";
    setTimeout(() => {
        const newRect = H1Element.getBoundingClientRect();
        const matrixContent = document.getElementById("matrix-content");
        matrixContent.style.left = `${newRect.left}px`;
        matrixContent.style.top = `${newRect.top}px`;
        matrixContent.style.width = `${newRect.width}px`;
        matrixContent.style.height = `${newRect.height}px`;
    }, 600)
    setTimeout(() => {
        const matrixContent = document.getElementById("matrix-content");
        matrixContent.style.height = "80vh";
    },1200)
}

function peekMatrix() {
    const H1Element = document.getElementById("matrixing-h1");
    const iRect = H1Element.getBoundingClientRect();
    let deltaX = iRect.left - (window.innerWidth / 2) + (iRect.width/2);
    let deltaY = iRect.top - (window.innerHeight / 10);
    H1Element.style.transform = `translateX(${-deltaX/15}px) translateY(${-deltaY/15}px) scaleX(1.2) scaleY(0.95)`;
}

function hideMatrix() {
    const H1Element = document.getElementById("matrixing-h1");
    H1Element.style.transform = "";
}