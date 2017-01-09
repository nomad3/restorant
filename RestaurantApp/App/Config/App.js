var currency="$"                  //The currency sign
var currencyFirst=true;           //Should we show the currency sign first
exports.tax=18;                   //Tax value, you can also set it 0
exports.telephone="00389777777";  //The Phone number

//The Sendgrid KEY   --- CHANGE THEM WITH YOUR OWN SENDGRID
exports.SENDGRID_API_KEY="ENTER_SENDGRID_KEY_HERE";

//Orders are sent to --- CHANGI IT WITH YOUR OWN EMAIL
exports.sendToEmail="restaurant-app.3my69sr@mail.smooch.io" //YOU CAN USE SMOOCH.IO email here

//FireBase  --- CHANGE THEM WITH YOUR OWN FIREBASE DB
exports.firebaseConfig = {
  apiKey: "AIzaSyCkdvqXTodW4mE93K6uGULekrSdDQq5LGk",
  authDomain: "aremko-e51ae.firebaseapp.com",
  databaseURL: "https://aremko-e51ae.firebaseio.com",
  storageBucket: "aremko-e51ae.appspot.com",
  messagingSenderId: "828573473542"
};

/**
* Converts price to currency
*/
function priceToPriceWithCurrency(price) {
  price=parseFloat(price+"").toFixed(2);
  if(currencyFirst){
    return currency+" "+price;
  }else{
    return price+" "+currency;
  }
}
exports.priceToPriceWithCurrency=priceToPriceWithCurrency;
