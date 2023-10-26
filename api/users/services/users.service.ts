import { CRUD } from "../../common/interfaces/crud.interface";
import usersDao from "../daos/users.dao";

import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

class UserService implements CRUD {
  async putById(id: string, resource: PutUserDto): Promise<any> {
    return usersDao.updateUserById(id, resource);
  }
  async deleteById(id: string): Promise<any> {
    return usersDao.removeUserById(id);
  }
  async list(limit: number, page: number) {
    return usersDao.getUsers(limit, page);
  }
  async create(resource: CreateUserDto) {
    return usersDao.addUser(resource);
  }

  async readById(id: string) {
    return usersDao.getUserById(id);
  }
}

export default new UserService();
