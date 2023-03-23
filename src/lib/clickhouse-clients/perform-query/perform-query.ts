import { transformConnectionToConnectionParams } from "../helpers";
import { parseResponse, serializeParamValue } from "./helpers";
import { PerformQueryParams, PerformQueryResult, QueryResult } from "./types";

export async function performQuery({
  query,
  params = "{}",
  timeout = 30_000,
  connection,
}: PerformQueryParams): Promise<PerformQueryResult> {
  if (!query) {
    return { error: "Query is empty" };
  }

  const connectionParams = transformConnectionToConnectionParams(connection);

  if (!connectionParams) {
    return { error: "No active connection" };
  }

  const { username, password, serverAddress, database } = connectionParams;
  console.trace();
  const promise = new Promise<QueryResult>((resolve, reject) => {
    const userParams: string[] = [];
    try {
      userParams.push(
        ...Object.entries(JSON.parse(params || "{}")).map(([key, value]) => {
          return `param_${key}=${encodeURIComponent(
            serializeParamValue(value)
          )}`;
        })
      );
    } catch (error) {
      return reject("Invalid JSON params");
    }
    const queryParams = [
      "add_http_cors_header=1",
      `user=${encodeURIComponent(username)}`,
      `password=${encodeURIComponent(password || "")}`,
      `database=${encodeURIComponent(database ?? "default")}`,
      "default_format=JSONCompact",
      "max_result_rows=1000",
      "max_result_bytes=10000000",
      "result_overflow_mode=break",
      ...userParams,
    ].join("&");

    const url = [serverAddress, queryParams].join(
      serverAddress.indexOf("?") >= 0 ? "&" : "?"
    );

    try {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open("POST", url, true);

      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            resolve(parseResponse(this.responseText));
          } else if (this.status === 401) {
            reject("Unauthorized");
          } else if (this.status === 403) {
            reject("Forbidden");
          } else if (this.status === 0) {
            reject("Connection error");
          } else {
            reject(this.responseText);
          }
        }
      };

      xhr.onerror = function () {
        reject("Network error");
      };

      xhr.send(query);
    } catch (e) {
      reject((e as Error).message);
    }
  });

  try {
    const response = await promise;
    return {
      error: undefined,
      result: response,
    };
  } catch (e) {
    return {
      error: e as string,
      result: undefined,
    };
  }
}
