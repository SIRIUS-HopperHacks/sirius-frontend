import { CreateConnectionDTO, UpdateConnectionDTO } from "@services/localdb/connection/dto";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

export class ConnectionDAO {
  db: IndexedDB;

  constructor() {
    this.db = new IndexedDB();
  }

  async create(inputData: CreateConnectionDTO) {
    const connectionId = uuid4();
    const connection = { ...inputData, connectionId };
    await this.db.insertOrUpdate("connections", connection);
  }

  async update(inputData: UpdateConnectionDTO) {
    const connection = await this.db.fetchOne("connections", inputData.connectionId);
    if (connection) {
      await this.db.insertOrUpdate("connections", { ...connection, ...inputData });
    }
  }

  async delete(connectionId: string) {
    await this.db.delete("connections", connectionId);
  }

  async find(connectionId: string) {
    return this.db.fetchOne("connections", connectionId);
  }

  async getAll() {
    return this.db.fetchAll("connections");
  }

  async updateStatus(connectionId: string, status: string) {
    const connection = await this.db.fetchOne("connections", connectionId);
    if(connection) {
      await this.db.insertOrUpdate("connections",{...connection, alertType: status })
    }
  }
}
