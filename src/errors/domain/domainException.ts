/**
 * This is a basic class for all domain exceptions.
 * Extend it to use in code.
 *
 * Domain exceptions are usually used to communicate between domain and application/presenter layers.
 * In other words, Domain exception - is the way for service to say something to controller.
 * E.g. if there is a business validation error - you can throw ValidationDomainException
 * or NotFoundDomainException if the entity was not found.
 *
 * Controller can catch and react on these exceptions to show end user the proper response.
 * E.g. send UnprocessableEntity or NotFound response respectively.
 */
export default abstract class DomainException extends Error {
  abstract readonly context: Record<string, unknown>;

  protected constructor(message: string) {
    super(message);
  }
}
