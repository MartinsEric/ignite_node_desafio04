import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    let id: string = null;

    if (user_id instanceof Array) {
      id = user_id[0];
    } else {
      id = user_id;
    }

    try {
      const user = this.listAllUsersUseCase.execute({ user_id: id });
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
