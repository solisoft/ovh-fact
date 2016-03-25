require('dotenv').config();
var https   = require('https');
var _ = require('underscore');
var fs = require("fs");

var ovh = require('ovh')({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  consumerKey: process.env.CONSUMER_KEY
});

var total = 0
var array_index = 0
var invoices = []

function getInfos(array_index, invoices) {
  if(array_index < invoices.length) {
    invoice = invoices[array_index]
    ovh.request('GET', '/me/bill/'+ invoice, function (err, file) {
      if(err == null) {
        console.log(invoice + ";" + file.pdfUrl + ";" + file.date + ";" + file.priceWithoutTax.value)
        total += file.priceWithoutTax.value
        array_index++;
        getInfos(array_index, invoices)
        
      } else {
        
      }      
    })  
  }
}

ovh.request('GET', '/me/bill', function (err, invoices) {
  getInfos(array_index, invoices);
});
