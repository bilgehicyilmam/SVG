const Ids = [];
const vectors = document.querySelector("#vectors");
const groups = Array.from(vectors.children);
for (let i = 0; i < groups.length; i++){
    const strokes = Array.from(groups[i].children)
    for (let j =0; j < strokes.length; j++){
        Ids.push(strokes[j].id)
    }
}

const forwardButton = document.getElementById("forward");
let index = 0;
let p = 0;
svg_indexes = [];
forwardButton.onclick = function () {
    if (index < Ids.length) {
        const myElement =  document.getElementById(Ids[index]);
        myElement.style.animationName = "forward";
        myElement.style.display = "block";
        myElement.style.animationDuration = "3s";
        svg_indexes.push(index)
        index++;
        p++;
        const bullet = document.getElementById("bullet" + p.toString())
        bullet.style.backgroundColor = "lightpink";
    }if (index===Ids.length){
        disableForwardButton();
    }
    enableBackButton();
    progress();
    text_visible();
}

const backwardButton = document.getElementById("backward");
backwardButton.onclick = function () {
    let myElement =  document.getElementById(Ids[index-1]);
    myElement.style.animationName = "backward"
    myElement.style.animationDuration = "1s";
    const bullet = document.getElementById("bullet" + p.toString())
    p--;
    bullet.style.backgroundColor = "white";
    if (index>0){
        index--;
    }if(index===0){
        disableBackButton();
    }
    svg_indexes.pop();
    enableForwardButton();
    progress();
    text_not_visible();
}

const refreshButton = document.getElementById("refresh");
refreshButton.onclick = function (){
    for(let i = svg_indexes.length-1; i >= 0; i--){
        const myElement =  document.getElementById(Ids[svg_indexes[i]]);
        myElement.style.display = "none";
        const bullet = document.getElementById("bullet" + index.toString());
        bullet.style.backgroundColor = "white";
        if(index>0){
            index--;
        }
    }
    svg_indexes = []
    enableForwardButton();
    progress();
    text_not_visible()
    p = 0;
}

var flag = false;
const replayButton = document.getElementById("replay");
replayButton.onclick = function () {
    if(progress()<15) {
        const myElement = document.getElementById(Ids[index - 1]);
        myElement.style.animationName = "replay";
        myElement.style.animationDuration = "1.5s";
        myElement.addEventListener('animationend', function () {
            myElement.style.animationName = "forward";
            backwardButton.addEventListener("click", function () {
                flag = true;
            })
            if (flag === true) {
                myElement.style.animationName = "backward";
            }
            forwardButton.addEventListener("click", function () {
                flag = false;
            })
            if (flag === false) {
                myElement.style.animationName = "forward";
            }
        });
    }
    progress();
}

function progress() {
    const p = Ids.length - index;
    return p;
}

function disableBackButton() {
    document.getElementById('backward').disabled = true;
}

function disableForwardButton() {
    document.getElementById('forward').disabled = true;
}

function enableForwardButton() {
    document.getElementById('forward').disabled = false;
}

function enableBackButton() {
    document.getElementById('backward').disabled = false;
}

const text1 = document.getElementById("text1")
const text2 = document.getElementById("text2")
const text3 = document.getElementById("text3")
const text4 = document.getElementById("text4")

function text_visible(){
    if(index===1){
        text1.style.display = "block";
    }
    if(index===4){
        text2.style.display = "block";
    }
    if(index===8){
        text3.style.display = "block";
    }
    if(index===12){
        text4.style.display = "block";
    }
}

function text_not_visible(){

    if(index===0){
        text1.style.display = "none";
        text2.style.display = "none";
        text3.style.display = "none";
        text4.style.display = "none";
    }
    if(index===3){
        text2.style.display = "none";
        text3.style.display = "none";
        text4.style.display = "none";
    }
    if(index===7){
        text3.style.display = "none";
        text4.style.display = "none";
    }
    if(index===11){
        text4.style.display = "none";
    }
}

