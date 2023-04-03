let ihovered = false;

function activateIExpansion() {
    const iElement = document.getElementById("expanding-i");
    const iRect = iElement.getBoundingClientRect();
    let deltaX = iRect.x + iRect.width / 1.8;
    let deltaY = iRect.y + iRect.height / 4;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY + "px");

    const expandedContentElement = document.getElementById("expanded-content");
    
    setTimeout(() => {
        expandedContentElement.dataset.delayedtransition = "true";
        expandedContentElement.dataset.visible = "true";
    }, 100)
    
}

function deactivateIExpansion() {
    const expandedContentElement = document.getElementById("expanded-content");
    setTimeout(() => {
        expandedContentElement.dataset.visible = "false";
    }, 100)
}

function peekIExpansion() {
    ihovered = true;
    const expandedContentElement = document.getElementById("expanded-content");
    expandedContentElement.dataset.delayedtransition = "false";
    const iElement = document.getElementById("expanding-i");
    const iRect = iElement.getBoundingClientRect();
    let deltaX = iRect.x + iRect.width / 2;
    let deltaY = iRect.y + iRect.height / 8;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY + "px");
    
    setTimeout(() => {
        if (!ihovered) {return}
        expandedContentElement.dataset.delayedtransition = "fast";
        expandedContentElement.dataset.peek = "true";
    }, 100)
}

function unPeekIExpansion() {
    ihovered = false;
    const expandedContentElement = document.getElementById("expanded-content");
    expandedContentElement.dataset.peek = "false";
}