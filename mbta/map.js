//{"name":, "lat":, "lon":, "id":},
jsonData = '[{"name":"South Station", "lat":42.352271, "lon":-71.055242, "id":"place-sstat"}, {"name":"Andrew", "lat":42.330154, "lon":-71.057655, "id":"place-andrw"}, {"name":"Porter Square", "lat":42.3884, "lon":-71.119149, "id":"place-portr"},{"name":"Harvard Square", "lat":42.373362, "lon":-71.118956, "id":"place-harsq"},{"name":"JFK/UMass", "lat":42.320685, "lon":-71.052391, "id":"place-jfk"},{"name":"Savin Hill", "lat":42.31129, "lon":-71.053331, "id":"place-shmnl"},{"name":"Park Street", "lat":42.35639457, "lon":-71.0624242, "id":"place-pktrm"},{"name":"Broadway", "lat":42.342622, "lon":-71.056967, "id":"place-brdwy"},{"name":"North Quincy", "lat":42.275275, "lon":-71.029583, "id":"place-nqncy"},{"name":"Shawmut", "lat":42.29312583, "lon":-71.06573796, "id":"place-smmnl"},{"name":"Davis", "lat":42.39674, "lon":-71.121815, "id":"place-davis"},{"name":"Alewife", "lat":42.395428, "lon":-71.142483, "id":"place-alfcl"},{"name":"Kendall/MIT", "lat":42.36249079, "lon":-71.08617653, "id":"place-knncl"},{"name":"Charles/MGH", "lat":42.361166, "lon":-71.070628, "id":"place-chmnl"},{"name":"Downtown Crossing", "lat":42.355518, "lon":-71.060225, "id":"place-dwnxg"},{"name":"Quincy Center", "lat":42.251809, "lon":-71.005409, "id":"place-qnctr"},{"name":"Quincy Adams", "lat":42.233391, "lon":-71.007153, "id":"place-qamnl"},{"name":"Ashmont", "lat":42.284652, "lon":-71.064489, "id":"place-asmnl"},{"name":"Wollaston", "lat":42.2665139, "lon":-71.0203369, "id":"place-wlsta"},{"name":"Fields Corner", "lat":42.300093, "lon":-71.061667, "id":"place-fldcr"},{"name":"Central Square", "lat":42.365486, "lon":-71.103802, "id":"place-cntsq"},{"name":"Braintree", "lat":42.2078543, "lon":-71.0011385, "id":"place-brntn"}]';

var map;
var mark;
var markers = JSON.parse(jsonData);
var line1;
var line2;

function initMap() {
	var array1 = [new google.maps.LatLng(markers[11].lat, markers[11].lon), new google.maps.LatLng(markers[10].lat, markers[10].lon), new google.maps.LatLng(markers[2].lat, markers[2].lon), new google.maps.LatLng(markers[3].lat, markers[3].lon), new google.maps.LatLng(markers[20].lat, markers[20].lon), new google.maps.LatLng(markers[12].lat, markers[12].lon), new google.maps.LatLng(markers[13].lat, markers[13].lon), new google.maps.LatLng(markers[6].lat, markers[6].lon), new google.maps.LatLng(markers[14].lat, markers[14].lon), new google.maps.LatLng(markers[0].lat, markers[0].lon), new google.maps.LatLng(markers[7].lat, markers[7].lon), new google.maps.LatLng(markers[1].lat, markers[1].lon), new google.maps.LatLng(markers[4].lat, markers[4].lon), new google.maps.LatLng(markers[8].lat, markers[8].lon), new google.maps.LatLng(markers[15].lat, markers[15].lon), new google.maps.LatLng(markers[16].lat, markers[16].lon), new google.maps.LatLng(markers[21].lat, markers[21].lon)];
	var array2 = [new google.maps.LatLng(markers[4].lat, markers[4].lon), new google.maps.LatLng(markers[5].lat, markers[5].lon), new google.maps.LatLng(markers[19].lat, markers[19].lon), new google.maps.LatLng(markers[9].lat, markers[9].lon), new google.maps.LatLng(markers[17].lat, markers[17].lon)];
	
	map = new google.maps.Map(document.getElementById('map'), {
    	center: new google.maps.LatLng(markers[0].lat, markers[0].lon),
        zoom: 11
    });
    
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    for(i in markers) {
    	mark = new google.maps.Marker({
    		position: new google.maps.LatLng(markers[i].lat, markers[i].lon), 
    		map: map, 
    		title: markers[i].name,
    		icon: iconBase + 'library_maps.png'
    	});
    	//array[i] = new google.maps.LatLng(markers[i].lat, markers[i].lon);
    }
    
    line1 = new google.maps.Polyline({
    	map: map,
    	strokeColor: "red",
    	path: array1
    });
    line1 = new google.maps.Polyline({
    	map: map,
    	strokeColor: "red",
    	path: array2
    });
    
}
