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
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red',
            pos:{}
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
    gMeme.lines[0].txt = text;
}

function getimgs(){
    return gImgs;
}

function setChoosimg(id) {
    gMeme.selectedImgId = id
}