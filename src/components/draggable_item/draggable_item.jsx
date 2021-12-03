import React, { useState } from 'react';
import Draggable from 'react-draggable';
/**
 *
 * @param {props} component:item-box
 * @returns draggable component
 *
 * Don't modify the prop component.
 */

/**
 *
 * How to send the position to external
 * find class component
 *
 */

const DraggableItem = (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e, ui) => {
        // const { x, y } = this.state.deltaPosition;
        // this.setState({
        //     deltaPosition: {
        //         x: x + ui.deltaX,
        //         y: y + ui.deltaY,
        //     },
        // });
        setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
    };

    /**
     * [ ] parent padding + child margin -> not allowed out of the board
     * [ ] drag trigger -> d
     * [ ] updated state -> sync db
     * [ ] track delta
     *
     */

    return (
        <Draggable
            axis="both"
            bounds="parent"
            // handle=".handle"
            defaultPosition={{ x: 50, y: 50 }}
            scale={1.2}
            // onStart={() => true}  ------> mutual exclusion
            onDrag={handleDrag}
            // onStop={}  ------> notify DB
        >
            {props.children}
            {/* <div>
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
            </div> 
            */}
            {/* {component} */}
        </Draggable>
    );
};

export default DraggableItem;
