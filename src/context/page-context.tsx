'use client'

import {createContext, ReactNode, useContext, useState} from "react";

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

interface PagesContextType {
    pages: Page[]
    setPages: React.Dispatch<React.SetStateAction<Page[]>>
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const PagesContext = createContext<PagesContextType | undefined>(undefined);

const firstPage: Page = {
    pageNo: 1,
    width: 1640,
    height: 924,
    backgroundColor: '#ffffff',
    elements: []
}

const PagesProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [pages, setPages] = useState<Page[]>([firstPage])
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <PagesContext.Provider value={{pages, setPages, currentPage, setCurrentPage}}>
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