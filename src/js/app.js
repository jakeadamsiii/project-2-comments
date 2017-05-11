/* global google:ignore mapStyles:ignore */
// Document ready
$(() => {

  // Store the #map div, and make it available to all functions
  const $map = $('#map');
  $map.on('click', '.saveBtn', submitForm);

  //Submits hidden form on map page
  function submitForm(){
    $('.hiddenForm').submit();
  }
  // Set a map variable that will hold our Google map, and is available to all functions
  let map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  let infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    const latLng = { lat: 51.507558, lng: -0.127625 };
    map = new google.maps.Map($map.get(0), {
      zoom: 13,
      //center: latLng,
      scrollwheel: false,
      // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
      styles: mapStyles
    });

    getGigs();
  }

// Add a map marker for each gig location 
  function getGigs() {
    const events = $map.data('events');
    // console.log(events);
    $.each(events, (index, location) => {
      addMarker(location);
    });
  }

  function addMarker(location) {
    const latLng = { lat: location.venue.latitude, lng: location.venue.longitude };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/music-icon.png'
    });

    // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
    marker.addListener('click', () => {
      markerClick(marker, location);
    });
  }

  const infoWindow = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    icon: '../assets/images/me-icon.png'
  });

    // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
  }

  function markerClick(marker, location) {
    // If there is an open infowindow on the map, close it
    if(infowindow) infowindow.close();


    // Locate the data that we need from the individual bike object
    const eventName = location.eventname;
    const price = location.entryprice;
    const venue = location.venue.name;
    const link = location.link;
    const date = location.date;
    const time = location.openingtimes.doorsopen;

    $('input[name="eventName"]').val(eventName);
    $('input[name="price"]').val(price);
    $('input[name="venue"]').val(venue);
    $('input[name="link"]').val(link);
    $('input[name="date"]').val(date);
    $('input[name="time"]').val(time);

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <h4>${eventName}</h4>
        <p>${venue}</p>
        <p>${price}</p>
        <p>${date}</p>
        <p>${time}</p>
        <a class="btn" href="${link}" target="_blank">Buy tickets</a>
        <a id="specialBtn" class="saveBtn btn" href="#">Save for later!</a>
      </div>
      `
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }

  const $scroller = $('#scroller');
  const $text = $('#text');

  $scroller.on('click', scroll);

  function scroll(){
    $('html,body').animate({scrollTop: $text.offset().top},'slow');
  }
});
