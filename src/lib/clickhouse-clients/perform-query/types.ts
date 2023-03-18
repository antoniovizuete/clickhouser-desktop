import { ConnectionBody } from "../types";

export type PerformQueryParams = {
  query?: string;
  params?: string;
  timeout?: number;
  connection?: ConnectionBody;
};

export type MessageResult = {
  message: string;
};

export type StringResult = {
  value: string;
};

export type JsonResultMeta = {
  name: string;
  type: string;
};

export type JsonResult = {
  data: (string | number | boolean)[][];
  //| Record<string, string | number | boolean>[];
  meta: JsonResultMeta[];
  rows: number;
  rows_before_limit_at_least: number;
  statistics: Statistics;
};

export type Statistics = {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
};

export type QueryResult = StringResult | JsonResult | MessageResult;

export type PerformQueryResult = {
  error?: string;
  result?: QueryResult;
};
