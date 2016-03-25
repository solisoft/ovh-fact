# OVH-FACT

This tool allow you to download all your OVH.com invoices at once.

## Installation

* You need Ruby 2.x.x and nodeJS 5.x.x
* Clone this repository and go to the cloned folder
* npm install

## Configuration

Go to https://api.ovh.com/createToken/?GET=/me/* to generate new credentials.

Then create a .env file in your folder

````
APP_KEY     = "<YOUR APP KEY>"
APP_SECRET  = "<YOUR SECRET>"
CONSUMER_KEY= "<YOUR CONSUMER KEY>"
````

* ruby process.rb
