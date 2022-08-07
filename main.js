let startId = document.getElementById("start-id");
let containerId = document.getElementById("container-id");
let nextLevelId = document.querySelector(".next");
let nextButtonId = document.getElementById("next-id");

let isAllowToContinue = false;

let steps = [];
let level = 1;

let k = 0;

//starting game after clicking to start button
startId.onclick = function(){
    containerId.style.display = "grid";
    startId.style.display = "none";
    nextLevelId.style.display = "block";
    drawLevel(level);
}

//each time clicking to next button, starting a new level
 nextLevelId.onclick = function(){
    if(isAllowToContinue){
        k = 0;
        if(level < 6) level++;
        drawLevel(level);
    }
    let blocks = document.querySelectorAll(".block");
    for(let block of blocks){
        block.style.backgroundColor = "rgb(239, 241, 220)";
    }
}

//creating a grid, adding some attributes
function createGrid(){
    for(let i = 0; i < 12; i++){
        let item = document.createElement("div");
        item.setAttribute("data-id", i);
        item.setAttribute("class", "block");
        item.addEventListener("click", checkStep);
        containerId.appendChild(item);
    }
}


//drawing current level
function drawLevel(level){
    nextButtonId.setAttribute("class", "next-button");
    let set = new Set();

    while(set.size < level){
        set.add((Math.floor(Math.random() * 12) + 1));
    }

    steps = [...set];

    async function followTheColor() {

        for (let i = 0; i < steps.length; i++) {
            
            let blockNumber = await giveMeNumberAfterTwoSeconds(steps[i]);

            let block = document.querySelector(`.container :nth-child(${blockNumber})`);

            block.style.backgroundColor = "rgb(158, 255, 83)";

            setTimeout(() => {

                block.style.backgroundColor = "rgb(239, 241, 220)";

            }, 700);    
        }
    }

    async function giveMeNumberAfterTwoSeconds(i) {

        return new Promise((resolve) => {
            setTimeout(() => resolve(i), 2000);
        });
    }

    followTheColor();
}


function checkStep(){
    let current = this.getAttribute("data-id");
    current = Number(current) + 1;

    if(k === level) return;
    
    if(current === steps[k]){
        this.style.backgroundColor = "green";
        isAllowToContinue = true;
        k++;
    }else{
        this.style.backgroundColor = "red";
        level = 0;
        isAllowToContinue = false;
        alert("Game over !!!");
    }
    
    if(k === steps.length)   nextButtonId.setAttribute("class", "active")
}

createGrid();