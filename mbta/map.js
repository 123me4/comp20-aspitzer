//{"name":, "lat":, "lon":, "id":},
jsonData = '[{"name":"South Station", "lat":42.352271, "lon":-71.055242, "id":"place-sstat"}, {"name":"Andrew", "lat":42.330154, "lon":-71.057655, "id":"place-andrw"}, {"name":"Porter Square", "lat":42.3884, "lon":-71.119149, "id":"place-portr"},{"name":"Harvard Square", "lat":42.373362, "lon":-71.118956, "id":"place-harsq"},{"name":"JFK/UMass", "lat":42.320685, "lon":-71.052391, "id":"place-jfk"},{"name":"Savin Hill", "lat":42.31129, "lon":-71.053331, "id":"place-shmnl"},{"name":"Park Street", "lat":42.35639457, "lon":-71.0624242, "id":"place-pktrm"},{"name":"Broadway", "lat":42.342622, "lon":-71.056967, "id":"place-brdwy"},{"name":"North Quincy", "lat":42.275275, "lon":-71.029583, "id":"place-nqncy"},{"name":"Shawmut", "lat":42.29312583, "lon":-71.06573796, "id":"place-smmnl"},{"name":"Davis", "lat":42.39674, "lon":-71.121815, "id":"place-davis"},{"name":"Alewife", "lat":42.395428, "lon":-71.142483, "id":"place-alfcl"},{"name":"Kendall/MIT", "lat":42.36249079, "lon":-71.08617653, "id":"place-knncl"},{"name":"Charles/MGH", "lat":42.361166, "lon":-71.070628, "id":"place-chmnl"},{"name":"Downtown Crossing", "lat":42.355518, "lon":-71.060225, "id":"place-dwnxg"},{"name":"Quincy Center", "lat":42.251809, "lon":-71.005409, "id":"place-qnctr"},{"name":"Quincy Adams", "lat":42.233391, "lon":-71.007153, "id":"place-qamnl"},{"name":"Ashmont", "lat":42.284652, "lon":-71.064489, "id":"place-asmnl"},{"name":"Wollaston", "lat":42.2665139, "lon":-71.0203369, "id":"place-wlsta"},{"name":"Fields Corner", "lat":42.300093, "lon":-71.061667, "id":"place-fldcr"},{"name":"Central Square", "lat":42.365486, "lon":-71.103802, "id":"place-cntsq"},{"name":"Braintree", "lat":42.2078543, "lon":-71.0011385, "id":"place-brntn"}]';

var map;
var mark = [0];
var markers = JSON.parse(jsonData);
var line1;
var line2;

function initMap() {
	var array1 = [new google.maps.LatLng(markers[11].lat, markers[11].lon), new google.maps.LatLng(markers[10].lat, markers[10].lon), new google.maps.LatLng(markers[2].lat, markers[2].lon), new google.maps.LatLng(markers[3].lat, markers[3].lon), new google.maps.LatLng(markers[20].lat, markers[20].lon), new google.maps.LatLng(markers[12].lat, markers[12].lon), new google.maps.LatLng(markers[13].lat, markers[13].lon), new google.maps.LatLng(markers[6].lat, markers[6].lon), new google.maps.LatLng(markers[14].lat, markers[14].lon), new google.maps.LatLng(markers[0].lat, markers[0].lon), new google.maps.LatLng(markers[7].lat, markers[7].lon), new google.maps.LatLng(markers[1].lat, markers[1].lon), new google.maps.LatLng(markers[4].lat, markers[4].lon), new google.maps.LatLng(markers[8].lat, markers[8].lon), new google.maps.LatLng(markers[15].lat, markers[15].lon), new google.maps.LatLng(markers[16].lat, markers[16].lon), new google.maps.LatLng(markers[21].lat, markers[21].lon)];
	var array2 = [new google.maps.LatLng(markers[4].lat, markers[4].lon), new google.maps.LatLng(markers[5].lat, markers[5].lon), new google.maps.LatLng(markers[19].lat, markers[19].lon), new google.maps.LatLng(markers[9].lat, markers[9].lon), new google.maps.LatLng(markers[17].lat, markers[17].lon)];
	
	map = new google.maps.Map(document.getElementById('map'), {
    	center: new google.maps.LatLng(markers[0].lat, markers[0].lon),
        zoom: 10
    });
    
    infoWindow = new google.maps.InfoWindow;
    
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    for(i in markers) {
    	mark[i] = new google.maps.Marker({
    		position: new google.maps.LatLng(markers[i].lat, markers[i].lon), 
    		map: map, 
    		title: markers[i].id,
    		label: markers[i].name,
    		icon: iconBase + 'library_maps.png'
    	});
    	mark[i].addListener('click', function() {
    		data = function(id, name){
				var info = 'hi';
				var url = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + id;
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
	    			if (this.readyState == 4 && this.status == 200) {
	 					var myObj = JSON.parse(this.responseText);
    					info = name;
    					for (i in myObj.data) {
    							info = info + '<br />' +
    							myObj.data[i].attributes.arrival_time.substring(11, 19) + 
    							'&nbsp&nbsp&nbsp&nbsp&nbsp' + 
    							((myObj.data[i].attributes.direction_id)?"Southbound":"Northbound")
    						}
    					infoWindow.setContent(info);
    				}
				};
				xmlhttp.open("GET", url, true);
				xmlhttp.send();
			}
			data(this.getTitle(), this.getLabel());
    		infoWindow.setPosition(this.getPosition());
			infoWindow.open(map);
    	});
    }
    
    line1 = new google.maps.Polyline({
    	map: map,
    	strokeColor: "red",
    	path: array1
    });
    line2 = new google.maps.Polyline({
    	map: map,
    	strokeColor: "red",
    	path: array2
    });
    
    var me = new google.maps.Marker({
    			map: map, 
    			title: "Me"
    });
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
        	var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            me.setPosition(pos);
            //infoWindow.setPosition(pos);
            
        }, function() {
        	handleLocationError(true, infoWindow, map.getCenter());
        });
	} else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
	}
	line3 = new google.maps.Polyline({
		map: map,
		strokeColor: "blue"
	});
	me.addListener('click', function() {
        infoWindow.setPosition(me.getPosition());
        //sphere = new google.maps.geometry.spherical();
        var h;
        var j = 0;
		var k = 99999999;
		for(i in markers) {
    		var x = google.maps.geometry.spherical.computeDistanceBetween(mark[i].getPosition(), me.getPosition())*0.000621371 //convert meters to miles
    		if(x < k) {
    			h = markers[i].name;
    			j = i;
    			k = x;
    		}    	
    	}
        infoWindow.setContent('Its me! <br />The closest station is ' + h + '<br />at ' + k.toFixed(2) + ' miles away.');
		infoWindow.open(map);
		line3.setPath([me.getPosition(), mark[j].getPosition()]);
	});
}

function trains(id){
	var url = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + id;
	var info = 'hi';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	 		var myObj = JSON.parse(this.responseText);
    		info = myObj.data[0].attributes.schedule_relationship + '!';
    		return info;
    	}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

