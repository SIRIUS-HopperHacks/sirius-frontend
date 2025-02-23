import { openDB, IDBPDatabase, IDBPTransaction } from "idb";

interface TableSchema {
  name: string;
  options?: IDBObjectStoreParameters;
  indexes?: {
    name: string;
    keyPath: string | string[];
    options?: IDBIndexParameters;
  }[];
}

interface DBConfig {
  name: string;
  version: number;
  tables: TableSchema[];
}

class IndexedDB {
  private static db: IDBPDatabase | null = null;
  private static config: DBConfig;

  public static async initDB(config: DBConfig) {
    if (IndexedDB.config && IndexedDB.config.name === config.name) {
      console.warn("IndexedDB is already initialized with the same config.");
      return;
    }
    
    IndexedDB.config = config;

    IndexedDB.db = await openDB(config.name, config.version, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`Upgrading IndexedDB from v${oldVersion} to v${newVersion}`);

        const existingStores = new Set(db.objectStoreNames);

        config.tables.forEach(({ name, options, indexes }) => {
          let store;
          if (!existingStores.has(name)) {
            console.log(`Creating new Object Store: ${name}`);
            store = db.createObjectStore(name, options);
          } else {
            store = transaction.objectStore(name);
          }

          if (indexes) {
            const existingIndexes = new Set(store.indexNames);
            indexes.forEach(({ name, keyPath, options }) => {
              if (!existingIndexes.has(name)) {
                console.log(`Creating new Index: ${name} on ${keyPath}`);
                store.createIndex(name, keyPath, options);
              }
            });
          }
        });
      },
    });

    console.log("IndexedDB initialized successfully.");
  }

  private getDB() {
    if (!IndexedDB.db) {
      console.error("Database not initialized. Call initDB first.");
      throw new Error("Database is not initialized.");
    }
    return IndexedDB.db;
  }

  public async insertOrUpdate<T>(tableName: string, value: T) {
    const db = this.getDB();
    return db.put(tableName, value);
  }

  public async delete(tableName: string, key: IDBValidKey) {
    const db = this.getDB();
    return db.delete(tableName, key);
  }

  public async fetchOne<T>(tableName: string, key: IDBValidKey): Promise<T | null> {
    const db = this.getDB();
    return db.get(tableName, key);
  }

  public async fetchAll<T>(tableName: string): Promise<T[]> {
    const db = this.getDB();
    return db.getAll(tableName);
  }

  public async executeTransaction<T>(
    tableNames: string[],
    mode: "readonly" | "readwrite",
    callback: (tx: IDBPTransaction<unknown, string[], "readonly" | "readwrite">) => Promise<T>
  ): Promise<T | null> {
    const db = this.getDB();
    const tx = db.transaction(tableNames, mode);
    try {
      const result = await callback(tx);
      await tx.done;
      return result;
    } catch (error) {
      console.error("Transaction failed:", error);
      return null;
    }
  }
}

export default IndexedDB;
