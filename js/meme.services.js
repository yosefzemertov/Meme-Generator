'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keyWord: ['funny', 'face'] },
    { id: 2, url: 'img/2.jpg', keyWord: ['animals', 'dog'] },
    { id: 3, url: 'img/3.jpg', keyWord: ['animals', 'dog', 'baby'] }
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
            color: 'red',
            pos: { x: 10, y: 50 }
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

function createLine() {
    var pos;
    if (gMeme.lineNum === 0) {
        pos = { x: 10, y: 50 }
    } else if (gMeme.lineNum === 1) {
        pos = { x: 10, y: 400 }
    } else pos = { x: 10, y: 200 }
    var line = {
        txt: '',
        size: 35,
        align: 'left',
        color: 'red',
        pos: pos
    }
    gMeme.lines.push(line)
}

function removeLine() {
    gMeme.lineNum--
    if (gMeme.lineNum < 0) {
        gMeme.lineNum = 0
        return;
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
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

function isWordClicked(clickedPos) {
    var txt = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt);
    var memeIdx = gMeme.lines.findIndex(meme => {
        return (Math.abs(meme.pos.y - clickedPos.y) <= meme.size && Math.abs(meme.pos.x - clickedPos.x) <= txt.width)
    })
    if (memeIdx < 0) return
    gMeme.selectedLineIdx = memeIdx
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