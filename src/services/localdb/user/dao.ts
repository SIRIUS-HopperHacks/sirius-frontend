import { CreateUserDTO, UpdateUserDTO } from "@localdb/user/dto";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

export class UserDAO {
  db: IndexedDB;

  constructor() {
    this.db = new IndexedDB();
  }

  async create(inputData: CreateUserDTO) {
    const deviceId = uuid4();
    const user = { ...inputData, deviceId };
    await this.db.insertOrUpdate("users", user);
  }

  async update(inputData: UpdateUserDTO) {
    const user = await this.db.fetchOne("users", inputData.deviceId);
    if (user) {
      await this.db.insertOrUpdate("users", { ...user, ...inputData });
    }
  }

  async delete(deviceId: string) {
    await this.db.delete("users", deviceId);
  }

  async find(deviceId: string) {
    return this.db.fetchOne("users", deviceId);
  }
}
