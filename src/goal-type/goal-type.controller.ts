import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import GoalTypeService from "@/goal-type/goal-type.service";
import {
  toGoalTypeDetailedResponse,
  toGoalTypeFieldResponses,
  toGoalTypeResponses,
} from "@/goal-type/goal-type.types";
import {
  NotFoundDomainException,
  ValidationDomainException,
} from "@/errors/domain";
import { NotFoundError, UnprocessableEntityError } from "@/errors/http";
import {
  CreateGoalTypeForm,
  GoalTypeFieldForm,
  UpdateGoalTypeForm,
} from "@/goal-type/goal-type.forms";
import { FlattenedFieldErrors } from "@/types/zod";
import GoalTypeModel, {
  GoalTypeDetailedModel,
} from "@/goal-type/goal-type.domain.types";
import { z } from "zod";

export default class GoalTypeController {
  private goalTypeService = new GoalTypeService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    const types: GoalTypeModel[] = await this.goalTypeService.findAll(
      req.queryParams
    );

    res.status(StatusCodes.OK).json({ data: toGoalTypeResponses(types) });
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const goalTypeDetailed: GoalTypeDetailedModel =
        await this.goalTypeService.findById(req.params.id);

      res
        .status(StatusCodes.OK)
        .json(toGoalTypeDetailedResponse(goalTypeDetailed));
    } catch (e) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const createGoalTypeForm = CreateGoalTypeForm.safeParse(req.body);
    if (!createGoalTypeForm.success) {
      throw new UnprocessableEntityError({
        errors: createGoalTypeForm.error.flatten().fieldErrors,
      });
    }

    try {
      const goalType: GoalTypeDetailedModel = await this.goalTypeService.create(
        createGoalTypeForm.data
      );

      res
        .status(StatusCodes.CREATED)
        .json(toGoalTypeDetailedResponse(goalType));
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

  async update(req: Request, res: Response): Promise<void> {
    const updateGoalTypeForm = UpdateGoalTypeForm.safeParse(req.body);
    if (!updateGoalTypeForm.success) {
      throw new UnprocessableEntityError({
        errors: updateGoalTypeForm.error.flatten().fieldErrors,
      });
    }

    try {
      const goalType: GoalTypeDetailedModel = await this.goalTypeService.update(
        req.params.id,
        updateGoalTypeForm.data
      );

      res
        .status(StatusCodes.CREATED)
        .json(toGoalTypeDetailedResponse(goalType));
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
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.goalTypeService.delete(req.params.id);

      res.status(StatusCodes.NO_CONTENT).send();
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  async addFields(req: Request, res: Response): Promise<void> {
    const goalTypeFieldForms = z.array(GoalTypeFieldForm).safeParse(req.body);
    if (!goalTypeFieldForms.success) {
      throw new UnprocessableEntityError({
        errors: goalTypeFieldForms.error.flatten().fieldErrors,
      });
    }

    try {
      const createdFields = await this.goalTypeService.addFields(
        req.params.id,
        goalTypeFieldForms.data
      );

      res
        .status(StatusCodes.CREATED)
        .json(toGoalTypeFieldResponses(createdFields));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  }
}
