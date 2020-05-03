const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = window.innerWidth - 500
canvas.height = window.innerHeight - 300
const ctx = canvas.getContext('2d')

class Circle {
    constructor(x,y,r,dx,dy) {
        this.x = x
        this.y = y
        this.r = r
        this.dx = dx
        this.dy = dy
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.stroke()
    }
    update() {
        this.x += this.dx
        this.y += this.dy

        console.log(this.x,this.y)

        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy *= -1
        }
        if (this.x + this.r > canvas.width || this.x - this.r < 0 ) {
            this.dx *= -1
        }

        if( Math.abs(this.x - mouse.x) < (this.r * .9)  && Math.abs(this.y - mouse.y) < (this.r * .9)) {
            window.alert("You Lost!")
        }

    }
}

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', event => {
    mouse.x = event.x
    mouse.y = event.y
})

const numberOfCircles = 20
const circleArray = []

for ( let i = 0; i < numberOfCircles; i++ ) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const dx = ((Math.random() * 2) - 1) * 5
    const dy = ((Math.random() * 2) - 1) * 5

    circleArray.push(new Circle(x,y, 20, dx,dy))
}


console.log(mouse)

function animate() {

    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    circleArray.forEach(circle => {
        circle.draw()
        circle.update()
    })

    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 15, 0, 2*Math.PI)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.stroke()
    
    requestAnimationFrame(animate)
}

animate()