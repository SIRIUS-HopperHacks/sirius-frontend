import { ChatDAO } from "@localdb/chat/dao";
import { CreateChatDTO, CreateChatroomDTO } from "@localdb/chat/dto";

export class ChatService {
  dao: ChatDAO;

  constructor() {
    this.dao = new ChatDAO();
  }

  async createChatroom(inputData: CreateChatroomDTO) {
    return this.dao.createChatroom(inputData);
  }

  async createChat(inputData: CreateChatDTO) {
    return this.dao.createChat(inputData);
  }

  async deleteChat(chatId: string) {
    return this.dao.deleteChat(chatId);
  }

  async findChat(chatId: string) {
    return this.dao.findChat(chatId);
  }
}
