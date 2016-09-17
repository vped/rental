/**
 * Created by ved on 27/8/16.
 */

var app = angular.module('rental',['ui.router','tmh.dynamicLocale','ngTable','toastr','ngTableToCsv','ngCookies','ngSanitize','ui.select','pascalprecht.translate']);

app.run(function ($state,$rootScope) {
    $state.go('login');
    $rootScope.title= "Car Rental"
});

app.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeSuccess', function () {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }
        else {

        }
    });
}]);

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-top-right',
        preventDuplicates: true
    });
});

app.constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/);
app.constant('LOCALES', {
    'locales': {
        'en_US': 'English',
        'es_ES': 'Spanish'
    },
    'preferredLocale': 'en_US'
});

// Angular debug info
app.config(function ($compileProvider, DEBUG_MODE) {
    if (!DEBUG_MODE) {
        $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
});

app.config(function ($translateProvider, DEBUG_MODE, LOCALES) {
    if (DEBUG_MODE) {
        $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
    }

    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage(LOCALES.preferredLocale);
    $translateProvider.useLocalStorage();
});

app.config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('login',{
            url : '/login',
            templateUrl : 'views/login.html',
            controller : 'loginCtrl'
        });
    $urlRouterProvider.otherwise('/');
});

// Angular Dynamic Locale
app.config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('js/angular-i18n/angular-locale_{{locale}}.js');
});

