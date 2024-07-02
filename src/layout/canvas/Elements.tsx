import React, {useEffect, useState} from 'react';
import {Element, Page} from "@/layout/interfaces";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {usePages} from '@/context/PageContext'
import {getEmptyImage} from "react-dnd-html5-backend";
import CustomDragLayer from "@/layout/canvas/CustomDragLayer";

interface DragItem {
    id: string;
    pageNo: number;
    position: {
        x: number;
        y: number;
    };
    element : Element
}

interface ElementsProps {
    page: Page,
}

interface ElementComponentProp {
    element: Element;
    getElementStyle: (element: Element) => React.CSSProperties;
    pageNo: number;
}

// eslint-disable-next-line react/display-name
const Elements = React.memo(({page}: ElementsProps) => {

    const getElementStyle = (element: Element): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            position: 'absolute',
            top: `${element.position.y}px`,
            left: `${element.position.x}px`,
        };

        if (element.shapeType === 'triangle') {
            return {
                ...baseStyle,
                width: 0,
                height: 0,
                borderLeft: `${element.size.width / 2}px solid transparent`,
                borderRight: `${element.size.width / 2}px solid transparent`,
                borderBottom: `${element.size.height}px solid ${element.backgroundColor}`,
            };
        }

        return {
            ...baseStyle,
            width: `${element.size.width}px`,
            height: `${element.size.height}px`,
            backgroundColor: element.backgroundColor,
            borderRadius: element.shapeType === 'circle' ? '100%' : '0',
        };
    };

    return (
        <div>
            {page.elements.map((element: Element) => (
                <DraggableComponent key={element.id} element={element} getElementStyle={getElementStyle}
                                    pageNo={page.pageNo}/>
            ))}
        </div>
    );
});

const DraggableComponent = ({element, getElementStyle, pageNo}: ElementComponentProp) => {
    const {selectedElement, setSelectedElement, setCurrentPage, setPages} = usePages()
    const [elementHovered, setElementHovered] = useState(false)
    const [{isDragging}, drag, dragPreview] = useDrag<DragItem, unknown, { isDragging: boolean }>({
        type: `element-${pageNo}`,
        item: {id: element.id, pageNo, position: {x: element.position.x, y: element.position.y}, element},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        })
    });


    useEffect(() => {
        if (isDragging) {
            setSelectedElement(element)
        }
    }, [isDragging])

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setElementHovered(true)
    }

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setElementHovered(false)
    }

    const handleClickOnElement = (element: Element, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedElement(element)
        setCurrentPage(0)
    }

    const handleDelete = (element: Element) => {
        setPages(prevPages => {
            return prevPages.map(page => {
                const newElementArray = page.elements.filter(elements => elements.id !== element.id);
                return {
                    ...page,
                    elements: newElementArray
                };
            });
        });
    };

    useEffect(() => {
        dragPreview(getEmptyImage(), {captureDraggingState: true});
    }, []);

    let ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current !== null) {
            drag(ref.current);
        }
    }, [drag]);



    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            {(selectedElement.id === element.id && !isDragging) &&
                <div className='w-20 h-20 border-2 border-black cursor-pointer'
                     onClick={() => handleDelete(element)}
                >Delete element</div>
            }
            <CustomDragLayer getElementStyle={getElementStyle}/>
            <div ref={ref} key={element.id} style={{...getElementStyle(element), opacity: isDragging ? 0 : 1}}
                 onClick={(e) => handleClickOnElement(element, e)}
                 onMouseEnter={(e) => handleMouseEnter(e)}
                 onMouseLeave={handleMouseLeave}
            >{elementHovered || selectedElement.id === element.id ? <SelectIndicator element={element}/> : ''}</div>
        </div>)
}

export const SelectIndicator : React.FC<{ element: Element }> = ({element}) => {
    return (
        <div style = {{backgroundColor: 'transparent',
            width: `${element.size.width}px`,
            height: `${element.size.height}px`,
            borderWidth: '2px',
            borderColor: 'black',
            borderStyle: 'solid',
            position: element.shapeType === 'triangle' ? 'absolute' : 'inherit',
            top: element.shapeType === 'triangle' ? '50%' : '',
            left: element.shapeType === 'triangle' ? '50%' : '',
            transform: element.shapeType === 'triangle' ? 'translate(-50%, 0)' : 'none',}}></div>
    )
}

export default Elements;
