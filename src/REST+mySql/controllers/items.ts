import { Request, Response } from 'express';
import { Item } from '../types';
import { pool, getItemsByUserId } from '../models/sqlConn';

export async function getItems(req: Request, res: Response) {
  if (!req.session.userId) {
    res.json({ error: 'forbidden' });
  } else {
    res.json({ items: await getItemsByUserId(req.session.userId) });
  }
}

export async function setItem(req: Request, res: Response) {
  try {
    const { text }: { text: string } = req.body;
    const id: number = Date.now();
    await pool.execute(
      'INSERT INTO items(id, text, checked, userId) VALUES(?,?,?,?)',
      [id, text, false, req.session.userId],
    );
    res.json({ id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'setItem failed' });
  }
}

export async function chengeItem(req: Request, res: Response) {
  try {
    const item: Item = req.body;
    await pool.execute('UPDATE items SET text = ?, checked = ? WHERE id = ?', [
      item.text,
      item.checked,
      item.id,
    ]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'chengeItem failed' });
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    await pool.execute('DELETE FROM items WHERE id = ?', [req.body.id]);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'deleteItem failed' });
  }
}
