"use client"
import { globalContext } from '../app/layout';
import FlowCard from "./FlowCard"
import Grid from '@mui/material/Unstable_Grid2'
import { useContext, useEffect, useState } from "react";

function FlowCardList(props) {

    const { onClick } = props
    const context = useContext(globalContext);
    const [topics, setTopics] = useState([])

    //请求数据库
    useEffect(() => {
        const fetch = async () => {
            const db = context.app.database()
            const res = await db.collection('topics').where({}).get()
            setTopics(res.data)
        }
        if (context.app) fetch()
    }, [context.app])


    return (
        <Grid
            className="p-4 "
            container spacing={2} justifyContent="flex-start">
            {topics.map((topic, index) => (
                <Grid item="true" xs={3} key={index}>
                    <FlowCard onClick={onClick} topic={topic.name} />
                </Grid>
            ))}
        </Grid>
    )
}

export default FlowCardList