import { Allotment } from "allotment";
import ActionBar from "./ActionBar";
import Console from "./Console";

export default function App() {
  return (
    <Allotment vertical>
      <Allotment.Pane maxSize={50} minSize={50} >
        <ActionBar />
      </Allotment.Pane>
      <Allotment.Pane>
        <Console />
      </Allotment.Pane>
    </Allotment>
  )
}
