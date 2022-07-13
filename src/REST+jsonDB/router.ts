import express from 'express';
import { logIn, logOut, register } from './controllers/auth';
import { getItems, setItem, chengeItem, deleteItem } from './controllers/items';
import { RouterAction } from './types';

const router = express.Router();
const hendler = {
  login: logIn,
  logout: logOut,
  register,
  getItems,
  addItem: setItem,
  editItem: chengeItem,
  deleteItem
};

router.all('/api/v2/router', (req, res) => {
  try {
    const action: RouterAction = req.query.action as RouterAction;
    hendler[action](req, res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'router had a error' });
  }
});

router.post('/api/v1/login', logIn);

router.post('/api/v1/logout', logOut);

router.post('/api/v1/register', register);

router
  .route('/api/v1/items')
  .get(getItems)
  .post(setItem)
  .put(chengeItem)
  .delete(deleteItem);
export default router;
