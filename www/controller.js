phonecatApp = angular.module('notifymeApp', []);

phonecatApp.controller('MainCtrl', function ($scope) {

    var service = new google.maps.places.PlacesService(document.getElementById('map'));

	var search;
	
    $scope.newremind = '';
    $scope.remindings = [

    ];

	var mapOptions = {
			center: new google.maps.LatLng(44.802416, 20.465600999999992000),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
				
		mapa = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
					
	


    $scope.add = function() {
        $scope.remindings.push({name: $scope.newremind});
        navigator.geolocation.getCurrentPosition(updatePos);
		
		search = $scope.newremind;
        
		
		
		
    };

    function existReminding(val) {
        for(var i = 0; i < $scope.remindings.length; i++) {
            if($scope.remindings[i].name === val) {
                return true;
            }
        }
        return false;
    }


    function updatePos(position) {
        console.log('test');
        var request = {
            location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            radius: '500',
            types: [search]
        };
		//mapa.clearOverlays();
		mapa.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        service.nearbySearch(request, function (res, st) {
            console.log('update location');
            var bl = document.getElementById('res');
            bl.innerHTML = '';
			
            res.forEach(function(elem) {
				console.log('el je ' + elem.geometry.location.pb)
				
					marker = new google.maps.Marker({
					map: mapa,
					animation: google.maps.Animation.DROP,
					title: elem.name,
					icon: elem.icon,
					position: new google.maps.LatLng(elem.geometry.location.pb, elem.geometry.location.qb)
				});	
				
				
				
                var p = document.createElement("div");
                var str = elem.name + ' is ';
                elem.types.forEach(function(a) {
                    if(existReminding(a) ) {
                        str += '<span style="color:red">'+ a + '</span>, ';
                    } else {
                        str += a + ', ';
                    }
                });
                //p.innerHTML = str;
                //bl.appendChild(p);
            });
            console.log(res);
            console.log(st);
        });
    }
});