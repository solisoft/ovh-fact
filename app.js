require('ovh');
require('dotenv').config();
var https   = require('https');
var _ = require('underscore');
var fs = require("fs");


var ovh = require('ovh')({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  consumerKey: process.env.CONSUMER_KEY
});

ovh.request('GET', '/me/bill', function (err, list) {
  _.each(list, function(invoice) {
    ovh.request('GET', '/me/bill/'+ invoice, function (err, file) {
      if(err == null)
        console.log(invoice + "@" + file.pdfUrl)      
    })
  })
});