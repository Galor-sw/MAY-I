import TileMap from "./map2D.js";

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");
const tileSize = 32;

const tileMap = new TileMap(tileSize);

function run() {
    tileMap.draw(canvas, ctx);
}

setInterval(run, 1000 / 60);

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left.toFixed();
    let y = event.clientY - rect.top.toFixed();
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);
}


canvas.addEventListener("mousedown", function (e) {
    getMousePosition(canvas, e);
    console.log('test');
});

//////////////////////////////////

const scanner = new Html5QrcodeScanner('reader', {
    qrbox:
        {
            width: 200,
            height: 200,
        },
    fps: 20,
});

scanner.render(success, error);

function success(result) {
    document.getElementById('result').innerHTML = `<h2>success!</h2>
    <p><a href="${result}">${result}</a></p>`;

    scanner.clear();
    document.getElementById('reader').remove();
}

function error(err) {
    console.warn(err);
}

