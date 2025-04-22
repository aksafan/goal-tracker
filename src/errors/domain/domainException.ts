import { fixPrototype } from "@/utils/fixPrototype";

export default abstract class DomainException extends Error {
  abstract readonly context: Record<string, unknown>;

  protected constructor(message: string) {
    super(message);

    fixPrototype(this, DomainException);
  }
}
