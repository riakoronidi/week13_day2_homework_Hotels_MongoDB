const Hotel = require('./views/hotel');
const Request = require('./services/request.js');

const hotel = new Hotel();
const request = new Request('http://localhost:3000/api/hotels');


const getHotelsRequestComplete = function(allHotels){
  console.log(allHotels);
  allHotels.forEach(function(element){
    hotel.addHotel(element);
  });
}

const createButtonClicked = function(event){
  event.preventDefault();
  console.log("Submit button clicked");

  const hotelInputValue = document.querySelector("#name").value;
  const buildingInputValue = document.querySelector("#building").value;

  const quoteToSend = {
    name: hotelInputValue,
    building: buildingInputValue
  };

  request.post(createRequestComplete, quoteToSend);
}

const createRequestComplete = function(response){
  console.log(response);
  hotel.addHotel(response);
}


const appStart = function(){
  request.get(getHotelsRequestComplete);

  const createHotelButton = document.querySelector("#submit-hotel");
  createHotelButton.addEventListener("click", createButtonClicked);
}

document.addEventListener('DOMContentLoaded', appStart);
