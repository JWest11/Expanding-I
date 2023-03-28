function activateIExpansion() {
    const iElement = document.getElementById("i-container");
    const iRect = iElement.getBoundingClientRect();
    var deltaX = iRect.x + iRect.width / 1.8;
    var deltaY = iRect.y + iRect.height / 4;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX -2 + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY -2 + "px");

    const expandedContentElement = document.getElementById("expanded-content");
    
    setTimeout(() => {
        expandedContentElement.dataset.delayedtransition = "true";
        expandedContentElement.dataset.visible = "true";
    })
    
}

function deactivateIExpansion() {
    const expandedContentElement = document.getElementById("expanded-content");
    setTimeout(() => {
        expandedContentElement.dataset.visible = "false";
    })
}

function peekIExpansion() {
    const expandedContentElement = document.getElementById("expanded-content");
    expandedContentElement.dataset.delayedtransition = "false";
    const iElement = document.getElementById("i-container");
    const iRect = iElement.getBoundingClientRect();
    var deltaX = iRect.x + iRect.width / 1.8;
    var deltaY = iRect.y + iRect.height / 4;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX -1 + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY -2 + "px");
    
    setTimeout(() => {
        expandedContentElement.dataset.delayedtransition = "fast";
        expandedContentElement.dataset.peek = "true";
    })
}

function unPeekIExpansion() {
    const expandedContentElement = document.getElementById("expanded-content");
    expandedContentElement.dataset.peek = "false";
}