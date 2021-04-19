menuButton.addEventListener('click', () => menu.classList.toggle('menu-popup_hidden'));
closeButton.addEventListener('click', () => menu.classList.toggle('menu-popup_hidden'));

const updateCartQuantity = () => {
    const onGetCart = (cart) => {
        let cart_count = cart.item_count; 

        document.querySelectorAll('.cart-count').forEach(elem => {
            if(cart_count < 10) cart_count = `0${cart_count}`;
            elem.textContent = cart_count;
        }) 
    }

    $.ajax({
        url: '/cart.js',
        dataType: 'json',
        success: onGetCart
    });
}

const addToCart = function(variant_id){
    const {
      button         = this,
      timeoutTime    = 1500,
      url            = '/cart/add.js',
      type           = 'POST',
      quantity       = 1,
      addToCart      = "В корзину",
      addingToCart   = "Добавляем...",
      addedToCart    = "Спасибо!",
      maximumReached = "Достигнут лимит"
    } = {}; 
    
    if(button.getAttribute('disabled') == true) return;
    
    button.textContent = addingToCart;
    button.setAttribute('disabled', true);
  
    const data = {
        items: [
            {
              quantity,
              id: variant_id
            }
        ]
    };
  
    const onSuccess = () => {
        button.textContent = addedToCart; 
  
        setTimeout(() => {
          button.removeAttribute('disabled');
          button.textContent = addToCart;
        }, timeoutTime);

        updateCartQuantity();
    };
  
    const onError = () => {
        button.textContent = maximumReached;
        button.setAttribute('disabled', true); 

        setTimeout(() => {
            button.removeAttribute('disabled');
            button.textContent = addToCart;
        }, timeoutTime);
    }

    $.ajax({
        url,
        type,
        data,
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
};

const onWindowClick = (e) => {
    const addToCartClassName = "add-to-cart";

    if(e.target.classList.contains(addToCartClassName)){
        const currentSize = document.querySelector('input[name="size"]:checked'); 
        const variant_id = currentSize ? currentSize.parentNode.querySelector('span').getAttribute('data-value') : document.querySelector('.item__variants-padding[data-selected="true"]').getAttribute('data-value');
        
        addToCart.call(e.target, variant_id);
        e.preventDefault();
    }
}

const clearCartFromEmptyItems = () => { 
    const onGetCart = (cart) => {
        cart.items.forEach((item) => {
            const isEmpty = item.handle === null; 

            //if(isEmpty) CartJS.removeItemById(item.variant_id);
        })
    }

    $.ajax({
        url: '/cart.js',
        dataType: 'json',
        success: onGetCart
    });
} 

document.addEventListener('click', onWindowClick)
window.addEventListener('load', clearCartFromEmptyItems);

rivets.formatters['='] = function (value, arg) {
    return value == arg;
}

rivets.formatters['>'] = function (value, arg) {
    return value > arg; 
}

rivets.formatters['>='] = function (value, arg) {
    return value >= arg;
}

rivets.formatters['<'] = function (value, arg) {
    return value < arg;
}

rivets.formatters['<='] = function (value, arg) {
    return value <= arg;
} 