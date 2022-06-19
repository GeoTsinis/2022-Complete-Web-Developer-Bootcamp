const header = document.querySelector('#header');
const colorButton = document.querySelector('#colorButton');
const body = document.querySelector("body");

function genColor() {
    let num1 = Math.floor(Math.random() * 255);
    let num2 = Math.floor(Math.random() * 255);
    let num3 = Math.floor(Math.random() * 255);
    let rgbBg = `rgb(${num1},${num2},${num3})`;

    body.style.backgroundColor = rgbBg;

    header.innerText = rgbBg;
    let sum = num1 + num2 + num3;
    if (sum < 165) {
        header.style.color = 'white';
    } else {
        header.style.color = 'black';
    }
}

colorButton.addEventListener('click',genColor);