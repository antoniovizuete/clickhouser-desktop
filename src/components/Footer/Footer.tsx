import { isJsonResult, QueryResult } from "../../lib/clickhouse-clients";
import LeftFooter from "./components/LeftFooter";

type Props = {
  result?: QueryResult;
};

export default function Footer({ result }: Props) {
  return (
    <div className="flex flex-row justify-between items-center pl-1 pr-5 py-0.5 bg-slate-50 dark:bg-neutral-800 dark:text-gray-400">
      {result && isJsonResult(result) ? (
        <>
          <LeftFooter result={result} />
        </>
      ) : (
        <div></div>
      )}

      <div className="flex flex-row justify-end items-center gap-2 divide-x divide-neutral-300 dark:divide-neutral-500 border-l border-l-neutral-300 dark:border-l-neutral-500">
        <a
          className="stat hover:underline"
          href="https://github.com/antoniovizuete/clickhouser"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}