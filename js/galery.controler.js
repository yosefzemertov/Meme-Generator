'use strict'

function init() {
    renderStraccher()
    renderGalery()
}

function renderStraccher() {
    var strHTML = '<input type="text" name="filter" oninput="filterGallery(this)"> <div class="grid-container"></div>'
    document.querySelector('.main').innerHTML = strHTML
}

function renderGalery() {
    var imgs = getimgs()
    var strHTML;
    imgs.forEach(img => strHTML += `<img onClick="onImgSelect(this)" class="${img.id}" src="${img.url}">`)
    document.querySelector('.grid-container').innerHTML = strHTML;


}

function renderFilterGalery(word) {
    var imgs = getimgs()
    var strHTML;
    var image = imgs.filter(img => {
        if (img.keyWord.join('').includes(word)) return img
    })
    image.forEach(img => strHTML += `<img onClick="onImgSelect(this)" class="${img.id}" src="${img.url}">`)
    document.querySelector('.grid-container').innerHTML = strHTML;
console.log(image);
}

function onImgSelect(el) {
    setChoosimg(+el.classList.value)
    renderCan();
}

function filterGallery(elFilter) {
    renderFilterGalery(elFilter.value);
}


