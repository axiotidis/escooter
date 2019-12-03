
var basemap = new L.TileLayer(baseUrl, {maxZoom: 19, attribution: baseAttribution, subdomains: subdomains, opacity: opacity});

var lat = 0;		//set initial value latitude
var lng = 0;		//set initial value lognitude
var zoom = 15;		//set zoom level
var myPosition = 0;	//set an initial value of user's location

var sPos = [];		//this array holds the position of e-scooters
var pois = [];		//this array holds the position of point of interest

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDU1RPg4avyJA4Dv4DCGtGb2nnne8FZCfk",
    authDomain: "escooter-d43d9.firebaseapp.com",
    databaseURL: "https://escooter-d43d9.firebaseio.com",
    projectId: "escooter-d43d9",
    storageBucket: "escooter-d43d9.appspot.com",
    messagingSenderId: "27699640672",
    appId: "1:27699640672:web:05eb2d79cca519e28d4605",
    measurementId: "G-F2V4WNEBRW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  var database = firebase.database();

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user = firebase.auth().currentUser;
    var email = user.email;
    var name = user.name;
    if (email != null){
      var message = 'Welcome user ' + email;
      alert(message);
    }else if(name != null){
      var message = 'Welcome user ' + name;
      alert(message);
    }
    
  } else {
    location.replace("signin.html");
  }
});






var redIcon = L.icon({			//set a marker icon for current location of user
	iconUrl: 'pics/red_pin.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 46], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});

var redScooter = L.icon({			//set a marker icon for booked scooters
	iconUrl: 'pics/red_scooter.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 46], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});

var greenScooter = L.icon({			//set a marker icon for free scooters
	iconUrl: 'pics/green_scooter.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 46], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});

var poiIcon = L.icon({			//set a marker icon for pois
	iconUrl: 'pics/poi.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 46], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});
//center and zoom map in a position found by geolocation
var center = new L.LatLng(lat, lng);
//var map = new L.map('map', {center: center, zoomControl: false, maxZoom: maxZoom, layers: [basemap] });
var map = new L.map('map', {center: center, zoomControl: false, minZoom: 0, maxZoom: 50, layers: [basemap] });
var popup = L.popup();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }


function setPosition(position) {
  lat = position.coords.latitude.toString();		//find latitude
  lng = position.coords.longitude.toString();		//find lognitude
  var marker = new L.marker([lat, lng], {icon: redIcon}).addTo(map);	//set a marker in current geoposition
  var mypopup = "You are here";
  map.setView([lat, lng], zoom);
  marker.bindPopup(mypopup).openPopup();
}
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/poi/').orderByChild('Lat').equalTo(userId).once('value').then(function(snapshot) {
  var poiLat = snapshot.val().Lat;
  // ...
});
return firebase.database().ref('/poi/').orderByChild('Log').equalTo(userId).once('value').then(function(snapshot) {
  var poiLng = snapshot.val().Log;
  // ...
});
  return firebase.database().ref('/poi/').orderByChild('Pic').equalTo(userId).once('value').then(function(snapshot) {
  var poiPic = snapshot.val().Pic;
  // ...
});
  return firebase.database().ref('/poi/').orderByChild('name').equalTo(userId).once('value').then(function(snapshot) {
  var poiTxt = snapshot.val().name;
  // ...
});

  var marker = new L.marker([poiLat, poiLng], {icon: poiIcon}).addTo(map);	//set a marker in current geoposition
  var mypopup = "<img src= poiPic />";		//prepare a custom popup 
	mypopup += "<br><br><b>";
	mypopup += poiTxt;
	mypopup += "</b>";
	marker.bindPopup(mypopup).openPopup();


function onLocationFound(e) {
        //do nothing
	
    }

    function onLocationError(e) {
        alert(e.message);
    }



map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);


    

    

