import express from 'express';
import cors from 'cors';
import session from 'express-session';
import fileStore from 'session-file-store';
import router from './router';

const FileStore = fileStore(session);
const PORT = 3005;
const app = express();

app.use(
  cors({
    origin: ['http://localhost:8080', `http://localhost:${PORT}`],
    credentials: true,
  }),
);

app.use(
  session({
    store: new FileStore({ retries: 0 }),
    secret: 'cookies',
    resave: true,
    saveUninitialized: true,
  }),
);

declare module 'express-session' {
  interface Session {
    userId: number;
  }
}
app.use(express.static('static'));

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Port: ${PORT}`));
