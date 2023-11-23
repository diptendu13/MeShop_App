console.log("Homepage");

const all = document.getElementById("all");
const mens = document.getElementById("men's clothing");
const womens = document.getElementById("women's clothing");
const jewellery = document.getElementById("jewelery");
const electronics = document.getElementById("electronics");



const colorsArray = ["red","blue","green","black","white"];

const sizesArray = ["S","M","L","XL","XXL"];

const categoryIndices = ["men's clothing","women's clothing","jewelery","electronics"];

let notFirstTimeFlag = false;

let prevCategoryFlag;

let currArray = [];

let baseArray = [];

let colorFilter = [];
let sizeFilter = [];
let minRatingFilter = 0;
let priceRangeFilter = [];
// console.log("Now",currArray);



const red = document.getElementById('red');
const blue = document.getElementById('blue');
const green = document.getElementById('green');
const black = document.getElementById('black');
const white = document.getElementById('white');


const small = document.getElementById('S');
const medium = document.getElementById('M');
const large = document.getElementById('L');
const xLarge = document.getElementById('XL');
const xxLarge = document.getElementById('XXL');


const minRating = document.getElementById('minRating');


const firstRange = document.getElementById('range-0-24');
const secondRange = document.getElementById('range-25-49');
const thirdRange = document.getElementById('range-50-74');
const fourthRange = document.getElementById('range-75-99');
const fifthRange = document.getElementById('range-100');

const applyFilterBtn = document.getElementById('apply-filter-btn');



red.addEventListener('change', colorFilterFunc);
blue.addEventListener('change', colorFilterFunc);
green.addEventListener('change', colorFilterFunc);
black.addEventListener('change', colorFilterFunc);
white.addEventListener('change', colorFilterFunc);


small.addEventListener('change', sizeFilterFunc);
medium.addEventListener('change', sizeFilterFunc);
large.addEventListener('change', sizeFilterFunc);
xLarge.addEventListener('change', sizeFilterFunc);
xxLarge.addEventListener('change', sizeFilterFunc);


minRating.addEventListener('change', minRatingFilterFunc);

firstRange.addEventListener('click', priceRangeFilterFunc);
secondRange.addEventListener('click', priceRangeFilterFunc);
thirdRange.addEventListener('click', priceRangeFilterFunc);
fourthRange.addEventListener('click', priceRangeFilterFunc);
fifthRange.addEventListener('click', priceRangeFilterFunc);


applyFilterBtn.addEventListener('click', applyFilterFunc);



function colorFilterFunc(e) {
    // console.log(e.target.id);
    if (colorFilter.includes(e.target.id)){
        colorFilter.splice(colorFilter.indexOf(e.target.id), 1);
    }
    else {
        colorFilter.push(e.target.id);
    }
    console.log(colorFilter);
}

function sizeFilterFunc(e) {
    // console.log(e.target.id);
    if (sizeFilter.includes(e.target.id)){
        sizeFilter.splice(sizeFilter.indexOf(e.target.id), 1);
    }
    else {
        sizeFilter.push(e.target.id);
    }
    console.log(sizeFilter);
}

function minRatingFilterFunc(e) {
    minRatingFilter = e.target.value;
    console.log(minRatingFilter);
}


function priceRangeFilterFunc(e) {
    // console.log(e.target.id);
    if (priceRangeFilter.includes(e.target.id)){
        priceRangeFilter.splice(priceRangeFilter.indexOf(e.target.id), 1);
    }
    else {
        priceRangeFilter.push(e.target.id);
    }
    console.log(priceRangeFilter);
}

let selectedFilters = [];

