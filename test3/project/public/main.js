/* const { response } = require("express") */

const vue = new Vue({
    el: '#app',
    data() {
        return {
            searchIn: '',
            catalog: [],
            cart: [],
            searchGoods: [],
        }
    },
    methods: {
        addHandler(good) {

            let index;

            if (good.quantity > 0) {
                index = this.cart.findIndex((item) => item.product_id == good.product_id);
                if (index != -1) {
                    this.cart[index].in_cart++;
                    this.cart[index].quantity--;
                } else {
                    let goodToCart = Object.assign({}, good);
                    goodToCart.in_cart = 1;
                    goodToCart.quantity--;

                    this.cart.push(goodToCart);
                }

                index = this.catalog.findIndex((item) => item.product_id == good.product_id);
                if (index != -1) {
                    this.catalog[index].quantity--;
                }
            }
            
            fetch('/cart', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.cart), // преобразует строку в джейсон
            })

            fetch('/catalog', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.catalog)
            })

        },
        delHandler(good) {
/*             for (let i = this.cart.length; i--; ) {
                if (this.cart[i].product_id == good.product_id) {
                    this.cart.splice(i, 1);
                }
            }; */

            for (let i = this.cart.length; i--; ) {
                if (this.cart[i].product_id == good.product_id) {
                    switch (good.in_cart) {
                        case 1:
                            this.cart.splice(i, 1);
                        default:
                            good.in_cart--;
                    }
                }
            };


            for (let i = this.catalog.length; i--; ) {
                if (this.catalog[i].product_id == good.product_id) {
                    this.catalog[i].quantity++;
                }
            };
            
            index = this.cart.findIndex((item) => item.product_id == good.product_id);
                if (index != -1) {
                    this.cart[index].quantity++;
                }

            fetch('/cart', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.cart),
            })

            fetch('/catalog', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.catalog)
            })
        },
        searchGood () {
            this.searchGoods =[];
            let regSearch = new RegExp(this.searchIn, 'i');
            this.catalog.forEach((good) => {    
                 if (regSearch.test(good.product_title)) {
                    this.searchGoods.push(good);
                 } 
            })
            console.log(this.searchGoods);
            this.searchIn = '';
        }
    },
    mounted() {
        fetch('/catalog')
            .then((response) => {
                return response.json()
            })    
            .then((data) => {
                this.catalog = data;
            }),
        fetch('/cart')
            .then((response) => {
                return response.json()
            })    
            .then((data) => {
                this.cart = data;
            })
    }
})