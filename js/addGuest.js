const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

let registerBtn = document.getElementById('registerSubmit');
registerBtn.addEventListener('click', function () {
    register();
}); 

function register() {
    let data = JSON.stringify(
        {
            firstName: document.getElementById('Fname').value,
            lastName: document.getElementById('Lname').value,
            email: document.getElementById('email').value, 
            companions: document.getElementById('companions').value, 
            phone: document.getElementById('phone').value,
            relationship: document.getElementById('kinship').value,
            photo: document.getElementById('photo').value,
            sex: document.getElementById('sex').value,
            instagram: document.getElementById('instagram').value,
            facebook: document.getElementById('facebook').value,
            assistance: document.getElementById('status').value, 
            role: document.getElementById('role').value,
            code: document.getElementById('password').value
        }
    );

    let urlGuest = 'api/guest'

    function reqListener() {
        if(xhr.status != 201) return;
        let user = JSON.parse(xhr.response);
        console.log(user);
        window.location.href = "guestListA.html";
    } 
    
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.open(HTTTPmethods.post, urlGuest);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}

