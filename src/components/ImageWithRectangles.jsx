// ImageWithRectangles.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const ImageWithRectangles = ({ src, id, handleImageDelete, width }) => {
  const [img] = useImage(src);
  const [imageHeight, setImageHeight] = useState(0);
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [strokeColor, setStrokeColor] = useState('red');
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const stageRef = useRef();
  const trRef = useRef();

  const handleMouseDown = (event) => {
    if (!dragging && !resizing) {
      setStartPoint({ x: event.evt.layerX, y: event.evt.layerY });
      stageRef.current.container().style.cursor = 'crosshair';
    }
  };

  useEffect(() => {
    if (img) {
      const aspectRatio = img.height / img.width;
      setImageHeight(width * aspectRatio);
    }
  }, [img, width]);

  const handleMouseUp = (event) => {
    if (startPoint && !dragging && !resizing) {
      const rect = {
        x: startPoint.x,
        y: startPoint.y,
        width: event.evt.layerX - startPoint.x,
        height: event.evt.layerY - startPoint.y,
        stroke: strokeColor,
        strokeWidth: 2,
        id: `rect${rectangles.length}`,
      };

      setRectangles((oldRects) => [...oldRects, rect]);
      setStartPoint(null);
      stageRef.current.container().style.cursor = 'default';
    }
  };

  const saveSelectedArea = (rect) => {
    console.log(rect);
  };

  const handleSelect = (id) => {
    selectShape(id);
    setResizing(false);
    setTimeout(() => {
      trRef.current.nodes([stageRef.current.findOne(`#${id}`)]);
      trRef.current.getLayer().batchDraw();
    });
  };

  useEffect(() => {
    if (selectedId) {
      trRef.current.nodes([stageRef.current.findOne('#' + selectedId)]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  return (
    <div key={id}>
      <button onClick={() => handleImageDelete(id)}>Delete</button>
      <button onClick={() => setStrokeColor('red')}>Red</button>
      <button onClick={() => setStrokeColor('green')}>Green</button>
      <button onClick={() => setStrokeColor('purple')}>Purple</button>
      <Stage
        width={width}
        height={imageHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <Image image={img} width={width} height={imageHeight} />
          {rectangles.map((rect) => (
            <Rect
              key={rect.id}
              {...rect}
              draggable
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onClick={() => handleSelect(rect.id)}
              onTransformStart={() => setResizing(true)}
              onTransformEnd={(event) => {
                event.evt.stopPropagation();
                setResizing(false);
                trRef.current.nodes([]);
                trRef.current.getLayer().batchDraw();
              }}
            />
          ))}
          <Transformer ref={trRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageWithRectangles;
