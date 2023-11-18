const width = 600;
const height = 600;
const host = document.querySelector('#scene');
let scale = 0.001;
let color = '#7414FE';

function setup() {
    createCanvas(width, height, host);
    pixelDensity(1);
    loadPixels();
    // noLoop();
}

function draw() {
    setBackground();
}

function setBackground() {
    const rgb = hex2RGB(color);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const brightness = 255 * noise(x * scale, y * scale);
            pixels[index] = rgb[0];
            pixels[index + 1] = rgb[1];
            pixels[index + 2] = rgb[2];
            pixels[index + 3] = brightness;
        }
    }
    updatePixels();
}

function hex2RGB (hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

const scaleInput = document.querySelector('#scale');
const scaleSpan = document.querySelector('#scale + span');
scaleInput.addEventListener('input', event => {
    const currentVel = event.target.value;
    scaleSpan.innerHTML = currentVel;
    scale = Number(currentVel);
});

const colorInput = document.querySelector('#color');
const colorSpan = document.querySelector('#color + span');
colorInput.addEventListener('input', event => {
    const currentColor = event.target.value;
    colorSpan.innerHTML = currentColor;
    color = currentColor;
})
