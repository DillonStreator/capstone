/* global $ Vue*/
var google;
var infowindow = null;
var fakeInfoWindow = null;
var searchedInfowindow = null;
var searchedPlace = null;
var markers = [[41.879854, -87.636311]];
var darkStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
];
var retroStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];
var standardStyle = [];

function initMap() {
  var myLatLng = new google.maps.LatLng('3510 N Springfield Ave');
  console.log(myLatLng);

  for (var j = 0; j < 10; j++) {
    var lg = parseFloat((Math.random() * (-87.330000 - -87.370000) - 87.70).toFixed(6));
    var lt = parseFloat((Math.random() * (41.730000 - 41.890000) + 41.95).toFixed(6));
    markers.push([lt, lg]);
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(41.879854, -87.636311),
    styles: retroStyle
  });

  var myMarker = new google.maps.Marker({
    position: myLatLng,
    map: map
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
    // console.log("Location", places[0].name, " lat/lng:", lat, long);
    var searchCoordinates = lat + "," + long;

    if (places.length === 0) {
      return;
    }

    if (placeSearched === true) {
      // searchedPlace.setMap(null);
      // deleteMarkers();
      clearMarkers();
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

      // console.log("place: " + place.geometry.location);
      // console.log("searchedPlace " + searchedPlace);
      // Create a marker for each place.
      setMarker(map, place);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
      var promise = $.get('/api/v1/apartments');
      $.when(promise).done(function(response) {
        getListingDistances(map, response, lat, long);
      });
      heatMap(map);

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

// ranking by walkability
function rankListings(listings) {
}

function sumWalking(response) {
  var walkingDistanceMi = [];
  var walkingDistanceFt = [];
  var nums = /\d+.\d+/;
  var miUnits = /\.*mi/;
  var ftUnits = /\.*ft/;
  var miReady = false;
  var a = response[0].route[0].legs[0].steps.length;
  response[0].route[0].legs[0].steps.forEach(function(step) {
    if (step.travel_mode === "WALKING" && miUnits.test(step.distance.text)) {
      walkingDistanceMi.push(parseFloat(nums.exec(step.distance.text)));
    } else if (step.travel_mode === "WALKING" && ftUnits.test(step.distance.text)) {
      walkingDistanceFt.push(parseInt(step.distance.text));
    }
    a--;
    if (a === 1) {
      miReady = true;
    }
  });
  if (typeof walkingDistanceFt !== 'undefined' && walkingDistanceFt.length > 0 && miReady) {
    var ftConverted = false;
    for (var i = 0; i <= walkingDistanceFt.length - 1; i++) {
      walkingDistanceMi.push((walkingDistanceFt.reduce((acc, curr) => acc += curr) * 0.00018939));
    }
    if (i === walkingDistanceFt.length) {
      ftConverted = true;
    }
  } else {
    ftConverted = true;
  }
  if (typeof walkingDistanceMi !== 'undefined' && walkingDistanceMi.length > 0 && ftConverted) {
    return parseFloat(walkingDistanceMi.reduce((acc, curr) => acc += curr)).toFixed(2);
  }
}

//map, markers(faked listings), coordinates of your job/searched place
function getListingDistances(map, markers, lat, lng) {
  console.log(markers);
  console.log("inside getListingDistances");
  var i = 0;
  var markersInfo = [];
  markers.forEach(function(sites) {
    console.log(sites);
    var siteLatLng = new google.maps.LatLng(sites['lat'], sites['lng']);
    var walkingDistance, bikeDistance, transitDistance;

    var firstPromise = $.get('/api/v1/nearbyLocations?mode=walking&origin=' + sites['lat'] + ',' + sites['lng'] + '&destination=' + lat + ',' + lng);
    var secondPromise = $.get('/api/v1/nearbyLocations?mode=bike&origin=' + sites['lat'] + ',' + sites['lng'] + '&destination=' + lat + ',' + lng);
    var thirdPromise = $.get('/api/v1/nearbyLocations?mode=transit&origin=' + sites['lat'] + ',' + sites['lng'] + '&destination=' + lat + ',' + lng);
    $.when(firstPromise, secondPromise, thirdPromise).done(function(firstResponse, secondResponse, thirdResponse) {
      console.log(firstResponse);
      console.log(secondResponse);
      walkingDistance = firstResponse[0].distance;
      bikeDistance = secondResponse[0].distance;
      transitDistance = sumWalking(thirdResponse);
      // console.log('responses: ', firstResponse[0].distance, secondResponse[0].distance, thirdResponse[0].distance);
      markersInfo.push({
        infoWalkingDistance: walkingDistance,
        infoBikeDistance: bikeDistance,
        infoTransitDistance: transitDistance,
        // html: ("<div class='map-info-window'><div style='height:100%;width:50%;float:left;'><button onclick='likeListing()'>likeThisBadBoy</button>" + "<p> lat: " + sites[0] + "</p><p>lng: " + sites[1] + "</p><p>walkingDistance: " + walkingDistance + "</p><p>bikeDistance: " + bikeDistance + "</p><p>transitDistance: " + transitDistance + "miles</p><a href='/like_listing?id=" + sites['id'] + "'>Like-Listing</a></div>"
        //   + "<div style='height:100%;width:50%;float:right;'>" + "<img style='height:200px;width:200px;' src=" + "https://upload.wikimedia.org/wikipedia/commons/9/95/1St_Leonards%2C_New_South_wales.jpg>" + "</div><a href='/like_listing?id=" + sites['id'] + "'><b>Like listing</b></a></div>"),
        html: '<div class="card">\
                <div class="card-image waves-effect waves-block waves-light">\
                  <img class="activator" src=' + sites['pic'] + '>\
                </div>\
                <div class="card-content">\
                  <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>\
                  <p><a href="#">This is a link</a></p>\
                </div>\
                <div class="card-reveal">\
                  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>\
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>\
                </div>\
              </div>',
        position: siteLatLng,
        map: map,
        lat: sites['lat'],
        lng: sites['lng']
      });
      if (markersInfo.length === markers.length) {
        console.log("DONE", markersInfo);
        setMarkers(map, markersInfo);
      }
    });
    i++;
  });
  return markersInfo;
}

function sort(array) {
  return parseFloat(array.price) - parseFloat(array.price);
}

function setMarkers(map, markers) {
  var sortedMarkers = markers.sort(function(a, b) {
    return parseFloat(a.infoTransitDistance) - parseFloat(b.infoTransitDistance);
  });
  var i = 0;
  var label = toString(i);
  if (sortedMarkers.length === markers.length) {
    sortedMarkers.forEach(function(site) {
      console.log("WE ARE SETTIG THE MARKERS>>>>>" ,i, site);
      var marker = new google.maps.Marker({
        position: site.position,
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|FF0000|12|_|" + i,
        title: "Marker" + i,
        html: site["html"]
        // html: ("<div class='map-info-window'><div style='height:100%;width:50%;float:left;'>" + "<p> lat: " + site.lat + "</p><p>lng: " + site.lng + "</p><p>walkingDistance: " + site.infoWalkingDistance || null + "</p><p>bikeDistance: " + site.infoBikeDistance || null + "</p><p>transitDistance: " + site.infoTransitDistance || null + "miles</p></div>"
        //   + "<div style='height:100%;width:50%;float:right;'>" + "<img style='height:200px;width:200px;' src=" + "https://upload.wikimedia.org/wikipedia/commons/9/95/1St_Leonards%2C_New_South_wales.jpg>" + "</div></div>")
      });
      var contentString = "station" + i;
      google.maps.event.addListener(marker, "click", function() {
        fakeInfoWindow.setContent(this.html);
        fakeInfoWindow.open(map, this);
      });
      i++;
    });
  }
}


function heatMap(map) {
  var promise = $.get("/api/v1/nearbyLocations/crimes");
  $.when(promise).done(function(response) {
    var heatmapData = [];
    for (var i = 0; i < response.length - 1; i++) {
      heatmapData.push(new google.maps.LatLng(response[i].latLng[1], response[i].latLng[0]));
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map
    });
    heatmap.setMap(map);
    // heatmap.setMap(heatmap.getMap() ? null : map);
  });
}


function setMarker(map, marker) {
  // console.log("inside the function setMarkers");

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
    infowindow.setContent(this.html);
    infowindow.open(map, this);
  });
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length - 1; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  console.log("Markers>>>", markers);
  markers = [];
  console.log(markers);
}