/* const { response } = require("express") */

const vue = new Vue({
    el: '#app',
    data() {
        return {
            catalog: [],
            cart: []
        }
    },
    methods: {
        addHandler(good) {

            if (good.quantity > 0) {
                
                switch (good.in_cart) {
                    case 0:
                        this.cart.push(good);   
                    default:
                        good.in_cart++
                }

                for (let i = this.catalog.length; i--; ) {
                    if (this.catalog[i].product_id == good.product_id) {
                        this.catalog[i].quantity--;
                    }
                };
                
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