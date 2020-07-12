## Simple Node.js RESTful API for splitting and storing data using 3Box

Super, super light to just get started.

### Getting started

Run `npm install`

In index.js, update the provider with your provider details (Infura API/key).

Then `npm start`

Navigate to your browser and visit: http://localhost:5000

Generate An Ethereum Key pair to authenticate with 3Box with the endpoint: http://localhost:5000/ethcreate

Upload text content and split it into 3 storage 3Box spaces sending the parameter of "content": http://localhost:5000/upload

Give permission for a private  3box thread: http://localhost:5000/grantpermissions?adresses=["0x...dsdss", "INSERT YOUR ADDRESSES"]


## TODO

-Tests
-Support Client-based signatures
