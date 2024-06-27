import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface prop  {
    type : string
    dragItemPosition : {x : number,y : number}
}

const Draggable: React.FC<prop> = ({type, dragItemPosition} : prop) => {
    const [{isDragging}, drag] = useDrag({
        type: type,
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    });

    const style = {
        position: 'absolute',
        left: `${dragItemPosition.x}px`,
        top: `${dragItemPosition.y}px`,
        cursor: 'move',
        backgroundColor: 'blue',
        height: '96px',
        width: '96px',
        opacity: isDragging ? 0 : 1
        // Additional styling here
    };


    return (
        <div ref={drag} style={style}>
            Drag me ({type})
        </div>
    );
};

export default Draggable;
