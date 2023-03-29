import { Allotment } from "allotment";
import { SideBarAction } from "../../reducers/sidebar-reducer";
import Console from "../Console";
import IconBarItem from "../core/IconBarItem";
import Footer from "../Footer";
import ConnectionsSideBar from "../SideBars/ConnectionsSideBar";
import ThemeIconBarItem from "../SideBars/IconBarItems/ThemeIconBarItem";
import SavedQueriesSideBar from "../SideBars/SavedQueriesSideBar/SavedQueriesSideBar";
import CloseDialog from "./dialogs/CloseDialog";
import { useApp } from "./hooks/useApp";
import { useCloseDialog } from "./hooks/useCloseDialog";

export default function App() {
  const { sideBarDispatch, sideBarState } = useApp();
  const {
    handleOnClickDontSave,
    handleOnClickSave,
    handleOnClose,
    isOpen,
    tabToBeClosed,
  } = useCloseDialog();

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
                    shortcut="CmdOrCtrl+Shift+C"
                    onClick={() =>
                      sideBarDispatch({
                        type: SideBarAction.TOGGLE,
                        payload: { section: "connection" },
                      })
                    }
                    isActive={sideBarState.isConnectionSectionOpen}
                  />
                  <IconBarItem
                    icon="console"
                    tooltip="Saved queries"
                    shortcut="CmdOrCtrl+Shift+Q"
                    onClick={() =>
                      sideBarDispatch({
                        type: SideBarAction.TOGGLE,
                        payload: { section: "query" },
                      })
                    }
                    isActive={sideBarState.isQuerySectionOpen}
                  />
                </div>
                <div className="w-full flex-grow-0">
                  <ThemeIconBarItem />
                </div>
              </div>
            </Allotment.Pane>
            {sideBarState.isConnectionSectionOpen && (
              <Allotment.Pane preferredSize="16%" maxSize={400} minSize={200}>
                <ConnectionsSideBar />
              </Allotment.Pane>
            )}
            {sideBarState.isQuerySectionOpen && (
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
      <CloseDialog
        handleOnClickDontSave={handleOnClickDontSave}
        handleOnClickSave={handleOnClickSave}
        isOpen={isOpen}
        onClose={handleOnClose}
        tabToBeClosed={tabToBeClosed}
      />
    </>
  );
}
