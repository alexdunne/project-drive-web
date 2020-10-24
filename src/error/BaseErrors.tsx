export class ApplicationError extends Error {
  get name() {
    return this.constructor.name;
  }
}

export class UserFacingError extends ApplicationError {}

export class RuntimeError extends UserFacingError {
  private internalMessage: string;

  constructor(message: string, internalMessage: string) {
    super(message);

    this.internalMessage = internalMessage;
  }

  getInternalMessage() {
    return this.internalMessage;
  }
}
