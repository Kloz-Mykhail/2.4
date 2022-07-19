import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User, Users, LoginData } from '../types';

const pathDB: string = path.join(__dirname, '..', 'DBv1.JSON');

export function logIn(req: Request, res: Response) {
  try {
    const { login, pass }: { login: string; pass: string } = req.body;
    const dataBase: Users = JSON.parse(fs.readFileSync(pathDB, 'utf-8'));

    const currentUser: User | undefined = dataBase.users.find(
      (user: User) => user.login === login && user.pass === pass,
    );

    if (currentUser) {
      req.session.user = currentUser as User;
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

export function register(req: Request, res: Response) {
  try {
    const data: LoginData = req.body;
    const now = Date.now();
    const dataBase: Users = JSON.parse(fs.readFileSync(pathDB, 'utf-8'));
    const isFreeLogin = !dataBase.users.some(
      (usr: User) => usr.login === data.login,
    );

    if (isFreeLogin) {
      dataBase.users.push({
        id: now,
        login: data.login,
        pass: data.pass,
        items: [],
      });
      fs.writeFileSync(pathDB, JSON.stringify(dataBase, null, '\t'));
      res.json({ ok: true });
    } else {
      res.status(400).json({ error: 'Login is uncorrect' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Register crash' });
  }
}
