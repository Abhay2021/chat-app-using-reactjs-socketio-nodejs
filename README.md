create two folder client and server folder
//create react app in client folder
-------------------------------------
md client or mkdir client
cd client
create-react-app ./
-------------------------------------
SERVER FOLDER
cd..
md server 
cd server
//initialize package.json in server folder
npm init -y
//install dependencies cors nodemon express socket.io
npm install --save cors nodemon express socket.io

//go to package.json file
//write below line under script block{} for contineous running of node server
 "start": "nodemon index.js",

-------------------------------------------
CLIENT FOLDER
cd..
cd client
//install dependencies
npm install --save react-router socket.io-client react-scroll-to-bottom react-emoji query-string
//delete src folder and create new src folder
//create new index.js and app.js inside src folder