/**
 * Replaces prototype, when extending built-in classes (like Error).
 * Must be called before calling any methods defined in the subclass.
 * Otherwise, `this` will still think it's an instance of the parent class, which doesn't have a subclass methods.
 *
 * Usually used for `instanceof` to work correctly.
 */
export const fixPrototype = <T extends object>(
  instance: T,
  Class: { prototype: T }
): void => {
  Object.setPrototypeOf(instance, Class.prototype);
};
