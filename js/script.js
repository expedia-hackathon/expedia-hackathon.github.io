var currentLocationId;
var currentBackgroundIndex;
var previousLocationsId = [];
// var allLocationsId = [];
var cachedRegionLocationsId = {};
var cachedLocationsData = {};
var currentRegion = "Global";

var locationCardName = $("#location-card-name");
// console.log(locationCardName);
var locationCardThumbnail = $("#location-card-thumbnail");
var locationCardInfoButton = $("#button-location-info");
var locationCardBookButton = $("#button-location-card-book");
var locationModalTitle = $("#modal-location-info-long-title");
var locationModalThumbnail = $("#modal-location-thumbnail");
var locationModalDescription = $("#modal-location-description");
var previousLocationButton = $("#button-previous-location");

var regionButton = $("#button-region");

var topLeftGUI = $("#gui-top-left");
var bottomLeftGUI = $("#gui-bottom-left");
var bottomRightGUI = $("#gui-bottom-right");
var googleMap = $("#google-map");
var roamAroundButton = $("#button-roam-around");

var locationCardCountry = $("#location-card-country");
var locationModalCountry = $("#modal-location-country");
var locationModalDescriptionTitle = $("#modal-location-description-title");

var cardSummary = $("#card-summary");

var audioButton = $("#button-audio");
var audioButtonIcon = $("#button-audio > i");
// console.log(audioButtonIcon);
var audioOn = false;
var bgmAudio = document.getElementById("audio-bgm");

var loadingHint = $("#loading-hint");
var loadingText = $("#loading-text");

function getLocationsData(onSuccess, onError){
  fetch('./json/locations.json')
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    if(onSuccess!=null){
      onSuccess(json);
    }

  })
  .catch(error=>{
    console.log(error);
    if(onError!=null){
      onError(error);
    }
  });
}

// var bgmAudio = document.getElementById("audio-bgm");

// var bgmAudioLoad = bgmAudio.load();
// console.log(bgmAudioLoad);
// bgmAudio.play();

function getRandomLocation(){
  if(cachedRegionLocationsId[currentRegion]==null){
    cachedRegionLocationsId[currentRegion] = cachedRegionLocationsId['Global'].filter(locationId=>cachedLocationsData[locationId].region==currentRegion);
    console.log("cachedRegionLocationsId",currentRegion,cachedRegionLocationsId[currentRegion]);
  }
  let locationIds = cachedRegionLocationsId[currentRegion];

  let locationIndex = Math.floor(Math.random() * locationIds.length);
  let newLocationId = locationIds[locationIndex];

  if(locationIds.length>1){
    while(true){

      if(newLocationId!=currentLocationId){
        break;
      }

      locationIndex = Math.floor(Math.random() * locationIds.length);
      newLocationId = locationIds[locationIndex];
    }
  }

  return newLocationId;
}

function getLocationData(locationId, onSuccess, onError){
  if(cachedLocationsData==null){
    if(onError!=null) onError(new Error("cachedLocationsData is null!"));
    return;
  }

  onSuccess(cachedLocationsData[locationId]);
}

function setCurrentLocation(newLocationId){

  currentLocationId = newLocationId;
  let locationData = cachedLocationsData[currentLocationId];

  // locationCardName.css("display","inline");
  locationCardName.html(locationData.cityName);
  // locationCardName.contents().filter(function(){ return this.nodeType == 3; }).first().replaceWith(locationData.cityName);

  locationCardThumbnail.attr("src", locationData.thumbnail);
  locationCardInfoButton.removeClass("disabled");
  locationCardBookButton.removeClass("disabled");

  locationModalTitle.html(locationData.cityName);

  locationModalThumbnail.attr("src", locationData.thumbnail);
  locationModalDescription.html(locationData.description);

  locationCardCountry.html(locationData.country);
  locationModalCountry.html(locationData.country);
  locationModalDescriptionTitle.html(locationData.title);

  googleMap.attr("src",locationData.googleMapEmbedUrl);

  let newCardSummary = locationData.title.substring(0, locationData.title.length-1);

  cardSummary.contents().filter(function(){ return this.nodeType == 3; }).first().replaceWith(newCardSummary+"... ");

  currentBackgroundIndex=0;
  setBackground(locationData.backgrounds[currentBackgroundIndex]);
  // setSkyboxTexture(locationData.backgrounds[currentBackgroundIndex].panorama);
  // setParticles(locationData.backgrounds[currentBackgroundIndex].particles);
}

function onClickBookVacationButton(){
  console.log("onClickBookVacationButton");
  window.open(cachedLocationsData[currentLocationId]["bookLink"],'_blank')
}

