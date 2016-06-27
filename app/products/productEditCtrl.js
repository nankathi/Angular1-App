(function () {
    "use strict";

    angular.module("productManagement")
           .controller("ProductEditCtrl",["product","$state","productService",ProductEditCtrl]);

   function ProductEditCtrl(product,$state,productService) {
       var vm = this;
       vm.product = product;
       //radio default option
       vm.priceOption = "percent";

       //Calculate margin percentage
       vm.marginPercent = function(){
          return productService.calculateMarginPercent(vm.product.price,vm.product.cost);
       }

       //calculate the price based on a markup 
       vm.calculatePrice = function(){
           var price = 0;
           if(vm.priceOption == 'amount'){
               price = productService.calculatePriceFromMarkupAmount(vm.product.cost,vm.markupAmount);
           }

           if(vm.priceOption == 'percent'){
               price = productService.calculatePriceFromMarkupPercent(vm.product.cost, vm.markupPercent);
           }
           vm.product.price = price;
       }//end pf calculatePrice 

       if(vm.product && vm.product.productId){
           vm.title = "Edit: " + vm.product.productName;
       }
       else{
           vm.title = "New Product"
       }

        //for datepicker-popup
         vm.open = function ($event) {
            //$event represents the original event object 
            $event.preventDefault();
            $event.stopPropagation();
            
            //this variable defines if the popup should be opened
            //The opened variable trackswhether or not the calnedar is open
            //we can bind the is-open attribute of datepicker to opened variable 
            vm.opened = !vm.opened;
        };// end of open fucntion

        //Save data on submit
        vm.submit = function(isValid){
            if(isValid){
                 vm.product.$save(function(data){
                toastr.success("Save successful");
                });
            }else{
                alert("Please correct the validation errors first.");
            }
           
        }//end of submiut funciton


        vm.cancel  = function(){
            $state.go('productList');
        }//end of cancel function

        vm.addTags = function(tags){
            if(tags){
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            }else{
                alert("Please enter one or more tags separated by commas");
            }
        }//end of addTags function

        vm.removeTag = function(idx){
            vm.product.tags.splice(idx,1);
        }
   }//End of controller function

   
})();