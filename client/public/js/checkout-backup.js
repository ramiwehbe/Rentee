window.onload = function() {

    //Load the order summary from session storage 
    let selectedProducts = sessionStorage.getItem("cart").split(',');
    //Create a local variable to hold the order total
    let total = 0;
    let priceArray = [];
    //Make an api call for each product
    //for  (let i = 0; i < selectedProducts.length; i++) {
    selectedProducts.forEach(element => {
        //console.log("here");
        let url = '/api/products/id/' + element;
        $.ajax(url, {method: 'GET'})
        .then(function(response){
  
            response = response[0];//Set it to the first array item
            // console.log("response is: ",response);
            if(response)
              priceArray.push(response.price);
            total = total + response.price;
  
            let item = 
            `<li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">${response.name}</h6>
            </div>
            <span id = "price" class="text-muted" value = ${response.price}>$${response.price}</span>
            <span><button id="delete-item">Remove Item</button></span>
          </li>`;
          
          $('#checkout-products').append(item);
          //console.log(total);
          $('#order-total').text(`$${total}`);
  
          var deleteItemBtns = Array.from(document.querySelectorAll('#delete-item'));
          //console.log ("Delete Item Btns: ", deleteItemBtns);
          deleteItemBtns[deleteItemBtns.length-1].setAttribute("data-name", priceArray[deleteItemBtns.length])
          deleteItemBtns[deleteItemBtns.length-1].addEventListener('click', function(e){
            e.preventDefault();
            //console.log("current element index is: ", );
            console.log("index of clicked item: ", )
            console.log("original split: ",sessionStorage.cart.split(",") );
            console.log("element to be removed: ",sessionStorage.cart.split(",").splice(deleteItemBtns.length-1,1) )
            //selectedProducts =  - sessionStorage.cart.splice(deleteItemBtns.length-1,1);
            console.log("Session storage inside: ", selectedProducts);
            total-=priceArray[deleteItemBtns.length-1]
            $('#order-total').text(`$${total}`);
            $(this).parent().parent().remove();     
          })
        })
    })
    //)
  
  
  
      //dynamically populate this checkout-products
  
  
  
   
  
  }
  