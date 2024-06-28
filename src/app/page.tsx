'use client'
import CanvasContainer from '@/layout/canvas/canvas-container'
import {Sidebar} from "@/layout/sidebar/sidebar";
import React, {useState} from "react";
import {usePages} from '@/context/page-context'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    const {setCurrentPage} = usePages()


    const resetCurrentPage: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setCurrentPage(0)
    }

    const canvasStylePadding = {marginLeft: isExpanded ? '352px' : ''}

    return (

        <div className='w-screen flex'>
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            <div className='w-full pt-32 pl-20 bg-gray-200'>
                <div className='fixed top-16 w-full h-16 bg-white border-b-0.5 z-50'
                     style={canvasStylePadding}
                >
                    Toolbar
                </div>
                <div className={`flex justify-center items-start pt-28 border-gray-400`}
                     style={canvasStylePadding}
                     onClick={resetCurrentPage}
                >
                    <DndProvider backend={HTML5Backend}>
                    <CanvasContainer/>
                    </DndProvider>
                </div>
            </div>
        </div>

    )
}