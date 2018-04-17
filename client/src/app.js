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


const appStart = function(){
  request.get(getHotelsRequestComplete);

}

document.addEventListener('DOMContentLoaded', appStart);
