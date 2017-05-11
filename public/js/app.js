'use strict';

/* global google:ignore mapStyles:ignore */

$(function () {

  // Store the #map div, and make it available to all functions
  var $map = $('#map');
  $map.on('click', '.saveBtn', submitForm);

  function submitForm() {
    $('.hiddenForm').submit();
  }
  // Set a map variable that will hold our Google map, and is available to all functions
  var map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  var infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    var latLng = { lat: 51.507558, lng: -0.127625 };
    map = new google.maps.Map($map.get(0), {
      zoom: 13,
      //center: latLng,
      scrollwheel: false,
      // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
      styles: mapStyles
    });

    getGigs();
  }

  function getGigs() {
    var events = $map.data('events');
    // console.log(events);
    $.each(events, function (index, location) {
      addMarker(location);
    });
  }

  function addMarker(location) {
    var latLng = { lat: location.venue.latitude, lng: location.venue.longitude };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/music-icon.png'
    });

    // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
    marker.addListener('click', function () {
      markerClick(marker, location);
    });
  }

  var infoWindow = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    icon: '../assets/images/me-icon.png'
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      map.setCenter(pos);
    }, function () {
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
    if (infowindow) infowindow.close();

    // Locate the data that we need from the individual bike object
    var eventName = location.eventname;
    var price = location.entryprice;
    var venue = location.venue.name;
    var link = location.link;
    var date = location.date;
    var time = location.openingtimes.doorsopen;

    $('input[name="eventName"]').val(eventName);
    $('input[name="price"]').val(price);
    $('input[name="venue"]').val(venue);
    $('input[name="link"]').val(link);
    $('input[name="date"]').val(date);
    $('input[name="time"]').val(time);

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <h4>' + eventName + '</h4>\n        <p>' + venue + '</p>\n        <p>' + price + '</p>\n        <p>' + date + '</p>\n        <p>' + time + '</p>\n        <a class="btn" href="' + link + '" target="_blank">Buy tickets</a>\n        <a id="specialBtn" class="saveBtn btn" href="#">Save for later!</a>\n      </div>\n      '
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }

  var $scroller = $('#scroller');
  var $text = $('#text');

  $scroller.on('click', scroll);

  function scroll() {
    $('html,body').animate({ scrollTop: $text.offset().top }, 'slow');
  }
});