function onClickChangeBackgroundButton(){

  let locationData = cachedLocationsData[currentLocationId];
  currentBackgroundIndex=(currentBackgroundIndex+1)%locationData.backgrounds.length;
  console.log(currentBackgroundIndex);
  console.log(locationData.backgrounds[currentBackgroundIndex]);
  // setSkyboxTexture(locationData.backgrounds[currentBackgroundIndex].panorama);
  // setParticles(locationData.backgrounds[currentBackgroundIndex].particles);
  setBackground(locationData.backgrounds[currentBackgroundIndex]);
}

function onClickNextLocationButton(){
  if(cachedRegionLocationsId['Global']==null || cachedRegionLocationsId['Global'].length==0){
    console.log("allLocationsId.length==0!");
    getLocationsData((data)=>{
      data.destinations.forEach(locationData=>{
        cachedLocationsData[locationData.cityName] = locationData;
        if(cachedRegionLocationsId['Global']==null) cachedRegionLocationsId['Global']=[];
        cachedRegionLocationsId['Global'].push(locationData.cityName);
      });
      onClickNextLocationButton();

    },(error)=>{
      console.log("Failed to get locations data",error);
    });
    return;
  }

  let newLocationId;
  // while(true){
  //   newLocationId = getRandomLocation();
  //   if(newLocationId!=currentLocationId){
  //     break;
  //   }
  // }
  newLocationId = getRandomLocation();
  if(newLocationId!=currentLocationId)  previousLocationsId.push(currentLocationId);
  // console.log(previousLocationButton);
  previousLocationButton.removeClass("disabled");

  setCurrentLocation(newLocationId);
}

function onClickPreviousLocationButton(){
  if(previousLocationsId.length==0) {
    previousLocationButton.addClass("disabled");
    console.log("There is no previous location!");
    return;
  }

  let previousLocationId = previousLocationsId.pop();
  if(previousLocationId==null){
    previousLocationButton.addClass("disabled");
    return;
  }
  setCurrentLocation(previousLocationId);

  if(previousLocationsId.length==0) {
    previousLocationButton.addClass("disabled");
  }
}

function onClickRegionOption(region){
  console.log("onClickRegionOption",region);
  currentRegion = region;
  regionButton.html("Region: "+region);
}

function onClickAudioButton(){
  if(audioOn){
    audioButtonIcon.removeClass('fa-volume-up');
    audioButtonIcon.addClass('fa-volume-mute');
    bgmAudio.pause();
    audioOn=false;
  }
  else{
    audioButtonIcon.removeClass('fa-volume-mute');
    audioButtonIcon.addClass('fa-volume-up');

    var bgmPlayPromise = bgmAudio.play();

    // console.log(bgmPlayPromise);
    if (bgmPlayPromise !== undefined) {
      bgmPlayPromise.then(_ => {
        console.log("BGM started playing!");
      })
      .catch(error => {
        console.log("Failed to play BGM",error);
      });
    }
    audioOn=true;
  }
}

window.onload = function() {

  var bgmAudioPlayPromise = bgmAudio.play();
  if (bgmAudioPlayPromise !== undefined) {
    bgmAudioPlayPromise.then(function() {
      if(audioOn==false){
        audioButtonIcon.removeClass('fa-volume-mute');
        audioButtonIcon.addClass('fa-volume-up');

        audioOn=true;
      }
    }).catch(function(error) {
      // console.log(error);
      console.log(error.message);
      if(audioOn==true){
        audioButtonIcon.removeClass('fa-volume-up');
        audioButtonIcon.addClass('fa-volume-mute');
        audioOn=false;
      }
    });
  }

  console.log("start location data loading!");
  loadingText.html("Loading locations data...");
  loadingHint.removeClass("d-none");
  getLocationsData((data)=>{
    console.log("location data loading done!");
    data.destinations.forEach(locationData=>{
      cachedLocationsData[locationData.cityName] = locationData;
      if(cachedRegionLocationsId['Global']==null) cachedRegionLocationsId['Global']=[];
      cachedRegionLocationsId['Global'].push(locationData.cityName);

      // locationData.backgrounds.forEach(background=>{
      //   preloadTexture(background.panorama);
      // });

    });
    console.log(cachedRegionLocationsId);
    console.log(cachedTextures);
    let newLocationId = getRandomLocation();

    bottomLeftGUI.css("display","block");
    bottomRightGUI.css("display","block");
    roamAroundButton.css("display","block");
    googleMap.css("display","block");

    setCurrentLocation(newLocationId);

  },(error)=>{
    console.log("Failed to get locations data",error);
  });

  // var playBGMPromise = document.getElementById("audio-bgm").play();
  //
  // console.log(playBGMPromise);
  // if (playBGMPromise !== undefined) {
  //   playBGMPromise.then(_ => {
  //     console.log("BGM started playing!");
  //   })
  //   .catch(error => {
  //     console.log("Failed to play BGM",error);
  //   });
  // }
}
