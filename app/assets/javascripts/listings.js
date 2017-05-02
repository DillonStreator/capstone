/* global $ */
var google;
var infowindow = null;
var fakeInfoWindow = null;
var searchedInfowindow = null;
var searchedPlace = null;

function initMap() {
  var markers = [[41.879854, -87.636311]];
  for (var j = 0; j < 15; j++) {
    var lg = parseFloat((Math.random() * (-87.330000 - -87.370000) - 87.70).toFixed(6));
    var lt = parseFloat((Math.random() * (41.730000 - 41.890000) + 41.95).toFixed(6));
    markers.push([lt, lg]);
  }
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(41.879854, -87.636311)
  });

  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var placeSearched = false;

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    var long = places[0].geometry.location.lng();
    var lat = places[0].geometry.location.lat();
    console.log("Location", places[0].name, " lat/lng:", lat, long);
    var searchCoordinates = lat + "," + long;

    if (places.length === 0) {
      return;
    }

    if (placeSearched === true) {
      searchedPlace.setMap(null);
      searchedPlace = null;
    } else {
      placeSearched = true;
    }
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      console.log("place: " + place.geometry.location);
      console.log("searchedPlace " + searchedPlace);
      // Create a marker for each place.
      setMarker(map, place);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });

      setFakeMarkers(map, markers, lat, long);
      fakeInfoWindow = new google.maps.InfoWindow({
        content: "loading..."
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

//map, markers(faked listings), coordinates of your job/searched place
function setFakeMarkers(map, markers, lat, lng) {
  console.log("inside setFakeMarkers");
  for (var i = 0; i < markers.length; i++) {
    var sites = markers[i];
    var siteLatLng = new google.maps.LatLng(sites[0], sites[1]);
    var walkingDistance, bikeDistance, transitDistance;
    $.get('/api/v1/nearbyLocations?mode=walking&origin=' + sites[0] + ',' + sites[1] + '&destination=' + lat + ',' + lng, function(response) {
      console.log(response);
      walkingDistance = response.distance;
    });
    $.get('/api/v1/nearbyLocations?mode=bike&origin=' + sites[0] + ',' + sites[1] + '&destination=' + lat + ',' + lng, function(response) {
      console.log(response);
      bikeDistance = response.distance;
    });
    $.get('/api/v1/nearbyLocations?mode=transit&origin=' + sites[0] + ',' + sites[1] + '&destination=' + lat + ',' + lng, function(response) {
      console.log(response);
      transitDistance = response.distance;
    });

    var marker = new google.maps.Marker({
      position: siteLatLng,
      map: map,
      title: "Marker" + i,
      html: ("<div style='height:100%;width:50%;float:left;'>" + "<p> lat: " + sites[0] + "</p><p>lng: " + sites[1] + "</p><p>walkingDistance: " + walkingDistance + "</div>"
        + "<div style='height:100%;width:50%;float:right;'>" + "<img style='width:100px;height:100px;' src=" + "https://upload.wikimedia.org/wikipedia/commons/9/95/1St_Leonards%2C_New_South_wales.jpg>" + "</div>")
    });
    var contentString = "station" + i;

    google.maps.event.addListener(marker, "click", function() {
      alert(this.html);
      fakeInfoWindow.setContent(this.html);
      fakeInfoWindow.open(map, this);
    });
  }
}

function setMarker(map, marker) {
  console.log("inside the function setMarkers");
  var site = marker;
  var long = site.geometry.location.lng();
  var lat = site.geometry.location.lat();
  var siteLatLng = new google.maps.LatLng(lat, long);
  var marker1 = new google.maps.Marker({
    position: siteLatLng,
    map: map,
    icon: {
      url: site.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    },
    title: site.name,
    html: site.name
  });
  fakeInfoWindow = new google.maps.InfoWindow({
    content: "loading..."
  });

  var contentString = "station";

  google.maps.event.addListener(marker1, "click", function() {
    alert(this.html);
    infowindow.setContent(this.html);
    infowindow.open(map, this);
  });
}