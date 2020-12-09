let pla = document.getElementById("play")
/*let clos = document.getElementById("close")*/
pla.addEventListener("click", play)
/*clos.addEventListener("click", stop)*/
localStorage.setItem("work", "[]" )
localStorage.setItem("messages", "[]" )

function play(){
    let cont = document.getElementsByClassName("content2").item(0)
    if(cont.children.length > 0){
        let wo = document.getElementById('work')
        let an = document.getElementById('anim')

        let he = wo.offsetHeight - 50
        let wi = wo.offsetWidth - 10

        an.style.height = he+"px"
        an.style.width = wi+"px"

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
        clo.addEventListener("click", stop)

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

        let ci = document.createElement("div")
        ci.id = "circle"

        let message = document.createElement("div")
        message.id = "message"
        message.innerText = "message"

        let res = document.getElementById("result")
        res.innerText = ""

        anim.appendChild(ci)
        work.appendChild(message)
        work.appendChild(clo)
        work.appendChild(sta)
        work.appendChild(leftup)
        work.appendChild(rightup)
        work.appendChild(leftdown)
        work.appendChild(rightdown)
        work.appendChild(anim)
        cont.appendChild(work)

        //размер поля anim
        let he = work.offsetHeight - 50
        let wi = work.offsetWidth - 10

        anim.style.height = he + "px"
        anim.style.width = wi + "px"

        //размер circle
        let che = he/2 - 10
        let cwi = wi/2 - 10
        ci.style.marginTop = che + "px"
        ci.style.marginLeft = cwi + "px"
        ci.style.marginBottom = che + "px"
        ci.style.marginRight = cwi + "px"
    }
}

function stop(){
    myMessage("close clicked ")
    let cont = document.getElementsByClassName("content2").item(0)
    ///
    let arr = JSON.parse(localStorage.getItem("work"))
    arr.push("work disappear at " + new Date().toLocaleTimeString())
    localStorage.setItem("work", JSON.stringify(arr))
    ///
    cont.innerHTML = null
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
    let inte = setInterval(mov, 100)
    let circle = document.getElementById("circle")
    let distance = 10

    function mov(){
        let to = parseInt(circle.style.marginTop.replace(/px/g, ""))
        let le = parseInt(circle.style.marginLeft.replace(/px/g, ""))
        let ri = parseInt(circle.style.marginRight.replace(/px/g, ""))
        let bo = parseInt(circle.style.marginBottom.replace(/px/g, ""))

        if( (to <= 0) || (le <= 0) || (ri <= 0) || (bo <= 0)){
            clearInterval(inte)
            let work = document.getElementById("work")
            let sta = document.getElementById("start")
            let reload = document.createElement("button")
            reload.id = "reload"
            reload.innerText = "Reload"
            reload.addEventListener("click", reloadCircle)
            work.replaceChild(reload, sta)

        }else {
            if((distance % 4) === 0 ){
                circle.style.marginLeft = (le - distance) + "px"
                circle.style.marginRight = (ri + distance) + "px"

                myMessage("circle is on right top square ")

            }else if ((distance % 4) === 1 ){
                /*let t2 = circle.style.marginTop.replace(/px/g, "")
                let b2 = circle.style.marginBottom.replace(/px/g, "")*/
                circle.style.marginTop = (to + distance) + "px"
                circle.style.marginBottom = (bo - distance) + "px"

                myMessage("circle is on left top square ")

            }else if ((distance % 4) === 2 ){
               /* let l3 = circle.style.marginLeft.replace(/px/g, "")
                let r3 = circle.style.marginRight.replace(/px/g, "")*/
                circle.style.marginLeft = (le + distance) + "px"
                circle.style.marginRight = (ri - distance) + "px"

                myMessage("circle is on left bottom square ")

            }else if ((distance % 4) === 3 ){
                /*let t1 = circle.style.marginTop.replace(/px/g, "")
                let b1 = circle.style.marginBottom.replace(/px/g, "")*/
                circle.style.marginTop = (to - distance) + "px"
                circle.style.marginBottom = (bo + distance) + "px"

                myMessage("circle is on right bottom square ")

            }
            distance++
        }
    }

}

function reloadCircle(){
    myMessage("reload clicked ")
    let ci = document.getElementById("circle")
    let wo = document.getElementById('work')

    let he = wo.offsetHeight - 50
    let wi = wo.offsetWidth - 10

    let che = he/2 - 10
    let cwi = wi/2 - 10
    ci.style.marginTop = che + "px"
    ci.style.marginLeft = cwi + "px"
    ci.style.marginBottom = che + "px"
    ci.style.marginRight = cwi + "px"

    let sta = document.createElement("button")
    sta.innerText = "Start"
    sta.id = "start"
    sta.addEventListener("click", start)
    let reload = document.getElementById("reload")

    wo.replaceChild(sta, reload)

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