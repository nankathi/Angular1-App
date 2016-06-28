/// </// <reference path="../../../../typings/angularjs/angular.d.ts" />
(function(){
    "use strict"
    var app = angular.module("productManagement",
                             ["common.services",
                             "ui.router",
                             "ui.mask",
                             "ui.bootstrap",
                             "angularCharts",
                             "productResourceMock"]);
                             //common.services is injected and now this serves as a resuable data access component and accessible
    
    //config method takes one parameter which is the function that defines the configuration code.                                             //anywhere form out application
    //pass $stateProvider 
    //since wen want to make this code safe for minification well pass an array into this configuration method
    //the first element of the array is the string that name of each parameter we are going to
    //pass into the function here for now it is "$stateProvider"
    //The second elemtn is function itself passing the $stateProvider.
    //Angular injects this $stateProvider service into this function
    app.config(["$stateProvider",
                "$urlRouterProvider",
                function ($stateProvider,$urlRouterProvider) {
                    //Default Route
                    //if the activated state has no entry here in this function,or no active state
                    //then display the state 
                    $urlRouterProvider.otherwise("/");
                    
                    $stateProvider
                    .state("home",{
                        url:"/",
                        templateUrl:"app/welcomeView.html"
                    })
                    //Products
                    .state("productList", {
                        url: "/products",
                        templateUrl: "app/products/productListView.html",
                        controller: "ProductListCtrl as vm"
                    })
                    .state("productEdit",{
                        abstract: true,
                        url:"/products/edit/:productId",
                        templateUrl:"app/products/productEditView.html",
                        controller:"ProductEditCtrl as vm",
                        resolve: {
                            productResource: "productResource",
                            product: function (productResource,$stateParams) {
                            var productId = $stateParams.productId;
                return productResource.get({productId :productId}).$promise;
                            }
                        }
                    })
                    .state("productEdit.info",{
                        url: "/info",
                        templateUrl: "app/products/productEditInfoView.html",
                    })
                    .state("productEdit.price",{
                        url: "/price",
                        templateUrl: "app/products/productEditPriceView.html"
                    })
                    .state("productEdit.tags",{
                        url: "/tags",
                        templateUrl: "app/products/productEditTagsView.html"
                    })
                    .state("productDetail",{
                        url:"/products/:productId",
                        templateUrl: "app/products/productDetailView.html",
                        controller:"ProductDetailCtrl as vm",
                        resolve: {
                            productResource: "productResource",
                            product: function (productResource,$stateParams) {
                            var productId = $stateParams.productId;
                return productResource.get({productId :productId}).$promise;
                            }
                        }
                    })
                    .state("priceAnalytics",{
                        url:"/priceAnalytics",
                        templateUrl:"app/prices/priceAnalyticsView.html",
                        controller: "PriceAnalyticsCtrl",
                        resolve:{
                            productResource: "productResource",

                            products: function(productResource){
                                return productResource.query(function(response){
                                    //no code need for the success
                                },
                                //failure function. it checks the status on the response.
                                //If the status is 404 NotFound it displays an alertbox
                                function(response){
                                    if(response.status == 404){
                                        alert("Error accessing resource: " +
                                        response.config.method+ "" + response.config.url);
                                    }else{
                                        alert(response.statuText);
                                    }
                                }).$promise;
                            }
                        }
                    })
                }]
    ); //End of app.config 1

    app.config(function($provide){
        $provide.decorator("$exceptionHandler",
                            ["$delegate",
                            function($delegate){
                                return function (exception, cause) {
                                    exception.message = "Please contact the Help Desk! \n Message:" +
                                                                            exception.message;
                                    $delegate(exception, cause);
                                    alert(exception.message);
                                };
                            }])
    })
}());