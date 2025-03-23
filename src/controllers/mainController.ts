import { Request, Response } from "express-serve-static-core";
import CreateUserDto from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/queryParams";
import { ErrorResponse, User } from "../types/response";
import { createUser } from "../services/userService";

export const get = (req: Request, res: Response) => {
  res.json({ data: "This is a full stack app!" });
};

// This is an example of async action with sanitized body/query fields,
// type hints for request body/query and defined Response types
export const post = async (
  req: Request<unknown, unknown, CreateUserDto, CreateUserQueryParams>,
  res: Response<User | ErrorResponse>,
) => {
  const { username, email } = req.body;
  console.log(username);
  const password = req.body.password;
  const loginAfterCreate = req.query.loginAfterCreate;
  console.log(loginAfterCreate);

  if (!email || !password) {
    res.status(400).json({ code: 400, name: "Missing credentials" });
  } else {
    const user = await createUser(req.body);

    res.status(201).json(user);
  }
};
