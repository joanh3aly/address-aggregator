app.controller('SuggestionController', ['$scope', 'suggestions', '$routeParams', '$firebaseObject', function($scope, suggestions, $routeParams, $firebaseObject) { 
	$scope.heading = "Dublin " + $routeParams.id;
	$scope.posts = suggestions.posts;
	$scope.routeParamsID = $routeParams.id;
/*
	get static data from suggestions.js service 
*/
    $scope.listLen = $scope.posts.length;

    $scope.listArea = function() {
    	var areaList = [];
    	for (i=0; i<$scope.listLen; i++) { 
    		if ($scope.posts[i].area == $routeParams.id) {
		        areaList.push($scope.posts[i]);
		    }
		}
		return areaList;
    }

/*
	Connect to Firebase and get data
*/
	const rootRef = firebase.database().ref();  
	const ref = rootRef.child('one');
	const nameRef = ref.child('area');
	$scope.object = $firebaseObject(rootRef);
	$scope.chosenListLen = $scope.object.length;
	const obj = $firebaseObject(rootRef);


/*
	get dynamic data from Firebase (version 2)
*/
    obj.$loaded().then(function() {
     	var result;
     	var returnArr = [];
        angular.forEach(obj, function(value, key) {
            var item = value;
	        item.key = key;
			returnArr.push(item);
	    });

        console.log("returnArr "+returnArr[0].area);

       	var chosenListLen = Object.keys(returnArr).length;
       	var chosenAreaList = [];
       	
       	for (i=0; i<chosenListLen; i++) { 
    		if (returnArr[i].area == $routeParams.id) {
		        chosenAreaList.push(returnArr[i]);
		    }
		}
		$scope.chosenArea = chosenAreaList;
    });

/*
    Order by function
*/
    $scope.orderByMe = function(x) {
	$scope.myOrderBy = x;
    }

}]);




