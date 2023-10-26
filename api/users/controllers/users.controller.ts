import { Request, Response } from "express";
import usersService from "../services/users.service";
import debug from "debug";
import argon2 from "argon2";
const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
  async listUsers(req: Request, res: Response) {
    const users = await usersService.list(100, 0);
    return res.status(200).send(users);
  }

  async createUser(req: Request, res: Response) {
    log("create user controller");
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }
}

export default new UsersController();
