"use client"
import React, { useState, useContext, useEffect, useRef } from "react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from "@mui/material/ButtonGroup";
import { globalContext } from '../app/layout';
import EventSource from "eventsource";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import styles from '../styles/GenerateFloat.module.css'

function GenerateFloat(props) {

    const { topic, open, onClose, handleOpenLogIn } = props

    const [message, setMessage] = useState('')
    const [value, setValue] = useState('按照场景生成流程')
    const isGenerate = Boolean(message)
    const context = useContext(globalContext);
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null);

    //调用接口生成文本
    const handleGenerate = () => {

        //检查是否登录
        if (false) {
            handleOpenLogIn()
            return
        }

        const queryParams = new URLSearchParams({
            scene: topic, //主题
            tips: value, //额外要求
            openid: '123'
        });

        if (loading) return
        setLoading(true)
        // 创建一个新的AbortController
        const controller = new AbortController();
        const signal = controller.signal;
        const source = new EventSource(`https://service-ghvb1lfs-1314154270.jp.apigw.tencentcs.com/release/get_llm?${queryParams}`, { signal });
        // 设置重连时间（毫秒）
        source.reconnectInterval = 30000;
        let msg = ''
        source.onmessage = (event) => {
            //移除"data:"前缀
            const jsonStr = event.data.replace(/^data:\s*/, '');
            const data = JSON.parse(jsonStr)
            const answer = decodeURIComponent(data.answer.replace(/\uff1f/g, '?'));
            msg += answer
            setMessage(msg)
        };

        source.onerror = (error) => {
            console.info('结束');
            setLoading(false)
            source.close();
        };
    }

    useEffect(() => {
        return () => {
            setMessage('')
            setValue('按照场景生成流程')
        }
    }, [topic])

    //生成到画布
    const handleDraw = () => {
        const msg = {
            type: 'generateText',
            text: message,
            name: topic,
        }
        context.postMsg(msg)
    }

    //滚动到底部
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    return <Drawer classes={{
        paper: "w-[400px] bg-bg", // 使用tailwind复写MUI组件样式的办法
    }}
        anchor='right'
        open={open}
        onClose={onClose}>
        <div className="flex h-12 p-4  w-80  text-titleMedium">{topic}</div>
        <div className="p-4  w-fit overflow-y-auto min-w-[400px]   min-h-[69.6%] whitespace-pre-wrap text-bodySmall">
            <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.markdown} >
                {message}
            </ReactMarkdown>
            <div style={{ height: '0px' }} ref={messagesEndRef} ></div>
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