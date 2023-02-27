import { XOR } from "../../types";

type ConstructorArgs<T, E extends Error = Error> = XOR<
  { result: T },
  { error: E }
>;

export class Result<T, E extends Error = Error> {
  public readonly ok: boolean;
  private readonly value?: T;
  private readonly error?: E;

  constructor({ result, error }: ConstructorArgs<T, E>) {
    if (result) {
      this.ok = true;
      this.value = result;
    } else {
      this.ok = false;
      this.error = error;
    }
  }

  public unwrap(): T {
    if (this.ok) {
      return this.value as T;
    }

    throw this.error;
  }

  public unwrapError(): E | undefined {
    if (!this.ok) {
      return this.error as E;
    }

    return undefined;
  }

  public isError(): boolean {
    return !this.ok;
  }
}
