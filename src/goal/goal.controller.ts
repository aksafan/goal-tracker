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

  getAll = async (req: Request, res: Response): Promise<void> => {
    const goals: GoalModel[] = await this.goalService.findAll(
      "7171f91a-bd67-41c2-9e38-7d81be9edf22",
      // req.user.id,
      req.queryParams
    );

    res.status(StatusCodes.OK).json({ data: toGoalResponses(goals) });
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const goal: GoalModel = await this.goalService.findById(
        req.params.id,
        // req.user.id,
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

  create = async (req: Request, res: Response): Promise<void> => {
    const createGoalForm = CreateGoalForm.safeParse(req.body);
    if (!createGoalForm.success) {
      throw new UnprocessableEntityError({
        errors: createGoalForm.error.flatten().fieldErrors,
      });
    }

    try {
      const goal: GoalModel = await this.goalService.create(
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        createGoalForm.data
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

  update = async (req: Request, res: Response): Promise<void> => {
    const updateGoalForm = UpdateGoalForm.safeParse(req.body);
    if (!updateGoalForm.success) {
      throw new UnprocessableEntityError({
        errors: updateGoalForm.error.flatten().fieldErrors,
      });
    }

    try {
      const goal: GoalModel = await this.goalService.update(
        req.params.id,
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        updateGoalForm.data
      );

      res.status(StatusCodes.OK).json(toGoalResponse(goal));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.goalService.delete(
        req.params.id,
        // req.user.id,
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
    const updateGoalFieldValuesForm = UpdateGoalFieldValuesForm.safeParse(
      req.body
    );

    if (!updateGoalFieldValuesForm.success) {
      throw new UnprocessableEntityError({
        errors: updateGoalFieldValuesForm.error.flatten().fieldErrors,
      });
    }

    try {
      const goal: GoalModel = await this.goalService.updateFieldValues(
        req.params.id,
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        updateGoalFieldValuesForm.data
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
