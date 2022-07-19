import { RowDataPacket } from 'mysql2';

interface Item {
  id: number;
  text: string;
  checked: boolean;
}
interface ItemAfter extends RowDataPacket {
  id: number;
  text: string;
  checked: number;
}
type Items = Item[];

interface User extends RowDataPacket {
  id: number;
  login: string;
  pass: string;
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
export { Item, Items, User, Users, ItemAfter, LoginData, RouterAction };
