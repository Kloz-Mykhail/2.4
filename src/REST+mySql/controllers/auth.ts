import { Request, Response } from 'express';
import { pool } from '../models/sqlConn';
import { User } from '../types';

export async function logIn(req: Request, res: Response) {
  try {
    const { login, pass }: { login: string; pass: string } = req.body;
    const [usersFromDB] = await pool.execute<User[]>(
      'SELECT * from users WHERE login = ? AND pass = ?',
      [login, pass],
    );
    console.log(usersFromDB[0]);
    if (usersFromDB.length === 1) {
      req.session.userId = usersFromDB[0].id;
      console.log('Проверка прошла...');
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
    if (req.session.userId) {
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
    const { login, pass }: { login: string; pass: string } = req.body;

    const [dataBase] = await pool.execute<User[]>(
      'SELECT * from users WHERE login = ? AND pass = ?',
      [login, pass],
    );

    if (dataBase.length === 0) {
      await pool.execute<User[]>('INSERT INTO users(login,pass) VALUES(?,?)', [
        login,
        pass,
      ]);
      res.json({ ok: true });
    } else {
      res.status(400).json({ error: 'Login is uncorrect' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Register crash' });
  }
}
