import { Icon, NonIdealState, Spinner } from "@blueprintjs/core";
import { useTabsContext } from "../../contexts/useTabsContext";
import { useThemeContext } from "../../contexts/useThemeContext";
import { isMessageResult, isStringResult } from "../../lib/clickhouse-clients";

import Landing from "./components/Landing";
import TableResult from "./components/TableResult";

export default function Result() {
  const { bpTheme } = useThemeContext();
  const { getActiveTab, activeTabId } = useTabsContext();
  const { loading, queryResult } = getActiveTab() ?? {
    loading: false,
    queryResult: undefined,
  };
  const { result, error } = queryResult ?? {
    result: undefined,
    error: undefined,
  };

  if (error) {
    return (
      <div className="overflow-auto h-full flex flex-col gap-5 p-5 justify-center items-center ">
        <NonIdealState
          className={`w-full h-fit ${bpTheme}`}
          title={
            <span className="text-2xl text-red-700 dark:text-red-400">
              Error
            </span>
          }
          icon={
            <Icon
              icon="warning-sign"
              iconSize={80}
              className={bpTheme}
              color="rgb(248 113 113)"
            />
          }
        />
        <div className="font-mono text-red-700 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (loading) {
    return <NonIdealState title="Querying..." icon={<Spinner />} />;
  }

  if (!result) {
    return <Landing />;
  }

  if (isStringResult(result)) {
    return <pre>{result.value}</pre>;
  }

  if (isMessageResult(result)) {
    return (
      <NonIdealState
        title={<span className="dark:text-gray-400">{result.message}</span>}
        icon={
          <Icon
            icon="tick"
            iconSize={80}
            className={bpTheme}
            color="rgb(0 255 0)"
            intent="success"
          />
        }
      />
    );
  }
  if (result.data.length === 0) {
    return (
      <NonIdealState
        title={<span className="dark:text-gray-400">No results</span>}
        icon={
          <Icon
            icon="high-priority"
            iconSize={80}
            className={bpTheme}
            color="rgb(255 200 0)"
            intent="warning"
          />
        }
      />
    );
  }

  return <TableResult result={{ ...result }} activeTabId={activeTabId} />;
}