function applyFilterFunc(e) {
    console.log(e.target.id);
    // console.log(currCategory);

    var filteredArray = [];
    
    var allTrueFlag;

    var checkFlags = {
        colorFlag : false,
        sizeFlag : false,
        minRatingFlag : false,
        priceRangeFlag : false
    }

    // {
    //     color : false,
    //     size : false,
    //     minRating : false,
    //     priceRange : false
    // }

    // var finalSFArray = [];

    
    // console.log(selectedFilters);
    

    if (colorFilter.length > 0 && !selectedFilters.includes('colorFlag')) {
        selectedFilters.push('colorFlag');
    }
    else if (colorFilter.length === 0 && selectedFilters.includes('colorFlag')) {
        selectedFilters.splice(selectedFilters.indexOf('colorFlag'), 1);
    }

    if (sizeFilter.length > 0 && !selectedFilters.includes('sizeFlag')) {
        selectedFilters.push('sizeFlag');
    }
    else if (sizeFilter.length === 0 && selectedFilters.includes('sizeFlag')) {
        selectedFilters.splice(selectedFilters.indexOf('sizeFlag'), 1);
    }

    if (Number(minRatingFilter) > 0 && !selectedFilters.includes('minRatingFlag')) {
        selectedFilters.push('minRatingFlag');
    }
    else if (Number(minRatingFilter) === 0 && selectedFilters.includes('minRatingFlag')) {
        selectedFilters.splice(selectedFilters.indexOf('minRatingFlag'), 1);
    }

    if (priceRangeFilter.length > 0 && !selectedFilters.includes('priceRangeFlag')) {
        selectedFilters.push('priceRangeFlag');
    }
    else if (priceRangeFilter.length === 0 && selectedFilters.includes('priceRangeFlag')) {
        selectedFilters.splice(selectedFilters.indexOf('priceRangeFlag'), 1);
    }

    // for (let key in selectedFilters){
    //     // console.log(selectedFilters[key]);
    //     if (selectedFilters[key]){
    //         finalSFArray.push(`${key}`);
    //     }
    // }

    console.log(selectedFilters, "tumi");
    console.log(currArray);
    

    currArray.forEach(item => {

        allTrueFlag = true;
        checkFlags.colorFlag = false;
        checkFlags.sizeFlag = false;
        checkFlags.minRatingFlag = false;
        checkFlags.priceRangeFlag = false;

        // console.log("colorfilter",colorFilter)
        // console.log("sizefilter",sizeFilter)
        // console.log("ratefilter",minRatingFilter)
        // console.log("pricefilter",priceRangeFilter)

        // console.log("Inside for each");

        if (item.category === "men's clothing" || item.category === "women's clothing"){

            // logic for color filter
            for (let i=0; i<colorFilter.length; i++){
                if (item.colors.includes(colorFilter[i])){
                    checkFlags.colorFlag = true;
                    break;
                }
            }
            

            // logic for size filter
            for (let i=0; i<sizeFilter.length; i++){
                if (item.sizes.includes(sizeFilter[i])){
                    checkFlags.sizeFlag = true;
                    break;
                }
            }
            
        }

        // logic for min rating filter
        if (item.rating.rate >= minRatingFilter){
            checkFlags.minRatingFlag = true;
        }

        // logic for price range filter
        for (let i=0; i<priceRangeFilter.length; i++){
            let limits = priceRangeFilter[i].split('-');
            if (limits.length === 3){
                let lowerLimit = Number(limits[1]);
                let upperLimit = Number(limits[2]);
                if (item.price >= lowerLimit && item.price <= upperLimit){
                    checkFlags.priceRangeFlag = true;
                    break;
                }
            }
            else {
                let lowerLimit = Number(limits[1]);
                if (item.price >= lowerLimit){
                    checkFlags.priceRangeFlag = true;
                    break;
                }
            }
        }

        // console.log(item.id, item.title, checkFlags.colorFlag, checkFlags.sizeFlag, checkFlags.minRatingFlag, checkFlags.priceRangeFlag);
        
        for (let i=0; i<selectedFilters.length; i++){
            if (checkFlags.hasOwnProperty(selectedFilters[i])){
                if (!checkFlags[selectedFilters[i]]){
                    allTrueFlag = false;
                    break;
                }
                // console.log(selectedFilters[i], checkFlags[selectedFilters[i]]);
            }
        }

        if (allTrueFlag){
            filteredArray.push(item);
        }

    });


    console.log(filteredArray);

    showfilteredArray(filteredArray);

}


