import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useDrop} from "react-dnd";
import Draggable from './draggable'

interface prop  {
    type : string
}

const Droppable : React.FC<prop> = ({type} : prop) => {
    const [dragItemPosition, setDragItemPosition] = useState({x:0, y:0})
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: type,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item, monitor) => {
            const offset = monitor.getDifferenceFromInitialOffset();
            if (offset) {
                setDragItemPosition(prevState => ({
                    x: prevState.x + offset.x,
                    y: prevState.y + offset.y,
                }));
            }
            if (item) {
                item
            }
        }
    }))



    return (
        <div ref={drop} className="bg-blue-400 w-60 h-60 relative">

            <Draggable type={type} dragItemPosition={dragItemPosition}/>
        </div>
    );
};

export default Droppable;