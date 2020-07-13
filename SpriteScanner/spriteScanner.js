const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const w = canvas.width = 400
const h = canvas.height = 400
const ctx = canvas.getContext("2d");

const img = document.createElement("img")
img.src = './img/spaceShip.png'; 

let frameX = 0
let frameY = 0
const spriteD = 60

img.onload = function() {
    animate();
};

document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowRight") {
        frameX++
        console.log('yee')
    }
})
  
function animate() {
    // ctx.clearRect(0,0,w,h)
    ctx.drawImage(img, frameX*spriteD, frameY*spriteD, frameX*spriteD + spriteD, frameY*spriteD + spriteD, w*.35, h*.35, w/4, h/4)

    requestAnimationFrame(animate())
}
