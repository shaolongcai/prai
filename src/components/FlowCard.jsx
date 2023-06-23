import React from "react";
import { Paper } from '../app/lib/mui';


function FlowCard(props) {

    const { topic, onClick } = props

    const handleClick = () => {
        console.log(topic)
        onClick(topic)
    }

    return <Paper
        className='
        box-border h-14 w-38 p-4 
        grid justify-items-center 
        flex items-center
        bg-surface
        cursor-default'
        onClick={handleClick}
        elevation={1}>
        <div className='text-onSurface text-titleSmall'>
            {topic}
        </div>
    </Paper>

}

export default FlowCard