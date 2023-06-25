"use client"
import React, { useState, useContext, useEffect, useCallback } from "react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from "@mui/material/ButtonGroup";
import { globalContext } from '../app/layout';
const EventSource = require('eventsource');
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

function GenerateFloat(props) {

    const { topic, open, onClose } = props

    const [generateText, setGenerateText] = useState('')
    const [value, setValue] = useState('按照场景生成流程')
    const isGenerate = Boolean(generateText)
    const context = useContext(globalContext);
    const [loading, setLoading] = useState(false)

    //调用接口生成文本,文本要顶格，否则无法解析markdown
    const handleGenerate = () => {
        if (loading) return
        setLoading(true)
        // 创建一个新的AbortController
        const controller = new AbortController();
        const signal = controller.signal;
        const source = new EventSource('https://service-ghvb1lfs-1314154270.jp.apigw.tencentcs.com/release/get_llm', { signal });
        // 设置重连时间（毫秒）
        source.reconnectInterval = 30000; 
        let msg = ''
        source.onmessage = (event) => {
            // console.log('Received message:', event.data);
            //移除"data:"前缀
            const jsonStr = event.data.replace(/^data:\s*/, '');
            const data = JSON.parse(jsonStr)
            const answer = decodeURIComponent(data.answer.replace(/\uff1f/g, '?'));
            console.log('回答：', answer)
            msg += answer
            setGenerateText(msg)
        };

        source.onerror = (error) => {
            console.info('结束');
            setLoading(false)
            source.close();
        };
    }

    useEffect(() => {
        return () => {
            setGenerateText('')
        }
    }, [topic])

    //生成到画布
    const handleDraw = () => {
        const msg = {
            type: 'generateText',
            text: generateText,
            name: topic,
        }
        context.postMsg(msg)
    }

    return <Drawer classes={{
        paper: "w-[400px] bg-bg", // 使用tailwind复写MUI组件样式的办法
    }}
        anchor='right'
        open={open}
        onClose={onClose}>
        <div className="flex h-12 p-4  w-80  text-titleMedium">{topic}</div>
        <div className="p-4  w-fit overflow-y-auto   min-h-[69.6%] whitespace-pre-wrap text-bodySmall">
            <ReactMarkdown remarkPlugins={[remarkGfm]} >
            {generateText}
            </ReactMarkdown>
        </div>
        <TextField
            label="额外要求"
            multiline
            rows={4}
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <ButtonGroup className="flex">
            <Button disabled={loading} fullWidth variant="contained" onClick={handleGenerate}>
                {loading ? '生成中...' : '生成'}
            </Button>
            {
                isGenerate &&
                <Button fullWidth variant="filledTonal" color="secondary" onClick={handleDraw}>
                    保存到画布
                </Button>
            }
        </ButtonGroup>
    </Drawer >
}

export default GenerateFloat;