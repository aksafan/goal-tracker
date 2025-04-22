import { fixPrototype } from "@/utils/fixPrototype";
import { DomainException } from "@/errors/domain/index";

export default class UniqueConstraintDomainException extends DomainException {
  public readonly context: Record<string, unknown>;

  constructor(params: { message?: string; context?: Record<string, unknown> }) {
    super(params?.message || "Unique constraint domain exception");

    fixPrototype(this, UniqueConstraintDomainException);

    this.context = params?.context || {};
  }
}
