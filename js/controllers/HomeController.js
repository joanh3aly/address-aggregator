app.controller('HomeController', ['$scope', 'suggestions', '$http', '$firebaseArray', function($scope, suggestions, $http, $firebaseArray) {
	$scope.helloWorld = "Address Aggregator";
	$scope.posts = suggestions.posts;

/*
	Add address to suggestions.js
*/
	$scope.addSuggestion = function(){
		if(!$scope.title || $scope.title === ""){
			return;
		}
		$scope.posts.push({
			title: $scope.title,
			beds: $scope.beds,
			price: $scope.price,
			area: $scope.area
		});
		$scope.title = '';

		$http.post($scope.url, {"title": $scope.title})
			.success(function(data, status) {
                console.log(data);
                $scope.status = status;
                $scope.data = data;
                $scope.result = data; 
        });
	};


/*
	Add address to Firebase DB
*/
	var fireRef = firebase.database().ref();
  	$scope.todos = $firebaseArray(fireRef);
    
    $scope.address = '';
    $scope.price = '';
    $scope.beds = '';
    $scope.area = '';

    $scope.addTodo = function(){
        var address = $scope.address.trim();
        var price = $scope.price.trim();
        var beds = $scope.beds.trim();
        var area = $scope.area.trim();

        $scope.todos.$add({
            address: address,
            beds: beds,
            price: price,
            area: area
        });
        $scope.address = '';
      	$scope.price = '';
    	$scope.beds = '';
   		$scope.area = '';
    };

/*
	Display areacodes for selection
*/
	$scope.areacodes = function() {
		var areaObj = [];

		list = [];
		var num = '';
		for (i=1; i <= 24; i++) {
			num = i.toString();
			areaObj.push({id : num},{name : num})
		}
		return areaObj;
	}

	$scope.areas = {
	    model: null,
	    availableOptions: 
	    [
	      {id: '1', name: '1'},
	      {id: '2', name: '2'},
	      {id: '3', name: '3'},
	      {id: '4', name: '4'},
	      {id: '5', name: '5'},
	      {id: '6', name: '6'},
	      {id: '7', name: '7'},
	      {id: '8', name: '8'},
	      {id: '9', name: '9'},
	      {id: '10', name: '10'},
	      {id: '11', name: '11'},
	      {id: '12', name: '12'},
	      {id: '13', name: '13'},
	      {id: '14', name: '14'},
	      {id: '15', name: '15'},
	      {id: '16', name: '16'},
	      {id: '17', name: '17'},
	      {id: '18', name: '18'},
	      {id: '19', name: '19'},
	      {id: '20', name: '20'},
	      {id: '21', name: '21'},
	      {id: '22', name: '22'},
	      {id: '23', name: '23'},
	      {id: '24', name: '24'}
	    ]
	};

}]);