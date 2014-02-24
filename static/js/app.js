/* App Module */
var geniframework = angular.module('geniframework', []);

geniframework.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl : '../../static/partials/home.html',
		controller : HomeController
	});
	$routeProvider.when('/unique', {
		templateUrl : '../../static/partials/unique.html',
		controller : UniqueController
	});
	$routeProvider.otherwise({
    	redirectTo : '/home'
	});
}]);

function HomeController($scope,$rootScope, $http){
    var httpPromise = $http;
    //var profileAPI = '/static/js/json/profile.js';
    var profileAPI = '/getProfile';
    callServerGETAPI(httpPromise, profileAPI, procesSearch);

    $scope.recentProfiles = [];

    function procesSearch(responseData){
        $scope.profileData = responseData;
        $scope.profileId = $scope.profileData.id;
        $scope.profileName = $scope.profileData.name;
    }

    $scope.getProfile = function(id, name){
        //var profileAPI = '/static/js/json/' + id+'.js';
        var profileAPI = '/getProfile';
        if(id!=null) {
			profileAPI = profileAPI + '?profileId=' + id;
        }
        callServerGETAPI(httpPromise, profileAPI, procesSearch);
        if($scope.recentProfiles.length === 0){
            var profileObj = {"id" : $scope.profileId, "name" : $scope.profileName}
            $scope.recentProfiles.push(profileObj);
        }else{
          var count = 0;
            var profileObj = {"id" : $scope.profileId, "name" : $scope.profileName};
            $.each($scope.recentProfiles, function(index, value) {
                //console.log(JSON.stringify($scope.recentProfiles));
                //console.log(value.id + "------" + id);
              if(value.id === $scope.profileId){
				 count = count + 1;
			  }
		   });
            if(count === 0){
                $scope.recentProfiles.push(profileObj);
            }
        }
    }
}

function UniqueController($scope,$rootScope, $http){
    var httpPromise = $http;
    //var profileAPI = '/static/js/json/profile.js';
    var profileAPI = '/getUniqueCount';
    callServerGETAPI(httpPromise, profileAPI, setResponse);

    //$scope.recentProfiles = [];

    function setResponse(responseData){
        $scope.stepData = responseData;
        //$scope.stepData.push(responseData);
        //var profileObj = {"id" : $scope.profileId, "name" : $scope.profileName}
    }

    $scope.getUniqueCount = function(){
        //var profileAPI = '/static/js/json/' + id+'.js';
        var profileAPI = '/getUniqueCount';
        callServerGETAPI(httpPromise, profileAPI, setResponse);
    }
}

function callServerGETAPI(httpPromise, apiName, reponseHandler){
	httpPromise.get(apiName).success(reponseHandler);
}