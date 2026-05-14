import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import {
  FileImageOutlined,
  FilePdfOutlined,
  CodeOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import ReactFlow, { Background, useNodesState, useEdgesState } from 'reactflow';
import { toPng, toSvg } from 'html-to-image';
import type { Node, Edge } from 'reactflow';
import { jsPDF } from 'jspdf';
import 'reactflow/dist/style.css';
import '@/pages/editor/diagram-editor/ui/EditorPage.css';
import './ExportPage.css';
import { nodeTypes } from '@/pages/editor/diagram-editor/ui/EditorPage';
import { routePaths } from '@/shared/config/routePaths';

export const ExportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();
  const exportRef = useRef<HTMLDivElement>(null);

  const [selectedFormat, setSelectedFormat] = useState('png');
  const [loading, setLoading] = useState(false);

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    if (!projectId) {
      message.error('Проект не найден');
      navigate(routePaths.projects);
      return;
    }
    if (location.state) {
      const { nodes: savedNodes, edges: savedEdges } = location.state as {
        nodes: Node[];
        edges: Edge[];
      };

      if (savedNodes) {
        const cleanNodes = savedNodes.map((node: Node) => ({
          ...node,
          selected: false,
        }));
        setNodes(cleanNodes);
      }
      if (savedEdges) {
        setEdges(savedEdges);
      }
    } else {
      message.error('Нет данных для экспорта');
    }
  }, [projectId, navigate, location.state, setNodes, setEdges]);

  const formats = [
    {
      id: 'png',
      label: 'PNG',
      icon: <FileImageOutlined />,
      desc: 'Растровое изображение',
    },
    {
      id: 'pdf',
      label: 'PDF',
      icon: <FilePdfOutlined />,
      desc: 'Документ для печати',
    },
    {
      id: 'svg',
      label: 'SVG',
      icon: <CodeOutlined />,
      desc: 'Векторная графика',
    },
  ];

  const downloadFile = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  const handleExport = async () => {
    if (!exportRef.current) return;

    setLoading(true);
    message.info('Подготовка диаграммы...');

    try {
      const edgePaths = exportRef.current.querySelectorAll(
        '.react-flow__edge-path',
      );
      const arrowheads = exportRef.current.querySelectorAll(
        '.react-flow__arrowhead',
      );

      edgePaths.forEach((path) => {
        path.setAttribute('stroke', '#333');
        path.setAttribute('stroke-width', '2');
      });

      arrowheads.forEach((arrow) => {
        arrow.setAttribute('fill', '#333');
      });

      await new Promise((resolve) => setTimeout(resolve, 300));

      const node = exportRef.current;
      const width = node.offsetWidth;
      const height = node.offsetHeight;

      if (width === 0 || height === 0) {
        message.error('Ошибка: область экспорта пуста.');
        setLoading(false);
        return;
      }

      if (selectedFormat === 'png') {
        const dataUrl = await toPng(node, {
          quality: 1.0,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
        });
        downloadFile(dataUrl, 'diagram.png');
      } else if (selectedFormat === 'svg') {
        const dataUrl = await toSvg(node);
        downloadFile(dataUrl, 'diagram.svg');
      } else if (selectedFormat === 'pdf') {
        const dataUrl = await toPng(node, {
          quality: 1.0,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
        });

        const orientation = width > height ? 'landscape' : 'portrait';

        const pdf = new jsPDF({
          orientation: orientation,
          unit: 'px',
          format: [width, height],
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
        pdf.save('diagram.pdf');
      }

      message.success('Готово!');
    } catch (err) {
      console.error('Export error:', err);
      message.error('Ошибка при экспорте');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exportPageLayout">
      <div className="exportCard">
        <div className="exportHeader">
          <h2>Экспорт диаграммы</h2>
          <p>Выберите формат и сохраните результат</p>
        </div>

        <div className="exportFormats">
          {formats.map((format) => (
            <div
              key={format.id}
              className={`formatCard ${selectedFormat === format.id ? 'active' : ''}`}
              onClick={() => setSelectedFormat(format.id)}
            >
              <div className="formatIcon">{format.icon}</div>
              <div className="formatInfo">
                <span className="formatLabel">{format.label}</span>
                <span className="formatDesc">{format.desc}</span>
              </div>
              {selectedFormat === format.id && (
                <CheckCircleFilled className="formatCheck" />
              )}
            </div>
          ))}
        </div>

        <div className="exportPreview">
          <div className="previewLabel">Предварительный просмотр</div>
          <div
            className="previewBox"
            style={{ height: '400px', width: '100%' }}
          >
            <div
              ref={exportRef}
              className="export-diagram-container"
              style={{ background: 'white', width: '100%', height: '100%' }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                panOnDrag={false}
                zoomOnScroll={false}
                nodesDraggable={false}
              >
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </div>
        </div>

        <div className="exportFooter">
          <Button size="large" onClick={() => navigate(-1)}>
            Отмена
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleExport}
            loading={loading}
          >
            Экспорт
          </Button>
        </div>
      </div>
    </div>
  );
};
