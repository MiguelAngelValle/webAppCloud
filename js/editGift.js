const HTTTPmethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}

let url = "http://localhost:3000/api";

let urlGift = 'api/gift/' + sessionStorage.gift;

function reqListener() {
    console.log("Entrando a reqListener");
    if (xhr.status != 200) return;
    let gift = JSON.parse(xhr.response);
    console.log(gift)
    giftToHTML(gift);
    update();
}

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open(HTTTPmethods.get, urlGift);
xhr.send();


 function giftToHTML(gift) {
     let listG = document.getElementById("editGift");
     let giftInfo = `            
     <div class="row">
 						<div class="col-md-6">
 							<div class="form-group">
 								<input type="text" value=${gift.name} class="form-control" id="name" name="name" placeholder="Gift Name" required data-error="Please enter the name of the gift">
 								<div class="help-block with-errors"></div>
 							</div>                                 
 						</div>
                         <div class="col-md-6">
 							<div class="form-group">
 								<select class="custom-select d-block form-control" id="category" required data-error="Please select the category of the gift">
 								  <option selected>${gift.category}</option>
 								  <option value="kitchen">kitchen</option>
 								  <option value="Livingroom">Livingroom</option>
 								  <option value="Equipment">Equipment</option>
 								  <option value="Garden">Garden</option>
 								  <option value="Bathroom">Bathroom</option>
                                   <option value="Room">Room</option>
 								</select>
 								<div class="help-block with-errors"></div>
 							</div> 
 						</div>
 						<div class="col-md-6">
 							<div class="form-group">
 								<input type="email" value=${gift.price} placeholder="Price" id="price" class="form-control" name="name" required data-error="Please enter the price of the gift">
 								<div class="help-block with-errors"></div>
 							</div> 
 						</div>
                         <div class="col-md-6">
 							<div class="form-group">
 								<select class="custom-select d-block form-control" id="status" required data-error="Please select the status of the gift">
 								  <option selected>${gift.status}</option>
 								  <option value="Available">Available</option>
 								  <option value="Unavailable">Unavailable</option>
 								</select>
 								<div class="help-block with-errors"></div>
 							</div> 
 						</div>
                         <div class="col-md-12">
                             <div class="form-group">
                                 <input type="text" value=${gift.buyer} placeholder="Buyer" id="buyer" class="form-control" name="name" required>
                                 <div class="help-block with-errors"></div>
                             </div> 
                         </div>
 						<div class="col-md-12">
                             <div class="form-group">
 								<input type="url" value=${gift.link} placeholder="Link" id="link" class="form-control" name="name" required data-error="Please enter the link of amazon">
 								<div class="help-block with-errors"></div>
 							</div> 
                             <div class="form-group"> 
 								<input type="url" value=${gift.photo} placeholder="Photo" id="photo" class="form-control" name="name" required data-error="Please enter the photo of the gift">
 								<div class="help-block with-errors"></div>
 							</div> 
 						</div>
                         <div class="col-md-12">
                             <div class="submit-button text-center">
                                 <button class="btn btn-common" id="updateSubmit" type="submit">Save changes</button>
                                 <div id="msgSubmit" class="h3 text-center hidden"></div>
                                 <div class="clearfix"></div>
                             </div>
                         </div>
 					</div> 
     `;
     listG.insertAdjacentHTML("beforeend", giftInfo);
 }

 function update() {
     let registerBtn = document.getElementById('updateSubmit');
     registerBtn.addEventListener('click', function () {
         saveChanges();
     });

     function saveChanges() {
         let data = JSON.stringify({
             name: document.getElementById('name').value,
             category: document.getElementById('category').value,
             status: document.getElementById('status').value,
             buyer: document.getElementById('buyer').value,
             price: document.getElementById('price').value,
             link: document.getElementById('link').value,
             photo: document.getElementById('photo').value
         });

         function reqListener0() {
             console.log('Regalo actualizado')
             reload();
         }

         var xhr = new XMLHttpRequest();
         xhr.addEventListener("load", reqListener0());
         xhr.open(HTTTPmethods.put, urlGift);
         xhr.setRequestHeader('Content-Type', 'application/json');
         xhr.send(data);
     }
 }

 function reload() {
     window.location.href = "giftTableA.html";
 }