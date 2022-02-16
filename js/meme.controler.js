'use strict'

var gElCanvas;
var gCtx;
var gChooseImg = 'img/2.jpg'
var gImg


// function init() {
//     renderCan()
//     // gElCanvas = document.getElementById('my-canvas')
//     // gCtx = gElCanvas.getContext('2d')
//     // drawImgFromlocal();
// }

function renderCan() {
    var el = document.querySelector('.main');
    el.innerHTML = `<canvas id="my-canvas" class="canvas-container" width="450" height="450"></canvas>`
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImgFromlocal();
}


function drawImgFromlocal() {
    var meme = getMeme()
    gImg = new Image()
    gImg.src = getImg(meme.selectedImgId);
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawText()
    }
}

function renderImg() {
    var meme = getMeme()
    var currMeme = meme.lines[0]
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(currMeme.txt, currMeme.pos.x, currMeme.pos.y)
}


function drawText(text = 'meme', y = 50) {
    var txt = gCtx.measureText(text);
    gCtx.lineWidth = 0.5;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = 'black';
    gCtx.font = '35px Impact';
    var x = ((gElCanvas.width - txt.width) / 2)
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function writeLine(el) {
    updateTxtModal(el.value)
    renderImg()
    // console.log(el);
}

function removeImput(el) {
    el.value = '';
}