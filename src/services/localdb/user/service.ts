import { UserDAO } from "@localdb/user/dao";
import { CreateUserDTO, UpdateUserDTO } from "@localdb/user/dto";

export class UserService {
  dao: UserDAO;

  constructor() {
    this.dao = new UserDAO();
  }

  async createUser(inputData: CreateUserDTO) {
    return this.dao.create(inputData);
  }

  async updateUser(inputData: UpdateUserDTO) {
    return this.dao.update(inputData);
  }

  async deleteUser(userId: string) {
    return this.dao.delete(userId);
  }

  async findUser(userId: string) {
    return this.dao.find(userId);
  }
}
