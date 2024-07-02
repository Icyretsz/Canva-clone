import React, {useState} from 'react';
import ShapesMenu from '@/layout/sidebar/ShapeMenu'

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


// eslint-disable-next-line react/display-name
const Button = React.memo(({ className, onClick, text }: ButtonProps) => (
    <button className={className} onClick={onClick}>{text}</button>
));

const Submenu = ({menuTitle, setIsExpanded}: SubmenuProps) => (
    <div className='flex flex-col w-88 h-full bg-white border-r-0.5 border-gray-200'>
        <div className='flex justify-between items-center border-b-0.5 border-gray-200 h-16 text-xl pl-4'>
            {menuTitle}
            <span className='cursor-pointer pr-4' onClick={() => setIsExpanded(false)}>X</span>
        </div>
        {menuTitle === 'Shape' ? <ShapesMenu/> : ''}
    </div>
);


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