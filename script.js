const body = document.querySelector('body');
const hexInp = document.getElementById('hex-input');
const hexCopy = document.getElementById('hex-copy');
const rgbInp = document.getElementById('rgb-input');
const rgbCopy = document.getElementById('rgb-copy');


window.onload=()=>{
    hexInp.value = "";
    rgbInp.value = "";
}

function valid(element) {
    element.style.color = "#202040";
}

function invalid(element, otherElement) {
    element.style.color = "#f04624";
    otherElement.value = "";
}

function toRgb() {
    let hexCode = hexInp.value;
    let rgbArr = [];
    if(/^#?[A-Fa-f0-9]{6}$/.test(hexCode)){
        valid(hexInp);
        hexCode = hexCode.split("#")[1] || hexCode;
        // console.log(hexCode)
        for(let i=0; i<hexCode.length;i+=2){
            rgbArr.push(parseInt(hexCode[i] + hexCode[i+1], 16));
            console.log(rgbArr)
        }
        rgbInp.value = "rgb(" + rgbArr + ")";
        body.style.background = "rgb(" + rgbArr + ")";
    }
    else {
        invalid(hexInp, rgbInp)
    }
}

function toHex() {
    let rgbCode = rgbInp.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbregex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/;
    let hex = "#";
    if(rgbRegex1.test(rgbCode) || rgbregex2.test(rgbCode)) {
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if(condition) {
            valid(rgbInp);
            rgbCode.forEach(value => {
                value = parseInt(value).toString(16);
                hex += value.length == 1? "0"+value : value;
            });
            hexInp.value = hex;
            document.body.style.backgroundColor = hex;
        }
        else {
            invalid(rgbInp, hexInp);
        }
    }
    else {
        invalid(rgbInp, hexInp);
    }
}

hexCopy.addEventListener('click', () => {
    var copyText = hexInp;
    var hex1 = hexInp.value;
    copyText.select()
    copyText.setSelectionRange(0, 9999)
    document.execCommand('copy')
    hexCopy.classList.remove("ri-file-copy-line")
    hexCopy.classList.add("ri-file-copy-fill")
    hexInp.value = "Copied!"
    setTimeout(() => hexCopy.classList.remove("ri-file-copy-fill"), 1000)
    setTimeout(() => hexCopy.classList.add("ri-file-copy-line"), 1000)
    setTimeout(() => hexInp.value = hex1, 1000)
})

rgbCopy.addEventListener('click', () => {
    var copyText = rgbInp;
    var rgb1 = rgbInp.value;
    copyText.select()
    copyText.setSelectionRange(0, 9999)
    document.execCommand('copy')
    rgbCopy.classList.remove("ri-file-copy-line")
    rgbCopy.classList.add("ri-file-copy-fill")
    rgbInp.value = "Copied!"
    setTimeout(() => rgbCopy.classList.remove("ri-file-copy-fill"), 1000)
    setTimeout(() => rgbCopy.classList.add("ri-file-copy-line"), 1000)
    setTimeout(() => rgbInp.value = rgb1, 1000)
})

// var copyText = document.getElementById('password')
//     copyText.select()
//     copyText.setSelectionRange(0, 9999)
//     document.execCommand('copy')


// const content = document.querySelector('.box-title').textContent;
//     navigator.clipboard.writeText(content);
//     boxTitle.innerHTML = "Copied!"
//     setTimeout(() => boxTitle.innerHTML = content, 1000)