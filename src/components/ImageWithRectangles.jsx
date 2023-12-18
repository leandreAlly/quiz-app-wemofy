import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import ConfirmationPopup from './ConfirmationPopup';

const ImageWithRectangles = ({ src, id, handleImageDelete, width }) => {
  const [imageHeight, setImageHeight] = useState(0);
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [strokeColor, setStrokeColor] = useState('red');
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [img] = useImage(src);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmPopup = () => {
    handleSubmit();
    setIsPopupOpen(false);
  };

  const stageRef = useRef();
  const trRef = useRef();

  const handleMouseDown = (event) => {
    if (isSubmitted) return;
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

  const handleSelect = (id) => {
    selectShape(id);
    setResizing(false);
    setTimeout(() => {
      trRef.current.nodes([stageRef.current.findOne(`#${id}`)]);
      trRef.current.getLayer().batchDraw(); //
    });
  };

  const handleSubmit = () => {
    const answer = rectangles.find((rect) => rect.stroke === 'green');
    const question = rectangles.find((rect) => rect.stroke === 'purple');
    const wrongAnswers = rectangles.filter((rect) => rect.stroke === 'red');

    if (answer) localStorage.setItem('answer', JSON.stringify(answer));
    if (question) localStorage.setItem('question', JSON.stringify(question));
    if (wrongAnswers.length > 0)
      localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (selectedId) {
      trRef.current.nodes([stageRef.current.findOne('#' + selectedId)]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  return (
    <div key={id}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleImageDelete(id)}>Delete</button>
        <button onClick={() => setStrokeColor('red')}>
          Add Red Reactangle
        </button>
        <button onClick={() => setStrokeColor('green')}>
          Add Green Reactangle
        </button>
        <button onClick={() => setStrokeColor('purple')}>
          {' '}
          Add Purple Reactangle
        </button>
        <button onClick={handleOpenPopup}>Submit</button>
      </div>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onCancel={handleClosePopup}
        onConfirm={handleConfirmPopup}
      />
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
