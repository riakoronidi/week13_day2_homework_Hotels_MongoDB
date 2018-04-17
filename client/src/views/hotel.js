var Hotel = function(){
  this.hotels = [];
}

Hotel.prototype.addHotel = function(hotel) {
  this.hotels.push(hotel);
  this.render(hotel);
}

Hotel.prototype.clear = function(hotel) {
  this.hotels = [];
  const ul = document.querySelector('#hotels');
  ul.innerHTML = '';
}

Hotel.prototype.render = function(hotel){
    const ul = document.querySelector('#hotels');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `Hotel ${hotel.name} has ${hotel.building} buildings`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = Hotel;
