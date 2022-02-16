'use strict'

var gElCanvas;
var gCtx;
var gChooseImg = 'img/2.jpg'
var gImg


function init() {
    renderCan()
    // gElCanvas = document.getElementById('my-canvas')
    // gCtx = gElCanvas.getContext('2d')
    // drawImgFromlocal();
}

function renderCan() {
    var el = document.querySelector('.main');
    el.innerHTML = `<canvas id="my-canvas" class="canvas-container" width="450" height="450"></canvas>`
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImgFromlocal();
}


function drawImgFromlocal() {
    gImg = new Image()
    gImg.src = gChooseImg;
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawText()
    }
}

function drawText(text = 'meme', x = 170, y = 50) {
    // gCtx.font = '50px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'black';
    gCtx.font = '40px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function renderImg(img = gImg) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText('kkjjd')
}
