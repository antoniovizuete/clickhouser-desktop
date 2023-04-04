import { ProgressBar, Tag } from "@blueprintjs/core";
import { save } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";
import { JsonResult } from "./clickhouse-clients";
import { AppToaster } from "./toaster/AppToaster";

export enum DownloadKindEnum {
  RAW = "RAW",
  JSON = "JSON",
  JSON_EACH_ROW = "JSON_EACH_ROW",
  CSV = "CSV",
  TSV = "TSV",
}

type KindExporters = {
  [key in DownloadKindEnum]: {
    exporter: (result: JsonResult) => string;
    extension: string;
    mimeType: string;
  };
};

export const kindExportersMimeType: { [key in DownloadKindEnum]: string } = {
  [DownloadKindEnum.RAW]: "application/json",
  [DownloadKindEnum.JSON]: "application/json",
  [DownloadKindEnum.JSON_EACH_ROW]: "application/json",
  [DownloadKindEnum.CSV]: "text/csv",
  [DownloadKindEnum.TSV]: "text/tab-separated-values",
};

export const kindExportersExtension: { [key in DownloadKindEnum]: string } = {
  [DownloadKindEnum.RAW]: "json",
  [DownloadKindEnum.JSON]: "json",
  [DownloadKindEnum.JSON_EACH_ROW]: "json",
  [DownloadKindEnum.CSV]: "csv",
  [DownloadKindEnum.TSV]: "tsv",
};

const exportSeparatedValues = (separator: string) => (result: JsonResult) => {
  const { data, meta } = result;
  const header = meta.map((m) => m.name).join(separator);
  const rows = data.map((row) => row.join(separator)).join("\n");
  return `${header}\n${rows}`;
};

const kindExporters: KindExporters = {
  [DownloadKindEnum.RAW]: {
    exporter: (result: JsonResult) => JSON.stringify(result),
    extension: "json",
    mimeType: "application/json",
  },
  [DownloadKindEnum.JSON]: {
    exporter: (result: JsonResult) => JSON.stringify(toJson(result)),
    extension: "json",
    mimeType: "application/json",
  },
  [DownloadKindEnum.JSON_EACH_ROW]: {
    exporter: (result: JsonResult) =>
      toJson(result)
        .map((row) => JSON.stringify(row))
        .join("\n"),
    extension: "json",
    mimeType: "application/json",
  },
  [DownloadKindEnum.CSV]: {
    exporter: exportSeparatedValues(","),
    extension: "csv",
    mimeType: "text/csv",
  },
  [DownloadKindEnum.TSV]: {
    exporter: exportSeparatedValues("\t"),
    extension: "tsv",
    mimeType: "text/tab-separated-values",
  },
};

const toJson = (result: JsonResult): any[] => {
  return result.data.map((row) => {
    const obj = {} as Record<string, string | number | boolean>;
    result.meta.forEach((meta, index) => {
      obj[meta.name] = row[index];
    });
    return obj;
  });
};

export async function download({
  data,
  kind,
  name: tabName,
}: {
  data: JsonResult;
  kind: DownloadKindEnum;
  name?: string;
}) {
  const { exporter, extension } = kindExporters[kind];
  const exportData = exporter(data);
  const path = await save({
    filters: [
      {
        name: `*.${extension}`,
        extensions: [extension],
      },
    ],
    defaultPath: `${tabName}.${extension}`,
  });

  if (path) {
    const toastKey = AppToaster.topRight.info({
      message: (
        <>
          Exporting data to:
          <br />
          <Tag multiline intent="primary" className="font-mono">
            {path}
          </Tag>
          <ProgressBar />
        </>
      ),
    });

    try {
      await writeTextFile(path, exportData);
      AppToaster.topRight.success(`Exported to ${path}`);
    } catch (e) {
      AppToaster.topRight.error(`Failed to export to ${path}`);
    } finally {
      AppToaster.topRight.dismiss(toastKey);
    }
  }
}
