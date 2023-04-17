import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTabsContext } from "../../../contexts/useTabsContext";
import TabList from "./TabList";

export default function TabsContainer() {
  const { sortTabs } = useTabsContext();

  return (
    <DragDropContext onDragEnd={sortTabs}>
      <Droppable droppableId="tabs" direction="horizontal">
        {(provided) => <TabList provided={provided} />}
      </Droppable>
    </DragDropContext>
  );
}
