const canvas = document.createElement('canvas')
const w = canvas.width = 800
const h = canvas.height = 600
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const ballRadius = w*.015/2
const paddleWidth = h*.12

const board = () => {
    ctx.beginPath()
    ctx.arc(w/2,h/2,h/20,0,2*Math.PI)
    ctx.moveTo(w/2,0)
    ctx.lineTo(w/2,h)
    ctx.stroke()
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        player.y -= 4
    } else if (event.key === 'ArrowDown') {
        player.y += 4
    }
})

class Player {
    constructor(y) {
        this.y = y
    }

    draw = () => {
        ctx.beginPath()
        ctx.fillRect(w*.03,this.y-(h*.06),w*.01, paddleWidth)
    }
}

class Ball {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.dx = -3
        this.dy = 0
    }
    
    draw = () => {
        ctx.beginPath()
        ctx.fillRect(this.x-ballRadius, this.y-ballRadius, w*.015, w*.015)
    }

    update = () => {
        this.x += this.dx
        this.y += this.dy

        if (this.y+ballRadius > h || this.y-ballRadius < 0) {
            this.dy *= -1
        }

        if (this.x-ballRadius < w*.035) {

            if ( Math.abs(this.y - player.y) < paddleWidth/2 + ballRadius) {
                this.dx *= -1
                this.dy = (this.y - player.y)/10
            }
        } else if (this.x+ballRadius > w*.96) {

            if ( Math.abs(this.y - computer.y) < paddleWidth/2 + ballRadius) {
                this.dx *= -1
                this.dy = (this.y - computer.y)/10
            }
        }

        if (this.x < 0 || this.x > w) {
            this.x = w/2
            this.dx *= -1
        }
    }
}

class Computer {
    constructor(y) {
        this.y = y
    }

    draw = () => {
        ctx.beginPath()
        ctx.fillRect(w*.96,this.y-(h*.06),w*.01, paddleWidth)
    }

    update = () => {
        if (this.y > ball.y && this.y - paddleWidth/2 > 0) {
            this.y -= 3
        } else if(this.y < ball.y) {
            this.y += 3
        }
    } 
}

const player = new Player(h/2)
const ball = new Ball(w/2,h/2)
const computer = new Computer(h/2)

function animate() {
    
    ctx.clearRect(0,0,w,h)

    ball.draw()
    ball.update()

    player.draw()

    computer.draw()
    computer.update()

    board()
    requestAnimationFrame(animate)
}

animate()