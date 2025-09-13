import { Injectable, inject } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class SqliteServices {
  private sqlite = inject(SQLite);
  private db?: SQLiteObject;

  async init(): Promise<void> {
    if (this.db) return;
    this.db = await this.sqlite.create({ name: 'movies.db', location: 'default' });
    await this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS movies(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT
      );
    `, []);
  }

  async getAll(): Promise<Movie[]> {
    await this.init();
    const res = await this.db!.executeSql('SELECT * FROM movies ORDER BY id DESC', []);
    const out: Movie[] = [];
    for (let i = 0; i < res.rows.length; i++) out.push(res.rows.item(i));
    return out;
  }

  async getById(id: number): Promise<Movie | null> {
    await this.init();
    const res = await this.db!.executeSql('SELECT * FROM movies WHERE id = ?', [id]);
    return res.rows.length ? res.rows.item(0) : null;
  }

  async insert(m: Omit<Movie, 'id'>): Promise<number> {
    await this.init();
    const r = await this.db!.executeSql(
      'INSERT INTO movies (name, description, image) VALUES (?, ?, ?)',
      [m.name, m.description, m.image]
    );
    return r.insertId!;
  }

  async update(m: Movie): Promise<void> {
    await this.init();
    await this.db!.executeSql(
      'UPDATE movies SET name = ?, description = ?, image = ? WHERE id = ?',
      [m.name, m.description, m.image, m.id]
    );
  }

  async remove(id: number): Promise<void> {
    await this.init();
    await this.db!.executeSql('DELETE FROM movies WHERE id = ?', [id]);
  }
}
