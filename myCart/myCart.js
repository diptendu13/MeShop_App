console.log("mycartpage");


const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

const myCart = JSON.parse(localStorage.getItem(`${loggedInUser.email}`));

// console.log(myCart);

let myCartItemsContainer = document.getElementsByClassName('myCart-items-container')[0];
let checkoutList = document.getElementById('checkout-list');
let checkoutTotalAmount = document.getElementById('checkout-total-amount');
let totalAmount = 0;

myCart.forEach((item) => {
    // console.log(item);
    let removeItemBtn;
    let categoryItem;
    let checkoutListItem;

    if (item.category === "men's clothing" || item.category === "women's clothing") {
        categoryItem = document.createElement('div');
        categoryItem.setAttribute('class', 'category-item');
        categoryItem.setAttribute('id', `cart-item-${item.id}-${item.sizes}-${item.colors}`);

        categoryItem.innerHTML = `<div class="item-image">
        <img src="${item.image}" alt="item-image">
        </div>
        <div class="item-desc">
            <div class="desc-common item-title"><span>${item.title}</span></div>
            <div class="item-price-quantity-wrapper">
                <div class="item-price"><span>₹${item.price}</span></div>
                <div class="item-quantity">Quantity :<span id="quantity-${item.id}-${item.sizes}-${item.colors}">${item.quantity}</span></div>
            </div>
            <div class="desc-common item-size">Selected-size :<span class="sz" id="selected-size">${item.sizes}</span></div>
            <div class="desc-common item-colors">Selected-color :<span class="colr" id="selected-color" style="background-color: ${item.colors}"></span></div>
            <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
        </div>
        <div class="removeItem" id="remove-item-${item.id}-${item.sizes}-${item.colors}">Remove Item</div>`

        myCartItemsContainer.append(categoryItem);

        removeItemBtn = document.getElementById(`remove-item-${item.id}-${item.sizes}-${item.colors}`);


        // checkout section

        checkoutListItem = document.createElement('div');
        checkoutListItem.setAttribute('class', 'checkout-list-item');
        checkoutListItem.setAttribute('id', `checkout-list-item-${item.id}-${item.sizes}-${item.colors}`);


        checkoutListItem.innerHTML = `<div class="checkout-quantity-title"><span class="checkout-item-quantity" id="checkout-item-quantity-${item.id}-${item.sizes}-${item.colors}">${item.quantity}</span><span class="checkout-item-title" id="checkout-item-title-${item.id}-${item.sizes}-${item.colors}">${item.title}</span></div><span class="checkout-item-price" id="checkout-item-price-${item.id}-${item.sizes}-${item.colors}">₹${item.price}</span>`

        checkoutList.append(checkoutListItem);

    }
    else {
        categoryItem = document.createElement('div');
        categoryItem.setAttribute('class', 'category-item');
        categoryItem.setAttribute('id', `cart-item-${item.id}`);

        categoryItem.innerHTML = `<div class="item-image">
        <img src="${item.image}" alt="item-image">
        </div>
        <div class="item-desc">
            <div class="desc-common item-title"><span>${item.title}</span></div>
            <div class="item-price-quantity-wrapper">
                <div class="item-price"><span>₹${item.price}</span></div>
                <div class="item-quantity">Quantity :<span id="quantity-${item.id}">${item.quantity}</span></div>
            </div>
            <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
        </div>
        <div class="removeItem" id="remove-item-${item.id}">Remove Item</div>`

        myCartItemsContainer.append(categoryItem);

        removeItemBtn = document.getElementById(`remove-item-${item.id}`);



        // checkout section

        checkoutListItem = document.createElement('div');
        checkoutListItem.setAttribute('class', 'checkout-list-item');
        checkoutListItem.setAttribute('id', `checkout-list-item-${item.id}`);


        checkoutListItem.innerHTML = `<div class="checkout-quantity-title"><span class="checkout-item-quantity" id="checkout-item-quantity-${item.id}">${item.quantity}</span><span class="checkout-item-title" id="checkout-item-title-${item.id}">${item.title}</span></div><span class="checkout-item-price" id="checkout-item-price-${item.id}">₹${item.price}</span>`

        checkoutList.append(checkoutListItem);


    }

    totalAmount += Number(`${item.price}`);

    removeItemBtn.addEventListener("click", removeItemFromCart);

    categoryItem.addEventListener("click", () => {showProduct(categoryItem.id)});
    console.log(removeItemBtn);
})