function showfilteredArray(filteredArray) {

    currArray.forEach(item => {
        var catItem = document.getElementById(`item-${item.id}`);
        // console.log(catItem);
        catItem.style.display = 'flex';
    });

    var hideItems = currArray.filter(item => {
        return !filteredArray.includes(item);
    });

    console.log(hideItems);

    hideItems.forEach(item => {
        var catItem = document.getElementById(`item-${item.id}`);
        console.log(catItem);
        catItem.style.display = 'none';
    });

}


function resetFilters() {
    red.checked = false;
    blue.checked = false;
    green.checked = false;
    black.checked = false;
    white.checked = false;

    small.checked = false;
    medium.checked = false;
    large.checked = false;
    xLarge.checked = false;
    xxLarge.checked = false;

    minRating.value = 0;

    firstRange.checked = false;
    secondRange.checked = false;
    thirdRange.checked = false;
    fourthRange.checked = false;
    fifthRange.checked = false;

    colorFilter = [];
    sizeFilter = [];
    minRatingFilter = 0;
    priceRangeFilter = [];

    selectedFilters = [];

    currArray.forEach(item => {
        var catItem = document.getElementById(`item-${item.id}`);
        // console.log(catItem);
        catItem.style.display = 'flex';
    });
}






window.onload = () => {
    getItemsViaCategory.call(null, all);
}


const BASE_URL = 'https://fakestoreapi.com/products';

async function getAll () {
    var response = await fetch(BASE_URL);
    var data = await response.json();
    // console.log(data);
    return data;
}

all.addEventListener('click', getItemsViaCategory);
// all.addEventListener('click', setCurrentCategory);
mens.addEventListener('click', getItemsViaCategory);
// mens.addEventListener('click', setCurrentCategory);
womens.addEventListener('click', getItemsViaCategory);
// womens.addEventListener('click', setCurrentCategory);
jewellery.addEventListener('click', getItemsViaCategory);
// jewellery.addEventListener('click', setCurrentCategory);
electronics.addEventListener('click', getItemsViaCategory);
// electronics.addEventListener('click', setCurrentCategory);

async function getItemsViaCategory(e) {

    var targetElementId;
    // console.log("we cannnnnnnnnnnnnnn", e);

    if (e instanceof PointerEvent){
        targetElementId = e.target.id;
    }
    else{
        targetElementId = e.id;
    }

    setCurrentCategory(prevCategoryFlag, targetElementId);

    prevCategoryFlag = targetElementId;

    if (notFirstTimeFlag){

        if (targetElementId === "all"){
            currArray = JSON.parse(JSON.stringify(baseArray));
        }
        else {
            currArray = baseArray.filter(item => {
                return item.category === targetElementId;
            })
        }

        resetFilters();

        if (targetElementId === 'jewelery' || targetElementId === 'electronics') {
            red.disabled = true;
            blue.disabled = true;
            green.disabled = true;
            black.disabled = true;
            white.disabled = true;

            small.disabled = true;
            medium.disabled = true;
            large.disabled = true;
            xLarge.disabled = true;
            xxLarge.disabled = true;

        }
        else {
            red.disabled = false;
            blue.disabled = false;
            green.disabled = false;
            black.disabled = false;
            white.disabled = false;

            small.disabled = false;
            medium.disabled = false;
            large.disabled = false;
            xLarge.disabled = false;
            xxLarge.disabled = false;
        }

        showCurrentHideOthers(targetElementId);

        return;
    }

    var data = await getAll();

    var updatedData = await getUpdatedData(data);
    // console.log("yessssssssssssssss", updatedData);
    // console.log(data[0].category);

    baseArray = JSON.parse(JSON.stringify(updatedData));


    if (targetElementId === 'all'){
        renderData(updatedData, targetElementId);
        return;
    }

    // var filteredData = await updatedData.filter(item => {
    //     return item.category === targetElementId;
    // });


    // console.log("Noooooooooooooooooooo",filteredData);
    
    // renderData(filteredData, targetElementId);


}



