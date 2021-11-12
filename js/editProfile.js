const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

let urlGuest = 'api/guest/' + sessionStorage.userEmail;

function reqListener() {
    if(xhr.status != 200) return;
    let user = JSON.parse(xhr.response);
    console.log(user)
    userToHTML(user);
    update();
} 

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open(HTTTPmethods.get, urlGuest);
xhr.send();

function userToHTML(user) {
    let listU = document.getElementById("profile");
    let userD = `            
    <div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<input type="text" value=${user.firstName} class="form-control" id="Fname" name="name" placeholder="Your First Name" required data-error="Please enter your first name">
								<div class="help-block with-errors"></div>
							</div>                                 
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<input type="text" value=${user.lastName} placeholder="Your Last Name" id="Lname" class="form-control" name="name" required data-error="Please enter your last name">
								<div class="help-block with-errors"></div>
							</div> 
						</div>
                        <div class="col-md-6">
							<div class="form-group">
								<select class="custom-select d-block form-control" id="companions" required data-error="Please select an item in the list.">
								  <option selected>${user.companions}</option>
								  <option value="0">0</option>
								  <option value="1">1</option>
								  <option value="2">2</option>
								  <option value="3">3</option>
								  <option value="4">4</option>
								</select>
								<div class="help-block with-errors"></div>
							</div> 
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<input type="email" value=${user.email} placeholder="Your Email" id="email" class="form-control" name="name" required data-error="Please enter your email">
								<div class="help-block with-errors"></div>
							</div> 
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<select class="custom-select d-block form-control" id="sex" required data-error="Please select an item in the list.">
								  <option selected>${user.sex}</option>
								  <option value="Women">Women</option>
								  <option value="Men">Men</option>
								</select>
								<div class="help-block with-errors"></div>
							</div> 
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<input type="number" value=${user.phone} placeholder="Your Phone Number" id="phone" class="form-control" name="name" required data-error="Please enter your phone number">
								<div class="help-block with-errors"></div>
							</div> 
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<select class="custom-select d-block form-control" id="status" required data-error="Please select an item in the list.">
								  <option selected>${user.assistance}</option>
								  <option value="Pending">Pending</option>
								  <option value="Will not attend">Will not attend</option>
								  <option value="Will attend">Will attend</option>
								</select>
								<div class="help-block with-errors"></div>
							</div> 
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<select class="custom-select d-block form-control" id="kinship" required data-error="Please select an item in the list.">
								  <option selected>${user.relationship}</option>
								  <option value="Related to the bride">Related to the bride</option>
								  <option value="Related to the groom">Related to the groom</option>
								</select>
								<div class="help-block with-errors"></div>
							</div> 
						</div>
						<div class="col-md-12">
                            <div class="form-group">
								<input type="url" value=${user.instagram} placeholder="Your Instagram (optional)" id="instagram" class="form-control" name="name">
								<div class="help-block with-errors"></div>
							</div> 
                            <div class="form-group"> 
								<input type="url" value=${user.facebook} placeholder="Your Facebook (optional)" id="facebook" class="form-control" name="name">
								<div class="help-block with-errors"></div>
							</div> 
                            <div class="form-group"> 
								<input type="url" value=${user.photo} placeholder="Your Profile Photo" id="photo" class="form-control" name="name" required data-error="Please enter your profile photo">
								<div class="help-block with-errors"></div>
							</div> 
							<div class="submit-button text-center">
								<button class="btn btn-common" id="updateSubmit" type="submit">Update profile</button>
							</div>
						</div>
					  </div> 
    `;
    listU.insertAdjacentHTML("beforeend", userD);
}

function update() {
    let registerBtn = document.getElementById('updateSubmit');
    registerBtn.addEventListener('click', function () {
        saveChanges();
    }); 

    function saveChanges() {
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
                assistance: document.getElementById('status').value
            }
        );
    
        function reqListener0() {
            console.log('Usuario actualizado')
            reload();
        } 
        
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener0());
        xhr.open(HTTTPmethods.put, urlGuest);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
    }
}

function reload() {
    window.open("profile.html")
	//window.location.href = "profile.html"
}