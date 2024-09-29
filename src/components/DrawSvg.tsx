"use client";
import { useState, useRef, MouseEvent } from 'react';

const DrawSvg: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [path, setPath] = useState<SVGElement | null>(null);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [fillColor, setFillColor] = useState<string>('#000000'); 
  const [fillOpacity, setFillOpacity] = useState<number>(1);
  const [noFill, setNoFill] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);
  const [drawingType, setDrawingType] = useState<'line' | 'rectangle' | 'circle' | 'polygon' | 'polyline'>('line');
  const [tempPoints, setTempPoints] = useState<number[][]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleMouseDown = (e: MouseEvent<SVGSVGElement>) => {
    if (drawingType === 'polygon' || drawingType === 'polyline') {
      const newPoint = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
      setTempPoints((prev) => [...prev, newPoint]);
    } else {
      setIsDrawing(true);
      setStartX(e.nativeEvent.offsetX);
      setStartY(e.nativeEvent.offsetY);

      let newElement: SVGElement | null = null;

      if (drawingType === 'line') {
        newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      } else if (drawingType === 'rectangle') {
        newElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      } else if (drawingType === 'circle') {
        newElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      }

      if (newElement) {
        newElement.setAttribute('stroke', strokeColor);
        newElement.setAttribute('stroke-width', strokeWidth.toString());
        newElement.setAttribute('fill', noFill ? 'none' : fillColor);
        newElement.setAttribute('fill-opacity', fillOpacity.toString());
        newElement.setAttribute('opacity', opacity.toString());

        if (svgRef.current) {
          svgRef.current.appendChild(newElement);
        }

        setPath(newElement);
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !path) return;

    const endX = e.nativeEvent.offsetX;
    const endY = e.nativeEvent.offsetY;

    if (drawingType === 'line') {
      const d = `M ${startX},${startY} L ${endX},${endY}`;
      path.setAttribute('d', d);
    } else if (drawingType === 'rectangle') {
      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);
      path.setAttribute('x', Math.min(startX, endX).toString());
      path.setAttribute('y', Math.min(startY, endY).toString());
      path.setAttribute('width', width.toString());
      path.setAttribute('height', height.toString());
    } else if (drawingType === 'circle') {
      const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      path.setAttribute('cx', startX.toString());
      path.setAttribute('cy', startY.toString());
      path.setAttribute('r', radius.toString());
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const finishDrawing = () => {
    if (!svgRef.current || tempPoints.length < 2) return;

    const pointsString = tempPoints.map((point) => `${point[0]},${point[1]}`).join(' ');

    const elementType = drawingType === 'polygon' ? 'polygon' : 'polyline';
    const newElement = document.createElementNS('http://www.w3.org/2000/svg', elementType);

    newElement.setAttribute('points', pointsString);
    newElement.setAttribute('stroke', strokeColor);
    newElement.setAttribute('stroke-width', strokeWidth.toString());
    newElement.setAttribute('fill', noFill ? 'none' : fillColor);
    newElement.setAttribute('fill-opacity', fillOpacity.toString());
    newElement.setAttribute('opacity', opacity.toString());

    svgRef.current.appendChild(newElement);

    setTempPoints([]);
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const svgContent = new XMLSerializer().serializeToString(svgElement);

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drawing.svg';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold text-center mb-6">SVG Drawing Tool</h1>

      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Stroke Color:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Fill Color:</label>
          <input
            type="color"
            value={fillColor}
            disabled={noFill}
            onChange={(e) => setFillColor(e.target.value)}
            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Fill Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={fillOpacity}
            disabled={noFill}
            onChange={(e) => setFillOpacity(Number(e.target.value))}
            className="w-20"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">No Fill:</label>
          <input
            type="checkbox"
            checked={noFill}
            onChange={(e) => setNoFill(e.target.checked)}
            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Stroke Width:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-20"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Drawing Type:</label>
          <select
            value={drawingType}
            onChange={(e) => setDrawingType(e.target.value as 'line' | 'rectangle' | 'circle' | 'polygon' | 'polyline')}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="polygon">Polygon</option>
            <option value="polyline">Polyline</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-6 relative">
        <svg
          ref={svgRef}
          width="500"
          height="500"
          className="border border-gray-300 rounded-lg shadow-lg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {tempPoints.length > 0 && (
            <>
              {tempPoints.map((point, index) => (
                <circle
                  key={index}
                  cx={point[0]}
                  cy={point[1]}
                  r="5"
                  fill="red"
                  stroke="black"
                />
              ))}

              <polyline
                points={tempPoints.map((point) => `${point[0]},${point[1]}`).join(' ')}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            </>
          )}
        </svg>
      </div>

      {(drawingType === 'polygon' || drawingType === 'polyline') && tempPoints.length > 0 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={finishDrawing}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Finish {drawingType === 'polygon' ? 'Polygon' : 'Polyline'}
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={downloadSVG}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
};

export default DrawSvg;
