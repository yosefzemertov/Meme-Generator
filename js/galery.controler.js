'use strict'

function init() {
renderGalery()
}

function renderGalery() {
    var strHTML = '<div class="grid-container">'
    var imgs = getimgs()
    imgs.forEach(img => strHTML += `<img onClick="onImgSelect(this)" class="${img.id}" src="${img.url}">`)
    strHTML += '</div>'
    document.querySelector('.main').innerHTML = strHTML
}

function onImgSelect(el) {
    setChoosimg(+el.classList.value)
    renderCan();
}


