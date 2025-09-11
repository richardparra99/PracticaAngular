import { inject, Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class Conn {
  public database!: SQLiteObject;
  //private sqlite = inject(SQLite);
  //private platform = inject(Platform)

  constructor(private sqlite: SQLite,private  platform: Platform) {
    this.platform.ready().then(() => {
      this.createDataBase();
    });
  }

  async createDataBase() {
    await this.sqlite.create({
      name: 'usuariodb',
      location: 'default',
    }).then(
      (db: SQLiteObject) =>{
        this.database = db;
        this.createTable();
      },
      (error) => {
        console.log("no se pudo crear la base de datos ", error)
      }
    );
  }
  async createTable(){
    try{
      const query = `
        CREATE TABLE IF NOT EXISTS usuario(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        edad TEXT
        )
      `
      await this.database.executeSql(
          query,
          []
      )
    } catch (e){
      console.log("No se pudo crear la tabla ", e)
    }
  }
}
