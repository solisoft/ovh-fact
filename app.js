require('dotenv').config();
var https   = require('https');

var ovh = require('ovh')({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  consumerKey: process.env.CONSUMER_KEY
});

var array_index = 0
var invoices = []

// This method allow to work synchronously and avoid flood and timeout issue
function getInfos(array_index, invoices) {
  if(array_index < invoices.length) {
    invoice = invoices[array_index]
    ovh.request('GET', '/me/bill/'+ invoice, function (err, file) {
      if(err == null) {
        console.log(invoice + ";" + file.pdfUrl + ";" + file.date + ";" + file.priceWithoutTax.value.replace(".", ","))
        array_index++;
        getInfos(array_index, invoices)
      }    
    })  
  }
}

ovh.request('GET', '/me/bill', function (err, invoices) {
  getInfos(array_index, invoices);
});
