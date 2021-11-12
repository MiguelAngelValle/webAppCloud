const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

function borrar(correo) {
    let deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', function() {
        console.log("Borrando...");
        let urlDelete = 'api/guest/' + correo;
        function reqListener1 () {
            if(xhr.status != 200) return; 
            console.log(JSON.parse(xhr.response)); 
            //location.reload()
        } 
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener1);
        xhr.open(HTTTPmethods.delete, urlDelete);
        xhr.send();
    });
}

let count = 0;
let totalGuest = 0;

function search() {
    if(document.getElementById('search').value == "") {
        let urlGuest = 'api/guest';

        function reqListener() {
            if(xhr.status != 200) return;
            let guestList = JSON.parse(xhr.response);
            count = guestList.length
            console.log(guestList);
            usersToHTML(guestList);
        } 

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener);
        xhr.open(HTTTPmethods.get, urlGuest);
        xhr.setRequestHeader('x-auth', sessionStorage.token);
        xhr.send();

        let usersToHTML = (users) => {
            let listU = document.getElementById("guestList");
            users.forEach((e, i) => {
                if(e.role == 'GUEST') {
                    totalGuest = parseInt(totalGuest) + parseInt(e.companions) + 1;
                    let user = `            
                <div id="anidados" class="col-lg-12 col-md-12 col-sm-12">
                                <div class="row align-items-center about-main-info">
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <div class="about-m">
                                            <div class="about-img">
                                                <img class="img-fluid" src="${e.photo}" alt="" />
                                            </div>
                                            <ul>
                                                <li><a onclick="borrar(\'${e.email}\')" type="button" data-toggle="modal" data-target="#borrar"><i class="fa fa-trash"></i></a></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li><a href="${e.facebook}" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                                <li><a href="${e.instagram}" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-6 col-sm-12">
                                        <h2><span>${e.firstName} ${e.lastName}</span></h2>
                                        <p>Email: ${e.email}</p>
                                        <p>Sex: ${e.sex}</p>
                                        <p>Companions: ${e.companions}</p>
                                        <p>Assistance: ${e.assistance}</p>
                                        <p>Phone Number: ${e.phone}</p>
                                    </div>
                                </div>
                            </div>
                `;
                listU.insertAdjacentHTML("beforeend", user);
                }
            });
            let counterGuest = document.getElementById("total");
            counterGuest.insertAdjacentHTML("beforeend", totalGuest)
        } 
    } else {
        count++;
        let urlGuest = 'api/guest';

        function reqListener() {
            if(xhr.status != 200) return;
            let guestList = JSON.parse(xhr.response);
            console.log(guestList);
            usersToHTML(guestList);
        } 

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener);
        xhr.open(HTTTPmethods.get, urlGuest);
        xhr.setRequestHeader('x-auth', sessionStorage.token);
        xhr.send();

        let usersToHTML = (users) => {
            let z = 0;
            let listU = document.getElementById("guestList");
            users.forEach((e, i) => {
                if(e.assistance.toLowerCase().includes(document.getElementById('search').value) && e.role == 'GUEST') {
                    z++;
                    let user = `            
                <div id="anidados" class="col-lg-12 col-md-12 col-sm-12">
                                <div class="row align-items-center about-main-info">
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <div class="about-m">
                                            <div class="about-img">
                                                <img class="img-fluid" src="${e.photo}" alt="" />
                                            </div>
                                            <ul>
                                                <li><a onclick="borrar(\'${e.email}\')" type="button" data-toggle="modal" data-target="#borrar"><i class="fa fa-trash"></i></a></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li><a href="${e.facebook}" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                                <li><a href="${e.instagram}" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-6 col-sm-12">
                                        <h2><span>${e.firstName} ${e.lastName}</span></h2>
                                        <p>Email: ${e.email}</p>
                                        <p>Sex: ${e.sex}</p>
                                        <p>Companions: ${e.companions}</p>
                                        <p>Assistance: ${e.assistance}</p>
                                        <p>Phone Number: ${e.phone}</p>
                                    </div>
                                </div>
                            </div>
                `;
                listU.insertAdjacentHTML("beforeend", user);
                }
            });
            count = z;
        } 
    }
    for(let i = 0; i < count; i++) {
        var d = document.getElementById("guestList");
        var d_nested = document.getElementById("anidados");
        d.removeChild(d_nested);
    }
}