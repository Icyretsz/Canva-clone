'use client'

import React, {createContext, ReactNode, useContext, useMemo, useState} from "react";
import { Page, Element } from '@/layout/interfaces'


interface PagesContextType {
    pages: Page[]
    setPages: React.Dispatch<React.SetStateAction<Page[]>>
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    selectedElement: Element
    setSelectedElement: React.Dispatch<React.SetStateAction<Element>>
}

const PagesContext = createContext<PagesContextType | undefined>(undefined);

const firstPage: Page = {
    pageNo: 1,
    width: 1640,
    height: 924,
    backgroundColor: '#ffffff',
    elements: []
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

const PagesProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [pages, setPages] = useState<Page[]>([firstPage])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedElement, setSelectedElement] = useState<Element>(initialElementState)


    const contextValue = useMemo(() => ({
        pages,
        setPages,
        currentPage,
        setCurrentPage,
        selectedElement,
        setSelectedElement
    }), [pages, currentPage, selectedElement])
    return (
        <PagesContext.Provider value={contextValue}>
            {children}
        </PagesContext.Provider>
    )
}

const usePages = () => {
    const context = useContext(PagesContext)
    if (!context) {
        throw new Error('usePages must be used within an PagesProvider')
    }
    return context;
}

export {PagesProvider, usePages}