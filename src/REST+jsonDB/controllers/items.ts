import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Item, Users, User } from '../types';

const pathDB: string = path.join(__dirname, '..', 'DBv1.JSON');

function updateDataBase(sessionUser: User) {
  const dataBase: Users = JSON.parse(fs.readFileSync(pathDB, 'utf-8'));
  dataBase.users = dataBase.users.map((user) => {
    if (user.id !== sessionUser.id) return user;
    return sessionUser;
  });
  fs.writeFileSync(pathDB, JSON.stringify(dataBase, null, '\t'));
}

export function getItems(req: Request, res: Response) {
  if (!req.session.user) {
    res.json({ error: 'forbidden' });
  } else {
    res.json({ items: req.session.user.items });
  }
}

export function setItem(req: Request, res: Response) {
  try {
    const { text }: { text: string } = req.body;
    const id: number = Date.now();
    req.session.user.items.push({ id, text, checked: false });

    updateDataBase(req.session.user);
    res.json({ id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'setItem failed' });
  }
}

export function chengeItem(req: Request, res: Response) {
  try {
    const item: Item = req.body;
    if (req.session.user.items.some((itm: Item) => itm.id === item.id)) {
      req.session.user.items = req.session.user.items.map((curentItem) => {
        if (curentItem.id === item.id) return item;
        return curentItem;
      });
      updateDataBase(req.session.user);
    } else {
      req.session.user.items.push(item);
    }
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'chengeItem failed' });
  }
}

export function deleteItem(req: Request, res: Response) {
  try {
    req.session.user.items = req.session.user.items.filter(
      (currentItem) => currentItem.id !== req.body.id
    );
    updateDataBase(req.session.user);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'deleteItem failed' });
  }
}
