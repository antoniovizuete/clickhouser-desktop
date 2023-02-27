export enum RustBridgeControlledErrors {
  NotConnected,
  FirstTime,
  NoProjectDirectory,
  NoDataDirectory,
}

export class RustBridgeError extends Error {
  constructor(
    message: string,
    public type: RustBridgeControlledErrors | "Uncontrolled"
  ) {
    super(message);
  }
}

export const fromStringToRustBridgeError = (error: string): RustBridgeError => {
  switch (error) {
    case "NotConnected":
      return new RustBridgeError(
        "Not connected",
        RustBridgeControlledErrors.NotConnected
      );
    case "FirstTime":
      return new RustBridgeError(
        "First time",
        RustBridgeControlledErrors.FirstTime
      );
    case "NoProjectDirectory":
      return new RustBridgeError(
        "No project directory",
        RustBridgeControlledErrors.NoProjectDirectory
      );
    case "NoDataDirectory":
      return new RustBridgeError(
        "No data directory",
        RustBridgeControlledErrors.NoDataDirectory
      );
    default:
      return new RustBridgeError(error, "Uncontrolled");
  }
};
