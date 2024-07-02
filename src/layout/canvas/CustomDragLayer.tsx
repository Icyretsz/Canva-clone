import { DragLayerMonitor, useDragLayer } from 'react-dnd'

const CustomDragLayer: React.FC = () => {

    const {isDragging, currentOffset, item} = useDragLayer(
        (monitor: DragLayerMonitor) => {
            return {
                isDragging: monitor.isDragging(),
                currentOffset: monitor.getSourceClientOffset(),
                item: monitor.getItem()
            };
        }
    );

    return isDragging && currentOffset
        ? <div style={{
            // functional
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',

            // design only

            width: '100px',
            height: '100px',

            backgroundColor: 'gray'
        }}>
        </div>
        : null;
};

export default CustomDragLayer;