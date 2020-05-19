var role = "";
var alertQty = 0;
var time = null;
var btnsVal = "";

function StoreCode(val, id) {
    var settings = {
        "url": "https://webschool-063e47.appdrag.site/api/setCombination",
        "data": {
            "value" : val,
            "role" : id
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    $.ajax(settings).done(function (response) {
        console.log(response); // TODO: Do something with the result
    });
}

async function getCode(a) {
    clearTimeout(time);
    btnsVal += a.id;
    time = setTimeout(()=> {
        reset();
    }, 3000);
    if (btnsVal.length > 3) {
        return await checkCode();
    }  
}

async function checkCode() {
    return callServer().then(num => {
        clearTimeout(time);
        reset();
        return num;
    }).catch(error => {
        alertQty++
        reset();
        if (alertQty < 3) { 
            return false;
        } else {
            return "police";
        }
    });
}

function callServer() {
    return new Promise((resolve, reject) => {
        var settings = {
            "url": "https://webschool-063e47.appdrag.site/api/getRole",
            "data": {
                "password" : btnsVal,
                "AD_PageNbr" : "1",
                "AD_PageSize" : "500"
            },
            "method": "POST",
            "async": true,
            "crossDomain": true,
            "processData": true
        };
        $.ajax(settings).done(function (response) {
            if (response.Table.length > 0) {
                resolve(response.Table[0].role);
            } else {
                reject("error");
            }
        });
    }) 
}

function reset() {
    setTimeout(()=> {
        btnsVal = ""
    },50) 
}

export { StoreCode, getCode, };