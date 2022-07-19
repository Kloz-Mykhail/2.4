import mySql2 from 'mysql2/promise';
import { Item, ItemAfter } from '../types';

export const pool = mySql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mikhail',
  database: 'todo',
  port: 3306,
});

export async function getItemsByUserId(userId: number): Promise<Item[]> {
  const [itemsFromDB] = await pool.execute<ItemAfter[]>(
    'SELECT id, text, checked from items WHERE userId = ?',
    [userId],
  );
  return itemsFromDB.map((item) => {
    const obj = {
      id: item.id,
      text: item.text,
      checked: true,
    };
    if (item.checked === 0) {
      obj.checked = false;
    }
    return obj;
  });
}
