"use client"
import { Drawer } from '../app/lib/mui';
import styles from './GenerateFloat.module.css'
import { TextField, Button, ButtonGroup } from '../app/lib/mui';
import React, { useState } from "react";
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'

function GenerateFloat(props) {

    const { topic, open, onClose } = props

    const [generateText, setGenerateText] = useState('')
    const isGenerate = Boolean(generateText)

    //调用接口生成文本,文本要顶格，否则无法解析markdown
    const handleGenerate = () => {
        setGenerateText(`
        前提条件：用户已经安装了该产品，并且打开了登录页面。

        用户进入登录页面，可以选择使用手机号码、邮箱或用户名进行登录。
        a. 用户选择使用手机号码登录。
        i. 用户输入手机号码。
        - 如果手机号码格式不正确，则显示错误提示信息并要求重新输入。
        - 如果手机号码格式正确，则继续下一步。
        ii. 用户点击发送验证码按钮。
        - 如果验证码发送成功，则跳转到验证码验证页面。
        - 如果验证码发送失败，则显示错误提示信息并要求重新发送验证码。
        b. 用户选择使用邮箱登录。
        i. 用户输入邮箱地址。
        - 如果邮箱地址格式不正确，则显示错误提示信息并要求重新输入。
        - 如果邮箱地址格式正确，则继续下一步。
        ii. 用户点击发送链接按钮。
        - 如果链接发送成功，则跳转到邮箱验证页面。
        - 如果链接发送失败，则显示错误提示信息并要求重新发送链接。
        c. 用户选择使用用户名登录。
        i. 用户输入用户名和密码。
        - 如果用户名或密码为空，则显示错误提示信息并要求重新输入。
        - 如果用户名和密码都不为空，则继续下一步。
        
        验证流程：
        a. 验证码验证页面：
        i. 用户输入收到的验证码，并点击确认按钮进行验证。
        - 如果验证码正确，则跳转到主页，并显示登录成功的提示信息。
        - 如果验证码不正确，则显示错误提示信息并要求重新输入验证码。
        
        b. 邮箱验证页面：
        i. 用户点击收到的链接进行验证。
        - 如果链接有效，则跳转到主页，并显示登录成功的提示信息。
        - 如果链接无效，则显示错误提示信息并要求重新发送链接。
        
        忘记密码流程：
        a. 用户点击忘记密码按钮。
        i. 用户选择通过手机号码、邮箱或用户名找回密码。
        - 如果用户选择通过手机号码找回密码，则进入手机号码验证流程。
        - 如果用户选择通过邮箱找回密码，则进入邮箱验证流程。
        - 如果用户选择通过用户名找回密码，则进入用户名验证流程。
        
        手机号码验证流程：
        a. 用户输入手机号码，并点击发送验证码按钮进行验证。
        i. 如果验证码发送成功，则跳转到验证码验证页面。
        ii. 如果验证码发送失败，则显示错误提示信息并要求重新发送验证码。
        
        邮箱验证流程：
        a. 用户输入邮箱地址，并点击发送链接按钮进行验证。
        i. 如果链接发送成功，则跳转到邮箱验证页面。
        ii. 如果链接发送失败，则显示错误提示信息并要求重新发送链接。
        
        用户名验证流程：
        a. 用户输入用户名和注册时使用的手机号码或邮箱地址，并点击确认按钮进行验证。
        i. 如果用户名和注册时使用的手机号码或邮箱地址匹配成功，则跳转到重置密码页面。
        ii. 如果用户名和注册时使用的手机号码或邮箱地址匹配失败，则显示错误提示信息并要求重新输入。`)
    }

    //生成到画布
    const handleDraw = () => {
        let pluginId = { pluginId: '*' };
        let originUrl = 'https://js.design';
        switch ('1') {
            //Figma
            case 'figma':
                pluginId = { pluginId: '*' };
                originUrl = '*';
                break;
            case 'mg':
                pluginId = {};
                originUrl = '*';
                break;
            case 'pixso':
                pluginId = {};
                originUrl = '*';
                break;
            default:
                break;
        }
        window.parent.postMessage(
            {
                pluginMessage: {
                    type: 'generateText',
                    text: generateText,
                    name: topic,
                },
                ...pluginId,
            },
            originUrl
        );
    }

    return <Drawer classes={{
        paper: styles.root,
    }}
        anchor='right'
        open={open}
        onClose={onClose}>
        <div className="relative left-4 top-4 w-80">{topic}</div>
        <div className="p-4 my-4 w-fit overflow-y-auto   min-h-[482px] whitespace-pre-wrap">
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]} > */}
            {generateText}
            {/* </ReactMarkdown> */}
        </div>
        <TextField label="Multiline"
            multiline
            maxRows={4}
            rows={4}
            variant="filled"
        />
        <ButtonGroup className="flex">
            <Button fullWidth variant="contained" color="primary" onClick={handleGenerate}>
                生成
            </Button>
            {
                isGenerate &&
                <Button fullWidth variant="outline" color="secondary" onClick={handleDraw}>
                    保存到画布
                </Button>
            }
        </ButtonGroup>
    </Drawer >
}

export default GenerateFloat;