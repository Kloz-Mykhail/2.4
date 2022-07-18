import mongoose from 'mongoose';

type Item = { id: number; text: string; checked: boolean };
type Items = Item[];

interface User {
  _id: mongoose.Types.ObjectId;
  login: string;
  pass: string;
  items: Items;
}
type Users = { users: User[] };

type LoginData = { login: string; pass: string };
type RouterAction =
  | 'login'
  | 'logout'
  | 'register'
  | 'getItems'
  | 'deleteItem'
  | 'addItem'
  | 'editItem';
export { Item, Items, User, Users, LoginData, RouterAction };
