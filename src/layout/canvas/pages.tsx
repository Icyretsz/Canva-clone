import { Page} from "@/layout/interfaces";
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

interface ElementPositions  {
    [key: string]: {
        x: number;
        y: number;
    };
}

const Pages = () => {
    const {pages, currentPage, setCurrentPage} = usePages()
    const [pageHovered, setPageHovered] = useState<number>(0)

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
                <PageComponent key={page.pageNo} page={page} currentPage={currentPage} pageHovered={pageHovered} getPageStyle={getPageStyle} handleClickOnPage={handleClickOnPage} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
            ))}
        </div>
    );
};

    interface PageComponentProp {
        page : Page
        currentPage : number
        pageHovered : number
        getPageStyle: (page :Page) => React.CSSProperties;
        handleClickOnPage: (pageNo: number, e: React.MouseEvent<HTMLDivElement>) => void
        handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>, pageNo: number) => void
        handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void
    }

const PageComponent = ({page, currentPage, pageHovered, getPageStyle, handleClickOnPage, handleMouseEnter, handleMouseLeave} : PageComponentProp) => {
    const [elementPositions, setElementPositions] = useState<ElementPositions>({});
    const [{canDrop, isOver}, drop] = useDrop<DragItem, unknown, { canDrop: boolean; isOver: boolean }>(() => ({
        accept: `element-${page.pageNo}`,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item, monitor) => {
            const offset = monitor.getDifferenceFromInitialOffset();

            if (offset) {
                setElementPositions(prevPositions => {
                    const initialPosition = prevPositions[item.id] || item.position;
                    return {
                    ...prevPositions,
                    [item.id]: {
                        x: initialPosition.x + offset.x,
                        y: initialPosition.y + offset.y,
                    }
                }});
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
        <div ref={ref} key={page.pageNo} className={`shadow-md cursor-pointer relative
                ${page.pageNo === currentPage ? 'border-2 border-black' : 'border-2 border-transparent'}
                ${pageHovered === page.pageNo ? 'border-2 border-black' : 'border-2 border-transparent'}
                `}
             style={getPageStyle(page)}
             onClick={(e) => handleClickOnPage(page.pageNo, e)}
             onMouseEnter={(e) => handleMouseEnter(e, page.pageNo)}
             onMouseLeave={handleMouseLeave}
        >
            <Elements page={page} elementPositions={elementPositions}/>
        </div>
    )
}

export default Pages;