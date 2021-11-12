const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

//show profile
let urlGuest = 'api/guest/' + sessionStorage.userEmail;

function reqListener() {
    if(xhr.status != 200) return;
    let user = JSON.parse(xhr.response);
    console.log(user)
    userToHTML(user);
} 

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open(HTTTPmethods.get, urlGuest);
xhr.send();

function userToHTML(user) {
    let listU = document.getElementById("profile");
    let userD = `
    <div class="about-a1">
			<div class="container">
				<div class="row">
					<div class="col-lg-12 text-center">
						<div class="title-box">
							<h2>Your Profile</h2>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="row align-items-center about-main-info">
							<div class="col-lg-4 col-md-6 col-sm-12">
								<div class="about-m">
									<div class="about-img">
										<img class="img-fluid" src="${user.photo}" alt="" />
									</div>
									<ul>
										<li><a href="${user.facebook}" target="_blank"><i class="fa fa-facebook"></i></a></li>
										<li><a href="${user.instagram}" target="_blank"><i class="fa fa-instagram"></i></a></li>
									</ul>
								</div>
							</div>
							<div class="col-lg-8 col-md-6 col-sm-12">
								<h2><span>${user.firstName} ${user.lastName}</span></h2>
                                <p>Email: ${user.email}</p>
                                <p>Sex: ${user.sex}</p>
                                <p>Companions: ${user.companions}</p>
                                <p>Assistance: ${user.assistance}</p>
                                <p>Phone Number: ${user.phone}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> 
    `;
    listU.insertAdjacentHTML("beforeend", userD);
}