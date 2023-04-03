
function beginMatrix() {
    const iElement = document.getElementById("matrixing-h1");
    const iRect = iElement.getBoundingClientRect();
    let deltaX = iRect.left - (window.innerWidth / 2) + (iRect.width/2);
    iElement.style.transform = `translateX(${-deltaX}px) scaleX(10) scaleY(0.2)`;
}