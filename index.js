
var request = require('request');
const express = require('express')
const path = require('path')

var crypto = require('crypto');

const PORT = process.env.PORT || 5000
var bodyParser = require("body-parser");
var cors = require('cors');

var Wallet = require('ethereumjs-wallet');



var app = express();


//var io = require('socket.io')(app);
const http = require('http')

var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')


var server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use(express.static(path.join(__dirname, 'public')))



var cors = require('cors');

app.use(cors({credentials: true, origin: '*'}));


 // .set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
 app.get("/", function(req, res) {

 	res.send("Hello Welcome to Secrets/3Box API Implementation");
 })



 //Create ETH address
  app.get("/ethcreate", function(req, res) {
	var addr =  Wallet.generate();
	var pri = addr.getPrivateKeyString()
	var add = addr.getAddressString()
	res.send([add, pri])
 })






function makeETHAddress(respObj){
	privateKey = web3.eth.accounts.create().privateKey.substr(2)

	web3.eth.personal.importRawKey(privateKey, pin)
    .then((result) => {

    //store pub address.
    publicAddr = web3.utils.toChecksumAddress(result)
    respObj.send(publicAddr)
	})


}




function callURL(theURL){

	var requestOptions = {
      headers: headers,
      url:theURL,
      method: "GET",
     //  body: postBody
    };
   var headers = {
      'content-type' : 'application/json'
   		 };


    request(requestOptions, function(error, response, body) {
      if (error) { console.log(error); return;}

      try{
        var jsonResp = JSON.parse(body);
        console.log(jsonResp)
    	}
    	catch(err){
    		console.log(err)
    		console.log("^^ json error")
    	}
    });
}
