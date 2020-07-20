const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const w = canvas.width = 800
const h = canvas.height = 800

const paddleWidth = w*.1

document.addEventListener('keydown', (event) => {

    console.log(event)

    if (event.key === 'ArrowRight') {
        paddle.x += 10
        console.log("butts")
    } else if (event.key === 'ArrowLeft') {
        paddle.x -= 10
    }

})

class Paddle {
    constructor() {
        this.y = h*.95
        this.x = w/2
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = `hsl(40,100%,49.8%)`
        ctx.fillRect(this.x - paddleWidth/2, this.y, paddleWidth, h*.02)
        ctx.stroke
    }


}

const paddle = new Paddle()


function animate() {

    ctx.clearRect(0,0, w, h)

    paddle.draw()
    
    requestAnimationFrame(animate)
}

animate()




