 const HTTTPmethods = {
    put: "PUT",
    post: "POST",
    get: "GET",
    delete: "DELETE",
};

let url = "http://localhost:3000/api";

let urlGift = "api/gift";

function reqListener() {
    if (xhr.status != 200) return;
    let giftTable = JSON.parse(xhr.response);
    console.log(giftTable);
    giftToHTML(giftTable);
}

function reqListener3() {
    if (xhr.status != 200) return;
    return JSON.parse(xhr.response);
}

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open(HTTTPmethods.get, urlGift);
xhr.setRequestHeader("x-auth", sessionStorage.token);
xhr.send();

let giftToHTML = (gift) => {
    let tableG = document.getElementById("giftTable");
    gift.forEach((e) => {
        if (e) {
            let user = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#"> ${e.name} </a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        <li><a onclick="edit(\'${e.name}\')" data-tip="Edit gift"><i class="fa fa-pencil"></i></a></li>
                        <li><a onclick="borrar(\'${e.name}\')" type="button" data-toggle="modal" data-tip="Delete gift" data-target="#borrar"><i class="fa fa-trash"></i></a></li>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", user);
        }
    });

};

function borrar(name) {
    let deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", function () {
        console.log("Borrando...");

        let urlDelete = "api/gift/" + name;

        function reqListener1() {
            if (xhr.status != 200) return;
            console.log(JSON.parse(xhr.response));
            window.location.href = "giftTableA.html";

            refresh();
        }

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener1);
        xhr.open(HTTTPmethods.delete, urlDelete);
        xhr.send();
    });
}

function edit(name){
    console.log(name);
    sessionStorage.gift = name;
    window.location.href = "editGiftA.html";
}

function deleteAll(){
    var  gift = document.getElementsByClassName('col-md-3 col-sm-6');

    let size =  gift.length;
    for (let i = 0; i < size; i++){
         gift[0].parentNode.removeChild( gift[0]);
    }
}

function getValue(){
    let inputVal = document.getElementById("inputId").value;
    console.log(inputVal);
    let gifts = reqListener3();

    deleteAll()

    if(inputVal != ''){
        gifts = gifts.filter(e => inputVal == e.category || inputVal == e.buyer || inputVal == e.status)
    }

    let tableG = document.getElementById("giftTable");
    gifts.forEach((e) => {
        if (e) {
            let user = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#"> ${e.name} </a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        <li><a onclick="edit(\'${e.name}\')" data-tip="Edit gift"><i class="fa fa-pencil"></i></a></li>
                        <li><a onclick="borrar(\'${e.name}\')" type="button" data-toggle="modal" data-tip="Delete gift" data-target="#borrar"><i class="fa fa-trash"></i></a></li>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", user);
        }
    });
}