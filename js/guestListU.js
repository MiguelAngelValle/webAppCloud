const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

let count = 0;

function search() {
    if(document.getElementById('search').value == "") {
        let urlGuest = 'api/guest';

        function reqListener() {
            if(xhr.status != 200) return;
            let guestList = JSON.parse(xhr.response);
            count = guestList.length
            console.log(guestList.length);
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
                    let user = `            
                <div id="anidados" class="col-lg-12 col-md-12 col-sm-12">
                                <div class="row align-items-center about-main-info">
                                    <div class="col-lg-4 col-md-6 col-sm-12">
                                        <div class="about-m">
                                            <div class="about-img">
                                                <img class="img-fluid" src="${e.photo}" alt="" />
                                            </div>
                                            <ul>
                                                <li><a href="${e.facebook}" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                                <li><a href="${e.instagram}" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-6 col-sm-12">
                                        <h2><span>${e.firstName} ${e.lastName}</span></h2>
                                        <p>Email: ${e.email}</p>
                                        <p>Sex: ${e.sex}</p>
                                        <p>Relationship: ${e.relationship}</p>
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
        }
    } else {
        let urlGuest = 'api/guest';

        function reqListener() {
            if(xhr.status != 200) return;
            let guestList = JSON.parse(xhr.response);
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
                if((e.firstName.toLowerCase().includes(document.getElementById('search').value) || e.lastName.toLowerCase().includes(document.getElementById('search').value)) && e.role == 'GUEST') {
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
                                                <li><a href="${e.facebook}" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                                <li><a href="${e.instagram}" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-6 col-sm-12">
                                        <h2><span>${e.firstName} ${e.lastName}</span></h2>
                                        <p>Email: ${e.email}</p>
                                        <p>Sex: ${e.sex}</p>
                                        <p>Relationship: ${e.relationship}</p>
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
            console.log(count)
        }
    }
    for(let i = 0; i < count; i++) {
        var d = document.getElementById("guestList");
        var d_nested = document.getElementById("anidados");
        d.removeChild(d_nested);
    }
}