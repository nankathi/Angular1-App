(function () {
    "use strict";
    angular.module("common.services")
           .factory("productService",productService);

    function productService() {
        //Business logic
          //Calculate margin percent
          function calculateMarginPercent(price, cost) {
              var margin = 0;
              if(price && cost){
                  margin = (100 * (price - cost)) / price;
              }
              margin = Math.round(margin);
              return margin;
          }

           //Calculate margin amount
          function calculateMarginAmount(price,cost) {
              var margin = 0;
              if(price && cost){
                  margin = price - cost;
              }
              return margin;
          }

           //Calculate price from percent
          function calculatePriceFromPercent(cost,percent) {
              var price = cost;
              if(cost && percent){
                  price = cost + (cost * percent /100 );
                  price = (Math.round(price * 100)) / 100;
              }
              return price;
          }

           //Calculate price from amount          
          function calculatePriceFromAmount(cost, amount) {
              var price = cost;
              if(cost && amount){
                  price = cost + amount;
                  price = (Math.round(price * 100)) / 100;
              }
              return price;
          }

          //All the above functions are private of the service.To make
          //these functions callable from outside the serivce, we can define a public API exposed by the service factory function.
          //we do that on return statement.
          //The return stmt return the service object which defines four //functions
          return{
              calculateMarginPercent : calculateMarginPercent,
              calculateMarginAmount: calculateMarginAmount,
              calculatePriceFromMarkupPercent: calculatePriceFromPercent,
              calculatePriceFromMarkupAmount: calculatePriceFromAmount
          }
    }
})();