const HTTTPmethods = {
    put: "PUT",
    post: "POST",
    get: "GET",
    delete: "DELETE",
};

let url = "http://localhost:3000/api";

let urlGuest = 'api/guest/' + sessionStorage.userEmail;

function reqListener1() {
    console.log("Obteniendo usuario");
    if(xhr.status != 200) return;
    let user = JSON.parse(xhr1.response);
    console.log(user);
    sessionStorage.user = user.firstName;
} 

var xhr1 = new XMLHttpRequest();
xhr1.addEventListener("load", reqListener1 );
xhr1.open(HTTTPmethods.get, urlGuest);
xhr1.send();

let urlGift = "api/gift";

function reqListener() {
    if (xhr.status != 200) return;
    let giftTable = JSON.parse(xhr.response);
    console.log(giftTable);
    giftsToHTML(giftTable); 
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

let giftsToHTML = (gifts) => {
    let tableG = document.getElementById("giftTable");
    gifts.forEach((e) => {
        if (sessionStorage.user == e.buyer) {
            let gift = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#">${e.name}</a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        <li><a data-tip="Delete" onclick="deleteGift(\'${e.name}\')"><i class="fa fa-trash"></i></a></li>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", gift);
        } else if (sessionStorage.name != e.buyer && e.status == "Unavailable") {
            let gift = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#">${e.name}</a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", gift);
        } else {
            let gift = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#">${e.name}</a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        <li><a data-tip="Buy" onclick="buyGift(\'${e.name}\')"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", gift);
        } 
    });
};

function buyGift(name) {
    updateBuyer(name);
    console.log("Comprando");
}

function updateBuyer(name){

    urlGift = 'api/gift/' + name;
    console.log(urlGift);
    let data = JSON.stringify({
        buyer: sessionStorage.user,
        status: "Unavailable"
    })

    function reqListener0() {
        console.log('Regalo apartado')
        reload();
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener0());
    xhr.open(HTTTPmethods.put, urlGift);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}

function reload() {
    window.location.href = "giftTableU.html";
}

function deleteGift(name){

    urlGift = urlGift + "/" + name;

    let data = JSON.stringify({
        buyer: "None",
        status: "Available"
    })

    function reqListener0() {
        console.log('Regalo eliminado del comprador')
        console.log(JSON.parse(xhr.response));
        reload();
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener0 );
    xhr.open(HTTTPmethods.put, urlGift);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);

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
    gifts.forEach(e => {
        if (sessionStorage.user == e.buyer) {
            let gift = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#">${e.name}</a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        <li><a data-tip="Delete" onclick="deleteGift(\'${e.name}\')"><i class="fa fa-trash"></i></a></li>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", gift);
        } else if (sessionStorage.name != e.buyer && e.status == "Unavailable") {
            let gift = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#">${e.name}</a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", gift);
        } else {
            let gift = `  
                <div class="col-md-3 col-sm-6">
                    <div class="product-grid6">
                        <div class="product-image6">
                            <a href="#">
                            <img class="pic-1" src="${e.photo}" width="50" height="50">
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="#">${e.name}</a></h3>
                            <div class="price">$ ${e.price}
                                <span>${e.category}</span>
                            </div>
                        </div>
                        <ul class="social">
                        <a href="${e.link}" target="_blank">Amazon site</a> <br>
                        ${e.status} / ${e.buyer}
                        <br><br>
                        <li><a data-tip="Buy" onclick="buyGift(\'${e.name}\')"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                </div>
        `;
            tableG.insertAdjacentHTML("beforeend", gift);
        } 
    });
}