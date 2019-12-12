window.onload = function() {
    retrieveAllProducts();       
}
$(document).ready(function(){
    // Click handlers
    $(document).on('click', '#submit-search', function(e){ 
        e.preventDefault();
        //TODO Change to handle the actual search query, for now just display all 
        console.log("here");
    })	

    $(document).on('click', '#remove-product-btn', function(e){
        if($(this).text() !== "Deleted"){
            e.preventDefault();
            $(this).text("Deleted");
            console.log("THIS IS: ",$(this).attr('data-id'));
            let delurl = '/api/deleteProducts/id/' + $(this).attr('data-id');
            $.ajax(delurl, {method: 'DELETE'})
            .then(function(response){ 
                console.log(response);
            })
        }
    })

    $(document).on('click', '#activate-product-btn', function(e){ 
        if($(this).text() !== "Activated"){
            e.preventDefault();
            $(this).text("Activated");
            let activateURL = '/api/products/' + $(this).attr('data-id') ;
            console.log("removeFromCartURL: ", activateURL);
            $.ajax(activateURL, {method: 'PUT'})
            .then(function(response){
            console.log(response);
            })
        }
    })
})

function retrieveAllProducts() {

    //Get all products
    $.ajax('/api/products', {method: 'GET'})
    .then(function(response){
        console.log("completed ajax");
        displayProducts(response);
        
    });

}
function displayProducts(body){
    //Loop through body of response and create a card for each item and append it to the element div 
    if(body.length) {
        $('#product-content').empty();
        body.forEach(element => {
            let productCard = 
            `
            <div class="product-card">
            <div class="slideUp">
            <div class="product-card-body">
            <img class="product-image" src="${element.image_url}">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <p class="card-text">${element.price}</p>
                <p class="card-text">${element.date_available}</p>
                <span>
                    <button class="btn btn-primary" id="remove-product-btn" data-id=${element.id}>Delete</button>
                    <button class="btn btn-primary" id="activate-product-btn" data-id=${element.id}>Activate</button>
                </span>
            </div>
            </div>
            </div>
            `;
        $('#product-content').append(productCard);   
        });
    }
    
}