async function getUpdatedData(data) {
    var count = data.length;

    var finalArray = JSON.parse(JSON.stringify(data));


    // console.log("real",data);
    // console.log("THis",finalArray);
    for (let i=0; i<data.length; i++){
        
        let newObj = JSON.parse(JSON.stringify(finalArray[i]));
        newObj.id = ++count;
        finalArray.push(newObj);
        // console.log(newObj.id);
    }
    // console.log(data);
    
    for (let j=0; j<finalArray.length; j++){

        if (finalArray[j].category !== "men's clothing" && finalArray[j].category !== "women's clothing"){
            continue;
        }

        let indices = await randomIndexGenerator();
        finalArray[j].colors = [];
        indices.forEach(idx => {
            finalArray[j].colors.push(colorsArray[idx]);
        });

        finalArray[j].sizes = [];
        indices.forEach(idx => {
            finalArray[j].sizes.push(sizesArray[idx]);
        });
        // break;
    }
    
    // console.log("New",finalArray);

    return finalArray;
}


async function randomIndexGenerator() {
    var indices = [];

    while (indices.length < 3){
        let idx = Math.floor(Math.random() * 5);
        if (!indices.includes(idx)){
            indices.push(idx);
        }
    }
    // console.log("yeh wala", indices);
    return indices;
}
// randomColorGenerator();

