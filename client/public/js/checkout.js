window.onload = function() {

  //Load the order summary from session storage 
  let selectedProducts = sessionStorage.getItem("cart").split(',');
  //Create a local variable to hold the order total
  let total = 0;
  let priceArray = [];
  //Make an api call for each product
  for  (let i = 0; i < selectedProducts.length; i++) {
  //selectedProducts.forEach(element => {
    //console.log("here");
    let url = '/api/products/id/' + selectedProducts[i];
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
        <span><button id="delete-item" index = -5>Remove Item</button></span>
      </li>`;
      
      $('#checkout-products').append(item);
      //console.log(total);
      $('#order-total').text(`$${total}`);
      var deleteItemBtn = document.getElementById("#delete-item")
      var deleteItemBtns = Array.from(document.querySelectorAll('#delete-item'));
      deleteItemBtns[i].setAttribute("index", i)
      deleteItemBtns[i].addEventListener('click', function(e){
        e.preventDefault();
        console.log("Remove Item Index is: ", deleteItemBtns[i].getAttribute("index") );
        total-=priceArray[i];
        $('#order-total').text(`$${total}`);
        $(this).parent().parent().remove();
        let removeFromCartURL = '/api/products/' + selectedProducts[i];
        console.log("removeFromCartURL: ", removeFromCartURL);
        $.ajax(removeFromCartURL, {method: 'PUT'})
          .then(function(response){
            console.log(response);
          })
      })
      
    }) 
  }
  
}
