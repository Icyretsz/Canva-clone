import {useDroppable} from '@dnd-kit/core';
import React from "react";

type DroppableProps = {
    id : number
    children?: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id: `droppable-${id}`,
    });

    return (
        <div ref={setNodeRef}>
            {children}
        </div>
    );
};

export default Droppable
