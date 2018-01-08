app.controller('MapController', ['$scope', 'suggestions', '$routeParams', '$firebaseObject', function($scope, suggestions, $routeParams, $firebaseObject) { 

    $scope.heading = "Map Display for Dublin "+ $routeParams.id; 

/*
    Map setup
*/
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(53.3426838,-6.2654305),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var geocoder = new google.maps.Geocoder();
    $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();
 
/*
    Create marker template and then save as array
*/
    var createMarker3 = function(houseinfo) {
        /*
            Find lat and long coords by plugging the address into the geocoder object
        */
        geocoder.geocode({'address': houseinfo.address}, function(results, status) {
            if (status === 'OK') {
                $scope.coords = results[0].geometry.location;
                /*
                    Add coordinates to Gmaps marker object
                */
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: results[0].geometry.location,
                    title: houseinfo.address,
                    content: '<div class="infoWindowContent">eur ' + houseinfo.price + '<br>beds ' + houseinfo.beds + '</div>'
                });
                
                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                    map.setZoom(13);
                });

                $scope.markers.push(marker);
            
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
         
        });
        
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
    Get dynamic data from Firebase and convert to a list to be iterated over 
*/
    obj.$loaded().then(function() {
        var result;
        var returnArr = [];
        angular.forEach(obj, function(value, key) {
            var item = value;
            item.key = key;
            returnArr.push(item);
        });

        var chosenListLen = Object.keys(returnArr).length;
        var chosenAreaList = [];
        
        for (i=0; i<chosenListLen; i++) { 
            if (returnArr[i].area == $routeParams.id) {
                chosenAreaList.push(returnArr[i]);
            }
        }
        $scope.chosenArea = chosenAreaList;

        /*
            Iterate through chosenArea array and add each item to createMarker function
        */
        for (i = 0; i < $scope.chosenArea.length; i++){
            createMarker3($scope.chosenArea[i]);
        }
    });
    
    /*
        Event hander for infowindows
     */
    $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
 

}]);



