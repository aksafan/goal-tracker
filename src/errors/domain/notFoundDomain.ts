import { DomainException } from "@/errors/domain/index";

export default class NotFoundDomainException extends DomainException {
  public readonly context: Record<string, unknown>;

  constructor(params: { message?: string; context?: Record<string, unknown> }) {
    super(params?.message || "Not found domain exception");

    this.context = params?.context || {};
  }
}
