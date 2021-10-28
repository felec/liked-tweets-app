// import cookieParser from 'cookie-parser';
// import express from 'express';
import next from 'next';

/**
 * Experimental, NOT IN USE
 */

// https://stackoverflow.com/questions/66484589/using-vercel-for-frontend-and-heroku-for-api

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
app.prepare().then(() => {
  const nextHandler = app.getRequestHandler();

  // const server = express();

  // server.use(cookieParser());
  // -----------^

  // server.get('*', (req, res) => nextHandler(req, res));
});
