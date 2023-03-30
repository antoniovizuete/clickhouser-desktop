import { Icon, Menu } from "@blueprintjs/core";
import { MenuItem2, Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { useTabsContext } from "../../../contexts/useTabsContext";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { JsonResult } from "../../../lib/clickhouse-clients";
import { download, DownloadKindEnum } from "../../../lib/file-downloader";

type Props = {
  result: JsonResult;
};

export default function DownloadButton({ result }: Props) {
  const { getActiveTab } = useTabsContext();
  const { bpTheme } = useThemeContext();

  const handleDownload = (kind: DownloadKindEnum) => () => {
    download({
      kind,
      data: result,
      name: getActiveTab()?.name ?? "exported-data",
    });
  };

  return (
    <div className="stat bg-[#fbb360]">
      <Popover2
        popoverClassName={bpTheme}
        position="top"
        minimal
        content={
          <Menu>
            <MenuItem2
              text="As raw JSON"
              onClick={handleDownload(DownloadKindEnum.RAW)}
            />
            <MenuItem2
              text="As JSON"
              onClick={handleDownload(DownloadKindEnum.JSON)}
            />
            <MenuItem2
              text="As JSONEachRow"
              onClick={handleDownload(DownloadKindEnum.JSON_EACH_ROW)}
            />
            <MenuItem2
              text="As CSV"
              onClick={handleDownload(DownloadKindEnum.CSV)}
            />
            <MenuItem2
              text="As TSV"
              onClick={handleDownload(DownloadKindEnum.TSV)}
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
  );
}
