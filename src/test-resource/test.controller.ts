import type { Request, Response } from "express-serve-static-core";
import { CreateUserQueryParams } from "@/types/queryParams";
import { createUser } from "@/user/user.service";
import type { CreateUserForm, CreateUserResponse } from "@/dto";
import { Error, ValidationError } from "@/types/errors";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "@/errors/http";

export default class TestController {
  // This is an example of async action with sanitized body/query fields,
  // type hints for request body/query and defined Response types
  // TODO: remove when other controllers will be implemented and no examples needed anymore
  async post(
    req: Request<unknown, unknown, CreateUserForm, CreateUserQueryParams>,
    res: Response<CreateUserResponse | Error | ValidationError>
  ) {
    const email = req.body.email;
    const { password } = req.body;

    if (!email || !password) {
      throw new BadRequestError({
        message: "Missing credentials",
        logging: true,
      });
    } else {
      const user = await createUser(req.body);

      res.status(StatusCodes.CREATED).json({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    }
  }
}
