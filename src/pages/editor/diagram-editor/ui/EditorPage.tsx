import React, { useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tooltip, message, Input, Divider } from 'antd';
import { routePaths } from '@/shared/config/routePaths';
import { DownloadOutlined } from '@ant-design/icons';
import {
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  AppstoreAddOutlined,
  BorderOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  useReactFlow,
} from 'reactflow';
import type {
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  EdgeChange,
  NodeChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './EditorPage.css';

interface UMLNodeData {
  label: string;
  attributes?: string;
  methods?: string;
  bgColor?: string;
}

const UMLNode = ({
  data,
  type,
  id,
  selected,
}: {
  data: UMLNodeData;
  type: string;
  id: string;
  selected: boolean;
}) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  const attributesList = (data.attributes || '').split('\n').filter(Boolean);
  const methodsList = (data.methods || '').split('\n').filter(Boolean);

  return (
    <div
      className={`uml-node ${type === 'interfaceNode' ? 'interface-node' : 'class-node'} ${selected ? 'selected' : ''}`}
      style={{ backgroundColor: data.bgColor || '#fff' }}
    >
      {selected && (
        <div className="node-delete-btn" onClick={handleDelete}>
          <CloseCircleOutlined />
        </div>
      )}

      <Handle type="target" position={Position.Left} id="left" />

      <div className="uml-node-header">
        {type === 'interfaceNode' ? 'Interface' : 'Class'}
        <div className="uml-node-title">{data.label}</div>
      </div>

      <div className="uml-node-section">
        {attributesList.map((attr, i) => (
          <div key={i} className="uml-node-row">
            {attr}
          </div>
        ))}
        {attributesList.length === 0 && (
          <div className="uml-node-placeholder">&nbsp;</div>
        )}
      </div>

      <div className="uml-node-section uml-node-methods">
        {methodsList.map((meth, i) => (
          <div key={i} className="uml-node-row">
            {meth}
          </div>
        ))}
        {methodsList.length === 0 && (
          <div className="uml-node-placeholder">&nbsp;</div>
        )}
      </div>

      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
};

const nodeTypes = {
  classNode: UMLNode,
  interfaceNode: UMLNode,
};

//  Основной компонент
export const EditorPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node<UMLNodeData> | null>(
    null,
  );

  // Мы храним историю изменений.
  // Чтобы не перегружать память, храним только последние 20 состояний.
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([
    { nodes: [], edges: [] },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Флаг, чтобы избежать сохранения при программном изменении (undo/redo)
  const isUndoRedoAction = useRef(false);

  // Функция сохранения текущего состояния в историю
  const takeSnapshot = useCallback(() => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    setHistory((prev) => {
      // Обрезаем будущее, если мы сделали новое действие после Undo
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ nodes, edges });
      // Ограничиваем размер истории
      if (newHistory.length > 30) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 29));
  }, [nodes, edges, historyIndex]);

  // Слушаем изменения узлов и ребер для создания снимков
  // Но делаем это осторожно, чтобы не спамить историю при перетаскивании
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      // Создаем снимок только когда перетаскивание закончено или узел удален
      const relevantChanges = changes.filter(
        (ch) =>
          ch.type === 'remove' || (ch.type === 'position' && !ch.dragging),
      );
      if (relevantChanges.length > 0) {
        // Задержка для обновления состояния nodes
        setTimeout(() => takeSnapshot(), 0);
      }
    },
    [onNodesChange, takeSnapshot],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);
      const relevantChanges = changes.filter((ch) => ch.type === 'remove');
      if (relevantChanges.length > 0) {
        setTimeout(() => takeSnapshot(), 0);
      }
    },
    [onEdgesChange, takeSnapshot],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      setTimeout(() => takeSnapshot(), 0);
    },
    [setEdges, takeSnapshot],
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const prevSnapshot = history[historyIndex - 1];
      setNodes(prevSnapshot.nodes);
      setEdges(prevSnapshot.edges);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const nextSnapshot = history[historyIndex + 1];
      setNodes(nextSnapshot.nodes);
      setEdges(nextSnapshot.edges);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  //  Логика сохранения
  const handleSave = useCallback(() => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    const json = JSON.stringify(flow, null, 2);

    // Создаем и скачиваем файл
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${projectId}.json`;
    a.click();
    URL.revokeObjectURL(url);

    message.success('Файл сохранен');
  }, [reactFlowInstance, projectId]);

  //  Остальная логика (Drag & Drop, Properties Panel)

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[] }) => {
      if (selectedNodes.length === 1) {
        const node = nodes.find(
          (n) => n.id === selectedNodes[0].id,
        ) as Node<UMLNodeData>;
        setSelectedNode(node);
      } else {
        setSelectedNode(null);
      }
    },
    [nodes],
  );

  const handleDataChange = (key: keyof UMLNodeData, value: string) => {
    if (!selectedNode) return;

    // Создаем снимок перед изменением данных
    takeSnapshot();

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return { ...node, data: { ...node.data, [key]: value } };
        }
        return node;
      }),
    );
    // Обновляем локальный стейт выбранного узла сразу
    setSelectedNode((prev) =>
      prev ? { ...prev, data: { ...prev.data, [key]: value } } : null,
    );
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node<UMLNodeData> = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: type === 'classNode' ? 'NewClass' : 'NewInterface',
          attributes: '',
          methods: '',
          bgColor: '#fff',
        },
      };

      setNodes((nds) => nds.concat(newNode));
      takeSnapshot();
    },
    [reactFlowInstance, setNodes, takeSnapshot],
  );

  return (
    <div className="editorLayout">
      <header className="editorHeader">
        <div className="headerLeft">
          <Tooltip title="Назад">
            <Button
              icon={<LeftOutlined />}
              onClick={() => navigate('/projects')}
              type="text"
            />
          </Tooltip>
          <div className="projectTitle">Проект #{projectId}</div>
        </div>

        <div className="headerCenter">
          {/* Блок Undo/Redo */}
          <Button.Group style={{ marginRight: 16 }}>
            <Tooltip title="Отменить">
              <Button
                icon={<UndoOutlined />}
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              />
            </Tooltip>
            <Tooltip title="Повторить">
              <Button
                icon={<RedoOutlined />}
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              />
            </Tooltip>
          </Button.Group>

          <Button.Group style={{ marginRight: 16 }}>
            <Button
              icon={<ZoomOutOutlined />}
              onClick={() => reactFlowInstance?.zoomOut()}
            />
            <Button
              icon={<ZoomInOutlined />}
              onClick={() => reactFlowInstance?.zoomIn()}
            />
          </Button.Group>
        </div>

        <div className="headerRight">
          <Button
            icon={<CodeOutlined />}
            onClick={() => navigate(routePaths.codeGeneration)}
            style={{ marginRight: 8 }}
          >
            Генерация кода
          </Button>
          <Button
            icon={<UploadOutlined />}
            onClick={() => navigate(routePaths.codeUpload)}
            style={{ marginRight: 8 }}
          >
            Загрузить код
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => navigate(routePaths.export)}
            style={{ marginRight: 8 }}
          >
            Экспорт
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </header>

      <div className="editorContainer">
        <aside className="editorSidebar">
          <div className="sidebarTitle">Элементы</div>
          <div
            className="elementItem"
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData('application/reactflow', 'classNode')
            }
          >
            <BorderOutlined className="elementIcon" /> <span>Класс</span>
          </div>
          <div
            className="elementItem"
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData('application/reactflow', 'interfaceNode')
            }
          >
            <AppstoreAddOutlined className="elementIcon" />{' '}
            <span>Интерфейс</span>
          </div>
        </aside>

        <div className="editorCanvas" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            deleteKeyCode="Delete"
          >
            <Background color="#aaa" gap={16} />
            <Controls />
          </ReactFlow>
        </div>

        <aside className="propertiesPanel">
          {selectedNode ? (
            <>
              <div className="propertiesHeader">
                Свойства: <b>{selectedNode.data.label}</b>
              </div>
              <Divider style={{ margin: '12px 0' }} />

              <div className="propertyGroup">
                <label>Название класса:</label>
                <Input
                  value={selectedNode.data.label}
                  onChange={(e) => handleDataChange('label', e.target.value)}
                />
              </div>

              <div className="propertyGroup">
                <label>Атрибуты:</label>
                <Input.TextArea
                  rows={4}
                  value={selectedNode.data.attributes || ''}
                  onChange={(e) =>
                    handleDataChange('attributes', e.target.value)
                  }
                />
              </div>

              <div className="propertyGroup">
                <label>Методы:</label>
                <Input.TextArea
                  rows={4}
                  value={selectedNode.data.methods || ''}
                  onChange={(e) => handleDataChange('methods', e.target.value)}
                />
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div className="propertyGroup">
                <label>Цвет фона:</label>
                <Input
                  type="color"
                  style={{ padding: 0, width: '100%', height: 30 }}
                  value={selectedNode.data.bgColor || '#ffffff'}
                  onChange={(e) => handleDataChange('bgColor', e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="propertiesEmpty">
              <AppstoreAddOutlined style={{ fontSize: 32, color: '#ccc' }} />
              <p>Выделите элемент на схеме для редактирования</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
