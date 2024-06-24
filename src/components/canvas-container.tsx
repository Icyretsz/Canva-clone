import React, {useState} from 'react';
import {usePages} from '../context/page-context'

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
    pageNo : number,
    width : number,
    height : number,
    backgroundColor : string
    elements : Element[]
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
        border: (page.pageNo === currentPage || pageHovered === page.pageNo) ? '2px solid black' : ''
    });

    const handleMouseEnter = (e : React.MouseEvent<HTMLDivElement>, pageNo : number) => {
        e.stopPropagation();
        setPageHovered(pageNo)
    }

    const handleMouseLeave:React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setPageHovered(0)
    }

    const handleClickOnPage = (pageNo: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCurrentPage(pageNo)
    }


    return (
        <div className='flex flex-col justify-center gap-5'>
            {pages.map(page => (
                <div key={page.pageNo} className= {`shadow-md cursor-pointer relative 
                ${page.pageNo === currentPage ? 'border-2 border-black' : ''}
                ${pageHovered === page.pageNo ? 'border-2 border-black': ''}
                `}
                style={getPageStyle(page)}
                     onClick={(e) => handleClickOnPage(page.pageNo, e)}
                     onMouseEnter={(e) => handleMouseEnter(e, page.pageNo)}
                     onMouseLeave={handleMouseLeave}
                >
                    {page.elements.map((element) => (
                        <div
                            key={element.id}
                            style={{
                                height: `${element.size.height}px`,
                                width: `${element.size.width}px`,
                                backgroundColor: element.backgroundColor,
                                position: 'absolute', // Ensures the element is positioned correctly within the page
                                top: `${element.position.y}px`,
                                left: `${element.position.x}px`,
                            }}></div>))}
                </div>
            ))}
            <button onClick={addPage} className='w-1640 h-8 rounded-md bg-gray-400'>Add Canvas</button>
        </div>
    );
}


export default CanvasContainer;