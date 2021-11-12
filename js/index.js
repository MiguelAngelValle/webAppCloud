const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

//login
let loginBtn = document.getElementById('loginSubmit');
loginBtn.addEventListener('click', function () {
    login();
}); 

async function login() {
    event.preventDefault();
    let user = document.getElementById('guestEmail').value;
    sessionStorage.userEmail = user;
    let password = document.getElementById('guestCode').value;
    let urlLogin = 'api/auth/login';
    let resp =  await fetch(urlLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: user, code: password})
        }
    )
    
    let data  = await resp.json()
    sessionStorage.token = data.token;
    verifyRole();
}

function verifyRole() {
    console.log('Verificando rol...')
    let urlGuest = 'api/guest/' + sessionStorage.userEmail;

    function reqListener0() {
        if(xhr.status != 200) return; 
        let user = JSON.parse(xhr.response);
        console.log(user);
        if(user.role == 'ADMIN') {
            window.location.href = "homeAdmin.html";
        } else {
            window.location.href = "homeGuest.html";
        }
    } 

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener0);
    xhr.open(HTTTPmethods.get, urlGuest);
    xhr.send();
}  