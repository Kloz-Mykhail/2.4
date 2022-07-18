import { Request, Response } from 'express';

import { Item } from '../types';
import User from '../models/schema';

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
    console.log(req.session.user.items);
    User.findByIdAndUpdate(req.session.user._id, {
      items: req.session.user.items,
    }).catch((err) => {
      throw err;
    });
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
    } else {
      req.session.user.items.push(item);
    }
    User.findByIdAndUpdate(req.session.user._id, {
      items: req.session.user.items,
    }).catch((err) => {
      throw err;
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'chengeItem failed' });
  }
}

export function deleteItem(req: Request, res: Response) {
  try {
    req.session.user.items = req.session.user.items.filter(
      (currentItem) => currentItem.id !== req.body.id,
    );
    User.findByIdAndUpdate(req.session.user._id, {
      items: req.session.user.items,
    }).catch((err) => {
      throw err;
    });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'deleteItem failed' });
  }
}
