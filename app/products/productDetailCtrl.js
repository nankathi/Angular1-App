(function () {
    "use strict";

    angular.module("productManagement")
           .controller("ProductDetailCtrl",
                        ["product",
                        "productService",
                        ProductDetailCtrl]);

    function ProductDetailCtrl(product, productService) {
        var vm = this;

        // vm.product = {
        //             "productId": 1,
        //             "productName": "Leaf Rake",
        //             "productCode": "GDN-0011",
        //             "releaseDate": "March 19, 2009",
        //             "description": "Leaf rake with 48-inch wooden handle.",
        //             "cost": 9.00,
        //             "price": 19.95,
        //             "category": "garden",
        //             "tags": ["leaf", "tool"],
        //             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            
        // };

        vm.product = product;//injected product from the resolve property of the state productDetail
        vm.title = "Product Detail: " + vm.product.productName;

        vm.marginPercent = productService.calculateMarginPercent(vm.product.price ,vm.product.cost);

        if(vm.product.tags){
            vm.product.tagList = vm.product.tags.toString();
        }
    }
})();