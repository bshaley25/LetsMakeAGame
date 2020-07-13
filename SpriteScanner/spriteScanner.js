const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const w = canvas.width = 400
const h = canvas.height = 400
const ctx = canvas.getContext("2d");

const img = document.createElement("img")
img.src = './img/spaceShip.png'
document.body.appendChild(img)

document.body.appendChild(img)

img.onload = function() {
    animate();
};

  
function animate() {
    ctx.drawImage(img, 0, 0, 60, 60, w*.35, h*.35, w/4, h/4)

    requestAnimationFrame(animate())
}