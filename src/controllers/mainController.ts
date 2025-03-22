import { Controller } from "../types/controller";

const mainController: Controller = {
  get: (req, res) => {
    res.json({ data: "This is a full stack app!" });
  },
  post: async (req, res) => {
    res.status(201).json({ message: "This is an async action" });
  },
};

export default mainController;
