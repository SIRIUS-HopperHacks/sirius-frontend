import { ConnectionDAO } from "@services/localdb/connection/dao";
import {
  CreateConnectionDTO,
  UpdateConnectionDTO,
} from "@services/localdb/connection/dto";

export class ConnectionService {
  dao: ConnectionDAO;

  constructor() {
    this.dao = new ConnectionDAO();
  }

  async createConnection(inputData: CreateConnectionDTO) {
    return this.dao.create(inputData);
  }

  async updateConnection(inputData: UpdateConnectionDTO) {
    return this.dao.update(inputData);
  }

  async deleteConnection(connectionId: string) {
    return this.dao.delete(connectionId);
  }

  async findConnection(connectionId: string) {
    return this.dao.find(connectionId);
  }

  async getAllConnections() {
    return this.dao.getAll();
  }
}
