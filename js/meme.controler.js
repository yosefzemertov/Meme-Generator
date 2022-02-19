'use strict'

var gElCanvas;
var gCtx;
var gChooseImg = 'img/2.jpg'
var gImg
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gWordIsDrag;
var isPhaseDesign = true;


// function init() {
//     renderCan()
//     // gElCanvas = document.getElementById('my-canvas')
//     // gCtx = gElCanvas.getContext('2d')
//     // drawImgFromlocal();
// }                                         <input type="text" name="mems-txt" oninput="writeLine(this)" onfocusout="this.value=''">
// {/* <textarea name="mems-txt" oninput="writeLine(this)" onfocusout="this.value='' cols="30" rows="10"></textarea> */}    removeImput(this)
function renderCan() {
    var el = document.querySelector('.main');

    el.innerHTML = `<div class="main-container flex"><canvas id="my-canvas" 
    class="canvas-container" width="500" height="500"></canvas><div class="controler">
    <input class="input" type="text" name="mems-txt" oninput="writeLine(this)" onfocusout="this.value=''">
    <img class="add-btn" onclick="onAddLine()" src="ICONS/add.png">
    <img class="trash" onclick="onRemoveLine()" src="ICONS/trash.png">
    <img class="increase" onclick="onChangeTxtSiz(true)" src="ICONS/increase-font.png" >
    <img class="decrease" onclick="onChangeTxtSiz(false)" src="ICONS/decrease-font .png">
    <img class="align-left" onclick="onAlignTxt('left')" src="ICONS/align-to-left.png">
    <img class="align-center" onclick="onAlignTxt('center')" src="ICONS/center-text-alignment.png">
    <img class="align-right" onclick="onAlignTxt('right')" src="ICONS/align-to-right.png">
    <img class="up-down" onclick="onChengSelectedLineIdx()" src="ICONS/up-down.png">
    <select onchange="onSetFont(this.value)" id="font">
        <option value="Impact">Impact</option>
        <option value="Franklin Gothic Medium">Franklin</option>
        <option value="fantasy">fantasy</option>
    </select>
    <button class="stroke-color">
          <input class="color" type="color" onchange="onchengeStrokeColor(this.value)">
          <img  src="ICONS/text-stroke.png">
      </button>
    <button class="font-color">
          <input class="color" type="color" onchange="onchengeFontColor(this.value)">
          <img  src="ICONS/paint-color.png">
      </button>
      <button class="downloud-btn">
      <a href="#" class="downloud" onclick="onDownloadmeme(this)">Download meme</a>
  </button>
      <button onclick="uploadImg(this,event)" class="share-btn">share</button>
    </div></div>
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
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
    meme.lines.forEach(line => {
        drawText(line.txt, line.pos.x, line.pos.y, line.size, line.font, line.strokeColor, line.color)
    });
    if (isPhaseDesign) {
        if (meme.selectedLineIdx === null) return;
        var chooseLine = meme.lines[meme.selectedLineIdx];
        var txt = gCtx.measureText(chooseLine.txt);
        var startX = (chooseLine.pos.x) - 5;
        var x = (txt.width) + 10;
        var startY = (chooseLine.pos.y) + 10;
        var y = -(chooseLine.size) - 10
        drawRect(startX, startY, x, y)
    }
}

function onGalleryPage() {
    resetModal()
    init()
}

function drawText(text, x, y, size, font, strokeColor, color) {
    // var txt = gCtx.measureText(text);
    gCtx.lineWidth = 0.9;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px ${font}`;
    // var x = ((gElCanvas.width - txt.width) / 2)
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function writeLine(el) {
    updateTxtModal(el.value)
    renderImg()
}

function onRemoveLine() {
    removeLine()
    renderImg()
}

function onChangeTxtSiz(bolli) {
    ChangeTxtSiz(bolli)
    renderImg();
}

function onAddLine() {
    setMeme();
}

function drawRect(startX, startY, x, y) {
    gCtx.beginPath();
    gCtx.rect(startX, startY, x, y);
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onAlignTxt(side) {
    var meme = getMeme()
    var txt = gCtx.measureText(meme.lines[meme.selectedLineIdx].txt);
    var centerX = ((gElCanvas.width - txt.width) / 2);
    var rightX = (gElCanvas.width - txt.width);
    setAligntxt(side, centerX, rightX);
    renderImg();
}

function onSetFont(font) {
    setFontLine(font);
    renderImg();
}

function onChengSelectedLineIdx() {
    ChengSelectedLineIdx();
    renderImg();
}

function onchengeStrokeColor(value) {
    chengeStrokeColor(value);
    renderImg();
}

function onchengeFontColor(value) {
    chengeFontColor(value);
    renderImg();
}

function onDownloadmeme(elLink) {
    isPhaseDesign = false;
    renderImg();
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'meme';
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
    // console.log(isWordClicked(pos));
    if (!isWordClicked(pos)) {
        renderImg()
        return
    }
    gWordIsDrag = true
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
        setMemePos(dx, dy)
        // drawText(meme.lines[0].txt , dy)
        gStartPos = pos
        renderImg()
    }
}

function onUp() {
    gWordIsDrag = false
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

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
        
    }
    
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then((url)=>{
        console.log('Got back live url:', url);
        onSuccess(url)
    })
    .catch(err => {
        console.error(err)
    })
}