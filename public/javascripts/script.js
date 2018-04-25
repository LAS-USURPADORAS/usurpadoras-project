// document.addEventListener('DOMContentLoaded', () => {

//   function getTotalPrice() {
//     var quantity = document.getElementsById("quantity")[0].value;
    
//     for(var i = 0; i < quantity.length; i++ ) {
//       var unitPrice = 15;
//       var totalPrice = document.getElementsByClassName("total-price")[0];
  
//       totalPrice.setAttribute("value", unitPrice * quantity);
//       totalPrice.innerHTML = unitPrice * quantity;
//     }
  
//     var totalPrices = document.getElementsByClassName("total-price");
//     var total = 0;
//     for(var j = 0; j < totalPrices.length; j++) {
//       total += parseInt(totalPrices[j].getAttribute("value"));
//     }
    
//     document.getElementById("result").innerHTML = total;
  
//   }

//   window.onload = function(){
//     var calculatePriceButton = document.getElementById('calc-prices-button');
//     var createItemButton = document.getElementById('new-item-create');
//     var deleteButtons = document.getElementsByClassName('btn-delete');
  
//     calculatePriceButton.onclick = getTotalPrice;
//     //createItemButton.onclick = createNewItem;
  
//     for(var i = 0; i<deleteButtons.length ; i++){
//       deleteButtons[i].onclick = deleteItem;
//     }

// }}, false);
