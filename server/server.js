const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(request, responce){
    responce.send('Wellcome!')
});

let users = [
    {login: 'admin', email: 'm_bozhyk@ukr.net', password: 'admin1'}
];

app.get('/users', function(req, res){
    res.send(users)
})

app.listen(8080, function(){
    console.log('listen on port')
})