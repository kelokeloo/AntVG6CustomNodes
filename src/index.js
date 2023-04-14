import G6 from "@antv/g6";
import { data } from "./data/data";
import "./Nodes/index";

const container = document.getElementById("container");
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: "container",
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ["drag-canvas", "drag-node"]
  },
  defaultNode: {
    type: "server-node"
  },
  fitView: true
});

graph.data(data);
graph.render();

if (typeof window !== "undefined")
  window.onresize = () => {
    if (!graph || graph.get("destroyed")) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
