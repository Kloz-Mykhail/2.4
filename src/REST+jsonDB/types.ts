type Item = { id: number; text: string; checked: boolean };
type Items = Item[];

type User = { id: number; login: string; pass: string; items: Items };
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
