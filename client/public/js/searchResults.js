window.onload = function() {

    //Grab search results from search and then use this to perform your search
    // let searchParam = window.location.href.split('search/:')[1];
    let searchParam = window.location.href.split('/');

    if(searchParam[4] === 'category'){
        console.log("this is a categpry");
        retrieveCategoryProducts(searchParam[5]);
    }
    else{
        if (searchParam[4] == 'all'){
            retrieveAllProducts();
        }
        else{
            retrieveSearchedProducts(searchParam[4]);
        }
    }

    console.log(searchParam);


    //If empty, display all 
    
    //Need to add more logic for the rest of the search functionality

}


$(document).ready(function(){


    // Click handlers
    $(document).on('click', '#submit-search', function(e){
            
        e.preventDefault();

        //TODO Change to handle the actual search query, for now just display all 
        console.log("here");

    })	

    $(document).on('click', '#rent-button', function(e){
        e.preventDefault();
        console.log("Rental Item clicked: ",$(this).data('id'));
        console.log("clicked");
        $(this).text("Already Booked");
        //set this in session variable to put in your cart
        let toStore = $(this).data('id'); 
        //Build a string separated by commas 
        if(sessionStorage.getItem("cart") !== null){
            toStore = toStore + ',' + sessionStorage.getItem("cart")
        }
        sessionStorage.setItem("cart", toStore);
        console.log("to store inside: ", toStore);
        $('#modal').modal('show');
    })
    $(document).on('click', '#proceed-to-checkout', function(e){ 
        e.preventDefault();
        window.location = '/checkout';
    })

    $(document).on('click', '#modal-view-all-products', function(e){ 
        e.preventDefault();
        console.log('clicked');
        window.location = '/search/all';
    })

})

// FUNCTION DECLARATIONS


function retrieveAllProducts() {

    //Get all products
    $.ajax('/api/products', {method: 'GET'})
    .then(function(response){
        console.log("completed ajax");
        displayProducts(response);
        
    });

}

function retrieveSearchedProducts(term){

    let url =  '/api/products/search/' + term;
    console.log(url);

    $.ajax(url, {method: 'GET'})
    .then(function(response){
        console.log("completed ajax");
        console.log(response);
        displayProducts(response);
        
    });

}

function retrieveCategoryProducts(cat){
    let url = '/api/products/category/' + cat;

    $.ajax(url, {method: 'GET'})
    .then(function(response){
        console.log("completed ajax");
        console.log("displaying response after search: ", response.length);
        if(response.length)
        displayProducts(response);
        
    });

}



function displayProducts(body){

    //Loop through body of response and create a card for each item and append it to the element div 
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
            <button class="btn btn-primary" id="rent-button" data-id=${element.id}>Rent It</button>
        </div>
        </div>
        </div>
        `;
        $('#product-content').append(productCard);
    
    });

    
}

