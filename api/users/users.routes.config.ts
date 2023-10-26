import { CommonRoutesConfig } from "../common/common.routes.config";

import express from "express";
import usersController from "./controllers/users.controller";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(usersController.listUsers)
      .post(usersController.createUser);

    return this.app;
  }
}
