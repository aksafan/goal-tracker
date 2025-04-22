import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import GoalService from "@/goal/goal.service";
import {
  NotFoundDomainException,
  ValidationDomainException,
} from "@/errors/domain";
import { NotFoundError, UnprocessableEntityError } from "@/errors/http";
import { toGoalResponse, toGoalResponses } from "@/goal/goal.types";
import { GoalModel } from "@/goal/goal.domain.types";
import {
  CreateGoalForm,
  UpdateGoalFieldValuesForm,
  UpdateGoalForm,
} from "@/goal/goal.forms";
import { FlattenedFieldErrors } from "@/types/zod";

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

  createGoal = async (req: Request, res: Response): Promise<void> => {
    const result = CreateGoalForm.safeParse(req.body);
    if (!result.success) {
      throw new UnprocessableEntityError({
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      // const goal = await this.goalService.createGoal(req.user.id, result.data);
      const goal = await this.goalService.create(
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        result.data
      );

      res.status(StatusCodes.CREATED).json(toGoalResponse(goal));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }
      if (e instanceof ValidationDomainException) {
        throw new UnprocessableEntityError({
          errors: e.context as FlattenedFieldErrors,
        });
      }

      throw e;
    }
  };

  updateGoal = async (req: Request, res: Response): Promise<void> => {
    const result = UpdateGoalForm.safeParse(req.body);

    if (!result.success) {
      throw new UnprocessableEntityError({
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      // const goal = await this.goalService.update(req.params.id, req.user.id, result.data);
      const goal = await this.goalService.update(
        req.params.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        result.data
      );

      res.status(StatusCodes.OK).json(toGoalResponse(goal));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  deleteGoal = async (req: Request, res: Response): Promise<void> => {
    try {
      // await this.goalService.delete(req.params.id, req.user.id);
      await this.goalService.delete(
        req.params.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22"
      );

      res.status(StatusCodes.NO_CONTENT).send();
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  updateFieldValues = async (req: Request, res: Response): Promise<void> => {
    const result = UpdateGoalFieldValuesForm.safeParse(req.body);

    if (!result.success) {
      throw new UnprocessableEntityError({
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      // const goal = await this.goalService.updateFieldValues(req.params.id, req.user.id, result.data);
      const goal = await this.goalService.updateFieldValues(
        req.params.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        result.data
      );

      res.status(StatusCodes.OK).json(toGoalResponse(goal));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }
      if (e instanceof ValidationDomainException) {
        throw new UnprocessableEntityError({
          errors: e.context as FlattenedFieldErrors,
        });
      }

      throw e;
    }
  };
}
