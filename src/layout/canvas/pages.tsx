import {Element, Page} from "@/layout/interfaces";
import {usePages} from '@/context/page-context'
import Elements from './elements'

import React, {useState} from 'react';
import {useDrop} from "react-dnd";

interface DragItem {
    id: string;
    pageNo: number;
    position: {
        x: number;
        y: number;
    };
}

interface ElementPositions {
    [key: string]: {
        x: number;
        y: number;
    };
}

const initialElementState: Element = {
    id: '',
    type: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 0,
        height: 0,
    },
    backgroundColor: '',
    ofPage: 0,
};

const Pages = () => {
    const {pages, currentPage, setCurrentPage, setSelectedElement} = usePages()


    const handleClickOnPage = (pageNo: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCurrentPage(pageNo)
        setSelectedElement(initialElementState)
    }

    const getPageStyle = (page: Page) => ({
        width: page.width,
        height: page.height,
        backgroundColor: page.backgroundColor,
        border: page.pageNo === currentPage ? '2px solid black' : '',
    });


    return (
        <div className='flex flex-col justify-center gap-5'>
            {pages.map((page: Page) => (
                <PageComponent key={page.pageNo} page={page} currentPage={currentPage} getPageStyle={getPageStyle}
                               handleClickOnPage={handleClickOnPage}/>
            ))}
        </div>
    );
};

interface PageComponentProp {
    page: Page
    currentPage: number
    getPageStyle: (page: Page) => React.CSSProperties;
    handleClickOnPage: (pageNo: number, e: React.MouseEvent<HTMLDivElement>) => void
}

const PageComponent = ({page, currentPage, getPageStyle, handleClickOnPage}: PageComponentProp) => {
    const {setPages} = usePages()
    const [{canDrop, isOver}, drop] = useDrop<DragItem, unknown, { canDrop: boolean; isOver: boolean }>(() => ({
        accept: `element-${page.pageNo}`,
        drop: (item, monitor) => {
            const offset = monitor.getDifferenceFromInitialOffset();

            if (offset) {
                setPages(prevPages => {
                    return prevPages.map(page => ({
                        ...page,
                        elements: page.elements.map(element => {
                            if (element.id === item.id) {
                                const initialPosition = element.position;
                                return {
                                    ...element,
                                    position: {
                                        x: initialPosition.x + offset.x,
                                        y: initialPosition.y + offset.y,
                                    }
                                };
                            }
                            return element;
                        })
                    }));
                })
            }
        }
    }))

    let ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current !== null) {
            drop(ref.current);
        }
    }, [drop]);

    return (
        <div ref={ref} key={page.pageNo} className={`shadow-md relative
                ${page.pageNo === currentPage ? 'border-2 border-black' : 'border-2 border-transparent'}
                `}
             style={getPageStyle(page)}
             onClick={(e) => handleClickOnPage(page.pageNo, e)}
        >
            <Elements page={page}/>
        </div>
    )
}

export default Pages;