import { Request, Response } from 'express';

import { User, LoginData } from '../types';
import UserScheme from '../models/schema';

export async function logIn(req: Request, res: Response) {
  try {
    const { login, pass }: { login: string; pass: string } = req.body;
    const userFromDB = await UserScheme.findOne({ login, pass });

    if (userFromDB) {
      req.session.user = userFromDB;
      res.json({ ok: true });
    } else {
      res.json({ error: 'not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'logIn failed' });
  }
}

export function logOut(req: Request, res: Response) {
  try {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) throw err;
      });
    }
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'logOut crash' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const data: LoginData = req.body;
    const dataBase: User | null = await UserScheme.findOne(data);

    if (!dataBase) {
      const user = new UserScheme({
        login: data.login,
        pass: data.pass,
        items: [],
      });
      user.save();
      res.json({ ok: true });
    } else {
      res.status(400).json({ error: 'Login is uncorrect' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Register crash' });
  }
}
