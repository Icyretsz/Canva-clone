import {usePages} from "@/context/PageContext";
import React from "react";
import {v4 as uuidv4} from 'uuid'
import {ShapeProperty, Element} from "../interfaces"

type ShapeProperties = ShapeProperty[];

const shapeProperties: ShapeProperties = [
    {
        id: 1,
        shapeType: 'rectangle',
        size: {
            height: 80,
            width: 80
        },
        backgroundColor: 'gray'
    },
    {
        id: 2,
        shapeType: 'circle',
        size: {
            height: 80,
            width: 80
        },
        backgroundColor: 'gray',
        borderRadius: '100%'
    },
    {
        id: 3,
        shapeType: 'triangle',
        size: {
            height: 80,
            width: 40
        },
        backgroundColor: 'gray'
    }
]

const ShapesMenu = () => {
    return (
        <div className='flex justify-evenly pt-6'>
            <Shapes/>
        </div>
    )
}

const Shapes = () => {
    const { setPages, currentPage} = usePages()

    const addElement = (shapeProperty: ShapeProperty) => {
        if (currentPage === 0) return;
        let newElement: Element
        if (shapeProperty.shapeType === 'triangle') {
            newElement = {
                id: uuidv4(),
                type: 'shape',
                shapeType: shapeProperty.shapeType,
                size: {
                    width: 0,
                    height: 0
                },
                position: {
                    x: 200,
                    y: 200
                },
                backgroundColor: `${shapeProperty.backgroundColor}`,
                borderBottom: `${shapeProperty.size.height}px solid `,
                borderLeft: `${shapeProperty.size.width}px solid transparent`,
                borderRight: `${shapeProperty.size.width}px solid transparent`,
                ofPage: currentPage
            }
        } else {
            newElement = {
                id: uuidv4(),
                type: 'shape',
                shapeType: shapeProperty.shapeType,
                borderRadius: shapeProperty.shapeType === 'circle' ? '100%' : '0',
                size: {
                    width: 100,
                    height: 100,
                },
                position: {
                    x: 200,
                    y: 200,
                },
                backgroundColor: `${shapeProperty.backgroundColor}`,
                ofPage: currentPage
            }
        }
        setPages((prevPages) =>
            prevPages.map((page) =>
                page.pageNo === currentPage
                    ? {...page, elements: [...page.elements, newElement]}
                    : page
            ))
    }

    const getShapeProperties = (shape : ShapeProperty) => ({
        width: shape.size.width,
        height: shape.size.height,
        backgroundColor: shape.shapeType === 'triangle' ? 'white' : shape.backgroundColor,
        //for circle
        borderRadius: shape.shapeType === 'circle' ? '100%' : '0',
        //for triangle
        borderBottom: shape.shapeType === 'triangle' ? `${shape.size.height}px solid ${shape.backgroundColor}`: "",
        borderLeft: shape.shapeType === 'triangle' ? `${shape.size.width}px solid transparent`: "",
        borderRight: shape.shapeType === 'triangle' ? `${shape.size.width}px solid transparent`: "",
    })


    return <>
        {shapeProperties.map((shape: ShapeProperty) => {
            return <div key={shape.id} className='cursor-pointer' style={getShapeProperties(shape)}
                        onClick={() => addElement(shape)}
            ></div>
        })}
    </>
}

export default ShapesMenu