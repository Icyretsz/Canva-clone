import React from 'react';
import {usePages} from '@/context/PageContext'
import { Page } from '../interfaces'
import Pages from './Pages'

const CanvasContainer = () => {
    const {pages, setPages} = usePages()

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

    return (

        <div className='flex flex-col justify-center gap-5'>
            <Pages/>
            <button onClick={addPage} className='w-1640 h-8 rounded-md bg-gray-400'>Add Canvas</button>
        </div>

    );
}

export default CanvasContainer;