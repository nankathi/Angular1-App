(function () {
    "use strict";
    angular.module("productManagement")
           .controller("ProductListCtrl",
                        ["productResource",//--->//  controller method to pass in Min-Safe array and provide the string name of the parameter as the first element of that array.
                          ProductListCtrl]);

  //We need to ask angular to pass a reference to the productResource service to this specific controller funciton.
  //We do that by adding the productResource as a parameter. Since we have a parameter here we need to change 
  //  controller method to pass in Min-Safe array and provide the string name of the parameter as the first element of that array.

   function ProductListCtrl(productResource){
       var vm = this;

    //call the query methos of the product resource and assign the data to model
    // productResource.query(function(data){
    //     vm.products = data;
    // });

    productResource.query(function (data){//the query method sends a request to the URL we defined in the $resoruce function.    
                                      // the parameter is a callbacl function that is called upon recieving a successful HTTP response.
                                      
              vm.products = data; //the response (data) JSON Data returned form the Query. the resulting data is simply assigned to the products as part of the model.
    });
//We have two modules created
//how do we tell our main module about this ? 
//Yes through Dependency we need to inject it in the app.js  

    //The controller calls the Query method of the $resource Object, which in return send a get request to the URL and return a JSON Array containing a list of Products
   
    //    vm.products  = [
    // {
    //     "productId": 1,
    //     "productName": "Leaf Rake",
    //     "productCode": "GDN-0011",
    //     "releaseDate": "March 19, 2016",
    //     "description": "Leaf rake with 48-inch wooden handle.",
    //     "price": 19.95,
    //     "starRating": 3.2,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    // },
    // {
    //     "productId": 2,
    //     "productName": "Garden Cart",
    //     "productCode": "GDN-0023",
    //     "releaseDate": "March 18, 2016",
    //     "description": "15 gallon capacity rolling garden cart",
    //     "price": 32.99,
    //     "starRating": 4.2,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    // },
    // {
    //     "productId": 5,
    //     "productName": "Hammer",
    //     "productCode": "TBX-0048",
    //     "releaseDate": "May 21, 2016",
    //     "description": "Curved claw steel hammer",
    //     "price": 8.9,
    //     "starRating": 4.8,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    // },
    // {
    //     "productId": 8,
    //     "productName": "Saw",
    //     "productCode": "TBX-0022",
    //     "releaseDate": "May 15, 2016",
    //     "description": "15-inch steel blade hand saw",
    //     "price": 11.55,
    //     "starRating": 3.7,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    // },
    // {
    //     "productId": 10,
    //     "productName": "Video Game Controller",
    //     "productCode": "GMG-0042",
    //     "releaseDate": "October 15, 2015",
    //     "description": "Standard two-button video game controller",
    //     "price": 35.95,
    //     "starRating": 4.6,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    // } ];

    vm.showImage = false;
    
    vm.toggleImage = function(){
       vm.showImage = !vm.showImage; 
    }
    
 }//end of ProductListCtrl

}());