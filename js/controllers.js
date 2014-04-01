angular.module('SAP.controllers', []);

/*
 Main Controller for apps existance.

 injects:
 the route provider to handle partials,
 the http to handle ajax,
 the location to handle redirects/ajax

 */

angular.module('SAP.controllers').controller('PokemapCntl', ['$scope', '$route', '$location', 'loadService', '$modal',
    function ($scope, $route, $location, loadService, $modal) {

        $scope.pokemon = [];

        $scope.search = "";


        //load service will bring in non blank locations
        $scope.getLocations = function (poke) {
            loadService.loadPokemonLocation(poke.number).then(function (locations) {
                if(locations != "" && locations != undefined){
                    poke.locs = locations;
                } else {
                    poke.locs = [];
                }
                poke.locLoaded = true;
            })
        }

        $scope.showNewLoc = function(poke){
            poke.showNewLoc = true;
        }

        $scope.addNewLoc = function(poke){
            loadService.addPokemonLocation(poke.number, poke.newLoc).then(function(){
                poke.locs.push(poke.newLoc);
                poke.showLoaded = false;
                poke.showNewLoc = false;
            })
        }

        $scope.showNewName = function(poke){
            poke.showNewName = true;
        }

        $scope.updateName = function(poke){
            loadService.updatePokemonName(poke.number, poke.newName).then(function(){
                poke.name = poke.newName;
                poke.showNewName = false;
            })
        }

        $scope.updatePicture = function(poke){
            loadService.updatePokemonImg(poke.number, poke.newName).then(function(){
                poke.name = poke.newName;
                poke.showNewName = false;
            })
        }

        //on page load, check to see if there is a set cookie for the last config file worked on
        $scope.init = function () {
            loadService.loadAllPokemon().then(function (data) {
                angular.forEach(data, function (poke) {
                    poke.locLoaded = false;
                    poke.showNewLoc = false;
                    poke.showNewName = false;

                    loadService.loadPokemonLocation(poke.number).then(function (locations) {
                        if(locations != "" && locations != undefined){
                            poke.locs = locations;
                        } else {
                            poke.locs = [];
                        }
                        poke.locLoaded = true;
                    })
                })
                $scope.pokemon = data;
            })
        }

        //load up the db entries from the server
        $scope.init();
    }]);


//};
