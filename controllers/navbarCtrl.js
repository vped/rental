
app.controller("navbarCtrl",function ($state,$rootScope,$scope,Route) {
     $scope.redirect = function () {
      var route =   Route.getRoute();
         if(route.id){
             $state.go(route.route,{id:route.id});
         } else {
             $state.go(route);
         }
     }
});