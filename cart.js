//ye neche wala real code
if (document.readyState == 'loading')
{
  document.addEventListener("DOMContentLoaded", ready)
} else
{
  ready();
}

function ready()
{
  var p_mainImgSrc = "";
  var p_itemTitle = "";
  var p_itemPrice = "";
  var p_itemQuantity = "";
 // variable for size
  // var p_itemSize ='';
  // remove cart item - accessing buttons
  var removeCartItemsBtn = document.getElementsByClassName("fa-times-circle");

  for (var i = 0; i < removeCartItemsBtn.length; i++)
  {
    var button = removeCartItemsBtn[i];
    button.addEventListener('click', removeCartItem);
  }
  // Quantity change - accesing qty inputs

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");

  for (var i = 0; i < quantityInputs.length; i++)
  {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
    input.addEventListener('change', updateSubtotal);
    input.addEventListener('change', updateCartTotal);
  }

//  // adding items to cart 

//   var cartBody = document.getElementById("cart-body");

//   if (cartBody)
//   {
//     if (localStorage.getItem('cartData') != null)
//     {
//       var myCartData = JSON.parse(localStorage.getItem('cartData'));

//       for (var i = 0; i < myCartData.length; i++)
//       {
//         var itemData = myCartData[i];

//         var subtotal = Number(itemData[2].replace("Rs", "").trim()) * Number(itemData[3]);


//         var cartRow = document.createElement('tr');
//         cartRow.classList.add("cart-row");
//         cartRow.innerHTML = `<td>
//          <i class="far fa-times-circle"></i>
//         </td>
//         <td><img src="${itemData[0]}" alt="" /></td>
//         <td>${itemData[1]}</td>
//          <td class="cart-price">${itemData[2]}</td>
//          <td><input type="number" value="${itemData[3]}" class="cart-quantity-input" min="1"/></td>
//         <td class="cart-item-subtotal">Rs ${subtotal}</td>`;

//         var cartItems = document.getElementById("cart-body");

//         cartItems.appendChild(cartRow);

//         cartRow.getElementsByClassName("fa-times-circle")[0].addEventListener('click', removeCartItem);


//         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
//         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);
//         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
//         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateCartTotal);

//         updateCartTotal();


// // THIS CODE TELLS ABOUT  size OF ITEM (SMALL,LARGE ,XL)

var cartBody = document.getElementById("cart-body");

if (cartBody) {
  if (localStorage.getItem('cartData') != null) {
    var myCartData = JSON.parse(localStorage.getItem('cartData'));

    for (var i = 0; i < myCartData.length; i++) {
      var itemData = myCartData[i];
      var size = itemData[4]; // Assuming size information is at index 4
      var subtotal = Number(itemData[2].replace("Rs", "").trim()) * Number(itemData[3]);

      var cartRow = document.createElement('tr');
      cartRow.classList.add("cart-row");
      cartRow.innerHTML = `<td>
        <i class="far fa-times-circle"></i>
      </td>
      <td><img src="${itemData[0]}" alt="" /></td>
      <td>${size}</td> 
      <td>${itemData[1]}</td>
      <td class="cart-price">${itemData[2]}</td>
      <td><input type="number" value="${itemData[3]}" class="cart-quantity-input" min="1"/></td>
      <td class="cart-item-subtotal">Rs ${subtotal}</td>`;

      var cartItems = document.getElementById("cart-body");

      cartItems.appendChild(cartRow);

      cartRow.getElementsByClassName("fa-times-circle")[0].addEventListener('click', removeCartItem);

      cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
      cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);
      cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
      cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateCartTotal);

      updateCartTotal();

      }
    } 
  }
}
    
// Rest of functions (removeCartItem, quantityChanged, updateSubtotal, updateCartTotal)...














    updateCartTotal();

    // purchase btn

    var purchaseBtn = document.getElementById("btn-purchase");

    purchaseBtn.addEventListener('click', purchaseBtnClicked);

  

























// update subtotal - function

function updateSubtotal(event)
{
  var input = event.target;

  var curCartRow = input.parentElement.parentElement;

  var curPriceElement = curCartRow.getElementsByClassName("cart-price")[0];
  var curPrice = parseFloat(curPriceElement.innerText.replace("Rs", "").trim());

  var curQuantity = input.value;

  var subtotal = curQuantity * curPrice;

  curCartRow.getElementsByClassName("cart-item-subtotal")[0].innerText = "Rs " + subtotal;

  // var mainImgSrc = document.getElementById("MainImg").src;


}


