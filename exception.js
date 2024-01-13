class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}

class AbstractClassException extends BaseException {
  constructor(fileName, lineNumber) {
    super("La clase no puede ser abstracta", fileName, lineNumber);
    this.name = "AbstractClassException";
  }
}

class EmptyValueException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Debe introducirse un valor", fileName, lineNumber);
    this.name = "EmptyValueException";
  }
}

class AlreadyExistsException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El elemento introducido ya existe", fileName, lineNumber);
    this.name = "AlreadyExistsException";
  }
}

class NotExistingException extends BaseException {
  constructor(fileName, lineNumber) {
    super(
      "El elemento introducido no existe actualmente",
      fileName,
      lineNumber
    );
    this.name = "NotExistingException";
  }
}

class InvalidTypeException extends BaseException {
  constructor(fileName, lineNumber) {
    super(
      "El tipo introducido para este objeto no es válido",
      fileName,
      lineNumber
    );
    this.name = "InvalidTypeException";
  }
}

class InvalidLatitudeException extends BaseException {
  constructor(fileName, lineNumber) {
    super("La latitud introducida no es correcta", fileName, lineNumber);
    this.name = "InvalidLatitudeException";
  }
}

class InvalidLongitudeException extends BaseException {
  constructor(fileName, lineNumber) {
    super("La longitud introducida no es correcta", fileName, lineNumber);
    this.name = "InvalidLongitudeException";
  }
}