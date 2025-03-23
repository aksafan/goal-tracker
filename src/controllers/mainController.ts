import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/queryParams";
import { Error, User } from "../types/response";
import { randomInt } from "node:crypto";

export const get = (req: Request, res: Response) => {
  res.json({ data: "This is a full stack app!" });
};

export const post = async (
  req: Request<unknown, unknown, CreateUserDto, CreateUserQueryParams>,
  res: Response<User | Error>,
) => {
  const { username, email } = req.body;
  const password = req.body.password;
  const loginAfterCreate = req.query.loginAfterCreate;
  console.log(loginAfterCreate);

  if (!email || !password) {
    res.status(400).json({ code: 400, name: "Missing credentials" });
  } else {
    // "This is an async action with sanitized body/query fields, type hints for request body/query and defined Response types"
    res.status(201).json({
      id: randomInt(123),
      username,
      email,
    });
  }
};
