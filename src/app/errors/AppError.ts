class AppError extends Error {
  public status: number;
  // using Error class and creating custom throw error class
  constructor(status: number, message: string, stack = "") {
    super(message);
    this.status = status;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
