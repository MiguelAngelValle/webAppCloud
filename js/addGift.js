const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

let registerBtn = document.getElementById('NewGsubmit');
registerBtn.addEventListener('click', function () {
    register();
}); 

function register() {
    let data = JSON.stringify(
        {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            status: document.getElementById('status').value,
            buyer: document.getElementById('buyer').value,
            price: document.getElementById('price').value,
            link: document.getElementById('link').value,
            photo: document.getElementById('photo').value
        }
    );

    let urlGift = 'api/gift/'

    function reqListener() {
        if(xhr.status != 201) return;
        let gift = JSON.parse(xhr.response);
        console.log(gift);
        window.location.href = "giftTableA.html";
    } 
    
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.open(HTTTPmethods.post, urlGift);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}

