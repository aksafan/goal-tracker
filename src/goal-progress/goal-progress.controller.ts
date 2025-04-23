import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import GoalProgressService from "@/goal-progress/goal-progress.service";
import {
  toGoalProgressResponse,
  toGoalProgressResponses,
} from "@/goal-progress/goal-progress.types";
import { CreateGoalProgressForm } from "@/goal-progress/goal-progress.forms";
import { NotFoundError, UnprocessableEntityError } from "@/errors/http";
import {
  NotFoundDomainException,
  ValidationDomainException,
} from "@/errors/domain";
import { FlattenedFieldErrors } from "@/types/zod";

export default class GoalProgressController {
  private goalProgressService: GoalProgressService = new GoalProgressService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    // const progress = await this.goalProgressService.getAllByGoalId(req.user.id, req.params.id);
    const progress = await this.goalProgressService.findAll(
      "7171f91a-bd67-41c2-9e38-7d81be9edf22",
      req.params.id,
      req.queryParams
    );

    res
      .status(StatusCodes.OK)
      .json({ data: toGoalProgressResponses(progress) });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const createGoalProgressForm = CreateGoalProgressForm.safeParse(req.body);
    if (!createGoalProgressForm.success) {
      throw new UnprocessableEntityError({
        errors: createGoalProgressForm.error.flatten().fieldErrors,
      });
    }

    try {
      // const progress = await this.goalProgressService.create(req.user.id, req.params.id, parsed.data);
      const progress = await this.goalProgressService.create(
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        req.params.id,
        createGoalProgressForm.data
      );

      res.status(StatusCodes.CREATED).json(toGoalProgressResponse(progress));
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
