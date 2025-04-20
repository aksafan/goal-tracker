import type { Request, Response } from "express-serve-static-core";
import CreateUserQueryParams from "@/types/queryParams";
import { createUser } from "@/user/user.service";
import type { CreateUserForm, CreateUserResponse } from "@/dto";
import { Error, ValidationError } from "@/types/errors";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnprocessableEntityError } from "@/errors";

export const get = (req: Request, res: Response) => {
  res.json({ data: "This is a full stack app!" });
};

// This is an example of async action with sanitized body/query fields,
// type hints for request body/query and defined Response types
export const post = async (
  req: Request<unknown, unknown, CreateUserForm, CreateUserQueryParams>,
  res: Response<CreateUserResponse | Error | ValidationError>
) => {
  const email = req.body.email;
  const { password, password_confirmation } = req.body;

  if (!email || !password) {
    throw new BadRequestError({
      message: "Missing credentials",
      logging: true,
    });
  } else if (password.length < 8 || password !== password_confirmation) {
    throw new UnprocessableEntityError({
      errors: [
        {
          field: "password",
          message: "'password' must be at least 8 symbols long.",
        },
        {
          field: "password",
          message: "'password' must match 'password_confirmation'.",
        },
      ],
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
};
