const ramProducts = porductsData.rams;
let mainElement = document.querySelector('main')
let productDestructure;
ramProducts.forEach((product) => {
  mainElement.innerHTML +=  `
  <div class="productCard">
  <div class="imageWrapper">
    <img alt="${product.name}" src="${product.image}" height="420" width="327">
  </div>
  <div class="productInfo">
    <div class="productText">
      <h1>${product.name}</h1>
      <h2>${product.name} ${product.title}</h2>
      <p>${product.description}</p>
    </div>
    <div class="buttonWrapper">
      <p><span>${product.price.toLocaleString('fa-IR')}</span> تومان</p>
      <button onclick="onclickHandler(${product.id}, ${product.inCart},${product.price}, '${product.name}')">افزودن به سبد خرید</button>
    </div>
  </div>
</div>
`
});

function cartNumbers(productId, productInCart, productPrice, productName) {
  let productNumbers = localStorage.getItem('cartNumbers')
  productNumbers = parseInt(productNumbers)

  if(productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1)
    document.querySelector('#basket').innerHTML = productNumbers + 1
  } else {
    localStorage.setItem('cartNumbers', 1)
    document.querySelector('#basket').innerHTML = 1
  }
  setItems(productId, productInCart, productPrice, productName)
}

function setItems (productId, productInCart, productPrice, productName){
  let cartItem = localStorage.getItem('productsInCart')
  cartItem = JSON.parse(cartItem)

  if(cartItem !== null ) {

    if( cartItem[productId] == undefined) {
      cartItem = {
        ...cartItem,
        [productId]: {
          id: productId,
          price: productPrice,
          name: productName,
          incart: productInCart,
        }
      }
    }
    cartItem[productId].incart +=1
  } else {
    productInCart = 1
    cartItem = {
      [productId]: {
        id: productId,
        price: productPrice,
        name: productName,
       incart: productInCart,
     }
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItem))
}


function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers')
  if(productNumbers) {
    document.querySelector('#basket').innerHTML = productNumbers
  }
}

function totalCost(productPrice) {
  let cartCost = localStorage.getItem('totalCost')

  if(cartCost !=null) {
    cartCost = parseInt(cartCost)
    localStorage.setItem('totalCost', cartCost + productPrice)
  } else {
    localStorage.setItem('totalCost', productPrice)
  }
}


function onclickHandler(productId, productInCart, productPrice, productName) {
  cartNumbers(productId, productInCart, productPrice, productName)
  totalCost(productPrice)
}


onLoadCartNumbers()