// Quantity change - function

function quantityChanged(event)
{
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0)
  {
    input.value = 0;// wese 1 hai
  }
  updateCartTotal();

}

// remove cart item - function
function removeCartItem(event)
{
  var buttonClicked = event.target;

  var cartRow = buttonClicked.parentElement.parentElement;

  var cartTitle = cartRow.getElementsByTagName('td')[2].innerHTML;

  var existingCartData = JSON.parse(localStorage.getItem('cartData'));

  for (var i = 0; i < existingCartData.length; i++)
  {
    if (existingCartData[i][1] == cartTitle)
    {
      existingCartData.splice(i, 1);
    }

  }

  localStorage.setItem('cartData', JSON.stringify(existingCartData));

  buttonClicked.parentElement.parentElement.remove();

  updateCartTotal();
}






























// update cart total - function
function updateCartTotal()
{
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];

  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;

  for (var i = 0; i < cartRows.length; i++)
  {
    var cartRow = cartRows[i];
    var subtotalElement = cartRow.getElementsByClassName("cart-item-subtotal")[0];

    var subtotal = parseFloat(subtotalElement.innerText.replace("Rs", "").trim());

    var total = total + subtotal;

  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("cart-subtotal")[0].innerText = "Rs " + total;
  document.getElementsByClassName("cart-total")[0].innerText = "Rs" + total;

}

// Purchase clicked - function

function purchaseBtnClicked(event)
{
  if(localStorage.getItem("cartData") != null)
  {
    localStorage.removeItem('cartData');
  
    alert("Processing your Payment. \nPlease wait. . .")
    location.href='loader.html';
    
  }else{
    
    alert("Shopping cart Empty. Please Add Items to Your cart!")
  }

}




function coupon() {
  var couponCode = document.getElementById("couponInput").value;

  if (couponCode === "115689") {
    alert("Coupon is already used.");
  } 
  
  else if (couponCode == "0000")
  {
    alert("Gotcha !You got 20 % discount on your one product");
    alert("Whatsapp Us ! With the images of  product you want to buy and coupon code");
  }
  else 
  {
    alert("Please Enter Valid Coupon Code!");
  }

}





























// // modified by hamion
// //ye neche wala real code

// document.addEventListener('DOMContentLoaded', ready);

// function ready() {
//     var p_mainImgSrc = "";
//     var p_itemTitle = "";
//     var p_itemPrice = "";
//     var p_itemQuantity = "";
//     // variable for size
//     // var p_itemSize ='';
//     // remove cart item - accessing buttons
//     var removeCartItemsBtn = document.getElementsByClassName("fa-times-circle");

//     for (var button in removeCartItemsBtn) {
//         button.addEventListener('click', removeCartItem);
//     }
//     // Quantity change - accesing qty inputs

//     var quantityInputs = document.getElementsByClassName("cart-quantity-input");

//     for (var input in quantityInputs) {
//         input.addEventListener('change', quantityChanged);
//         input.addEventListener('change', updateSubtotal);
//         input.addEventListener('change', updateCartTotal);
//     }

//     //  // adding items to cart 

//     //   var cartBody = document.getElementById("cart-body");

//     //   if (cartBody)
//     //   {
//     //     if (localStorage.getItem('cartData') != null)
//     //     {
//     //       var myCartData = JSON.parse(localStorage.getItem('cartData'));

//     //       for (var i = 0; i < myCartData.length; i++)
//     //       {
//     //         var itemData = myCartData[i];

//     //         var subtotal = Number(itemData[2].replace("Rs", "").trim()) * Number(itemData[3]);


//     //         var cartRow = document.createElement('tr');
//     //         cartRow.classList.add("cart-row");
//     //         cartRow.innerHTML = `<td>
//     //          <i class="far fa-times-circle"></i>
//     //         </td>
//     //         <td><img src="${itemData[0]}" alt="" /></td>
//     //         <td>${itemData[1]}</td>
//     //          <td class="cart-price">${itemData[2]}</td>
//     //          <td><input type="number" value="${itemData[3]}" class="cart-quantity-input" min="1"/></td>
//     //         <td class="cart-item-subtotal">Rs ${subtotal}</td>`;

//     //         var cartItems = document.getElementById("cart-body");

//     //         cartItems.appendChild(cartRow);

//     //         cartRow.getElementsByClassName("fa-times-circle")[0].addEventListener('click', removeCartItem);


