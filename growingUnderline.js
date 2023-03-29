let growthActivated = false;
let underlineHovered = false;

function peekUnderline() {
    underlineHovered = true;
    const growingContent = document.getElementById("growing-content");
    const underlineH1 = document.getElementById("underline-h1");
    let underlineH1Rect = underlineH1.getBoundingClientRect();

    let x0 = underlineH1Rect.left + underlineH1Rect.width / 2;
    let y0 = underlineH1Rect.bottom;
    growingContent.dataset.transition = "instant";
    document.documentElement.style.setProperty("--growing-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px)`);

    setTimeout(() => {
        if (!underlineHovered) {return}
        growingContent.dataset.transition = "fast";
        let x1 = underlineH1Rect.left;
        let y1 = underlineH1Rect.bottom;
        let x2 = underlineH1Rect.right;
        let y2 = underlineH1Rect.bottom + 3;
        document.documentElement.style.setProperty("--growing-polygon", `polygon(${x1}px ${y1}px,${x1}px ${y2}px,${x2}px ${y2}px,${x2}px ${y1}px)`);
    }, 100)
    
}

function unPeekUnderline() {
    underlineHovered = false;
    if (growthActivated) {return}
    const underlineH1 = document.getElementById("underline-h1");
    let underlineH1Rect = underlineH1.getBoundingClientRect();

    let x0 = underlineH1Rect.left + underlineH1Rect.width / 2;
    let y0 = underlineH1Rect.bottom;
    document.documentElement.style.setProperty("--growing-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px)`);
}

function activateGrowingContent() {
    growthActivated = true;
    const growingContent = document.getElementById("growing-content");
    const underlineH1 = document.getElementById("underline-h1");
    underlineH1.dataset.clickable = "false";
    let underlineH1Rect = underlineH1.getBoundingClientRect();
    growingContent.dataset.transition = "slow";

    setTimeout(() => {
        let x1 = 0;
        let y1 = underlineH1Rect.bottom;
        let x2 = 100;
        let y2 = underlineH1Rect.bottom + 3;
        document.documentElement.style.setProperty("--growing-polygon", `polygon(${x1}px ${y1}px,${x1}px ${y2}px,${x2}% ${y2}px,${x2}% ${y1}px)`);
    }, 100)
    setTimeout(() => {
        document.documentElement.style.setProperty("--growing-polygon", `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)`);
    }, 1100)
}