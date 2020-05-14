const canvas = document.createElement('canvas')
const w = canvas.width = 800
const h = canvas.height = 600
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const ballRadius = w*.015/2
const paddleWidth = h*.12

const board = () => {
    ctx.beginPath()
    ctx.strokeStyle = "hsl(292.7,100%,49.8%)"
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
        ctx.fillStyle = "hsl(292.7,100%,49.8%)"
        ctx.fillRect(w*.03,this.y-(h*.06),w*.01, paddleWidth)
    }
}

class Ball {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.dx = -3
        this.dy = 0
        this.pastPositions = []
    }
    
    draw = () => {
        ctx.beginPath()
        ctx.fillStyle = `hsl(${this.x},100%,49.8%)`
        ctx.fillRect(this.x-ballRadius, this.y-ballRadius, w*.015, w*.015)
        ctx.stroke
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
    tail = () => {
        if (this.pastPositions.length <= 10) {
            this.pastPositions.push(
              {
                x: this.x-ballRadius/2,
                y: this.y-ballRadius/2
              }
            )
        } else {
            this.pastPositions.push(
              {
                x: this.x-ballRadius/2,
                y: this.y-ballRadius/2
              }
            )
            const endtail = this.pastPositions.shift()
            const midtail = this.pastPositions[3]

            ctx.beginPath()
            ctx.fillRect(midtail.x, midtail.y - .5, w*.008, w*.008)
            ctx.fillRect(endtail.x , endtail.y + .5, w*.005, w*.005)
        }
    }
}

class Computer {
    constructor(y) {
        this.y = y
    }

    draw = () => {
        ctx.beginPath()
        ctx.fillStyle = "hsl(292.7,100%,49.8%)"
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
    ball.tail()

    player.draw()

    computer.draw()
    computer.update()

    board()
    requestAnimationFrame(animate)
}

animate()