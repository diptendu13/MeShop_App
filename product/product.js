
const product = JSON.parse(sessionStorage.getItem('viewedProduct'));

const showProductFlag = JSON.parse(localStorage.getItem('showProductFlag'));

let productContainer = document.getElementsByClassName('product-container')[0];

const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

let myCart;

if (loggedInUser){
    myCart = JSON.parse(localStorage.getItem(`${loggedInUser.email}`));
}

console.log("flagggggggggggggggg", typeof showProductFlag)

if (showProductFlag){

    let removeItemBtn;

    if (product.category === 'jewelery' || product.category === 'electronics') {
        productContainer.innerHTML = `<div class="product-left">
        <div class="product-image">
            <img src="${product.image}" alt="product-img">
        </div>
        <div class="addToCart" id="remove-item-${product.id}">Remove Item</div>
        </div>
        <div class="product-right">
        <div class="right-common product-category">${product.category}</div>
        <div class="right-common product-title"><span class="prod-caption">Title :</span>${product.title}</div>
        <div class="right-common product-desc"><span class="prod-caption">Description :</span>${product.description}</div>
        <div class="right-common product-price"><span class="prod-caption">Price :</span>₹${product.price}<span class="prod-caption quan">Quantity :</span>${product.quantity}</div>
        <div class="right-common product-ratings"><div><span class="prod-caption">Rating :</span><span class="prod-rating-stars">${product.rating.rate}⭐</span><span class="prod-rating-count">${product.rating.count} ratings</span></div><span class="back-btn">Back</span></div>
        </div>`;

        removeItemBtn = document.getElementById(`remove-item-${product.id}`);
    }
    else {
        productContainer.innerHTML = `<div class="product-left">
        <div class="product-image">
            <img src="${product.image}" alt="product-img">
        </div>
        <div class="addToCart" id="remove-item-${product.id}-${product.sizes[0]}-${product.colors[0]}">Remove Item</div>
        </div>
        <div class="product-right">
        <div class="right-common product-category">${product.category}</div>
        <div class="right-common product-title"><span class="prod-caption">Title :</span>${product.title}</div>
        <div class="right-common product-desc"><span class="prod-caption">Description :</span>${product.description}</div>
        <div class="right-common product-price"><span class="prod-caption">Price :</span>₹${product.price}<span class="prod-caption quan">Quantity :</span>${product.quantity}</div>
        <div class="right-common product-sizes"><span class="prod-caption">Selected size :</span><span class="prod-size-common" id="size1">${product.sizes[0]}</span></div>
        <div class="right-common product-colors"><span class="prod-caption">Selected color :</span><span class="prod-color-common" id="color1" style="background-color: ${product.colors[0]};"></span></div>
        <div class="right-common product-ratings"><div><span class="prod-caption">Rating :</span><span class="prod-rating-stars">${product.rating.rate}⭐</span><span class="prod-rating-count">${product.rating.count} ratings</span></div><span class="back-btn">Back</span></div>
        </div>`;


        removeItemBtn = document.getElementById(`remove-item-${product.id}-${product.sizes}-${product.colors}`);
    }


    removeItemBtn.addEventListener("click", removeItemFromCart);

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
            localStorage.removeItem('showProductFlag');
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


    const backBtn = document.getElementsByClassName('back-btn')[0];

    backBtn.addEventListener("click", () => {
        localStorage.removeItem('showProductFlag');
        location.href = `../myCart`;
    })


}
else {

    if (product.category === 'jewelery' || product.category === 'electronics') {
        productContainer.innerHTML = `<div class="product-left">
        <div class="product-image">
            <img src="${product.image}" alt="product-img">
        </div>
        <div class="addToCart" id="product-${product.id}">Add To Cart</div>
        </div>
        <div class="product-right">
        <div class="right-common product-category">${product.category}</div>
        <div class="right-common product-title"><span class="prod-caption">Title :</span>${product.title}</div>
        <div class="right-common product-desc"><span class="prod-caption">Description :</span>${product.description}</div>
        <div class="right-common product-price"><span class="prod-caption">Price :</span>₹${product.price}</div>
        <div class="right-common product-ratings"><div><span class="prod-caption">Rating :</span><span class="prod-rating-stars">${product.rating.rate}⭐</span><span class="prod-rating-count">${product.rating.count} ratings</span></div><span class="back-btn">Back</span></div>
        </div>`;
    }
    else {
        productContainer.innerHTML = `<div class="product-left">
        <div class="product-image">
            <img src="${product.image}" alt="product-img">
        </div>
        <div class="addToCart" id="product-${product.id}">Add To Cart</div>
        </div>
        <div class="product-right">
        <div class="right-common product-category">${product.category}</div>
        <div class="right-common product-title"><span class="prod-caption">Title :</span>${product.title}</div>
        <div class="right-common product-desc"><span class="prod-caption">Description :</span>${product.description}</div>
        <div class="right-common product-price"><span class="prod-caption">Price :</span>₹${product.price}</div>
        <div class="right-common product-sizes"><span class="prod-caption">Available sizes :</span><span class="prod-size-common" id="size1">${product.sizes[0]}</span><span class="prod-size-common" id="size2">${product.sizes[1]}</span><span class="prod-size-common" id="size3">${product.sizes[2]}</span></div>
        <div class="right-common product-colors"><span class="prod-caption">Available colors :</span><span class="prod-color-common" id="color1" style="background-color: ${product.colors[0]};"></span><span class="prod-color-common" id="color2" style="background-color: ${product.colors[1]};"></span><span class="prod-color-common" id="color3" style="background-color: ${product.colors[2]};"></span></div>
        <div class="right-common product-ratings"><div><span class="prod-caption">Rating :</span><span class="prod-rating-stars">${product.rating.rate}⭐</span><span class="prod-rating-count">${product.rating.count} ratings</span></div><span class="back-btn">Back</span></div>
        </div>`;
    }

// const size1 = document.getElementsByClassName('prod-size-common')[0];
const size1 = document.getElementById('size1');
const size2 = document.getElementById('size2');
const size3 = document.getElementById('size3');

const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');

if (product.category === "men's clothing" || product.category === "women's clothing"){
    size1.addEventListener("click", sizeSelectedFunc);
    size2.addEventListener("click", sizeSelectedFunc);
    size3.addEventListener("click", sizeSelectedFunc);
    
    color1.addEventListener("click", colorSelectedFunc);
    color2.addEventListener("click", colorSelectedFunc);
    color3.addEventListener("click", colorSelectedFunc);
}

// const colorMap = {
//     'rgb(255, 0, 0)': 'red',
//     'rgb(0, 0, 255)': 'blue',
//     'rgb(0, 128, 0)': 'green',
//     'rgb(0, 0, 0)': 'black',
//     'rgb(255, 255, 255)': 'white'
// }

let selectedColor, selectedSize, selectedColorElement, selectedSizeElement;

function colorSelectedFunc(e) {

    if (!sessionStorage.getItem('loggedInUser')) {
        return;
    }
    
    if (selectedColor === e.target.style.backgroundColor){
        return;
    }
    
    selectedColor = e.target.style.backgroundColor;
    selectedColorElement = e.target;
    
    if (e.target.id === 'color1') {
        color2.style.border = '1px solid black';
        color3.style.border = '1px solid black';
    }
    else if (e.target.id === 'color2') {
        color1.style.border = '1px solid black';
        color3.style.border = '1px solid black';
    }
    else {
        color1.style.border = '1px solid black';
        color2.style.border = '1px solid black';
    }

    e.target.style.border = '3.5px solid #2874F0'

    console.log(selectedColor);

}

function sizeSelectedFunc(e) {

    if (!sessionStorage.getItem('loggedInUser')) {
        return;
    }

    if (selectedSize === e.target.textContent){
        return;
    }

    selectedSize = e.target.textContent;
    selectedSizeElement = e.target;

    if (e.target.id === 'size1') {
        size2.style.border = '2px solid #f0f0f0';
        size2.style.color = 'black';

        size3.style.border = '2px solid #f0f0f0';
        size3.style.color = 'black';
    }
    else if (e.target.id === 'size2') {
        size1.style.border = '2px solid #f0f0f0';
        size1.style.color = 'black';

        size3.style.border = '2px solid #f0f0f0';
        size3.style.color = 'black';
    }
    else {
        size1.style.border = '2px solid #f0f0f0';
        size1.style.color = 'black';

        size2.style.border = '2px solid #f0f0f0';
        size2.style.color = 'black';
    }

    e.target.style.border = '2px solid #2874F0';
    e.target.style.color = '#2874F0';

    console.log(selectedSize);
    
}


const addBtn = document.getElementById(`product-${product.id}`);
addBtn.addEventListener("click", addItemToCartFunc);

function addItemToCartFunc() {

    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert("Sign up or login to shop items!");
        return;
    }

    var item = JSON.parse(sessionStorage.getItem('viewedProduct'));

    // console.log(selectedSize);

    if (item.category === "men's clothing" || item.category === "women's clothing"){
        if (!selectedSize){
            alert("Please select a size for the viewed item before adding to cart.");
            return;
        }
    
        // console.log("Inside", selectedColor, selectedSize);
    
        if (!selectedColor){
            alert("Please select a color for the viewed item before adding to cart.");
            return;
        }
    
        item.sizes = selectedSize;
        item.colors = selectedColor;
    }
    item.quantity = 1;
     
    console.log(item);

    var storedItemFlag = false;

    var myCart = JSON.parse(localStorage.getItem(`${loggedInUser.email}`));
    if (!myCart) {
        localStorage.setItem(`${loggedInUser.email}`, JSON.stringify([item]));
    }
    else {

        myCart.forEach((storedItem) => {
            if (storedItem.id === item.id && storedItem.sizes === item.sizes && storedItem.colors === item.colors) {
                storedItem.quantity += 1;
                storedItemFlag = true;
            }
        })

        if (!storedItemFlag) {
            myCart.push(item);
        }
    
        localStorage.setItem(`${loggedInUser.email}`, JSON.stringify(myCart));
    }

    alert("Item has been added to your cart successfully!");

    // console.log(selectedSizeElement, selectedColorElement);

    if (item.category === "men's clothing" || item.category === "women's clothing"){
        selectedSizeElement.style.border = '2px solid #f0f0f0';
        selectedSizeElement.style.color = 'black';
    
        selectedColorElement.style.border = '1px solid black';
    
        selectedSize = undefined;
        selectedSizeElement = undefined;
        selectedColor = undefined;
        selectedColorElement = undefined;
    }
}

const backBtn = document.getElementsByClassName('back-btn')[0];

backBtn.addEventListener("click", () => {
    location.href = `../home`;
})

}