//     //         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
//     //         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);
//     //         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
//     //         cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateCartTotal);

//     //         updateCartTotal();


//     // // THIS CODE TELLS ABOUT  size OF ITEM (SMALL,LARGE ,XL)

//     var cartBody = document.getElementById("cart-body");

//     if (localStorage.getItem('cartData') != null) {
//         var myCartData = JSON.parse(localStorage.getItem('cartData'));

//         for (var itemData in myCartData) {
//             var size = itemData[4]; // 4 is the fifth item in an array/list because it's counted: 0,1,2,3,4,5,... just a reminder
//             var subtotal = Number(itemData[2].replace('Rs', '').trim()) * Number(itemData[3]);

//             var cartRow = document.createElement('tr');
//             cartRow.classList.add('cart-row');
//             cartRow.innerHTML = `
//         <td><i class="far fa-times-circle"></i></td>
//         <td><img src="${itemData[0]}" alt="" /></td>
//         <td>${size}</td> 
//         <td>${itemData[1]}</td>
//         <td class="cart-price">${itemData[2]}</td>
//         <td><input type="number" value="${itemData[3]}" class="cart-quantity-input" min="1"/></td>
//         <td class="cart-item-subtotal">Rs ${subtotal}</td>
//         `;

//             // var cartItems = document.getElementById('cart.body');
//             cartBody.appendChild(cartRow);

//             cartRow.getElementsByClassName('fa-times-circle')[0].addEventListener('click', removeCartItem);
//             cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateSubtotal);
//             cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
//             cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateCartTotal);
//         }
//         updateCartTotal();
//     }
// }

// // Rest of functions (removeCartItem, quantityChanged, updateSubtotal, updateCartTotal)...


// // purchase btn

// var purchaseBtn = document.getElementById("btn-purchase");

// purchaseBtn.addEventListener('click', purchaseBtnClicked);



// // update subtotal - function

// function updateSubtotal(event) {
//     var input = event.target;

//     var curCartRow = input.parentElement.parentElement;

//     var curPriceElement = curCartRow.getElementsByClassName("cart-price")[0];
//     var curPrice = parseFloat(curPriceElement.innerText.replace("Rs", "").trim());

//     var curQuantity = input.value;

//     var subtotal = curQuantity * curPrice;

//     curCartRow.getElementsByClassName("cart-item-subtotal")[0].innerText = "Rs " + subtotal;

//     // var mainImgSrc = document.getElementById("MainImg").src;


// }


// // Quantity change - function

// function quantityChanged(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 0;// wese 1 hai
//     }
//     updateCartTotal();

// }

// // remove cart item - function
// function removeCartItem(event) {
//     var buttonClicked = event.target;

//     var cartRow = buttonClicked.parentElement.parentElement;

//     var cartTitle = cartRow.getElementsByTagName('td')[2].innerHTML;

//     var existingCartData = JSON.parse(localStorage.getItem('cartData'));



//     for (var i = 0; i < existingCartData.length; i++) {
//         if (existingCartData[i][1] == cartTitle) {
//             existingCartData.splice(i, 1);
//         }

//     }

//     localStorage.setItem('cartData', JSON.stringify(existingCartData));

//     buttonClicked.parentElement.parentElement.remove();

//     updateCartTotal();
// }






























// // update cart total - function
// function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName("cart-items")[0];

//     var cartRows = cartItemContainer.getElementsByClassName("cart-row");
//     var total = 0;

//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i];
//         var subtotalElement = cartRow.getElementsByClassName("cart-item-subtotal")[0];

//         var subtotal = parseFloat(subtotalElement.innerText.replace("Rs", "").trim());

//         var total = total + subtotal;

//     }
//     total = Math.round(total * 100) / 100;

//     document.getElementsByClassName("cart-subtotal")[0].innerText = "Rs " + total;
//     document.getElementsByClassName("cart-total")[0].innerText = "Rs" + total;

// }

// // Purchase clicked - function

// function purchaseBtnClicked(event) {
//     if (localStorage.getItem("cartData") != null) {
//         localStorage.removeItem('cartData');

//         alert("Processing your Payment. \nPlease wait. . .")
//         location.href = 'loader.html';

//     } else {

//         alert("Shopping cart Empty. Please Add Items to Your cart!")
//     }

// }




// // coupon invalid

// function coupon() {
//     alert("Please Enter Valid Coupon Code!")
// }
