const Hotel = require('./views/hotel');
const Request = require('./services/request.js');

const hotel = new Hotel();
const request = new Request('http://localhost:3000/api/hotels');

const appStart = function(){

}

document.addEventListener('DOMContentLoaded', appStart);
