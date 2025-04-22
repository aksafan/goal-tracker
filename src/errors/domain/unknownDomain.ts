import { fixPrototype } from "@/utils/fixPrototype";
import { DomainException } from "@/errors/domain/index";

export default class UnknownDomainException extends DomainException {
  public readonly context: Record<string, unknown>;

  constructor(params: { message?: string; context?: Record<string, unknown> }) {
    super(params?.message || "Not found domain exception");

    fixPrototype(this, UnknownDomainException);

    this.context = params?.context || {};
  }
}
