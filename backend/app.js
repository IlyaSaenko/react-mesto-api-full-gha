const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
const { errorHandler } = require('./middlewares/errorHandler');
const helmet = require('helmet');
const limiter = require('./middlewares/reqLimiter');
const { createUser, login } = require('./controllers/users');
const { URL_REGEX } = require('./utils/constants');
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

// PORT=3000
// NODE_ENV='production'
// SUPER_SECRET_KEY = 'fee940487b8c62e965228fbdae6563f6d733f5e101a56129a94c8d4cf8486fa9ac9c39aed429d2f09add8cbd56a284c9eb5ca785e61a7cf6902b0d5b312ab9fb'
// DB_ADRESS='mongodb://127.0.0.1:27017/mestodb'

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(limiter);
app.use(requestLogger);

// app.use(cors({ origin: 'http://localhost:3001', credentials: true}));
app.use(cors);

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

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
})

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});