import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import GoalService from "@/goal/goal.service";
// import { instanceof } from "zod";
import { NotFoundDomainException } from "@/errors/domain";
import { NotFoundError } from "@/errors/http";
import { toGoalResponse, toGoalResponses } from "@/goal/goal.types";
import { GoalModel } from "@/goal/goal.domain.types";
// import { GoalRequestFormSchema, UpdateGoalFieldValuesSchema } from "./goal.forms";

export default class GoalController {
  private goalService: GoalService = new GoalService();

  getAllGoals = async (req: Request, res: Response): Promise<void> => {
    // const goals = await this.goalService.findAll(req.user.id);

    const goals = await this.goalService.findAll(
      "7171f91a-bd67-41c2-9e38-7d81be9edf22",
      req.queryParams
    );

    res.status(StatusCodes.OK).json({ data: toGoalResponses(goals) });
  };

  getGoalById = async (req: Request, res: Response): Promise<void> => {
    try {
      // const goal = await this.goalService.findById(req.params.id, req.user.id);
      const goal: GoalModel = await this.goalService.findById(
        req.params.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22"
      );

      res.status(StatusCodes.OK).json(toGoalResponse(goal));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  createGoal = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "It works!" });
    // const parsed = GoalRequestFormSchema.safeParse(req.body);
    // if (!parsed.success) {
    //   return res
    //     .status(StatusCodes.UNPROCESSABLE_ENTITY)
    //     .json({ errors: parsed.error.format() });
    // }
    // const newGoal = await this.goalService.create(parsed.data, req.user.id);
    // res.status(StatusCodes.CREATED).json({ data: newGoal });
  };

  updateGoal = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "It works!" });
    // const parsed = GoalRequestFormSchema.partial().safeParse(req.body);
    // if (!parsed.success) {
    //   return res
    //     .status(StatusCodes.UNPROCESSABLE_ENTITY)
    //     .json({ errors: parsed.error.format() });
    // }
    // const updated = await this.goalService.update(
    //   req.params.id,
    //   parsed.data,
    //   req.user.id
    // );
    // res.status(StatusCodes.OK).json({ data: updated });
  };

  deleteGoal = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "It works!" });
    // await this.goalService.remove(req.params.id, req.user.id);
    // res.status(StatusCodes.NO_CONTENT).send();
  };

  updateFieldValues = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "It works!" });
    // const parsed = UpdateGoalFieldValuesSchema.safeParse(req.body);
    // if (!parsed.success) {
    //   return res
    //     .status(StatusCodes.UNPROCESSABLE_ENTITY)
    //     .json({ errors: parsed.error.format() });
    // }
    // const updated = await this.goalService.updateFieldValues(
    //   req.params.id,
    //   parsed.data,
    //   req.user.id
    // );
    // res.status(StatusCodes.OK).json({ data: updated });
  };
}
