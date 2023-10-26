import shortid from "shortid";
import { CreateUserDto } from "../dto/create.user.dto";
import debug from "debug";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  users: Array<any> = [];

  constructor() {
    log("Created new instance of user dao");
  }

  async addUser(user: CreateUserDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async putUserById(userId: string, user: PutUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );

    this.users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );

    let currentUser = this.users[objIndex];

    const allowedPatchFields = [
      "password",
      "firstName",
      "lastName",
      "permissionLevel",
    ];

    for (let field of allowedPatchFields) {
      if (field in user) {
        // currentUser[field] = user[field];
      }
    }

    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
  }

  async removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );

    this.users.splice(objIndex, 1);
    return `${userId} deleted`;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex(
      (obj: { email: string }) => obj.email === email
    );

    let currentUser = this.users[objIndex];
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }

  async getUserById(id: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === id
    );

    let currentUser = this.users[objIndex];
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }
}

export default new UsersDao();
