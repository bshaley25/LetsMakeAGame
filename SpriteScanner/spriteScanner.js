const canvas = document.createElement('canvas')
const w = canvas.width = 400
const h = canvas.height = 400
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

// const spriteSheet = new Image()
// spriteSheet.src = './img/spaceShip.png'
// document.body.appendChild(spriteSheet)

ctx.arc(0,0,50,0, 2*Math.PI)


// function animate() {
//     ctx.beginPath()
//     ctx.lineTo(50,50)
//     ctx.stroke

//     requestAnimationFrame(animate)
// }

// animate()