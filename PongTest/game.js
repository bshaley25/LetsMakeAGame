const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

canvas.width = 500
canvas.height = 400

const ctx = canvas.getContext('2d')

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowUp' && user.Ycenter > 32) {
        user.Ycenter -= 5
    } else if(event.key === 'ArrowDown' && (user.Ycenter + 32) < canvas.height) {
        user.Ycenter += 5
    }
})


class UserPaddle {
    constructor() {
        this.y = canvas.height/2
        this.Ycenter = this.y + 32
        this.score = 0
    }

    draw = () => {
        ctx.beginPath()
        ctx.rect(20,this.Ycenter - 32 ,8,64)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.stroke()
    }

}

class Ball {

    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.dx = 2
        this.dy = -.5
    }

    draw = () => {
        ctx.beginPath()
        ctx.rect(this.x,this.y,8,8)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.stroke()
    }

    update = () => {
        this.x += this.dx 
        this.y += this.dy

        if( this.x < 30 ) {       ///// BALL HITS USER PADDLE /////
            if (this.y < user.Ycenter + 38 && this.y > user.Ycenter - 38 ) {
                this.dx = -this.dx + 0.2
                this.dy = (this.y - user.Ycenter) / 12
            }
            
        } else if( this.x > 472 ) {      

            if (this.y < computer.Ycenter + 38 && this.y > computer.Ycenter - 32 ) {   ///// BALL HITS COMPUTER PADDLE /////
                this.dx = -this.dx - 0.2
                this.dy = (this.y - computer.Ycenter) / 6
            }

        } 
        
        if (this.x < 0) {
            
            computer.score++
            ball.x = canvas.width/2
            ball.y = canvas.height/2 
            this.dx = 2
            this.dy = 0
            
        } else if (this.x > canvas.width ) {
            
            user.score++
            ball.x = canvas.width/2
            ball.y = canvas.height/2 
            this.dx = 2
            this.dy = 0
            
        }

        if ( this.y > (canvas.height - 8 ) || this.y < 0 ) {
            this.dy *= -1
        }

    }
}

class ComputerPaddle {

    constructor() {
        this.y = canvas.height/2
        this.Ycenter = canvas.height/2
        this.dy = 0
        this.score = 0
    }

    draw = () => {
        ctx.beginPath()
        ctx.rect(480, this.Ycenter - 32 ,8,64)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.stroke()
    }

    update = () => {
        this.Ycenter += this.dy

        if (this.Ycenter < ball.y && this.Ycenter + 32 < canvas.height ) {
            this.dy = 1*(1 + user.score/2)
        } else if (this.Ycenter > ball.y && this.Ycenter - 32 > 0) {
            this.dy = -1*(1 + user.score/2)
        } else {
            this.dy = 0 
        }

        
    }
}

const user = new UserPaddle
const ball = new Ball
const computer = new ComputerPaddle

const board = () => {

    ctx.font = '48px serif';
    ctx.fillText(`${user.score}`, 20, 50);
    ctx.fillText(`${computer.score}`, 460, 50);

    ctx.beginPath()
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(canvas.width/2, canvas.height/2,25,0,2*Math.PI)
    ctx.stroke()
}


function animate() {

    ctx.clearRect(0,0, canvas.width, canvas.height)

    board()

    user.draw()
    computer.draw()
    computer.update()
    ball.draw()
    ball.update()

    requestAnimationFrame(animate)
}


animate()