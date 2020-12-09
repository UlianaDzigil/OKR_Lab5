let pla = document.getElementById("play")
/*let clos = document.getElementById("close")*/
pla.addEventListener("click", play)
/*clos.addEventListener("click", stop)*/
localStorage.setItem("work", "[]" )
localStorage.setItem("messages", "[]" )
let inte = setInterval(function (){}, 1000)
function play(){
    let cont = document.getElementsByClassName("content2").item(0)
    if(cont.children.length > 0){


    }else {
        let work = document.createElement("div")
        ///
        let arr = JSON.parse(localStorage.getItem("work"))
        arr.push("work appear at " + new Date().toLocaleTimeString())
        localStorage.setItem("work", JSON.stringify(arr))
        ///
        work.id = "work"
        let clo = document.createElement("button")
        clo.innerText = "Close"
        clo.id = "close"
        clo.onclick = stop

        let sta = document.createElement("button")
        sta.innerText = "Start"
        sta.id = "start"
        sta.onclick = start

        let anim = document.createElement("div")
        anim.id = "anim"

        let leftup = document.createElement("div")
        leftup.id = "leftUp"
        let rightup = document.createElement("div")
        rightup.id = "rightUp"
        let leftdown = document.createElement("div")
        leftdown.id = "leftDown"
        let rightdown = document.createElement("div")
        rightdown.id = "rightDown"

        /*let ci = document.createElement("div")
        ci.id = "circle"*/

        let message = document.createElement("div")
        message.id = "message"
        message.innerText = "message"

        //размер поля anim
        let he = work.offsetHeight - 50
        let wi = work.offsetWidth - 10



        let canvas = document.createElement("canvas")
        canvas.id = "canvas"

        /*anim.appendChild(ci)*/
        work.appendChild(canvas)
        work.appendChild(message)
        work.appendChild(clo)
        work.appendChild(sta)
        work.appendChild(leftup)
        work.appendChild(rightup)
        work.appendChild(leftdown)
        work.appendChild(rightdown)
        work.appendChild(anim)
        cont.appendChild(work)

        let ctx = canvas.getContext("2d");

        canvas.width = work.offsetWidth;
        canvas.height = work.offsetHeight;
        canvas.style.setProperty('left', 0 + 'px');
        canvas.style.setProperty('top', 0 + 'px');

        /*ctx.fillRect(0, 0, canvas.width, canvas.height);*/


        drawball(ctx, work.offsetWidth/2, work.offsetHeight/2 + 20);


    }
}

function drawball(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2, true);
    ctx.fillStyle = "darkgreen";
    ctx.fill();
    ctx.closePath();
}


function stop(){
    myMessage("close clicked ")
    clearInterval(inte)
    let cont = document.getElementsByClassName("content2").item(0)
    let work = document.getElementById('work')
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(work.offsetWidth/2, work.offsetHeight/2 + 20, 10, 0, Math.PI*2, true);
    ctx.fillStyle = "darkgreen";
    ctx.fill();
    ctx.closePath();
    /*ctx.globalCompositeOperation = 'source-over'*/

    work.removeChild(canvas)
    cont.removeChild(work)
    ///
    let arr = JSON.parse(localStorage.getItem("work"))
    arr.push("work disappear at " + new Date().toLocaleTimeString())
    localStorage.setItem("work", JSON.stringify(arr))
    ///
    /*cont.innerHTML = null*/
    readLocal()
}

function readLocal(){
    let res = document.getElementById("result")
    let str = localStorage.getItem("work") + localStorage.getItem("messages")
    res.innerText = str
}

function start(){
    myMessage("start clicked ")
    moveFunc()

    let start = document.getElementById("start")
    start.onclick = function (){}
}

function moveFunc(){
    clearInterval(inte)
    inte = setInterval(mov, 100)
    /*let circle = document.getElementById("circle")*/
    let circle = document.getElementById("circle")
    let distance = 8
    let work = document.getElementById('work')
    let x = work.offsetWidth/2
    let y = work.offsetHeight/2 + 20

    function mov(){
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        if( (x <= 10) || (y <= 60) || (x >= work.offsetWidth - 10) || (y >= work.offsetHeight - 15)){
            clearInterval(inte)
            drawball(ctx, x,  y);
            let work = document.getElementById("work")
            let sta = document.getElementById("start")
            let reload = document.createElement("button")
            reload.id = "reload"
            reload.innerText = "Reload"
            reload.addEventListener("click", reloadCircle)
            work.replaceChild(reload, sta)

        }else {
            if((distance % 4) === 0 ){
                x = x - distance
                drawball(ctx, x,  y);
                myMessage("circle is on right top square ")

            }else if ((distance % 4) === 1 ){
                y = y + distance
                drawball(ctx, x,  y);
                myMessage("circle is on left top square ")

            }else if ((distance % 4) === 2 ){
                x = x + distance
                drawball(ctx, x,  y);
                myMessage("circle is on left bottom square ")

            }else if ((distance % 4) === 3 ){
                y = y - distance
                drawball(ctx, x,  y);
                myMessage("circle is on right bottom square ")

            }
            distance++
        }
    }

}

function reloadCircle(){
    myMessage("reload clicked ")


    let work = document.getElementById('work')
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawball(ctx, work.offsetWidth/2, work.offsetHeight/2 + 20);


    let sta = document.createElement("button")
    sta.innerText = "Start"
    sta.id = "start"
    sta.addEventListener("click", start)
    let reload = document.getElementById("reload")

    work.replaceChild(sta, reload)

}

function myMessage(string){
    let div = document.getElementById("message")
    let textBefore = div.innerText
    let text = textBefore + "<br \\/>" + string
    div.innerText = text

    let arr = JSON.parse(localStorage.getItem("messages"))
    arr.push(string + "at " + new Date().toLocaleTimeString())
    localStorage.setItem("messages", JSON.stringify(arr))

}