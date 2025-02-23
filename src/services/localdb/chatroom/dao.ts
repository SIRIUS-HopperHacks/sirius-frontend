import { CreateChatroomDTO, UpdateChatroomDTO } from "@services/localdb/chatroom/dto";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

export class ChatroomDAO {
  db: IndexedDB;

  constructor() {
    this.db = new IndexedDB();
  }

  async create(inputData: CreateChatroomDTO) {
    const connectionId = uuid4();
    const connection = { ...inputData, connectionId };
    await this.db.insertOrUpdate("chatrooms", connection);
  }

  async update(inputData: UpdateChatroomDTO) {
    const connection = await this.db.fetchOne("chatrooms", inputData.connectionId);
    if (connection) {
      await this.db.insertOrUpdate("chatrooms", { ...connection, ...inputData });
    }
  }

  async delete(connectionId: string) {
    await this.db.delete("chatrooms", connectionId);
  }

  async find(connectionId: string) {
    return this.db.fetchOne("chatrooms", connectionId);
  }

  async getAll() {
    return this.db.fetchAll("chatrooms");
  }
}
