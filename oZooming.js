
let flyingDotAnimationActive = false;

function beginFlyingDotAnimation() {
    flyingDotAnimationActive = true;
    const dots = document.querySelectorAll('.flying-dot');
    dots.forEach((dot) => {
        setTimeout(() => {
            playFlyingDotAnimation(dot)
        }, randomHundredIncrement(10))
    })
}
function playFlyingDotAnimation(dot) {
    if (!flyingDotAnimationActive) {
        return;
    }
    const radian = Math.random() * Math.PI * 2;
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
    
    setTimeout(()=>{playFlyingDotAnimation(dot)}, randomHundredIncrement(5) + 1100 );
    
}

function activateOZoomIn() {
    document.getElementById("home-container").dataset.status = "inactive";
    let iElement = document.querySelector("#zoom-circle svg");
    let iRect = iElement.getBoundingClientRect();
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let deltaX = centerX - iRect.x - iRect.width / 2;
    let deltaY = centerY - iRect.y - iRect.height / 2;
    let zoomSvgO = document.getElementById("zoom-svg-o");
    let zoomSvgODiameter = zoomSvgO.getBoundingClientRect().width;
    let scaleFactor = Math.max(window.innerHeight, window.innerWidth) * 1.5 / zoomSvgODiameter;
    console.log(scaleFactor);
    document.documentElement.style.setProperty("--div-x-offset", deltaX * scaleFactor + "px");
    document.documentElement.style.setProperty("--div-y-offset", deltaY * scaleFactor + "px");
    document.documentElement.style.setProperty("--o-zoom-factor", scaleFactor);
    const homeContainer = document.getElementById("home-container");
    homeContainer.dataset.zoomed = "true";
    setTimeout(beginFlyingDotAnimation, 100);
    setTimeout(beginZoomInArrival, 2000);
}

function beginZoomInArrival() {
    activateZoomedContent();
    activateMainDotArrival();
    activateBackgroundDotArrival();
    setTimeout(() => {
        flyingDotAnimationActive = false;
    }, 200)
    setTimeout(() => {
        activateMainDotDrift();
    }, 1100);
}

function activateZoomedContent() {
    document.getElementById("zoomed-content-container").dataset.status = "active";
    document.getElementById("home-container").dataset.status = "inactive";
}

function activateMainDotArrival() {
    setTimeout(() => {
        document.getElementById("zoomed-grid").dataset.status = "active";
    }, 100)
    
}

function activateMainDotDrift() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((gridItem) => {
        let easingFunction = "ease-in-out";
        let keyframe = [
            {transform: `translate(0,0)`, easing: easingFunction},
            {transform: `translate(${generatePercentFifty()}%, ${generatePercentFifty()}%)`, easing: easingFunction},
            {transform: `translate(${generatePercentFifty()}%, ${generatePercentFifty()}%)`, easing: easingFunction},
            {transform: `translate(${generatePercentFifty()}%, ${generatePercentFifty()}%)`, easing: easingFunction},
            {transform: `translate(0,0)`, easing: easingFunction}
        ]
        let timing = {
            duration: Math.random() * 10000 + 15000,
            iterations: Infinity
        }
        gridItem.animate(keyframe, timing)
    })
}

function activateBackgroundDotArrival() {
    const arrivingDots = document.querySelectorAll(".arriving-dot");
    arrivingDots.forEach(dot => {
        let scaleFactor = Math.random();            
        let startingX = Math.random()  * window.innerWidth - window.innerWidth /2;
        let startingY = Math.random() * window.innerHeight - window.innerHeight /2;
        dot.dataset.status = "active";
        setTimeout(() => {
            dot.style.transform = `translate(${startingX}px, ${startingY}px) scale(${scaleFactor})`
        }, 100)
        setTimeout(() => {
            let easingFunction = "ease-in-out"
            let keyframe = [
                {transform: `translate(${startingX}px, ${startingY}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${scaleBasedDelta(scaleFactor, startingX)}px, ${scaleBasedDelta(scaleFactor, startingY)}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${scaleBasedDelta(scaleFactor, startingX)}px, ${scaleBasedDelta(scaleFactor, startingY)}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${scaleBasedDelta(scaleFactor, startingX)}px, ${scaleBasedDelta(scaleFactor, startingY)}px) scale(${scaleFactor})`, easing: easingFunction},
                {transform: `translate(${startingX}px, ${startingY}px) scale(${scaleFactor})`, easing: easingFunction},
            ]
            let timing = {
                duration: Math.random() * 10000 + 15000,
                iterations: Infinity
            }
            dot.animate(keyframe, timing);
        }, 1100)
    })
}

function generatePercentFifty() {
    return Math.random() * 10 - 5;
}

function scaleBasedDelta(scaleFactor, startValue) {
    return Math.random() * 50 * Number(scaleFactor) + Number(startValue);
}

function randomHundredIncrement(incrementCount) {
    return Math.floor(Math.random() * 10) * 10 * incrementCount;
}