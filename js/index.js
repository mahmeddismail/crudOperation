// CRUDs

//Create-Read-Update-Delete-Search


var ProductName = document.getElementById("inputName")
var ProductPrice = document.getElementById("inputPrice")
var ProductCategory = document.getElementById("inputCategory")
var ProductDesc = document.getElementById("inputDesc")
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var myErrorMsg = document.querySelector(".myErrorMsg")
var myAddedMsg = document.querySelector(".myAddedMsg")
var mood = 'Add'
var productNum;

// console.log(ProductName,ProductPrice,ProductCategory,ProductDesc);
var productContainer = [];
if (localStorage.getItem('prods') != null) {
    productContainer = JSON.parse(localStorage.getItem('prods'))
    displayProducts(productContainer)
}

addBtn.addEventListener('click', function () {
    if (RegexExpression(ProductName.value, 0)
        && RegexExpression(ProductPrice.value, 1)
        && RegexExpression(ProductCategory.value, 2)) { // Revise
        var products = {
            name: ProductName.value,
            price: ProductPrice.value,
            category: ProductCategory.value,
            desc: ProductDesc.value,

        }
        clearIcons([0, 1, 2]) // Revise

        if (mood === 'Add') {
            productContainer.push(products)

            myAddedMsg.classList.remove('d-none')
            myErrorMsg.classList.add('d-none')
              setTimeout(function () {
                myAddedMsg.classList.add('d-none');
            }, 2000);

        }
        else {
            productContainer[productNum] = products
        }
        // productContainer.unshift(products)
        // console.log(productContainer);
        localStorage.setItem("prods", JSON.stringify(productContainer))
        displayProducts(productContainer)
        clearForm()
        addBtn.classList.replace('btn-warning', 'btn-danger')
        addBtn.innerHTML = 'Add Product'

    }
    else {
        console.log("ERROR");
        // alert("HII")//TODO
        myErrorMsg.classList.remove('d-none')
        myAddedMsg.classList.add('d-none')
    }
})


function displayProducts(arr) {
    var cartonaa = ``;
    for (var i = 0; i < arr.length; i++) {
        cartonaa +=
            `
            <tr>
            <td>${arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>
            `
    }

    document.getElementById("myData").innerHTML = cartonaa;
}


function clearForm() {
    ProductName.value = "";
    ProductPrice.value = "";
    ProductCategory.value = "";
    ProductDesc.value = "";

}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex, 1)
    localStorage.setItem("prods", JSON.stringify(productContainer))
    displayProducts(productContainer)
}
// console.log(
//     "Samsung Note 10".toLowerCase().includes("note".toLowerCase())

// );

function searchProducts(text) {
    var matchedProducts = []
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(text.toLowerCase()) == true) {
            // console.log(productContainer[i]);
            matchedProducts.push(productContainer[i])
        }
    }
    displayProducts(matchedProducts)
}

function updateProduct(index) {

    addBtn.classList.replace('btn-danger', 'btn-warning')
    // updateBtn.classList.replace('d-none', 'd-block')

    ProductName.value = productContainer[index].name
    ProductPrice.value = productContainer[index].price
    ProductCategory.value = productContainer[index].category
    ProductDesc.value = productContainer[index].desc
    addBtn.innerHTML = 'Update'
    mood = 'Update'
    productNum = index;
}

//*****************************************************************/
// REGEXXXXX//
var RegexProductName = /^[A-Z][a-z\sA-Z]{1,20}$/
var RegexProductPrice = /^[0-9]{1,10}$/
var RegexProductCategory = /^[A-Z][a-z\sA-Z]{1,20}$/ //**TODO
var RegexProductDesc = /^[A-Z][a-z]{2,25}$/  //ToDo
let Inputs = document.querySelectorAll('.inputValue')
let myIcon = document.querySelectorAll('.myIcon')
let myIconMarked = document.querySelectorAll('.myIconMarked')



function RegexExpression(value, index) {
    if (index === 0) {
        return RegexProductName.test(value);
    }
    if (index === 1) {
        return RegexProductPrice.test(value);
    }

    if (index === 2) {
        return RegexProductCategory.test(value);
    }

    // Add more conditions for other input fields

    return false;

}

// how can i control every input alone

// it's workingggg but i need to add an index parameter

Inputs.forEach(function (input, index) {  // Revise
    input.addEventListener('keyup', function () {
        if (RegexExpression(input.value, index)) {
            myIconMarked[index].style.opacity = "1";
            myIconMarked[index].style.color = "rgba(35, 212, 0, 0.8)";
            myIcon[index].style.opacity = "0";
            addBtn.removeAttribute("disabled");
            updateBtn.removeAttribute("disabled");
            // console.log("green");
        }
        else {
            myIcon[index].style.opacity = "1";
            myIconMarked[index].style.opacity = "0";
            addBtn.disabled = true;
            updateBtn.disabled = true;
            // console.log("red");
        }
    });
});


function clearIcons(arrayNum) {  // Revise
    arrayNum.forEach(function (index) {
        myIconMarked[index].style.opacity = "0";
        myIcon[index].style.opacity = "0";
    });
}