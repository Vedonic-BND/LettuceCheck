import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

export default db;
