import { NextFunction, Request, Response } from "express-serve-static-core";
import config from "../config";

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return config.xss.process(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value !== null && typeof value === "object") {
    return sanitizeObject(value as Record<string, unknown>);
  }

  return value;
}

function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = {} as T;

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    result[key] = sanitizeValue(obj[key]) as T[typeof key];
  }

  return result;
}

export default function sanitizeRequest(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.body && typeof req.body === "object") {
    Object.assign(req.body, sanitizeValue(req.body));
  }

  if (req.query && typeof req.query === "object") {
    Object.assign(req.query, sanitizeValue(req.query));
  }

  if (req.params && typeof req.params === "object") {
    Object.assign(req.params, sanitizeValue(req.params));
  }

  next();
}
