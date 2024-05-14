import {menuArray} from '/data.js'

const menuEl = document.getElementById("menu")
const orderEl = document.getElementById("order")
const orderListEl = document.getElementById("orderitemlist")
const completeBtn = document.getElementById("complete-btn")

const cardDiv = document.getElementById("card-details")
const cardFormEl = document.getElementById("card-form")

let isPaid = false

function getMenuDisplay(){
    let menuHtml = ``
    menuArray.forEach(menuItem => {
        menuHtml += `
        <div class="item">
            <p class="emoji">${menuItem.emoji}</p>
            <div class="description">
                <p class="name">${menuItem.name}</p>
                <p class="ingredients">${menuItem.ingredients}</p>
                <p class="price">$${menuItem.price}</p>
            </div>
            <button class="add" data-add="${menuItem.id}">+</button>
        </div>    
            `
    });
    menuEl.innerHTML = menuHtml
}
getMenuDisplay()

let orderArray = []
function getOrder() {
    renderOrderList(orderArray)
    menuEl.addEventListener('click', function(e){     
        if (e.target.dataset.add && !isPaid) {
            // console.log(e.target.dataset.add)
            const item = menuArray.filter(function(menuitem){
                if (menuitem.id==e.target.dataset.add){
                    return menuitem
                }
            })[0]
            orderArray.push(item)  
            renderOrderList(orderArray)
        }

        
    })
}
getOrder()

// render order list
function renderOrderList(array){
    if (array.length>0) {
        orderEl.style.display = 'block';
        let orderHtml = ``
        let totalPrice = 0   
        array.forEach(order => {
            orderHtml += `
                <div class="orderitem">
                    <p class="ordername">${order.name}</p>
                    <button data-remove="${order.id}">remove</button>
                    <p class="orderprice">$${order.price}</p>
                </div>           
            `
        totalPrice += order.price    
        });
        orderHtml += `
            <div class="orderitem total">
                <p class="ordername">Total price: </p>
                <p class="orderprice">$${totalPrice}</p>
            </div>
        `
        orderListEl.innerHTML = orderHtml
        // console.log(orderHtml)
    } else {
        orderEl.style.display = 'none'
    }
}

// delete order
orderEl.addEventListener('click', function(e){
    if (e.target.dataset.remove) {
        orderArray.forEach(order => {
            if (order.id == e.target.dataset.remove) {
                orderArray.pop(order)
            }
        });
        renderOrderList(orderArray)
    }
})

completeBtn.addEventListener('click', function(){
    cardDiv.style.display = 'block'
})


cardFormEl.addEventListener('submit', function(e){
    e.preventDefault()
    const formData = new FormData(cardFormEl)
    const username = formData.get('username')
    const cardnum = formData.get('cardnum')
    const cvv = formData.get('cvv')
    // console.log(username+cardnum+cvv)
    isPaid = true
    if(isPaid) {
        cardDiv.style.display = 'none'
        orderEl.style.display = 'none'
        const thankEl = document.getElementById("thank")
        thankEl.style.display = 'block'
        thankEl.innerHTML = `<p>Thanks, ${username}! Your order is on its way!</p>`
    }

})

