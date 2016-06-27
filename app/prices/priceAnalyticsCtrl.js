(function() {
    "use strict";
    angular.module("productManagement")
           .controller("PriceAnalyticsCtrl",
                        ["$scope",
                         "$filter",
                         "products",
                         "productService",
                         PriceAnalyticsCtrl]);

    function PriceAnalyticsCtrl($scope, $filter,products,productService) {
        $scope.title = "Price Analytics";

        //Computed property
        for (var i = 0; i < products.length; i++) {
             products[i].marginPercent = productService.calculateMarginPercent(products[i].price ,products[i].cost);
            
             products[i].marginAmount = productService.calculateMarginAmount(products[i].price ,products[i].cost);
            
        }

        //Filtering the marginAmount data using agulars $filter service
         var orderedProductsAmount = $filter("orderBy")(products, "marginAmount");
         //Limit the data to dsiplay only 5 products in the chart
         var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);
         //Formatting the data 
         var chartDataAmount = [];
         for (var i = 0; i < orderedProductsAmount.length; i++) {
             chartDataAmount.push({
                 x: filteredProductsAmount[i].productName,
                 y: [filteredProductsAmount[i].cost,
                     filteredProductsAmount[i].price,
                     filteredProductsAmount[i].marginAmount]     
             });
             
         }

         //property to be assigned to ac-config in view
         $scope.dataAmount ={
             series: ["Cost","Price","Margin Amount"],
             data: chartDataAmount
         };

         //Configuration information for chart 1 
         $scope.configAmount = {
             title: "Top $ Margin Products",
             tooltips: true,
             labels: false,
             mouseover: function () { },
             mouseout: function () { },
             click: function () { },
             legend:{
                 display:true,
                 position:'right'
             }
         };

         //*****************marginPercent chart**************************
         //Limit the marginPercent data to dsiplay only 5 products in the chart
         var orderedProductsPercent = $filter("orderBy")(products, "marginPercent");
         var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);
          //Formatting the data 
         var chartDataPercent = [];
         for (var i = 0; i < orderedProductsPercent.length; i++) {
             chartDataPercent.push({
                 x: filteredProductsPercent[i].productName,
                 y: [filteredProductsPercent[i].cost,
                     filteredProductsPercent[i].price,
                     filteredProductsPercent[i].marginPercent]     
             });   
         }
         //property to be assigned to ac-config in view
         $scope.dataPercent ={
             series: ["Margin %"],
             data: chartDataPercent
         };

          //Configuration information for chart 2
         $scope.configPercent = {
             title: "Top % Margin Products",
             tooltips: true,
             labels: false,
             mouseover: function () { },
             mouseout: function () { },
             click: function () { },
             legend:{
                 display:true,
                 position:'right'
             }
         };
    }
})();