var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors());
app.use(express.static('imgs'));
app.use(express.static('results'));


app.listen(3000);