require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
const { errorHandler } = require('./middlewares/errorHandler');
const limiter = require('./middlewares/reqLimiter');
const { createUser, login } = require('./controllers/users');
const { URL_REGEX } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'https://api.react.mesto.nomoredomainsicu.ru',
    'http://api.react.mesto.nomoredomainsicu.ru',
    'http://react.mesto.nomoredomainsicu.ru',
    'https://react.mesto.nomoredomainsicu.ru'],
  credentials: true,
  maxAge: 30,
}));

app.use(helmet());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Подключён с БД');
  })
  .catch(() => {
    console.log('Ошибка подключения БД');
  });

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().pattern(URL_REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
