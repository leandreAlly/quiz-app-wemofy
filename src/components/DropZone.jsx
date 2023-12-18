import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: 'IMAGE',
    drop: (item) => onDrop(item.index),
  });

  return <div ref={drop}>{children}</div>;
};

export default DropZone;
