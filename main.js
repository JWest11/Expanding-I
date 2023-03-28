function handleExpansion() {
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

function turnOff() {
    const expandedContentElement = document.getElementById("expanded-content");
    setTimeout(() => {
        expandedContentElement.dataset.visible = "false";
    })
}

function peek() {
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

function unpeek() {
    const expandedContentElement = document.getElementById("expanded-content");
    expandedContentElement.dataset.peek = "false";
}

let animationActive = true;
function beginAnimations() {
    animationActive = animationActive ? false : true;
    const dots = document.querySelectorAll('[data-dot="true"]');
    dots.forEach((dot) => {
        setTimeout(() => {
            playAnimation(dot)
        }, Math.random() * 1000)
    })
}
function playAnimation(dot) {
    if (!animationActive) {
        return;
    }
    const radian = Math.random() * 3.142 * 2;
    let deltaX = Math.cos(radian);
    let deltaY = Math.sin(radian);
    const dotKeyframe = [
        {transform: `translate(${deltaX * window.innerWidth}px, ${deltaY * window.innerHeight}px) scale(1)`}
    ]
    const timing = {
        duration: 1000,
        iterations: 1,
        easing: "cubic-bezier(.99,.03,.94,.6)"
    }
    dot.animate(dotKeyframe, timing);
    
    setTimeout(()=>{playAnimation(dot)}, Math.random() * 500 + 1000 );
    
}

function zoomIn() {
    var iElement = document.querySelector("#zoom-circle svg");
    var iRect = iElement.getBoundingClientRect();
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    var deltaX = centerX - iRect.x - iRect.width / 2;
    var deltaY = centerY - iRect.y - iRect.height / 2;
    document.documentElement.style.setProperty("--div-x-offset", deltaX * 150 + "px");
    document.documentElement.style.setProperty("--div-y-offset", deltaY * 150 + "px");
    const homeContainer = document.getElementById("home-container");
    homeContainer.dataset.zoomed = "true";

    animationActive = false;
    setTimeout(beginAnimations, 400);
    setTimeout(activateZoomedContent, 800);
    setTimeout(activateGrid, 1500);
    setTimeout(applyDotDriftAnimation, 4000);
}

function activateZoomedContent() {
    document.getElementById("zoomed-content-container").dataset.status = "active";
    document.getElementById("home-container").dataset.status = "inactive";
}

function activateGrid() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(gridItem => {
        let iRect = gridItem.getBoundingClientRect();
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        let deltaX = centerX - iRect.x - iRect.width / 2;
        let deltaY = centerY - iRect.y - iRect.height / 2;
        gridItem.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
        gridItem.style.transition = "transform 1000ms cubic-bezier(.99,.03,.94,.6)";
        setTimeout(()=> {
            gridItem.style.transform = "";
            animationActive = false;
        }, 1000)
        applyBackgroundDotDrift();
    })
}

function applyDotDriftAnimation() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((gridItem) => {
        let easingFunction = "ease-in-out";
        let keyframe = [
            {transform: `translate(0,0)`, easing: easingFunction},
            {transform: `translate(${generatePercent()}%, ${generatePercent()}%)`, easing: easingFunction},
            {transform: `translate(${generatePercent()}%, ${generatePercent()}%)`, easing: easingFunction},
            {transform: `translate(${generatePercent()}%, ${generatePercent()}%)`, easing: easingFunction},
            {transform: `translate(0,0)`, easing: easingFunction}
        ]
        let timing = {
            duration: Math.random() * 10000 + 15000,
            iterations: Infinity,
        }
        gridItem.animate(keyframe, timing)
    })
}

function generatePercent() {
    return Math.random() * 10 - 5;
}

function applyBackgroundDotDrift() {
    const arrivingDots = document.querySelectorAll(".arriving-dot");
    arrivingDots.forEach(dot => {
        
        
        setTimeout(() => {
            let scaleFactor = Math.random() * 2;            
            let startingX = Math.random()  * window.innerWidth - window.innerWidth /2;
            let startingY = Math.random() * window.innerHeight - window.innerHeight /2;
            dot.dataset.status = "active";
            setTimeout(() => {
                dot.style.transform = `translate(${startingX}px, ${startingY}px) scale(${scaleFactor})`
            }, 100)
            
            let easingFunction = "ease-in-out"

            let keyframe = [
                {transform: `translate(${startingX}px, ${startingY}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${scaleBasedPercent(scaleFactor, startingX)}px, ${scaleBasedPercent(scaleFactor, startingY)}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${scaleBasedPercent(scaleFactor, startingX)}px, ${scaleBasedPercent(scaleFactor, startingY)}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${scaleBasedPercent(scaleFactor, startingX)}px, ${scaleBasedPercent(scaleFactor, startingY)}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${startingX}px, ${startingY}px) scale(${scaleFactor})`, easing: easingFunction},
            ]
            let timing = {
                duration: Math.random() * 10000 + 15000,
                iterations: Infinity,
                delay: 1000
            }
            dot.animate(keyframe, timing);
        }, 1000)
    })
}

function scaleBasedPercent(scaleFactor, startValue) {
    return Math.random() * 50 * scaleFactor + startValue;
}