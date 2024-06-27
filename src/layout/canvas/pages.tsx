import {Page} from "@/layout/interfaces";
import {usePages} from '../../context/page-context'
import Elements from './elements'

import React, {useState} from 'react';
import {useDrop} from "react-dnd";

const Pages = () => {
    const {pages, setPages, currentPage, setCurrentPage} = usePages()
    const [pageHovered, setPageHovered] = useState<number>(0)

    const [dragItemPosition, setDragItemPosition] = useState({x:0, y:0})
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "element",
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
        }
    }))


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

    const getPageStyle = (page: Page) => ({
        width: page.width,
        height: page.height,
        backgroundColor: page.backgroundColor,
        border: (page.pageNo === currentPage || pageHovered === page.pageNo) ? '2px solid black' : '',
    });


    return (
        <div className='flex flex-col justify-center gap-5'>
            {pages.map((page: Page) => (
            <div ref={drop} key={page.pageNo} className={`shadow-md cursor-pointer relative
                ${page.pageNo === currentPage ? 'border-2 border-black' : ''}
                ${pageHovered === page.pageNo ? 'border-2 border-black' : ''}
                `}
                 style={getPageStyle(page)}
                 onClick={(e) => handleClickOnPage(page.pageNo, e)}
                 onMouseEnter={(e) => handleMouseEnter(e, page.pageNo)}
                 onMouseLeave={handleMouseLeave}
            >
                <Elements page={page} dragItemPosition={dragItemPosition}/>
            </div>))}
        </div>
    );
};

export default Pages;