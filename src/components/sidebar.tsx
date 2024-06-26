import React, {useState} from 'react';
import {usePages} from '../context/page-context'

interface ButtonProps {
    className: string,
    onClick: () => void,
    text: string,
}

interface SubmenuProps {
    menuTitle: string,
    setIsExpanded : React.Dispatch<React.SetStateAction<boolean>>,
}

interface SidebarProps {
    isExpanded: boolean,
    setIsExpanded : React.Dispatch<React.SetStateAction<boolean>>,
}

interface ShapeProperty {
    id : number,
    type: string,
    className : string
}

type ShapeProperties = ShapeProperty[];

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

const Button = ({className, onClick, text}: ButtonProps) => (
    <button className={className} onClick={onClick}>{text}</button>
);

const Submenu = ({menuTitle, setIsExpanded}: SubmenuProps) => (
    <div className='flex flex-col w-88 h-full bg-white border-r-0.5 border-gray-200'>
        <div className='flex justify-between items-center border-b-0.5 border-gray-200 h-16 text-xl pl-4'>
            {menuTitle}
            <span className='cursor-pointer pr-4' onClick={() => setIsExpanded(false)}>X</span>
        </div>
        <ShapesMenu/>
    </div>
);

const ShapesMenu = () => {
    return (
        <div className='flex justify-evenly pt-6'>
            <Shapes/>
        </div>
    )
}

const Shapes = () => {
    const {pages, setPages, currentPage} = usePages()

    const addElement = (type : string) => {
        if (currentPage === 0) return;
        const newElement : Element = {
            id: pages[currentPage - 1].elements.length + 1,
            type: type,
            position: {
                x: 500,
                y: 500,
            },
            size: {
                width: 100,
                height: 100,
            },
            backgroundColor: 'black'
        }
        setPages((prevPages) =>
            prevPages.map((page) =>
                page.pageNo === currentPage
                    ? { ...page, elements: [...page.elements, newElement] }
                    : page
            ))
        console.log(newElement.id)
    }

    const additionalClasses = 'cursor-pointer'
        return <>
            {shapeProperties.map((shapeProperty : ShapeProperty) => {
                return <div key={shapeProperty.id} className={`${shapeProperty.className} ${additionalClasses}`}
                onClick={() => addElement(shapeProperty.type)}
                ></div>
            })}
        </>
}

const shapeProperties : ShapeProperties = [
    {
        id: 1,
        type: 'rectangle',
        className: 'w-20 h-20 bg-gray-400'
    },
    {
        id: 2,
        type: 'circle',
        className: 'w-20 h-20 rounded-full bg-gray-400'
    },
    {
        id: 3,
        type: 'triangle',
        className: 'w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-gray-400'
    }
]

const Sidebar = ({isExpanded, setIsExpanded}: SidebarProps) => {
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);


    const buttonProperties = [
        {
            id: 1,
            className: 'text-xl bg-green-200 mb-2',
            text: 'Shape',
            onClick: () => {
                setSelectedMenu('Shape');
                setIsExpanded(true)
            }
        },
        {
            id: 2,
            className: 'text-xl bg-blue-200',
            text: 'Text',
            onClick: () => {
                setSelectedMenu('Text')
                setIsExpanded(true)
            }
        },

    ];

    return (
        <div className='flex fixed top-16 bottom-0'>
            <div className='h-full w-20 flex flex-col gap-6 pt-3 p-1 bg-white border-gray-200 border-r-0.5 '>
                {buttonProperties.map((buttonProperty) =>
                    <Button key={buttonProperty.id} {...buttonProperty} />
                )}
            </div>
            {isExpanded && selectedMenu && (
                <Submenu menuTitle={selectedMenu} setIsExpanded={setIsExpanded}/>
            )}
        </div>
    );
};

export {Sidebar, Button, Submenu}