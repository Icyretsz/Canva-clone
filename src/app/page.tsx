'use client'
import CanvasContainer from '@/components/canvas-container'
import {Sidebar} from "@/components/sidebar";
import {useState} from "react";
import {usePages} from '../context/page-context'

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    const {setCurrentPage} = usePages()


    const resetCurrentPage: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setCurrentPage(0)
        console.log('clicked')
    }

    const canvasStylePadding = {marginLeft: isExpanded ? '352px' : ''}

    return (

        <div className='w-screen h-screen flex'>
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            <div className='w-full pt-32 pl-20 bg-gray-200'>
                <div className='fixed top-16 w-full h-16 bg-white border-b-0.5 z-50'
                     style={canvasStylePadding}
                >
                    Toolbar
                </div>
                <div className={`flex justify-center items-start pt-28 h-full border-gray-400`}
                     style={canvasStylePadding}
                     onClick={resetCurrentPage}
                >
                    <CanvasContainer/>
                </div>
            </div>
        </div>

    )
}