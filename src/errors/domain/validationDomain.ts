import { fixPrototype } from "@/utils/fixPrototype";
import { DomainException } from "@/errors/domain/index";

export default class ValidationDomainException extends DomainException {
  public readonly context: Record<string, unknown>;

  constructor(params: { message?: string; context: Record<string, unknown> }) {
    super(params?.message || "Validation domain exception");

    fixPrototype(this, ValidationDomainException);

    this.context = params.context || {};
  }
}
