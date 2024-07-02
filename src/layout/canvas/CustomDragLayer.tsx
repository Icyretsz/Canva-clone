import { DragLayerMonitor, useDragLayer } from 'react-dnd';
import { Element } from '../interfaces';
import React from 'react';

interface CustomDragLayerProp {
    getElementStyle: (element: Element) => React.CSSProperties;
}

const CustomDragLayer: React.FC<CustomDragLayerProp> = ({ getElementStyle }) => {
    const { isDragging, currentOffset, item } = useDragLayer((monitor: DragLayerMonitor) => ({
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
        item: monitor.getItem(),
    }));

    if (!isDragging || !currentOffset || !item) {
        return null;
    }

    const { element } = item as { element: Element };

    const elementStyle: React.CSSProperties = {
        ...getElementStyle(element),
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'black',
    };

    return (
        <div
            style={{
                ...elementStyle,
                transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default CustomDragLayer;
