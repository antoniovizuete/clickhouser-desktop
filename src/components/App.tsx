import { Icon } from "@blueprintjs/core";
import { Allotment } from "allotment";
import { useState } from "react";
import ActionBar from "./ActionBar";
import Console from "./Console";
import IconBarItem from "./core/IconBarItem";
import SavedQueriesSideBar from "./SideBars/SavedQueriesSideBar";

export default function App() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  return (
    <Allotment>
      <Allotment.Pane maxSize={56} minSize={56} className="bg-slate-50 dark:bg-neutral-800">
        <IconBarItem
          icon="console"
          tooltip="Saved queries"
          onClick={() => setSideBarOpen(prev => !prev)}
          isActive={isSideBarOpen}
        />
      </Allotment.Pane>
      {isSideBarOpen && (<Allotment.Pane preferredSize="16%" maxSize={400} minSize={200}>
        <SavedQueriesSideBar />
      </Allotment.Pane>)}
      <Allotment.Pane>
        <Allotment vertical>
          <Allotment.Pane maxSize={50} minSize={50} >
            <ActionBar />
          </Allotment.Pane>
          <Allotment.Pane>
            <Console />
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
    </Allotment>

  )
  return (<>
    <ActionBar />
    <div className="flex flex-row w-full h-full">

      <div className="flex flex-col w-14 h-full justify-end items-center">
        <div className="flex-grow flex flex-col justify-start items-center w-full">
          <div className="h-12 bg-slate-50 dark:bg-neutral-800 dark:text-white w-full flex justify-center items-center border-b border-b-stone-600">

          </div>
          <div className="flex-grow flex flex-col justify-start items-center w-full border-r dark:border-r-stone-600">
          </div>
        </div>
        <div className="flex-grow-0 w-full">
          <Icon
            className="w-full h-full py-1 px-5 hover:cursor-pointer hover:scale-110 text-yellow-600 hover:bg-stone-200 dark:bg-neutral-700 dark:text-yellow-400 dark:hover:bg-neutral-800"
            icon="chevron-right"
            //onClick={onClick}
            size={14}
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <Console />
      </div>
    </div>
  </>)
}
