const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const w = canvas.width = 800
const h = canvas.height = 800


const paddleWidth = w*.1

const ballRadius = 8

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
        this.x = paddle.x
        this.y = paddle.y - ballRadius
        this.dx = -5
        this.dy = -5
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `hsl(40,100%,49.8%)`;
        ctx.fill();
        ctx.stroke
    }

    update() {
        this.x += this.dx
        this.y += this.dy

        if (this.x+ballRadius > w || this.x-ballRadius < 0) {
            this.dx *= -1
        }
        if (this.y-ballRadius < 0) {
            this.dy *= -1
        }
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
    ball.update()
    
    requestAnimationFrame(animate)
}

animate()



