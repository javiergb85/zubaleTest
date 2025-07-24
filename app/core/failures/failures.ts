export class Failure {
  readonly message: string;
  readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class ServerFailure extends Failure {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
  }
}

export class NetworkFailure extends Failure {
  constructor(message: string = "No hay conexión a Internet.") {
    super(message);
  }
}

export class CacheFailure extends Failure {
  constructor(message: string = "Error de caché.") {
    super(message);
  }
}

export default Failure