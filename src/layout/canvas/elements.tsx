import React from 'react';
import {Element, Page} from "@/layout/interfaces";
import {DragSourceMonitor, useDrag} from "react-dnd";

interface prop  {
    page : Page,
    dragItemPosition : {x : number,y : number}
}

const Elements = ({ page, dragItemPosition }: prop) => {
        const [{isDragging}, drag] = useDrag({
            type: 'element',
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: !!monitor.isDragging(),
            })
        });



    const getElementStyle = (element: Element): React.CSSProperties => ({
        height: `${element.size.height}px`,
        width: `${element.size.width}px`,
        backgroundColor: element.type === 'triangle' ? 'white' : element.backgroundColor,
        position: 'absolute',
        top: `${dragItemPosition.y}px`,
        left: `${dragItemPosition.x}px`,
        borderRadius: element.type === 'circle' ? '100%' : '0',
        borderBottom: `${element.type === 'triangle' ? element.size.height : 0}px solid ${element.backgroundColor}`,
        borderLeft: `${element.type === 'triangle' ? element.size.width : 0}px solid transparent`,
        borderRight: `${element.type === 'triangle' ? element.size.width : 0}px solid transparent`,
        opacity: isDragging ? 0 : 1
    });

    return (
        <div>
            {page.elements.map((element : Element) => (
                <div ref={drag} key={element.id} style={getElementStyle(element)}></div>
            ))}
        </div>
    );
};

export default Elements;