function renderData(data, categoryFlag) {

    currArray = JSON.parse(JSON.stringify(data));

    // currCategory = categoryFlag;
    // console.log("Next",currArray);


    // setCurrentCategory(prevCategoryFlag, categoryFlag);

    // prevCategoryFlag = categoryFlag;

    // if (notFirstTimeFlag){
    //     showCurrentHideOthers(categoryFlag);
    //     return;
    // }


    // logic to show all categories that might be hidden previously and clear all previously stored
    // categoryIndices.forEach(catItem => {
    //     var category = document.getElementsByClassName('category-items')[categoryIndices.indexOf(catItem)];
    //     var categoryItemsContainer = category.lastElementChild.firstElementChild;
    //     categoryItemsContainer.innerHTML = "";
    //     category.style.display = 'flex';
    // });


    if(categoryFlag === "all"){
        console.log(categoryIndices.indexOf(categoryFlag));

        notFirstTimeFlag = true;

        data.forEach(item => {
            // console.log(item.category);
            // var starRating = ratingConverter(item.rating.rate);

            if (item.category === "men's clothing") {
                let categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
                // console.log("dipu",item.colors);
                let categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
                // console.log("dipu2",categoryItemsContainer);


                let categoryItem = document.createElement('div');
                categoryItem.setAttribute('class', 'category-item');
                categoryItem.setAttribute('id', `item-${item.id}`);
                categoryItem.innerHTML = `<div class="item-image">
                <img src="${item.image}" alt="item-image">
            </div>
            <div class="item-desc">
                <div class="desc-common item-title"><span>${item.title}</span></div>
                <div class="desc-common item-price-size-wrapper">
                    <div class="item-price">₹${item.price}</div>
                    <div class="item-size"><span class="sz" id="size-1">${item.sizes[0]}</span><span class="sz" id="size-2">${item.sizes[1]}</span><span class="sz" id="size-3">${item.sizes[2]}</span></div>
                </div>
                <div class="desc-common item-colors">Colors :<span class="colr" id="color-1" style="background-color: ${item.colors[0]};"></span><span class="colr" id="color-2" style="background-color: ${item.colors[1]};"></span><span class="colr" id="color-3" style="background-color: ${item.colors[2]};"></span></div>
                <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
            </div>
            <div class="viewItem" id="view-item-${item.id}">View Item</div>`;

                categoryItemsContainer.append(categoryItem);
            }
            else if (item.category === "women's clothing") {
                let categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
                // console.log("dipu",item.colors);
                let categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
                // console.log("dipu2",categoryItemsContainer);

                let categoryItem = document.createElement('div');
                categoryItem.setAttribute('class', 'category-item');
                categoryItem.setAttribute('id', `item-${item.id}`);
                categoryItem.innerHTML = `<div class="item-image">
                <img src="${item.image}" alt="item-image">
            </div>
            <div class="item-desc">
                <div class="desc-common item-title"><span>${item.title}</span></div>
                <div class="desc-common item-price-size-wrapper">
                    <div class="item-price">₹${item.price}</div>
                    <div class="item-size"><span class="sz" id="size-1">${item.sizes[0]}</span><span class="sz" id="size-2">${item.sizes[1]}</span><span class="sz" id="size-3">${item.sizes[2]}</span></div>
                </div>
                <div class="desc-common item-colors">Colors :<span class="colr" id="color-1" style="background-color: ${item.colors[0]};"></span><span class="colr" id="color-2" style="background-color: ${item.colors[1]};"></span><span class="colr" id="color-3" style="background-color: ${item.colors[2]};"></span></div>
                <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
            </div>
            <div class="viewItem" id="view-item-${item.id}">View Item</div>`;

                categoryItemsContainer.append(categoryItem);
            }
            else if (item.category === "jewelery") {
                let categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
                // console.log("dipu",item.colors);
                let categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
                // console.log("dipu2",categoryItemsContainer);

                let categoryItem = document.createElement('div');
                categoryItem.setAttribute('class', 'category-item');
                categoryItem.setAttribute('id', `item-${item.id}`);
                categoryItem.innerHTML = `<div class="item-image">
                <img src="${item.image}" alt="item-image">
            </div>
            <div class="item-desc">
                <div class="desc-common item-title"><span>${item.title}</span></div>
                <div class="desc-common item-price-size-wrapper">
                    <div class="item-price">₹${item.price}</div>
                </div>
                <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
            </div>
            <div class="viewItem" id="view-item-${item.id}">View Item</div>`;

                categoryItemsContainer.append(categoryItem);
            }
            else {
                let categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
                // console.log("dipu",item.colors);
                let categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
                // console.log("dipu2",categoryItemsContainer);

                let categoryItem = document.createElement('div');
                categoryItem.setAttribute('class', 'category-item');
                categoryItem.setAttribute('id', `item-${item.id}`);
                categoryItem.innerHTML = `<div class="item-image">
                <img src="${item.image}" alt="item-image">
            </div>
            <div class="item-desc">
                <div class="desc-common item-title"><span>${item.title}</span></div>
                <div class="desc-common item-price-size-wrapper">
                    <div class="item-price">₹${item.price}</div>
                </div>
                <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
            </div>
            <div class="viewItem" id="view-item-${item.id}">View Item</div>`;

                categoryItemsContainer.append(categoryItem);
            }

            var product = document.getElementById(`view-item-${item.id}`);
            product.addEventListener("click", () => {
                sessionStorage.setItem('viewedProduct', JSON.stringify(item));
                location.href = '../product';
                // displayProductDetails();
            })
        })

    }
    // else{
        // console.log(categoryIndices.indexOf(categoryFlag));

        


        

        // logic to hide other categories
        // let hideItems = categoryIndices.filter(index => {
        //     return index !== categoryFlag;
        // });
        
        // let hideIndex = [];

        // hideItems.forEach(item => {
        //     var index = categoryIndices.findIndex(catItem => {
        //         return catItem === item;
        //     });
        //     hideIndex.push(index);
        // });

        // console.log("comeeeeeeeeeeeeeeeeeeeeeeee", hideIndex);

        // hideIndex.forEach(index => {
        //     var hideCategory = document.getElementsByClassName('category-items')[index];
        //     hideCategory.style.display = 'none';
        // })



        // logic to show current category
        // let showIndex = categoryIndices.findIndex(item => {
        //     return item === categoryFlag;
        // });
        // let showCategory = document.getElementsByClassName('category-items')[showIndex];
        // showCategory.style.display = 'flex';

        
        // sessionStorage.setItem('hideIndex', JSON.stringify(hideIndex));


        // check if category is men's clothing
        // if (categoryFlag === "men's clothing") {

        //     data.forEach(item => {
        //         // console.log(item.category);
        //         // var starRating = ratingConverter(item.rating.rate);
    
        //             var categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
        //             // console.log("dipu",item.colors);
        //             var categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
        //             // console.log("dipu2",categoryItemsContainer);
    
        //             var categoryItem = document.createElement('div');
        //             categoryItem.setAttribute('class', 'category-item');
        //             categoryItem.setAttribute('id', `item-${item.id}`);
        //             categoryItem.innerHTML = `<div class="item-image">
        //             <img src="${item.image}" alt="item-image">
        //         </div>
        //         <div class="item-desc">
        //             <div class="desc-common item-title"><span>${item.title}</span></div>
        //             <div class="desc-common item-price-size-wrapper">
        //                 <div class="item-price">₹${item.price}</div>
        //                 <div class="item-size"><span class="sz" id="size-1">${item.sizes[0]}</span><span class="sz" id="size-2">${item.sizes[1]}</span><span class="sz" id="size-3">${item.sizes[2]}</span></div>
        //             </div>
        //             <div class="desc-common item-colors">Colors :<span class="colr" id="color-1" style="background-color: ${item.colors[0]};"></span><span class="colr" id="color-2" style="background-color: ${item.colors[1]};"></span><span class="colr" id="color-3" style="background-color: ${item.colors[2]};"></span></div>
        //             <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
        //         </div>
        //         <div class="viewItem" id="view-item-${item.id}">View Item</div>`;
    
        //             categoryItemsContainer.append(categoryItem);
                
        //     });
        // }

        // check if category is women's clothing
        // else if (categoryFlag === "women's clothing"){

        //     data.forEach(item => {
        //         // console.log(item.category);
        //         // var starRating = ratingConverter(item.rating.rate);
    
        //             var categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
        //             // console.log("dipu",item.colors);
        //             var categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
        //             // console.log("dipu2",categoryItemsContainer);
    
        //             var categoryItem = document.createElement('div');
        //             categoryItem.setAttribute('class', 'category-item');
        //             categoryItem.setAttribute('id', `item-${item.id}`);
        //             categoryItem.innerHTML = `<div class="item-image">
        //             <img src="${item.image}" alt="item-image">
        //         </div>
        //         <div class="item-desc">
        //             <div class="desc-common item-title"><span>${item.title}</span></div>
        //             <div class="desc-common item-price-size-wrapper">
        //                 <div class="item-price">₹${item.price}</div>
        //                 <div class="item-size"><span class="sz" id="size-1">${item.sizes[0]}</span><span class="sz" id="size-2">${item.sizes[1]}</span><span class="sz" id="size-3">${item.sizes[2]}</span></div>
        //             </div>
        //             <div class="desc-common item-colors">Colors :<span class="colr" id="color-1" style="background-color: ${item.colors[0]};"></span><span class="colr" id="color-2" style="background-color: ${item.colors[1]};"></span><span class="colr" id="color-3" style="background-color: ${item.colors[2]};"></span></div>
        //             <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
        //         </div>
        //         <div class="viewItem" id="view-item-${item.id}">View Item</div>`;
    
        //             categoryItemsContainer.append(categoryItem);
                
        //     });
        // }

        // check if category is jewelery
        // else if (categoryFlag === "jewelery"){

        //     data.forEach(item => {
        //         // console.log(item.category);
        //         // var starRating = ratingConverter(item.rating.rate);
    
        //             var categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
        //             // console.log("dipu",item.colors);
        //             var categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
        //             // console.log("dipu2",categoryItemsContainer);
    
        //             var categoryItem = document.createElement('div');
        //             categoryItem.setAttribute('class', 'category-item');
        //             categoryItem.setAttribute('id', `item-${item.id}`);
        //             categoryItem.innerHTML = `<div class="item-image">
        //             <img src="${item.image}" alt="item-image">
        //         </div>
        //         <div class="item-desc">
        //             <div class="desc-common item-title"><span>${item.title}</span></div>
        //             <div class="desc-common item-price-size-wrapper">
        //                 <div class="item-price">₹${item.price}</div>
        //             </div>
        //             <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
        //         </div>
        //         <div class="viewItem" id="view-item-${item.id}">View Item</div>`;
    
        //             categoryItemsContainer.append(categoryItem);
                
        //     });
        // }

        // check if category is electronics
        // else {
        //     data.forEach(item => {
        //         // console.log(item.category);
        //         // var starRating = ratingConverter(item.rating.rate);
    
        //             var categoryItems = document.getElementsByClassName('category-items')[categoryIndices.indexOf(item.category)];
        //             // console.log("dipu",item.colors);
        //             var categoryItemsContainer = categoryItems.lastElementChild.firstElementChild;
        //             // console.log("dipu2",categoryItemsContainer);
    
        //             var categoryItem = document.createElement('div');
        //             categoryItem.setAttribute('class', 'category-item');
        //             categoryItem.setAttribute('id', `item-${item.id}`);
        //             categoryItem.innerHTML = `<div class="item-image">
        //             <img src="${item.image}" alt="item-image">
        //         </div>
        //         <div class="item-desc">
        //             <div class="desc-common item-title"><span>${item.title}</span></div>
        //             <div class="desc-common item-price-size-wrapper">
        //                 <div class="item-price">₹${item.price}</div>
        //             </div>
        //             <div class="desc-common item-rating">Rating :<span class="ratingStars">${item.rating.rate}⭐</span><span class="ratingCount">${item.rating.count} ratings</span></div>
        //         </div>
        //         <div class="viewItem" id="view-item-${item.id}">View Item</div>`;
    
        //             categoryItemsContainer.append(categoryItem);
                
        //     });
        // } 
    // }
}


