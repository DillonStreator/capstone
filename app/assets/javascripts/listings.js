/* global $ Vue, Chart */
var google;
var infowindow = null;
var fakeInfoWindow = null;
var searchedInfowindow = null;
var searchedPlace = null;
var markers = [[41.879854, -87.636311]];
var heatmapData = [];
var searchedLat, searchedLng, searchedLatLng;
var directionsDisplay;
var sortedMarkers;
var rentWeight = 4;
var distanceWeight = 2;
var durationWeight = 3;
var crimeWeight = 3;
var map;
var userApartments = [];


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



$('.modal').modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: '4%', // Starting top style attribute
  endingTop: '10%', // Ending top style attribute
  ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    alert("Ready");
    console.log(modal, trigger);
  },
  complete: function() {
    console.log("CLOSING MODAL");
    alert('Closed');
  } // Callback for Modal close
});

function setMapStyle() {
  console.log($("#style").find(":selected").val());
  if ($("#style").find(":selected").val() === "retroStyle") {
    map.setOptions({styles: retroStyle});
  } else if ("darkStyle" === $("#style").find(":selected").val()) {
    map.setOptions({styles: darkStyle});
  } else if ("standardStyle" === $("#style").find(":selected").val()) {
    map.setOptions({styles: standardStyle});
  }
}

function setPriorities() {
  distanceWeight = parseInt($("#distanceWeight").find(":selected").val());
  rentWeight = parseInt($("#rentWeight").find(":selected").val());
  durationWeight = parseInt($("#durationWeight").find(":selected").val());
  crimeWeight = parseInt($("#crimeWeight").find(":selected").val());
  console.log("modalReady");
  console.log(parseInt($("#durationWeight").find(":selected").text()));
  console.log(parseInt($("#rentWeight").find(":selected").text()));
  console.log(parseInt($("#crimeWeight").find(":selected").text()));
  console.log(parseInt($("#distanceWeight").find(":selected").text()));
}

$(document).ready(function() {
  $('#modal1').modal();
  $('#modal2').modal();
  $('#modal3').modal();
  $('#modal1').modal('open');
  $('#style').material_select();
  $('#durationWeight').material_select();
  $('#rentWeight').material_select();
  $('#crimeWeight').material_select();
  $('#distanceWeight').material_select();
});

