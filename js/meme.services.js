'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keyWord: ['funny', 'face'] },
    { id: 2, url: 'img/2.jpg', keyWord: ['animals', 'dog'] },
    { id: 3, url: 'img/3.jpg', keyWord: ['animals', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keyWord: ['animals', 'cat'] },
    { id: 5, url: 'img/5.jpg', keyWord: ['baby', 'funny'] },
    { id: 6, url: 'img/6.jpg', keyWord: ['face', 'funny'] },
    { id: 7, url: 'img/7.jpg', keyWord: ['baby', 'funny'] },
    { id: 8, url: 'img/8.jpg', keyWord: ['face', 'funny', 'movie'] },
    { id: 9, url: 'img/9.jpg', keyWord: ['face', 'funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keyWord: ['face', 'politic', 'funny'] },
    { id: 11, url: 'img/11.jpg', keyWord: ['sport'] },
    { id: 13, url: 'img/13.jpg', keyWord: ['face', 'movie'] },
    { id: 14, url: 'img/14.jpg', keyWord: ['face', 'movie'] },
    { id: 15, url: 'img/15.jpg', keyWord: ['face', 'movie'] },
    { id: 16, url: 'img/16.jpg', keyWord: ['face', 'movie', 'funny'] },
    { id: 17, url: 'img/17.jpg', keyWord: ['face', 'politic'] },
    { id: 18, url: 'img/18.jpg', keyWord: ['funny', 'cartoon', 'movie'] },

];

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lineNum: 0,
    lines: [
        {
            txt: 'meme',
            size: 35,
            align: 'left',
            color: 'black',
            pos: { x: 10, y: 50 },
            font: 'Impact',
            strokeColor: 'white'
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getImg(id) {
    var img = gImgs.find(img => img.id === id)
    return img.url;
}

function updateTxtModal(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function setMeme() {
    gMeme.lineNum++
    gMeme.selectedLineIdx = gMeme.lineNum
    createLine();
}

function ChangeTxtSiz(bolli) {
    if (bolli) {
        gMeme.lines[gMeme.selectedLineIdx].size += 2
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size -= 2
    }
}

function createLine(txt='',pos=null) {
    if(!pos) {
        var pos;
        if (gMeme.lineNum === 0) {
            pos = { x: 10, y: 50 }
        } else if (gMeme.lineNum === 1) {
            pos = { x: 10, y: 400 }
        } else pos = { x: 10, y: 200 }
    }
    var line = {
        font: 'Impact',
        txt,
        size: 35,
        align: 'left',
        color: 'black',
        pos,
        strokeColor: 'white'
    }
    gMeme.lines.push(line)
}

function removeLine() {
    gMeme.lineNum--
    if (gMeme.lineNum < 0) {
        gMeme.lineNum = 0
    }
    if (gMeme.lines.length == 1) {
        gMeme.lines = [];
    } else {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    }
    gMeme.selectedLineIdx = null;
}


function resetModal() {
    gMeme.lineNum = 0
    gMeme.selectedLineIdx = 0;
    gMeme.lines.splice(0);
    createLine();
}

function setMemePos(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += x
    gMeme.lines[gMeme.selectedLineIdx].pos.y += y
}

function getimgs() {
    return gImgs;
}

function chengeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function chengeFontColor(color) {
    console.log(color);
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setChoosimg(id) {
    gMeme.selectedImgId = id
}

function setAligntxt(side, centerX, rightX) {
    switch (side) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 5
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = centerX
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = rightX
            break;
    }
}

function addSticker(sticker) {
    var pos = {x:200,y:200}
    createLine(sticker,pos)
}

function ChengSelectedLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lineNum) gMeme.selectedLineIdx = 0;
}

function setFontLine(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function isWordClicked(clickedPos) {
    // var txt = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt);
    var memeIdx = gMeme.lines.findIndex(meme => {
        var txt = gCtx.measureText(meme.txt);
        return (Math.abs(meme.pos.y - clickedPos.y) <= meme.size && Math.abs(meme.pos.x - clickedPos.x) <= txt.width)
    })

    if (memeIdx < 0) {
        gMeme.selectedLineIdx = null
        return false;
    }
    gMeme.selectedLineIdx = memeIdx
    setInputLine(gMeme.lines[gMeme.selectedLineIdx].txt)
    return true;

    // const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    // var distanceY = pos.y - clickedPos.y
    // var distanceX = pos.x - clickedPos.x
    // // if(distance < 0){
    // //     distance *=  (-1)
    // // } 
    // var txt = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt);
    // return (Math.abs(distanceY) <= gMeme.lines[gMeme.selectedLineIdx].size && Math.abs(distanceX) <= txt.width)
}