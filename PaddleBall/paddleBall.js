const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const w = canvas.width = 800
const h = canvas.height = 800


const paddleWidth = w*.1
const paddleHeight = h*.02
const paddleTolerance = 10

const ballRadius = 8


document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowRight') {
        paddle.x += 10
    } else if (event.key === 'ArrowLeft') {
        paddle.x -= 10
    }
    if (event.key === " ") {  //Space Bar
        if(ball.dx === 0 && ball.dy === 0) {
            ball.dy += 3
        }
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
        ctx.stroke()
    }

}

class Ball {
    constructor() {
        this.x = paddle.x
        this.y = paddle.y - ballRadius
        this.dx = 0
        this.dy = 0
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `hsl(40,100%,49.8%)`;
        ctx.fill();
        ctx.stroke()
    }

    update() {

        if(this.dx === 0 && this.dy === 0) {
            this.x = paddle.x
            this.y = paddle.y - ballRadius
        }
        if (this.y > h) {
            this.x = paddle.x
            this.y = paddle.y - ballRadius
            this.dx = 0
            this.dy = 0
        }

        this.x += this.dx
        this.y += this.dy

        if (this.x+ballRadius > w || this.x-ballRadius < 0) {
            this.dx *= -1
        }

        if (this.y-ballRadius < 0) {
            this.dy *= -1
        }

        
        if (this.y > paddle.y - ballRadius  && this.y < paddle.y + paddleTolerance - ballRadius) {
            if (this.x + ballRadius > paddle.x - paddleWidth/2 && this.x - ballRadius < paddle.x + paddleWidth/2) {

                this.dy *= -1
                this.dx = (this.x - paddle.x) / 9
                this.dy -= 0.2
                
            }
        }
    }
}

class Brick {
    constructor(x,y) {
        this.x = x*paddleWidth
        this.y = y*paddleHeight
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = `hsl(50,100%,49.8%)`
        ctx.fillRect(this.x, this.y, paddleWidth, paddleHeight)
        ctx.stroke()
    }
    
}


const paddle = new Paddle()
const ball = new Ball()
const bricks = []

const createRandomBricks = (numberOfBricks) => {

    for(let i=0;i<numberOfBricks;i++) {
        const x = Math.floor(Math.random()*10)
        const y = Math.floor(Math.random()*10) + 4

        console.log()

        bricks.push(new Brick(x,y))
    }
}

createRandomBricks(25)



function animate() {

    ctx.clearRect(0,0, w, h)

    paddle.draw()
    ball.draw()
    ball.update()
    
    bricks.forEach(brick => brick.draw())
    
    requestAnimationFrame(animate)
}

animate()




