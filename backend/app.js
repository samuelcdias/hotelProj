var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const cors = require('cors')
app.use(cors())

let db = require('./config/database')
db('mongodb://localhost:27017/hostel')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const cliente = require('./routes/cliente')
app.use('/cliente', cliente)

const funcionario = require('./routes/funcionario')
app.use('/funcionario', funcionario)

const hospede = require('./routes/hospede')
app.use('/hospede', hospede)

const itemServico = require('./routes/itemServico')
app.use('/item-servico', itemServico)

const quarto = require('./routes/quarto')
app.use('/quarto', quarto)

const reserva = require('./routes/reserva')
app.use('/reserva', reserva)

const servico = require('./routes/servico')
app.use('/servico', servico)

const tipoTemporada = require('./routes/tipoTemporada')
app.use('/tipoTemporada', tipoTemporada)

module.exports = app;

