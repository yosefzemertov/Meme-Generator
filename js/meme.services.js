'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keyWord: ['funny', 'face'] },
    { id: 2, url: 'img/2.jpg', keyWord: ['animals', 'dog'] },
    { id: 3, url: 'img/3.jpg', keyWord: ['animals', 'dog', 'baby'] }
];

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'meme',
            size: 20,
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
    gMeme.selectedLineIdx ++
    createLine();
}

function createLine() {
    var pos;
    if(gMeme.selectedLineIdx === 0) {
    pos = {x:10,y:50}
    } else if(gMeme.selectedLineIdx === 1){
        pos = {x:10,y:400}
    } else pos = {x:10,y:200}
    var line = {
        txt: '',
            size: 20,
            align: 'left',
            color: 'red',
            pos: pos
    }
    gMeme.lines.push(line)
}

function resetModal() {
    gMeme.selectedLineIdx = 0;
    gMeme.lines.splice(0);
    createLine();
}

function setMemePos(x, y){
    gMeme.lines[gMeme.selectedLineIdx].pos.x += x 
    gMeme.lines[gMeme.selectedLineIdx].pos.y += y 
}

function getimgs() {
    return gImgs;
}

function setChoosimg(id) {
    gMeme.selectedImgId = id
}

function isWordClicked(clickedPos) {
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    var distance = pos.y - clickedPos.y
    if(distance < 0){
        distance *=  (-1)
    } 
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}