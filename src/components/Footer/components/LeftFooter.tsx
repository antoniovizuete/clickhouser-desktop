import { Icon, Menu } from "@blueprintjs/core";
import { MenuItem2, Popover2, Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { isJsonResult, QueryResult } from "../../../lib/clickhouse-clients";
import { download, KindEnum } from "../../../lib/file-downloader";
import {
  formatReadableBytes,
  formatReadableRows
} from "../../../lib/stats-helpers/format-readable";

type Props = {
  result?: QueryResult;
};

export default function LeftFooter({ result }: Props) {
  const { bpTheme } = useThemeContext();

  if (!isJsonResult(result)) {
    return null;
  }

  const { statistics, data } = result;
  const handleDownload = (kind: KindEnum) => () => {
    download(result, kind);
  };

  return (
    <div className={classNames(
      "flex flex-row justify-start items-center gap-1 divide-x divide-neutral-300 dark:divide-neutral-500"
    )}>
      <div className="stat">Elapsed: {statistics.elapsed.toFixed(2)} s.</div>
      <div className="stat">{formatReadableRows(data.length)} rows</div>
      <div className="stat">
        {formatReadableRows(statistics.rows_read)} read rows
      </div>
      <div className="stat">{formatReadableBytes(statistics.bytes_read)}</div>
      {false && data.length > 0 && (
        <div className="stat bg-[#fbb360]">
          <Popover2
            popoverClassName={bpTheme}
            position="top"
            minimal
            content={
              <Menu>
                <MenuItem2
                  text="As raw JSON"
                  onClick={handleDownload(KindEnum.RAW)}
                />
                <MenuItem2
                  text="As JSON"
                  onClick={handleDownload(KindEnum.JSON)}
                />
                <MenuItem2
                  text="As JSONEachRow"
                  onClick={handleDownload(KindEnum.JSON_EACH_ROW)}
                />
                <MenuItem2
                  text="As CSV"
                  onClick={handleDownload(KindEnum.CSV)}
                />
                <MenuItem2
                  text="As TSV"
                  onClick={handleDownload(KindEnum.TSV)}
                />
              </Menu>
            }
          >
            <Tooltip2 content="Download data">
              <Icon
                icon="bring-data"
                className="cursor-pointer"
                color="rgb(28 33 39)"
              />
            </Tooltip2>
          </Popover2>
        </div>
      )}
    </div>
  );
}
