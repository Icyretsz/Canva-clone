import {useDraggable} from '@dnd-kit/core';
import React from "react";

type DraggableProps = {
    id : number
    children?: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${id}`,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            cursor: 'move',
        }
        : { cursor: 'move' };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default Draggable