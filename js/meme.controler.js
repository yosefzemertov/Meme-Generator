'use strict'

var gElCanvas;
var gCtx;
var gChooseImg = 'img/2.jpg'
var gImg
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gWordIsDrag;


// function init() {
//     renderCan()
//     // gElCanvas = document.getElementById('my-canvas')
//     // gCtx = gElCanvas.getContext('2d')
//     // drawImgFromlocal();
// }

function renderCan() {
    var el = document.querySelector('.main');
    
    el.innerHTML = `<div class="main-container flex"><canvas id="my-canvas" 
    class="canvas-container" width="500" height="450"></canvas><div class="controler">
    <input type="text" name="mems-txt" oninput="writeLine(this)" onfocusout=" removeImput(this)">
    <img class="add-btn" onclick="onAddLine()" src="ICONS/add.png"></div></div>
    `
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImgFromlocal();
    addListeners()
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
    drawText(currMeme.txt,currMeme.pos.x ,currMeme.pos.y)
    // console.log(currMeme.txt);
    // console.log(currMeme.pos.y);
}


function drawText(text = 'meme',x, y) {
    // var meme = getMeme()
    // var y = meme.lines[0].pos.y
    var txt = gCtx.measureText(text);
    gCtx.lineWidth = 0.5;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = 'black';
    gCtx.font = '35px Impact';
    // var x = ((gElCanvas.width - txt.width) / 2)
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function writeLine(el) {
    updateTxtModal(el.value)
    renderImg()
}

function removeImput(el) {
    el.value = '';
}






function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(isWordClicked(pos));
    if (!isWordClicked(pos)) return
    gWordIsDrag = true
    console.log(gWordIsDrag)
    // setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    // const meme = getMeme();
    ;
    if (gWordIsDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        setMemePos(dx,dy)
        // drawText(meme.lines[0].txt , dy)
        gStartPos = pos
        renderImg()
    }
}

function onUp() {
    console.log('onUp()');
    gWordIsDrag = false
    // setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