function initMap() {

  var promise1 = $.get('/api/v1/user_apartments/' + getCookie('user_id'));
  $.when(promise1).done(function(response) {
    response.forEach(function(listingId) {
      userApartments.push(listingId.id);
    });
  });

  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  var myLatLng = new google.maps.LatLng('3510 N Springfield Ave');

  for (var j = 0; j < 10; j++) {
    var lg = parseFloat((Math.random() * (-87.330000 - -87.370000) - 87.70).toFixed(6));
    var lt = parseFloat((Math.random() * (41.730000 - 41.890000) + 41.95).toFixed(6));
    markers.push([lt, lg]);
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(41.879854, -87.636311),
    styles: darkStyle
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
    $('#modal3').modal('open');
    var places = searchBox.getPlaces();
    searchedLng = places[0].geometry.location.lng();
    searchedLat = places[0].geometry.location.lat();
    console.log(places[0].geometry.location.lat(), places[0].geometry.location.lng());
    console.log(searchedLat, searchedLng);
    var searchCoordinates = searchedLat + "," + searchedLng;
    searchedLatLng = new google.maps.LatLng(searchedLat, searchedLng);
    console.log(searchedLatLng);

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
      heatMap(map);
      setTimeout(function() {
        var promise = $.get('/api/v1/apartments');
        $.when(promise).done(function(response) {
          getListingDistances(map, response, searchedLat, searchedLng);
        });
      }, 1000);

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


function sumWalking(response) {
  // console.log("summning the walking distances...");
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

function getListingDistances(map, markers, lat, lng) {
  console.log("getting listing Distances...");
  // console.log("inside getListingDistances");
  var i = 0;
  var markersInfo = [];
  // console.log("END LATLNG for routing...", lat, lng);
  markers.forEach(function(sites) {
    // console.log(sites);
    var siteLatLng = new google.maps.LatLng(sites['lat'], sites['lng']);
    var walkingDistance, bikeDistance, transitDistance;
    //crime_score = the sum of => 1 / sqrt( (lat1 - lat2)^2 + (lon1 - lon2)^2)
    // console.log("heatmap length>>", heatmapData.length);
    var crimeScore = 0;
    heatmapData.forEach(function(location) {
      if (sites['lat'] != null && sites['lng'] != null && location.lat() != null && location.lng() != null) {
        // Find the distance between each listing and every crime to produce a 'crimeScore'
        crimeScore += round(1 / Math.hypot((sites['lat'] - location.lat()), (sites['lng'] - location.lng())));
      }
    });
    // console.log('the crime score is', crimeScore);
    var start = new google.maps.LatLng(sites['lat'], sites['lng']);
    // console.log("START AND END LATLNG's",start, end);
    var firstPromise = $.get('/api/v1/nearbyLocations?mode=walking&origin=' + sites['lat'] + ',' + sites['lng'] + '&destination=' + searchedLat + ',' + searchedLng);
    // var secondPromise = $.get('/api/v1/nearbyLocations?mode=bike&origin=' + sites['lat'] + ',' + sites['lng'] + '&destination=' + this.lat + ',' + this.lng);
    var thirdPromise = $.get('/api/v1/nearbyLocations?mode=transit&origin=' + sites['lat'] + ',' + sites['lng'] + '&destination=' + searchedLat + ',' + searchedLng);
    $.when(firstPromise, thirdPromise).done(function(firstResponse, thirdResponse) {
      // console.log(thirdResponse);
      var duration = parseFloat(/\d{2}/.exec(thirdResponse[0].duration));
      walkingDistance = firstResponse[0].distance;
      // bikeDistance = secondResponse[0].distance;
      transitDistance = sumWalking(thirdResponse);
      markersInfo.push({
        // infoWalkingDistance: walkingDistance,
        // infoBikeDistance: bikeDistance,
        infoTransitDuration: duration,
        infoTransitDistance: transitDistance,
        html: '<div class="card">\
                <div class="card-image waves-effect waves-block waves-light">\
                  <canvas id="myChart{{chartIndex}}"></canvas>\
                </div>\
                <div class="card-content">\
                  <span class="card-title activator grey-text text-darken-4">' + sites['address'] + '<i class="material-icons right">info</i></span>\
                  <a style="display:inline;" class="waves-effect waves-light btn" onclick="likeListing(' + sites['id'] + ')">Add to liked listings</a>\
                </div>\
                <div class="card-reveal">\
                  <span class="card-title grey-text text-darken-4">' + sites['address'] + '<i class="material-icons right">close</i></span>\
                  <p>Rent: ' + sites['rent'] + '/mo</p>\
                  <p>Beds: ' + sites['bedrooms'] + '</p>\
                  <p>Baths: ' + sites['baths'] + '</p>\
                  <p>CrimeScore: ' + crimeScore + '</p>\
                  <p>Transit walking distance: ' + transitDistance + 'mi</p>\
                  <p>Transit duration: ' + duration + ' mins</p>\
                  <hr>\
                  <img style="height:225px;width:300px;" class="activator" src=' + sites['pic'] + '>\
                </div>\
              </div>',
        position: siteLatLng,
        map: map,
        lat: sites['lat'],
        lng: sites['lng'],
        crimeScore: crimeScore,
        rent: sites['rent'],
        beds: sites['bedrooms'],
        baths: sites['baths'],
        id: sites['id']
      });
      if (markersInfo.length === markers.length) {
        setMarkers(map, markersInfo, searchedLat, searchedLng);
      }
    }.bind(this));
    i++;
  }.bind(this));
  return markersInfo;
}

function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value);
  }

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

// ranking by walkability, crimeScore & rent
function rankListings(listings) {
  console.log("inside rankListings..");
  console.log("weights:", "rentWeight=", rentWeight, " distanceWeight=", distanceWeight, " durationWeight=", durationWeight, " crimeWeight=", crimeWeight);
  var calcsComplete = 0;
  var rankedListings = listings;
  var sortedByCrimes = [];
  var sortedByDistances = [];
  var sortedByDurations = [];
  var sortedByRents = [];
  for (var b = 0; b < listings.length; b++) {
    rankedListings[b]['rank'] = 0.0;
  }

  sortedByDurations = sortArrBy(rankedListings, 'infoTransitDuration');
  if (sortedByDurations.length == listings.length) {
    for (var j = 0; j < sortedByDurations.length; j++) {
      console.log("durationRanking: ", (1 + (sortedByDurations[j].infoTransitDuration - sortedByDurations[0].infoTransitDuration) * (10 - 1) / (sortedByDurations[(sortedByDurations.length - 1)].infoTransitDuration - sortedByDurations[0].infoTransitDuration)) * durationWeight );
      rankedListings[j]['rank'] += ((1 + (sortedByDurations[j].infoTransitDuration - sortedByDurations[0].infoTransitDuration) * (10 - 1) / (sortedByDurations[(sortedByDurations.length - 1)].infoTransitDuration - sortedByDurations[0].infoTransitDuration)) * durationWeight );
      rankedListings[j]['graphDuration'] = round((1 + (sortedByDurations[j].infoTransitDuration - sortedByDurations[0].infoTransitDuration) * (10 - 1) / (sortedByDurations[(sortedByDurations.length - 1)].infoTransitDuration - sortedByDurations[0].infoTransitDuration)), 2);
      calcsComplete += 1;
    }
  }
  sortedByDistances = sortArrBy(rankedListings, 'infoTransitDistance');
  if (sortedByDistances.length == listings.length) {
    for (var y = 0; y < sortedByDistances.length; y++) {
      console.log("distanceRanking: ", (1 + (parseFloat(sortedByDistances[y].infoTransitDistance) - parseFloat(sortedByDistances[0].infoTransitDistance)) * (10 - 1) / (parseFloat(sortedByDistances[(sortedByDistances.length - 1)].infoTransitDistance) - parseFloat(sortedByDistances[0].infoTransitDistance))) * distanceWeight );
      rankedListings[y]['rank'] += ((1 + (parseFloat(sortedByDistances[y].infoTransitDistance) - parseFloat(sortedByDistances[0].infoTransitDistance)) * (10 - 1) / (parseFloat(sortedByDistances[(sortedByDistances.length - 1)].infoTransitDistance) - parseFloat(sortedByDistances[0].infoTransitDistance))) * distanceWeight );
      rankedListings[y]['graphDistance'] = round((1 + (parseFloat(sortedByDistances[y].infoTransitDistance) - parseFloat(sortedByDistances[0].infoTransitDistance)) * (10 - 1) / (parseFloat(sortedByDistances[(sortedByDistances.length - 1)].infoTransitDistance) - parseFloat(sortedByDistances[0].infoTransitDistance))), 2);
      calcsComplete += 1;
    }
  }
  sortedByCrimes = sortArrBy(rankedListings, 'crimeScore');
  if (sortedByCrimes.length == listings.length) {
    console.log("sortedByCrimes>>>>", sortedByCrimes);
    for (var i = 0; i < sortedByCrimes.length; i++) {
      console.log("crimeRanking: ",((1 + (parseInt(sortedByCrimes[i].crimeScore) - parseInt(sortedByCrimes[0].crimeScore)) * (10 - 1) / (parseInt(sortedByCrimes[(sortedByCrimes.length - 1)].crimeScore) - parseInt(sortedByCrimes[0].crimeScore))) * crimeWeight ));
      rankedListings[i]['rank'] += ((1 + (parseInt(sortedByCrimes[i].crimeScore) - parseInt(sortedByCrimes[0].crimeScore)) * (10 - 1) / (parseInt(sortedByCrimes[(sortedByCrimes.length - 1)].crimeScore) - parseInt(sortedByCrimes[0].crimeScore))) * crimeWeight );
      rankedListings[i]['graphCrime'] = round((1 + (parseInt(sortedByCrimes[i].crimeScore) - parseInt(sortedByCrimes[0].crimeScore)) * (10 - 1) / (parseInt(sortedByCrimes[(sortedByCrimes.length - 1)].crimeScore) - parseInt(sortedByCrimes[0].crimeScore))), 2);
      calcsComplete += 1;
    }
  }
  sortedByRents = sortArrBy(rankedListings, 'rent');
  if (sortedByRents.length == listings.length) {
    for (var a = 0; a < sortedByRents.length; a++) {
      console.log("rentRanking: ", ((1 + (sortedByRents[a].rent - sortedByRents[0].rent) * (10 - 1) / (sortedByRents[(sortedByRents.length - 1)].rent - sortedByRents[0].rent)) * rentWeight ));
      rankedListings[a]['rank'] += ((1 + (sortedByRents[a].rent - sortedByRents[0].rent) * (10 - 1) / (sortedByRents[(sortedByRents.length - 1)].rent - sortedByRents[0].rent)) * rentWeight );
      rankedListings[a]['graphRent'] = round((1 + (sortedByRents[a].rent - sortedByRents[0].rent) * (10 - 1) / (sortedByRents[(sortedByRents.length - 1)].rent - sortedByRents[0].rent)), 2);
      calcsComplete += 1;
    }
  }
  console.log(calcsComplete);
  if (calcsComplete == (listings.length * 3)) {
    return rankedListings;
  }
}

function sortArrBy(array, criteria) {
  console.log("inside sortArrBy...", criteria);
  var sorted = array.sort(function(a, b) {
    // console.log("sorting-->", a[criteria], b[criteria]);
    return a[criteria] - b[criteria];
  });
  if (sorted.length == array.length) {
    console.log("sorted by ", criteria, sorted);
    return sorted;
  }
  // return parseFloat(array.criteria) - parseFloat(array.criteria);
}

function setMarkers(map, markers, lat, lng) {
  sortedMarkers = rankListings(markers);
  // console.log("THESE ARE THE MARKERS>>>", markers);
  // for (var j = 0; i < markers.length - 1; i++) {
  //   markers[j]['rank'] = (1 + (markers[j].infoTransitDuration - sortedMarkers[0].infoTransitDuration) * (10 - 1) / (sortedMarkers[(sortedMarkers.length - 1)].infoTransitDuration - sortedMarkers[0].infoTransitDuration) );
  //   console.log("rank: ",markers[j].rank);
  //   rankedMarkers.push(markers[j]);
  // }
  sortedMarkers = markers.sort(function(a, b) {
    return parseFloat(a.rank) - parseFloat(b.rank);
  });
  $('#modal3').modal('close');
  map.setZoom(12);
  var i = 1;
  var label = toString(i);
  var icon;
  var end = new google.maps.LatLng(lat, lng);
  if (sortedMarkers.length === markers.length) {
    sortedMarkers.forEach(function(site) {
      // console.log("duration: ", site.infoTransitDuration);
      //1 + (x-A)*(10-1)/(B-A)
      // console.log("duration rating: ",(1 + (site.infoTransitDuration - sortedMarkers[0].infoTransitDuration) * (10 - 1) / (sortedMarkers[(sortedMarkers.length - 1)].infoTransitDuration - sortedMarkers[0].infoTransitDuration) ));
      // if (i <= 5) {
      //   icon = "http://chart.apis.google.com/chart?chst=d_map_spin&chld=1.2|0|FFDF00|25|_|";
      // } else {
      //   icon = "http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|FF0000|12|_|";
      // }
      // console.log(site);
      var start = new google.maps.LatLng(site['lat'], site['lng']); 
      var marker = new google.maps.Marker({
        position: site.position,
        map: map,
        icon: 'assets/icons/number_' + i + '.png',
        // icon: icon + i,
        title: "Marker" + i,
        html: site["html"].replace("{{chartIndex}}", i).replace("{{chartIndex2}}", i),
        //y = 1 + (x-A)*(10-1)/(B-A)
        // crimeScore: (1 + (parseFloat(site.crimeScore) - parseFloat(crimesSorted[0].crimeScore)) * (10 - 1) / (parseFloat(crimesSorted[(crimesSorted.length - 1)].crimeScore) - parseFloat(crimesSorted[0].crimeScore)) ),
        crimeScore: site.crimeScore,
        rent: site.rent,
        transitDistance: site.infoTransitDistance,
        transitDuration: site.infoTransitDuration,
        graphCrime: site.graphCrime,
        graphDistance: site.graphDistance,
        graphRent: site.graphRent,
        graphDuration: site.graphDuration
      });
      marker.chartIndex = i;
      var contentString = "station" + i;
      google.maps.event.addListener(marker, "click", function(e) {
        fakeInfoWindow.setContent(this.html);
        fakeInfoWindow.open(map, this);
        calcRoute(start, searchedLatLng, map);
        createChart(this);
      });
      i++;
    });
  }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function calcRoute(start, end, map) {
  console.log("inside calcRoute", start, end, map);
  directionsDisplay.setMap(null);

  var directionsService = new google.maps.DirectionsService();
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(start);
  bounds.extend(end);
  map.fitBounds(bounds);
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.TRANSIT
  };
  directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
    } else {
      alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
    }
  });
}

