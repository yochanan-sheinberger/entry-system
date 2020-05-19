import * as view from "./view.js";
import * as model from "./model.js";

export function init() {
    view.createKeybord();
    view.openDoor(false)
    setEvents();
    var submitBtn = document.getElementsByClassName("submit");
    for (let btn of submitBtn) {
        btn.addEventListener("click", submit)
    };
}

function submit() {
    var input = $(this).prev();
    if ($(input).val().length == 4 && isFinite($(input).val())) {
        model.StoreCode($(input).val(), this.id);
    } else {
        view.alertError("Enter a valid 4-digit number")
    }
    $(input).val("");
}

function setEvents() {
    var btns = document.querySelectorAll(".keyboard button");
    for (let btn of btns) {
        btn.addEventListener("click", check);
    }
    document.querySelector(".close-door").addEventListener("click", view.openDoor);
}
async function check() {
    view.changeColor(this);
    var a = await model.getCode(this);
    setTimeout(()=> {
        if (a == 2) {
            view.openDoor(true);
        } else if (a == 1) {
            view.openDoor(false);
        } else if (a == false) {
                view.alertError("try again");
                view.reset();
        } else if (a == "police") {
                view.alertError("calling the police");
                view.reset();
        }
    }, 5);
}

