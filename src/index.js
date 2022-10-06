const express=require('express');
// const mongoose=require('mongoose');
const axios= require('axios')


const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Testing my Geolocation Node app!'))

const unirest = require("unirest");

app.post("/Location", (req, res) => {

  var apiCall = unirest("GET",

    "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"

  );

  apiCall.headers({

    "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",

    "x-rapidapi-key": "fb5f68d90fmsh756e812c3e6d014p134dcbjsn76cce7232694"

  });

  apiCall.end(function(result) {

    if (res.error) throw new Error(result.error);

    console.log(result.body);

    res.send(result.body);

  });

});

app.get('/mylocation', async(req,res)=>{
   try{ 
const options = {
    method: 'GET',
    url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
    params: {latlng: '40.714224,-73.96145', language: 'en'},
    headers: {
      'X-RapidAPI-Key': 'fb5f68d90fmsh756e812c3e6d014p134dcbjsn76cce7232694',
      'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
    }
  };
  let loc= await axios(options)
  return res.send(loc);
}catch(err){
 return res.send(err)
}
});

app.all('*', function(req, res) {
    throw new Error("Bad request")
})

app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).send({status : false , error: e.message});
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});