function createChart(marker) {
  console.log("THIS IS THE MARKER INSIDE CREATECHART=", marker);
  var commuteDistance, crimeScore, rent;
  var commuteDistanceC, crimeScoreC, rentC;
  var commuteDistanceBC, crimeScoreBC, rentBC;
  if (marker.graphRent >= 7) {//red NG
    // rent = 1;
    rentC = 'rgba(255,0,0, 0.5)';
    rentBC = 'rgb(220,20,60)';
  } else if (marker.graphRent >= 4 && marker.graphRent < 7) {
    // rent = 4;
    rentC = 'rgba(255,255,51, 0.5)';
    rentBC = 'rgb(255,255,0)';
  } else if (marker.graphRent >= 1 && marker.graphRent <= 3.99) {//green GOOD
    // rent = 10;
    rentC = 'rgba(0, 255, 0, 0.5)';
    rentBC = 'rgb(0,100,0)';
  }
  if (marker.graphCrime >= 7) {//red-NG
    crimeScoreC = 'rgba(255,0,0, 0.5)';
    crimeScoreBC = 'rgb(220,20,60)';
  } else if (marker.graphCrime >= 4 && marker.graphCrime < 7) {//yellow NG
    crimeScoreC = 'rgba(255,255,51, 0.5)';
    crimeScoreBC = 'rgb(255,255,0)';
  } else if (marker.graphCrime >= 1 && marker.graphCrime <= 3.99) {//green NG
    crimeScoreC = 'rgba(0, 255, 0, 0.5)';
    crimeScoreBC = 'rgb(0,100,0)';
  }
  if (marker.graphDuration >= 7) {//red NG
    commuteDistanceC = 'rgba(255,0,0, 0.5)';
    commuteDistanceBC = 'rgb(220,20,60)';
  } else if (marker.graphDuration >= 4 && marker.graphDuration < 7) {//yellow OK
    commuteDistanceC = 'rgba(255,255,51, 0.5)';
    commuteDistanceBC = 'rgb(255,255,0)';
  } else if (marker.graphDuration >= 1 && marker.graphDuration <= 3.99) {//green GOOD
    commuteDistanceC = 'rgba(0, 255, 0, 0.5)';
    commuteDistanceBC = 'rgb(0,100,0)';
  }

  var i = marker.chartIndex;
  var ctx = document.getElementById("myChart" + i);
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Commute", "Crime", "Rent"],
      datasets: [{
        label: "Rankings",
        data: [marker.graphDuration, marker.graphCrime, marker.graphRent],
        backgroundColor: [
          commuteDistanceC,
          crimeScoreC,
          rentC
        ],
        borderColor: [
          commuteDistanceBC,
          crimeScoreBC,
          rentBC
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10,
            beginAtZero:true
          }
        }]
      }
    }
  });
}

function heatMap(map) {
  console.log("setting heatmap data...", map);
  var promise = $.get("/api/v1/nearbyLocations/crimes");
  $.when(promise).done(function(response) {
    console.log(response);
    for (var i = 0; i < response.length - 1; i++) {
      this.heatmapData.push(new google.maps.LatLng(response[i].latLng[1], response[i].latLng[0]));
    }
    console.log("heatmapData is filled...");
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.heatmapData,
      map: map
    });
    heatmap.setMap(map);
    // heatmap.setMap(heatmap.getMap() ? null : map);
  }.bind(this));
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
    icon: 'assets/icons/work.png',
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

function likeListing(id, thing) {
  console.log("this>>", thing);
  $.get('/like_listing/' + id);

}

function deleteMarkers() {
  clearMarkers();
  console.log("Markers>>>", markers);
  markers = [];
  console.log(markers);
}