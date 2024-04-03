import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  NodeOrigin,
  useEdgesState,
  useNodesState,
} from "reactflow";
import TextUpdaterNode from "./components/custom-node";

const initialNodes = [
  { id: "root", position: { x: 0, y: 0 }, data: { label: "root" } },
  {
    id: "1",
    position: { x: 100, y: 0 },
    data: { label: "1" },
  },
  {
    id: "2",
    position: { x: 100, y: 200 },
    data: { label: "2" },
  },
];
const initialEdges = [
  { id: "cn-root-1", source: "root", target: "1" },
  { id: "cn-root-2", source: "root", target: "2" },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
  const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };
  const nodeOrigin: NodeOrigin = [0.5, 0.5];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeOrigin={nodeOrigin}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        connectionLineType={ConnectionLineType.Straight}
        fitView
      >
        <Background variant="cross" gap={8} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
