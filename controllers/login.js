
app.controller("loginCtrl",function ($scope,$state,$rootScope,Auth) {
    $rootScope.currentUser = {};
    window.location.href = "#/login";
    $scope.loginUser = function (param) {
        
        if(param.userName=="admin" || param.userName=="user"){
            Auth.setUser(param.userName);
            $rootScope.currentUser = {name:param.userName};
            $state.go("admin");
        }else {
            alert("Invalid Login Credentials");
            $scope.user = {};
        }
    };

    $scope.skip = function (){
        Auth.setUser("Guest");
        $rootScope.currentUser = {name:"Guest"};
        $state.go("user");
    };

    $scope.redirect = function (val) {
        Auth.setUser("Guest");
        $rootScope.currentUser = {name:"Guest"};
        $state.go(val);
    }

});