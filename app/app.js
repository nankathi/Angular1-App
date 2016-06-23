/// </// <reference path="../../../../typings/angularjs/angular.d.ts" />
(function(){
    "use strict"
    var app = angular.module("productManagement",
                             ["common.services",
                             "ui.router",
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
                        url:"/products/edit/:productId",
                        templateUrl:"app/products/productEditView.html",
                        controller:"ProductEditCtrl as vm"
                    })
                    .state("productDetail",{
                        url:"/products/:productId",
                        templateUrl: "app/products/productDetailView.html",
                        controller:"ProductDetailCtrl as vm"
                    })
                }]
    );
}());