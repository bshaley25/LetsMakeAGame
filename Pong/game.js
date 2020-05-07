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

document.addEventListener('mousemove', (event) => {
    if ( event.y < h && event.y > 0)
    player.y = event.y

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
        this.dx = 1
        this.dy = 3
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

        if (this.x-ballRadius < w*.03 && this.x-ballRadius < w*.029) {
            if (this.y < player.y ) {

            }
        }
    }
}

const player = new Player(h/2)
const ball = new Ball(w/2,h/2)

function animate() {
    
    ctx.clearRect(0,0,w,h)

    ball.draw()
    ball.update()

    player.draw()

    board()
    requestAnimationFrame(animate)
}

animate()