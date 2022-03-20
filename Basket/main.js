const mainElement = document.querySelector('.cartItems')
const onItem = document.querySelector('.cartItem')
let noProductElement = document.querySelector('.noProduct')
let cartContainer = document.querySelector('.cartContainer')
let totalPriceElement = document.querySelector('.totalAmount')
let buyButtom = document.querySelector('.buy')
let cartItem = localStorage.getItem('productsInCart')
let listOfProductsInbasket
if(cartItem) {
  cartItem = JSON.parse(cartItem)
  listOfProductsInbasket = Object.values(cartItem)
}
let cartCost = localStorage.getItem('totalCost')
let totalCost = cartCost

function dispalyCart() {
  if(cartItem) {
    listOfProductsInbasket.map(product => {
      mainElement.innerHTML +=`
      <div class="cartItem cartItem_${product.id}">
        <div class="imageBox">
          <img src="../../Images/img${product.id}.jpg" alt="img${product.id}" height="100" />
        </div>
        <div id="about">
          <h3 class="title">${product.name}</h3>
        </div>
        <div class="counter">
          <a class="btn" onclick="increase(${product.id})">+</a>
          <div class="count_${product.id}">${product.incart}</div>
          <a class="btn" onclick="decrease(${product.id})">-</a>
        </div>

        <div class="prices">
          <div class="amount">${product.price.toLocaleString('fa-IR')}</div>
          <div class="remove"><span class="inStock">موجود است</span></div>
        </div>
      </div>
      `
    })

    totalPriceElement.innerHTML = `
    ${parseInt(totalCost).toLocaleString('fa-IR')}
    `
  }
  if(mainElement.children.length === 0) {
    noProductElement.style.display="flex"
    cartContainer.style.display="none"
  }
}

function increase(id) {
  listOfProductsInbasket = listOfProductsInbasket.map((item) =>{
    let oldNumber = item.incart
    if(item.id === id) {
      let count = document.querySelector(`.count_${id}`)
      oldNumber++
      count.innerHTML = oldNumber
      totalCost = parseInt(totalCost) + item.price
      totalPriceElement.innerHTML = totalCost.toLocaleString('fa-IR')
    }
    return {
      ...item,
      incart : oldNumber
    }
  } )
}

function decrease(id) {
  listOfProductsInbasket = listOfProductsInbasket.map((item) =>{
    let oldNumber = item.incart
    if(item.id === id && oldNumber > 0) {
      let count = document.querySelector(`.count_${id}`)
      oldNumber--
      count.innerHTML = oldNumber
      totalCost = parseInt(totalCost) - item.price
      totalPriceElement.innerHTML = totalCost.toLocaleString('fa-IR')
        if(parseInt(totalCost) == 0) {
          noProductHanlder()
        }
      if(oldNumber === 0) {
        let productElement = document.querySelector(`.cartItem_${id}`)
        productElement.remove()
      }
    }

    return {
      ...item,
      incart : oldNumber
    }
  } )
}

dispalyCart()

function noProductHanlder() {
  noProductAlarmDisplay()
  removeAllProductsFromLocalStorage()
}

function removeAllProductsFromLocalStorage() {
  localStorage.removeItem('productsInCart')
  localStorage.removeItem('totalCost')
  localStorage.removeItem('cartNumbers')
}

function noProductAlarmDisplay() {
  if(parseInt(totalCost) == 0) {
    noProductElement.style.display="flex"
    cartContainer.style.display="none"
  }
}

function buyProducts (button) {
  button.addEventListener('click', removeAllProductsFromLocalStorage)
}

buyProducts(buyButtom)