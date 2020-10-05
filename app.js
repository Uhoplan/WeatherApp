window.addEventListener("load", geoFindMe());

const findUser = document.querySelector('.current-cords');
findUser.addEventListener('click', geoFindMe);
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const degreeSection = document.querySelector('.degree-section');
const degreeSpan = document.querySelector('.degree-section span');

async function geoFindMe () {
const requestURL = 'https://json.geoiplookup.io/';
let response = await fetch(requestURL);
let coords = await response.json();
let long = JSON.stringify(`${coords.longitude}`);
let lat = JSON.stringify(`${coords.latitude}`);
const proxy = "https://cors-anywhere.herokuapp.com/";
const api =`${proxy}https://api.darksky.net/forecast/3cf252412f218b3a1a34704ac4866c61/${coords.latitude},${coords.longitude}`;
const token = '3cf252412f218b3a1a34704ac4866c61';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization','3cf252412f218b3a1a34704ac4866c61');
fetch(api, {
         method: "GET", // *GET, POST, PUT, DELETE, etc.
         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
         credentials: "same-origin", // include, same-origin, *omit
         headers: myHeaders
       })

 .then(response => {
   return response.json();

 })
 .then(data => {
   const {temperature, summary, icon} = data.currently;
   //set dom elemets from the api
   temperatureDegree.textContent = temperature;
   temperatureDescription.textContent = summary;
   locationTimezone.textContent = data.timezone;
   //set celsis temperatureDegree
   //CELSIUS
   let celsius = (temperature - 32) * (5 / 9);
   degreeSection.addEventListener('click', () => {
     if (degreeSpan.textContent === "F") {
       degreeSpan.textContent = "C";
       temperatureDegree.textContent = celsius.toFixed(1);
     } else {
       degreeSpan.textContent = "F";
       temperatureDegree.textContent = temperature;
     }
   })
   //set srtIcons
   setIcons(icon, document.querySelector('.icon'));
 });

function setIcons(icon, iconID) {
  const skycons = new Skycons({color: "white"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);

}
};
