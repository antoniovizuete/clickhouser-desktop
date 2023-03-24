import { Allotment } from "allotment";
import { useReducer } from "react";
import {
  initialSideBarState,
  SideBarAction,
  sideBarReducer,
} from "../reducers/sidebar-reducer";
import Console from "./Console";
import IconBarItem from "./core/IconBarItem";
import Footer from "./Footer";
import ConnectionsSideBar from "./SideBars/ConnectionsSideBar";
import ThemeIconBarItem from "./SideBars/IconBarItems/ThemeIconBarItem";
import SavedQueriesSideBar from "./SideBars/SavedQueriesSideBar/SavedQueriesSideBar";

export default function App() {
  const [state, dispatch] = useReducer(sideBarReducer, initialSideBarState);

  return (
    <>
      <Allotment vertical>
        <Allotment.Pane>
          <Allotment>
            <Allotment.Pane
              maxSize={56}
              minSize={56}
              className="bg-slate-50 dark:bg-neutral-800"
            >
              <div className="w-full h-full flex flex-col justify-between items-center">
                <div className="w-full flex-grow">
                  <IconBarItem
                    icon="data-connection"
                    tooltip="Connections"
                    onClick={() =>
                      dispatch({
                        type: SideBarAction.TOGGLE,
                        payload: { section: "connection" },
                      })
                    }
                    isActive={state.isConnectionSectionOpen}
                  />
                  <IconBarItem
                    icon="console"
                    tooltip="Saved queries"
                    onClick={() =>
                      dispatch({
                        type: SideBarAction.TOGGLE,
                        payload: { section: "query" },
                      })
                    }
                    isActive={state.isQuerySectionOpen}
                  />
                </div>
                <div className="w-full flex-grow-0">
                  <ThemeIconBarItem />
                </div>
              </div>
            </Allotment.Pane>
            {state.isConnectionSectionOpen && (
              <Allotment.Pane preferredSize="16%" maxSize={400} minSize={200}>
                <ConnectionsSideBar />
              </Allotment.Pane>
            )}
            {state.isQuerySectionOpen && (
              <Allotment.Pane preferredSize="16%" maxSize={400} minSize={200}>
                <SavedQueriesSideBar />
              </Allotment.Pane>
            )}
            <Allotment.Pane>
              <Console />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
        <Allotment.Pane maxSize={24} minSize={24} className="p-0">
          <Footer />
        </Allotment.Pane>
      </Allotment>
    </>
  );
}
