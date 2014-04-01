angular.module('SAP.services', [])
    .service('loadService', ['$http', '$q', function($http, $q){

        var optionUrl = "options.php";

        this.loadAllPokemon=function(){


            var deferred = $q.defer();


            $http.post(optionUrl, {
                operation: "getAllPokemon"
            }).success(function(data, status){

                    angular.forEach(data, function(poke){
                        if(poke.img_url==""){
                            poke.img_url = "/img/qmark.jpg";
                        }
                    })

                    deferred.resolve(angular.fromJson(data));
                });

            return deferred.promise;

        };

        this.loadPokemonLocation = function(number) {
            var deferred = $q.defer();

            $http.post(optionUrl, {
                    operation: "getPokemonLocation",
                    number: parseInt(number)
            }).success(function(data, status){
                if(data != ""){
                    deferred.resolve(angular.fromJson(data));
                } else {
                    deferred.resolve();
                }

            });

            return deferred.promise;
        }

        this.addPokemonLocation = function(number, loc){
            var deferred = $q.defer();

            $http.post(optionUrl, {
                    operation: "addPokemonLocation",
                    number: parseInt(number),
                    loc: loc

            }).success(function(data, status){
                deferred.resolve();
            });

            return deferred.promise;
        }

        this.updatePokemonName = function(number, name){
            var deferred = $q.defer();

            $http.post(optionUrl, {
                    operation: "updateName",
                    number: parseInt(number),
                    name: name

            }).success(function(data, status){
                deferred.resolve();
            });

            return deferred.promise;
        }

        this.updatePokemonImg = function(number, imgurl){
            var deferred = $q.defer();

            $http.post(optionUrl, {
                    operation: "updateName",
                    number: parseInt(number),
                    imgurl: imgurl

            }).success(function(data, status){
                deferred.resolve();
            });

            return deferred.promise;
        }

    }]);
