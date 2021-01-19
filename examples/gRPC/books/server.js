// grpc imports
const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

// mongodb imports and model imports
// const mongoose = require('mongoose');
require('dotenv').config(); // set up environment variables in .env
const BookModel = require('./BookModel');

// load books proto
const PROTO_PATH = './books.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
const booksProto = grpc.loadPackageDefinition(packageDefinition);
// const 
// create gRPC server and add services
const server = new grpc.Server();
server.addService(booksProto.ProxyToBook.service, {
  addBook: (call, callback) => {
    // get the properties from the gRPC client call
    const { title, author, numberOfPages, publisher, bookID } = call.request;
    // create a book in our book collection
    BookModel.create({
      title,
      author,
      numberOfPages,
      publisher,
      bookID,
    })
    .then((data) => {
      callback(null, {});
    })
    .catch((err) => {
      if (err.code === 11000) {
        callback({
          code: grpc.status.ALREADY_EXISTS,
          details: "BookID already exists"
        })
      }
    })
  },
});

server.addService(booksProto.OrderToBook.service, {
  getBookInfo: (call, callback) => {
    BookModel.findOne({ bookID: call.request.bookID }, (err, data) => {
      callback(null, data);
    })
    },
})

// start server
server.bindAsync("127.0.0.1:30044", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at http://127.0.0.1:30044");
});