checkoutTotalAmount.innerHTML = '₹' + Math.round(totalAmount);

function showProduct(itemId) {
    console.log("Etaaaaaaaaa", itemId);

    let removeItemInfo = itemId;
    let removeItemId, removeItemSize, removeItemColor;

    if (removeItemInfo.split('-').length === 5){
        removeItemId = removeItemInfo.split('-')[2];
        removeItemSize = removeItemInfo.split('-')[3];
        removeItemColor = removeItemInfo.split('-')[4];
    }
    else {
        removeItemId = removeItemInfo.split('-')[2];
    }

    
    for (let i=0; i<myCart.length; i++){
        let item = myCart[i];

        if (String(item.id) === removeItemId){
            if (removeItemSize && removeItemColor) {
                if (removeItemSize === String(item.sizes) && removeItemColor === String(item.colors)) {
                    let seeItem = {...item};
                    seeItem.sizes = [seeItem.sizes];
                    seeItem.colors = [seeItem.colors];

                    console.log("Seeeeeeeeeeeeeeeeeeee", seeItem);

                    sessionStorage.setItem('viewedProduct', JSON.stringify(seeItem));

                    localStorage.setItem('showProductFlag', true);

                    break;
                }
            }
            else {

                sessionStorage.setItem('viewedProduct', JSON.stringify(item));

                localStorage.setItem('showProductFlag', true);

                break;
            }
        } 
    }
    location.href = '../product';
    
}

let categoryItemOverlay = document.getElementsByClassName('category-item-overlay')[0];


function removeItemFromCart(e) {

    event.stopPropagation();
    console.log(e.target.id);
    
    if (categoryItemOverlay.classList.contains('deactivate')){
        categoryItemOverlay.classList.remove('deactivate');
    }

    
    localStorage.setItem('removeItemInfo', e.target.id);

    // console.log(cancelBtnEvent)
    // removeBtn.addEventListener('click', removeAction);
}

let cancelBtn = document.getElementById('cancel-btn');
let removeBtn = document.getElementById('remove-btn');

cancelBtn.addEventListener('click', cancelAction);

removeBtn.addEventListener('click', removeAction);


function removeAction() {

    let removeItemInfo = localStorage.getItem('removeItemInfo');
    let removeItemId, removeItemSize, removeItemColor;

    if (removeItemInfo.split('-').length === 5){
        removeItemId = removeItemInfo.split('-')[2];
        removeItemSize = removeItemInfo.split('-')[3];
        removeItemColor = removeItemInfo.split('-')[4];
    }
    else {
        removeItemId = removeItemInfo.split('-')[2];
    }

    for (let i=0; i<myCart.length; i++){
        let item = myCart[i];

        if (String(item.id) === removeItemId){
            if (removeItemSize && removeItemColor) {
                if (removeItemSize === String(item.sizes) && removeItemColor === String(item.colors)) {
                    myCart.splice(i, 1);
                    localStorage.setItem(`${loggedInUser.email}`, JSON.stringify(myCart));
                    break;
                }
            }
            else {
                myCart.splice(i, 1);
                localStorage.setItem(`${loggedInUser.email}`, JSON.stringify(myCart));
                break;
            }
        } 
    }

    if (!categoryItemOverlay.classList.contains('deactivate')){
        alert('Item has been removed successfully from the cart!');
        localStorage.removeItem('removeItemInfo');
        categoryItemOverlay.classList.add('deactivate');
        location.href = '/myCart';
    }
    
}

function cancelAction() {
    if (localStorage.getItem('removeItemInfo')){
        localStorage.removeItem('removeItemInfo');
    }
    if (!categoryItemOverlay.classList.contains('deactivate')){
        categoryItemOverlay.classList.add('deactivate');
    }
}