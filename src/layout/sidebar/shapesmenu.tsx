import {usePages} from "@/context/page-context";
import React from "react";
import {v4 as uuidv4} from 'uuid'
import {ShapeProperty, Element} from "../interfaces"

type ShapeProperties = ShapeProperty[];

const shapeProperties: ShapeProperties = [
    {
        id: 1,
        type: 'rectangle',
        size: {
            height: 80,
            width: 80
        },
        backgroundColor: 'gray'
    },
    {
        id: 2,
        type: 'circle',
        size: {
            height: 80,
            width: 80
        },
        backgroundColor: 'gray',
        borderRadius: '100%'
    },
    {
        id: 3,
        type: 'triangle',
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
        if (shapeProperty.type === 'triangle') {
            newElement = {
                id: uuidv4(),
                type: shapeProperty.type,
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
                type: shapeProperty.type,
                borderRadius: shapeProperty.type === 'circle' ? '100%' : '0',
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
        console.log(newElement.id)
    }

    const getShapeProperties = (shape : ShapeProperty) => ({
        width: shape.size.width,
        height: shape.size.height,
        backgroundColor: shape.type === 'triangle' ? 'white' : shape.backgroundColor,
        //for circle
        borderRadius: shape.type === 'circle' ? '100%' : '0',
        //for triangle
        borderBottom: `${shape.type === 'triangle' ? shape.size.height : 0}px solid ${shape.backgroundColor}`,
        borderLeft: `${shape.type === 'triangle' ? shape.size.width : 0}px solid transparent`,
        borderRight: `${shape.type === 'triangle' ? shape.size.width : 0}px solid transparent`,
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