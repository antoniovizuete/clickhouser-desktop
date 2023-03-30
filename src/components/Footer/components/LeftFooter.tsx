import classNames from "classnames";
import { isJsonResult, QueryResult } from "../../../lib/clickhouse-clients";
import {
  formatReadableBytes,
  formatReadableRows,
} from "../../../lib/stats-helpers/format-readable";
import DownloadButton from "./DownloadButton";

type Props = {
  result?: QueryResult;
};

export default function LeftFooter({ result }: Props) {
  if (!isJsonResult(result)) {
    return null;
  }

  const { statistics, data } = result;

  return (
    <div
      className={classNames(
        "flex flex-row justify-start items-center gap-1 divide-x divide-neutral-300 dark:divide-neutral-500"
      )}
    >
      {data.length > 0 && <DownloadButton result={result} />}
      <div className="stat">Elapsed: {statistics.elapsed.toFixed(2)} s.</div>
      <div className="stat">{formatReadableRows(data.length)} rows</div>
      <div className="stat">
        {formatReadableRows(statistics.rows_read)} read rows
      </div>
      <div className="stat">{formatReadableBytes(statistics.bytes_read)}</div>
    </div>
  );
}
