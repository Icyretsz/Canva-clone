import React, {useState} from 'react';
import {usePages} from '../context/page-context'
import {DndContext, DragEndEvent} from '@dnd-kit/core';
import Draggable from '../utils/draggable'
import Droppable from '../utils/droppable'

interface Element {
    id: number;
    type: string;
    content?: string;
    src?: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    backgroundColor: string;
}

interface Page {
    pageNo: number,
    width: number,
    height: number,
    backgroundColor: string
    elements: Element[]
}

const CanvasContainer = () => {
    const {pages, setPages, currentPage, setCurrentPage} = usePages()
    const [pageHovered, setPageHovered] = useState<number>(0)

    const addPage = () => {
        const newPage: Page = {
            pageNo: pages.length + 1,
            width: 1640,
            height: 924,
            backgroundColor: '#ffffff',
            elements: [],
        }
        setPages([...pages, newPage])
    }

    const getPageStyle = (page: Page) => ({
        width: page.width,
        height: page.height,
        backgroundColor: page.backgroundColor,
        border: (page.pageNo === currentPage || pageHovered === page.pageNo) ? '2px solid black' : '',
    });

    const getElementStyle = (element: Element): React.CSSProperties => ({
        height: `${element.size.height}px`,
        width: `${element.size.width}px`,
        backgroundColor: element.backgroundColor,
        position: 'absolute',
        top: `${element.position.y}px`,
        left: `${element.position.x}px`,
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, pageNo: number) => {
        e.stopPropagation();
        setPageHovered(pageNo)
    }

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setPageHovered(0)
    }

    const handleClickOnPage = (pageNo: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCurrentPage(pageNo)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        if (over) {
            const draggableId:string = String(active.id);
            const droppableId:string = String(over.id);
            console.log(active.id)
            console.log(over.id)
            console.log('aaaa')
            const updatedPages = pages.map((page) => {
                if (page.pageNo === parseInt(droppableId.replace('droppable-', ''), 10)) {
                    console.log(page.pageNo)
                    const updatedElements = page.elements.map((element) => {
                        if (element.id === parseInt(draggableId.replace('draggable', ''), 10)) {
                            console.log(element.id)
                            return {
                                ...element,
                                position: {
                                    x: element.position.x + event.delta.x,
                                    y: element.position.y + event.delta.y
                                },
                            };
                        }
                        return element;
                    });
                    return { ...page, elements: updatedElements };
                }
                return page;
            });

            setPages(updatedPages);
        }
    };


    return (

        <div className='flex flex-col justify-center gap-5'>
            <DndContext onDragEnd={handleDragEnd}>
            {pages.map(page => (
                    <Droppable key={page.pageNo} id={page.pageNo} >
                    <div className={`shadow-md cursor-pointer relative
                ${page.pageNo === currentPage ? 'border-2 border-black' : ''}
                ${pageHovered === page.pageNo ? 'border-2 border-black' : ''}
                `}
                         style={getPageStyle(page)}
                         onClick={(e) => handleClickOnPage(page.pageNo, e)}
                         onMouseEnter={(e) => handleMouseEnter(e, page.pageNo)}
                         onMouseLeave={handleMouseLeave}
                    >
                        {page.elements.map((element) => (
                            <Draggable key={element.id} id={element.id}>
                                <div style={getElementStyle(element)}></div>
                            </Draggable>
                        ))}
                    </div>
                    </Droppable>
            ))}
            <button onClick={addPage} className='w-1640 h-8 rounded-md bg-gray-400'>Add Canvas</button>
            </DndContext>
        </div>

    );
}

export default CanvasContainer;