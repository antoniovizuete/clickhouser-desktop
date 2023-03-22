import { Allotment } from "allotment";
import { useState } from "react";
import Console from "./Console";
import IconBarItem from "./core/IconBarItem";
import Footer from "./Footer";
import SavedQueriesSideBar from "./SideBars/SavedQueriesSideBar";

export default function App() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  return (
    <Allotment vertical>
      <Allotment.Pane>
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
            <Console />
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
      <Allotment.Pane maxSize={24} minSize={24} className="p-0">
        <Footer />
      </Allotment.Pane>
    </Allotment>
  )
}
