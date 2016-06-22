(function(){
    "use strict";

    var app = angular.module("productResourceMock",["ngMockE2E"]);
    
    //app.run to perform the initialization
    //App.run takes  the function passed in as a parameter and executes it
    //when the module is loaded.
    app.run(function($httpBackend){
            //Step 1. Define the default ser of Data
            var products  = [
                {
                    "productId": 1,
                    "productName": "Leaf Rake",
                    "productCode": "GDN-0011",
                    "releaseDate": "March 19, 2016",
                    "description": "Leaf rake with 48-inch wooden handle.",
                    "price": 19.95,
                    "starRating": 3.2,
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                },
                {
                    "productId": 2,
                    "productName": "Garden Cart",
                    "productCode": "GDN-0023",
                    "releaseDate": "March 18, 2016",
                    "description": "15 gallon capacity rolling garden cart",
                    "price": 32.99,
                    "starRating": 4.2,
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
                },
                {
                    "productId": 5,
                    "productName": "Hammer",
                    "productCode": "TBX-0048",
                    "releaseDate": "May 21, 2016",
                    "description": "Curved claw steel hammer",
                    "price": 8.9,
                    "starRating": 4.8,
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
                },
                {
                    "productId": 8,
                    "productName": "Saw",
                    "productCode": "TBX-0022",
                    "releaseDate": "May 15, 2016",
                    "description": "15-inch steel blade hand saw",
                    "price": 11.55,
                    "starRating": 3.7,
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
                },
                {
                    "productId": 10,
                    "productName": "Video Game Controller",
                    "productCode": "GMG-0042",
                    "releaseDate": "October 15, 2015",
                    "description": "Standard two-button video game controller",
                    "price": 35.95,
                    "starRating": 4.6,
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
                } ];


            //Step 2. Define the fake responses to the web Service calls 
                //Url that we are expecting to intercept
                var productUrl = "/api/products";

                //Define what should happen when a get request is sent to the URL
                //(We want to return full list of products, we'll use whenGET methos of the $httpBackend service)
                 $httpBackend.whenGET(productUrl).respond(products);  

                //whenGET also takes regular expression so we can use that to retriev an individual Product based on id
                //Define a regular expression which accepts a numeric value
                var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
                $httpBackend.whenGET(editingRegex).respond(function(method,url,data){
                    //respond method can take a fucntion and returns desired out
                //split the url putting each part of the url into an array
                var parameters =url.split('/');
                //get the id parameter which is the last in the array
                var id = parameter[length -1];
                if(id >0){
                    for(var i=0; i< products; i++){
                        if(products[i].productId == id){
                            product = products[i];
                            break;
                        }
                    };
                }
                 return [200, product , {}];
                });


                //Save functionality i.e a post request
                //processing the post calls to fake out adding and editing products in the list
                $httpBackend.whenPOST(productUrl).respond(function(){
                    //deserialize the passed in JSON string(data) and return the 
                    //result in the product variable
                    var product = angular.fromJson(data);

                    //we can then access the fields in JSON structure
                    //Determine if the productID is new or existing product
                    
                    if(!product.productId){
                        //new product doesnt have assigned id's so we assign one and push to the 
                        //array of products 
                        product.productId = products[products.length -1].productId + 1;
                        product.push(product);
                    }
                    else{
                        //Updated product
                        for(var i =0; i<products.length; i++){
                             if(products[i].productId == product.productId){
                            products[i] = product;
                            break;
                            }
                        };
                    }

                    return [200, product,{}];
                    //returns a response code of 200 which is a succes value
                });

                //$httpBackend intercepts all URL requests 
                //in the upcoming modules we il use the URL to request and downlaod additional html files.
                //this mocking framework will intercept all of those calls as well.we dont want to provide mocks for those UI elements.
                //we want those particular requests to be passed through 
                //all the html files we create wil be in app directory so we cn use that 
                //as a generalized URL 

                //Every request to any HTML file or any file in the app folder will then
                //be passed through and ignored by the mocking 
                $httpBackend.whenGET(/app/).passThrough();
    })
})();

