import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import {
  CreateDailyQuestForm,
  UpdateDailyQuestForm,
} from "@/daily-quest/daily-quest.forms";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "@/errors/http";
import DailyQuestService from "@/daily-quest/daily-quest.service";
import {
  toDailyQuestResponse,
  toDailyQuestResponses,
} from "@/daily-quest/daily-quest.types";
import {
  NotFoundDomainException,
  ValidationDomainException,
} from "@/errors/domain";
import { FlattenedFieldErrors } from "@/types/zod";

export default class DailyQuestController {
  private dailyQuestService = new DailyQuestService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    const quests = await this.dailyQuestService.findAll(
      // req.user.id,
      "7171f91a-bd67-41c2-9e38-7d81be9edf22",
      req.queryParams
    );

    res.status(StatusCodes.OK).json({ data: toDailyQuestResponses(quests) });
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const quest = await this.dailyQuestService.findById(
        req.params.id,
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22"
      );

      res.status(StatusCodes.OK).json(toDailyQuestResponse(quest));
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const result = CreateDailyQuestForm.safeParse(req.body);
    if (!result.success) {
      throw new UnprocessableEntityError({
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      const quest = await this.dailyQuestService.create(
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        result.data
      );

      res.status(StatusCodes.CREATED).json(toDailyQuestResponse(quest));
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

  getForDate = async (req: Request, res: Response): Promise<void> => {
    if (!req.queryParams.date) {
      throw new BadRequestError({
        message: "Query parameter 'date' is required",
      });
    }

    const quests = await this.dailyQuestService.getForDate(
      // req.user.id,
      "7171f91a-bd67-41c2-9e38-7d81be9edf22",
      req.queryParams
    );

    res.status(StatusCodes.OK).json({
      data: toDailyQuestResponses(quests),
    });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const result = UpdateDailyQuestForm.safeParse(req.body);
    if (!result.success) {
      throw new UnprocessableEntityError({
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      const quest = await this.dailyQuestService.update(
        req.params.id,
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        result.data
      );

      res.status(StatusCodes.OK).json(toDailyQuestResponse(quest));
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

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.dailyQuestService.delete(
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

  toggleCompletion = async (req: Request, res: Response): Promise<void> => {
    const { date } = req.body;

    if (!date) {
      throw new UnprocessableEntityError({
        errors: { date: ["Date is required in request body"] },
      });
    }

    try {
      await this.dailyQuestService.toggleCompletion(
        req.params.id,
        // req.user.id,
        "7171f91a-bd67-41c2-9e38-7d81be9edf22",
        new Date(date)
      );

      res.status(StatusCodes.OK).send();
    } catch (e: unknown) {
      if (e instanceof NotFoundDomainException) {
        throw new NotFoundError({ message: e.message });
      }

      throw e;
    }
  };
}
