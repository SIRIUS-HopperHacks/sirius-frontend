import { ChatroomDAO } from "@services/localdb/chatroom/dao";
import { CreateChatroomDTO, UpdateChatroomDTO } from "@services/localdb/chatroom/dto";

export class ChatroomService {
  dao: ChatroomDAO;

  constructor() {
    this.dao = new ChatroomDAO();
  }

  async createChatroom(inputData: CreateChatroomDTO) {
    return this.dao.create(inputData);
  }

  async updateChatroom(inputData: UpdateChatroomDTO) {
    return this.dao.update(inputData);
  }

  async deleteChatroom(connectionId: string) {
    return this.dao.delete(connectionId);
  }

  async findChatroom(connectionId: string) {
    return this.dao.find(connectionId);
  }

  async getAllChatrooms() {
    return this.dao.getAll();
  }
}
