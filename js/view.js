var container = document.getElementsByClassName("container")[0];
var btns =[];
var time = null;
var door = null;

function alertError(message){
    if (message == "try again") {
        document.querySelector("#error").play();
    } else if(message == "calling the police") {
        document.querySelector("#police").play();
    }
    setTimeout(()=> {
        alert(message);
    }, 30)
}

function createKeybord() {
    container.innerHTML = 
    `<div class="doorway">
        <button class="close-door">Close Door</button>
        <div class="form">
            <label for="admin">Change Admin Combination</label>
            <input type="text" maxlength="4">
            <button class="submit" id="1">Change</button>
            <label for="employee">Change User Combination</label>
            <input type="text" maxlength="4">
            <button class="submit" id="2">Change</button>
        </div>
        <div class="door">
            <div class="keyboard">
                <button class="button" id="1">
                    <h2>1</h2>
                    <span>a b c</span>
                </button>
                <button class="button" id="2">
                    <h2>2</h2>
                    <span>d e f</span>
                </button>
                <button class="button" id="3">
                    <h2>3</h2>
                    <span>g h i</span>
                </button>
                <button class="button" id="4">
                    <h2>4</h2>
                    <span>j k l</span>
                </button>
                <button class="button" id="5">
                    <h2>5</h2>
                    <span>m n o</span>
                </button>
                <button class="button" id="6">
                    <h2>6</h2>
                    <span>p q r</span>
                </button>
                <button class="button" id="7">
                    <h2>7</h2>
                    <span>s t u</span>
                </button>
                <button class="button" id="8">
                    <h2>8</h2>
                    <span>v w x</span>
                </button>
                <button class="button" id="9">
                    <h2>9</h2>
                    <span>y z</span>
                </button>
                <button class="invisible"></button>
                <button class="button" id="0">
                    <h2>0</h2>
                    <span></span>
                </button>
            </div>
        </div>
    </div>`;
    door = document.getElementsByClassName("door")[0];
}

function changeColor(btn) {
    document.querySelector("#beep").play();
    clearTimeout(time);
    btns.push(btn);
    time = setTimeout(()=> {
        reset();
    }, 3000);
    btn.style.backgroundColor = "#fd3b3b";
}

function reset() {
    setTimeout(()=> {
        for (let btn of btns) {
            btn.style.backgroundColor = "#824a4a";
        }
        btns = [];
    },50)
}

function openDoor(employee) {
    door.classList.toggle("door-open");
    if (employee) {
        document.querySelector(".form").style.visibility = "hidden";
    } else {
        document.querySelector(".form").style.visibility = "visible";
    }
}


export { alertError, createKeybord, changeColor, reset, openDoor };