function setCurrentCategory(prev, curr) {
    // console.log(JSON.parse(sessionStorage.getItem('hideIndex')));

    // var prevHideIndex = JSON.parse(sessionStorage.getItem('hideIndex'));

    if (prev === undefined){
        console.log("trueeeeeeeeeeeeeeeeeeeeeeeeee")
        return;
    }
    else if (prev === curr){
        return;
    }

    var prevCategory, currCategory;

    try{
        prevCategory = document.getElementById(prev);
        prevCategory.style.backgroundColor = 'black';
        prevCategory.style.color = "white";

        currCategory = document.getElementById(curr);
        currCategory.style.backgroundColor = 'white';
        currCategory.style.color = 'black';
        currCategory.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset';
        currCategory.style.fontWeight = '500';
    }
    catch(e) {

    }
}


function showCurrentHideOthers(categoryFlag) {


    // logic to show all categories that might be hidden previously and clear all previously stored
    if (categoryFlag === 'all'){
        categoryIndices.forEach(catItem => {
            var category = document.getElementsByClassName('category-items')[categoryIndices.indexOf(catItem)];
            category.style.display = 'flex';
        });
        return;
    }

    // logic to hide other categories
    // var hideItems = categoryIndices.filter(index => {
    //     return index !== categoryFlag;
    // });
    
    // var hideIndex = [];

    // hideItems.forEach(item => {
    //     var index = categoryIndices.findIndex(catItem => {
    //         return catItem === item;
    //     });
    //     hideIndex.push(index);
    // });

    // console.log("comeeeeeeeeeeeeeeeeeeeeeeee", hideIndex);

    // hideIndex.forEach(index => {
    //     var hideCategory = document.getElementsByClassName('category-items')[index];
    //     hideCategory.style.display = 'none';
    // });

    categoryIndices.forEach(catItem => {
        var category = document.getElementsByClassName('category-items')[categoryIndices.indexOf(catItem)];
        category.style.display = 'none';
    })



    // logic to show current category
    var showIndex = categoryIndices.findIndex(item => {
        return item === categoryFlag;
    });
    var showCategory = document.getElementsByClassName('category-items')[showIndex];
    showCategory.style.display = 'flex';

}



// search functionality

let searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
    var searchTerm = searchInput.value.toLowerCase();
    searchByNameWithinCategory(searchTerm);
});

function searchByNameWithinCategory(searchTerm) {
    for (let i=0; i<currArray.length; i++){
        let item = document.getElementById(`item-${currArray[i].id}`);
        let title = currArray[i].title.toLowerCase();

        if (title.includes(searchTerm)){
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    }
}