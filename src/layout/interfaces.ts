import React from "react";

export interface ShapeProperty {
    id : number,
    type: string,
    size: {
        width: number;
        height: number;
    };
    backgroundColor: string
    borderRadius?: string
    //for triangle
    borderBottom?: string
    borderLeft?: string
    borderRight?: string
    //for triangle
}

export interface Element {
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
    borderRadius?: string
    //for triangle
    borderBottom?: string
    borderLeft?: string
    borderRight?: string
    //for triangle
}

export interface Page {
    pageNo : number,
    width : number,
    height : number,
    backgroundColor : string
    elements : Element[]
}

export interface ButtonProps {
    className: string,
    onClick: () => void,
    text: string,
}

export interface SubmenuProps {
    menuTitle: string,
    setIsExpanded : React.Dispatch<React.SetStateAction<boolean>>,
}

export interface SidebarProps {
    isExpanded: boolean,
    setIsExpanded : React.Dispatch<React.SetStateAction<boolean>>,
}