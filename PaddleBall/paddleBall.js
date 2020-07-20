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
        this.x = w/2
        this.y = h*.95
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = `hsl(40,100%,49.8%)`
        ctx.fillRect(this.x - paddleWidth/2, this.y, paddleWidth, h*.02)
        ctx.stroke
    }

}

class Ball {
    constructor() {
        this.x = w/2
        this.y = h*.90
        this.dx = 0
        this.dy = 0
    }
    
    draw() {
        ctx.beginPath()
        ctx.fillStyle = `red`
        ctx.arc(this.x, this.y, 50, 0, Math.PI*2)
        // ctx.arc(this.x, this.y, 100, 0, 2*Math.PI)
        ctx.stroke
    }

    update() {
        // this.x += this.dx
        // this.y += this.dy

        // if (this.y+ballRadius > h || this.y-ballRadius < 0) {
        //     this.dy *= -1
        // }
    }
}

class Brick {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

const paddle = new Paddle()
const ball = new Ball()


function animate() {

    ctx.clearRect(0,0, w, h)

    paddle.draw()
    ball.draw()
    // ball.update()
    
    requestAnimationFrame(animate)
}

animate()