function ToC(){

    for(let i=0; i<15; i++){
        const button_clicked = document.getElementById("index" + i.toString());
        let counter = 0;
        button_clicked.onclick = function () {

            counter ++;

            const myElement =  document.getElementById(Ids[Number(button_clicked.id.substring(5))]);
            if(counter<=1){
                myElement.style.animationName = "forward";
                myElement.style.display = "block";
                myElement.style.animationDuration = "3s";
                p++;
                const bullet = document.getElementById("bullet" + p.toString())
                bullet.style.backgroundColor = "lightpink";

                if(Number(button_clicked.id.substring(5))===0){
                    text1.style.display = "block";
                }
                if(Number(button_clicked.id.substring(5))===3){
                    text2.style.display = "block";
                }
                if(Number(button_clicked.id.substring(5))===7){
                    text3.style.display = "block";
                }
                if(Number(button_clicked.id.substring(5))===11){
                    text4.style.display = "block";
                }
            }

            if(counter>1 || svg_indexes.includes(Number(button_clicked.id.substring(5)))){
                myElement.style.animationName = "replay";
                myElement.style.animationDuration = "1.5s";
                myElement.addEventListener('animationend', function(){
                    myElement.style.animationName = "forward";
                    backwardButton.addEventListener("click", function () {
                        flag = true;
                    })
                    if(flag===true){
                        myElement.style.animationName = "backward";
                    }
                    forwardButton.addEventListener("click", function () {
                        flag = false;
                    })
                    if(flag===false){
                        myElement.style.animationName = "forward";
                    }
                });

            }
            if(svg_indexes.includes(Number(button_clicked.id.substring(5))) !== true){
                svg_indexes.push(Number(button_clicked.id.substring(5)));
            }

            index = svg_indexes[svg_indexes.length-1] + 1 ;

            forwardButton.onclick = function () {
                if (index < Ids.length) {
                    const myElement =  document.getElementById(Ids[index])
                    myElement.style.animationName = "forward";
                    myElement.style.display = "block";
                    myElement.style.animationDuration = "3s";
                    if(svg_indexes.indexOf(index)===-1){
                        svg_indexes.push(index)
                        index++;
                    }
                    p++;
                    const bullet = document.getElementById("bullet" + p.toString())
                    bullet.style.backgroundColor = "lightpink";

                }if (index===Ids.length){
                    disableForwardButton();
                }
                enableBackButton();
                progress();
                text_visible();
            }

            refreshButton.onclick = function (){

                for(i=0; i<svg_indexes.length; i++){
                    const myElement =  document.getElementById(Ids[svg_indexes[i]]);
                    myElement.style.display = "none";
                    const bullet = document.getElementById("bullet" + (i+1).toString())
                    bullet.style.backgroundColor = "white";
                }
                svg_indexes = []
                index = 0
                enableForwardButton();
                text_not_visible();
                p = 0;
            }

            backwardButton.onclick = function () {
                if(svg_indexes.length>0 && index!==0){
                    item = svg_indexes.pop();
                    index = svg_indexes[svg_indexes.length-1] + 1 ;
                    let myElement =  document.getElementById(Ids[item]);
                    myElement.style.animationName = "backward"
                    myElement.style.animationDuration = "1s";
                    const bullet = document.getElementById("bullet" + p.toString())
                    p--;
                    bullet.style.backgroundColor = "white";
                    if(svg_indexes.length===0){
                        index = 0;
                    }
                    enableForwardButton();
                    progress();
                    text_not_visible();
                }
            }

            replayButton.onclick = function () {
                if(progress()<15){
                    const myElement =  document.getElementById(Ids[index-1]);
                    myElement.style.animationName = "replay";
                    myElement.style.animationDuration = "1.5s";
                    myElement.addEventListener('animationend', function(){
                        myElement.style.animationName = "forward";
                        backwardButton.addEventListener("click", function () {
                            flag = true;
                        })
                        if(flag===true){
                            myElement.style.animationName = "backward";
                        }
                        forwardButton.addEventListener("click", function () {
                            flag = false;
                        })
                        if(flag===false){
                            myElement.style.animationName = "forward";
                        }
                    });
                }
            }
        }
    }
}

ToC();


