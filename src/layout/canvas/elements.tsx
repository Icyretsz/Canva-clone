import React, {useEffect, useState} from 'react';
import {Element, Page} from "@/layout/interfaces";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {usePages} from '@/context/page-context'

interface DragItem {
    id: string;
    pageNo: number;
    position: {
        x: number;
        y: number;
    };
}


interface ElementsProps {
    page: Page,
}

interface ElementComponentProp {
    element: Element;
    getElementStyle: (element: Element) => React.CSSProperties;
    pageNo: number;
}

const Elements = ({page}: ElementsProps) => {


    const getElementStyle = (element: Element): React.CSSProperties => {

        const style: React.CSSProperties = {
            height: `${element.size.height}px`,
            width: `${element.size.width}px`,
            backgroundColor: element.type === 'triangle' ? 'white' : element.backgroundColor,
            position: 'absolute',
            top: `${element.position.y}px`,
            left: `${element.position.x}px`,
            borderRadius: element.type === 'circle' ? '100%' : '0',
        };

        if (element.type === 'triangle') {
            style.borderBottom = `${element.size.height}px solid ${element.backgroundColor}`;
            style.borderLeft = `${element.size.width}px solid transparent`;
            style.borderRight = `${element.size.width}px solid transparent`;
        }

        return style;
    };

    return (
        <div>
            {page.elements.map((element: Element) => (
                <ElementComponent key={element.id} element={element} getElementStyle={getElementStyle}
                                  pageNo={page.pageNo}/>
            ))}
        </div>
    );
};

const ElementComponent = ({element, getElementStyle, pageNo}: ElementComponentProp) => {
    const {selectedElement, setSelectedElement, setCurrentPage, setPages} = usePages()
    const [elementHovered, setElementHovered] = useState(false)
    const [{isDragging}, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
        type: `element-${pageNo}`,
        item: {id: element.id, pageNo, position: {x: element.position.x, y: element.position.y}},
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

    const handleDelete = (element : Element) => {
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


    let ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current !== null) {
            drag(ref.current);
        }
    }, [drag]);


    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            {(selectedElement.id === element.id && !isDragging) &&
                <div className='w-20 h-20'
                onClick={() => handleDelete(element)}
                >Delete element</div>
            }
            <div ref={ref} key={element.id} style={{...getElementStyle(element), opacity: isDragging ? 0 : 1}}
                 onClick={(e) => handleClickOnElement(element, e)}
                 onMouseEnter={(e) => handleMouseEnter(e)}
                 onMouseLeave={handleMouseLeave}
                 className={`${elementHovered || selectedElement.id === element.id ? 'border-2 border-black' : 'border-2 border-transparent'}`}
            ></div>
        </div>)
}
export default Elements;