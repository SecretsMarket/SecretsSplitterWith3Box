
var request = require('request');
const express = require('express')
const path = require('path')

var crypto = require('crypto');

const PORT = process.env.PORT || 5000
var bodyParser = require("body-parser");
var cors = require('cors');

var Wallet = require('ethereumjs-wallet');
const Box = require('3box');


var app = express();


//var io = require('socket.io')(app);
const http = require('http')

var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')


var server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use(express.static(path.join(__dirname, 'public')))

//const Web3 = require('web3');

//let web3 = new Web3('ws://localhost:8546');


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


app.get("/upload", async function(req, res){


  var contentNeedSplitting = req.query.content;
  if(typeof req.query.content != "string"){
    res.send({"status":"fail", "msg":"Please send content"});
    return;
  }
  splitUp = split3Parts(contentNeedSplitting);


  const cw3p = require('create-web3-provider');
  let provider = cw3p();
  //add your web3 provider/Infura info here
  provider = cw3p({ws: true, network: 'ropsten'});
  const box = await Box.create()
  var addr =  Wallet.generate();
  const address = addr.getAddressString()
  const spaces = ['secretsDapp']

  await box.auth(spaces, { address, provider })

  await box.private.set('content1', splitUp[0])
  await box.private.set('content2', splitUp[1])
  await box.private.set('content3', splitUp[2])

  res.send({"status":"success", "msg":"It worked!"});
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


function split3Parts(theSubString){
  var parts = theSubString.length;
  var by3 = parseInt(parts/3);
   regexA = new RegExp('.{1,'+by3+'}', "g");
    theReturn = theSubString.match(regexA);
    if(theReturn.length >3){
      theReturn[2] = theReturn[2]+ theReturn[3];
    }
    theReturn.pop()
    return theReturn;
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
