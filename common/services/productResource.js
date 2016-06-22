(function (params) {
    "use strict";

    //Look up for the common.service module and register the new factory with that module using facotry method of the module
    angular.module("common.services")
           .factory("productResource",
                    ["$resource",
                    productResource]);
                    //First parameter is the name of the service and second is an array with the first element
                                 // as the string names of the parameters that are going to be passef to the function
                                 //We are defining this sting names here to ensure that the application will still work 
                                 //if this javascript file is minified, so this array is referred to as Min-Safe Array,

                                 
                    //The last element of the array is the factory service function. (here we are just setting a reference to that function)

           //defining the product resource function by pasing $resource as parameter i.e injecting the resource service
    function productResource($resource) {
        return $resource("/api/products/:productId")
        //The function then simply returns the $resource object giving it the URL for the products,
        //this sets up the communication with the web Server.
    }
           
})();

