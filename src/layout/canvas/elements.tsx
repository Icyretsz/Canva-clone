import React from 'react';
import {Element, Page} from "@/layout/interfaces";
import {DragSourceMonitor, useDrag} from "react-dnd";

interface DragItem {
    id: string;
    pageNo: number;
    position: {
        x: number;
        y: number;
    };
}

interface ElementPositions  {
    [key: string]: {
        x: number;
        y: number;
    };
}


interface ElementsProps  {
    page : Page,
    elementPositions : ElementPositions
}

interface ElementComponentProp {
    element: Element;
    getElementStyle: (element: Element) => React.CSSProperties;
    pageNo: number;
}

const Elements = ({ page, elementPositions }: ElementsProps) => {
    const getElementStyle = (element: Element): React.CSSProperties => {
        const position = elementPositions[element.id] || element.position;
        return {
            height: `${element.size.height}px`,
            width: `${element.size.width}px`,
            backgroundColor: element.type === 'triangle' ? 'white' : element.backgroundColor,
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            borderRadius: element.type === 'circle' ? '100%' : '0',
            borderBottom: `${element.type === 'triangle' ? element.size.height : 0}px solid ${element.backgroundColor}`,
            borderLeft: `${element.type === 'triangle' ? element.size.width : 0}px solid transparent`,
            borderRight: `${element.type === 'triangle' ? element.size.width : 0}px solid transparent`,
        };
    };

    return (
        <div>
            {page.elements.map((element : Element) => (
                <ElementComponent key={element.id} element={element} getElementStyle={getElementStyle} pageNo={page.pageNo} />
            ))}
        </div>
    );
};

const ElementComponent = ({element, getElementStyle, pageNo} : ElementComponentProp) => {
    const [{isDragging}, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
        type: `element-${pageNo}`,
        item: { id: element.id, pageNo, position: {x: element.position.x, y: element.position.y} },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    let ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current !== null) {
            drag(ref.current);
        }
    }, [drag]);

    return <div ref={ref} key={element.id} style={{...getElementStyle(element), opacity: isDragging ? 0 : 1}}></div>
}
export default Elements;