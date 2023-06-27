import React, { useEffect, useState, useContext } from "react";
import Float from "./Float";
import PropsType from 'prop-types'
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import { v4 as uuidv4 } from 'uuid';
import { globalContext } from '../app/layout';
import style from '../styles/LogInWx.module.css'

/**
 * 微信登录框
 * @param {boolean} isOpen 登录弹窗是否开启
 * @param {func} onClose 关闭弹窗回调
 * @param {string} title 弹窗标题,默认：👀 请先登录
 */
function LogInWX(props) {

    const { onClose, isOpen, title } = props
    const [loginQrCodeUrl, setLoginQrCodeUrl] = useState('')
    const [sceneValue, setSceneValue] = useState('')
    const [OpenMessage, setOpenMessage] = useState(false)
    const context = useContext(globalContext)

    useEffect(() => {
        const sceneValue = uuidv4();
        axios.defaults.baseURL = 'https://inspiration-9g1159fid21da3f2-1314154270.ap-shanghai.app.tcloudbase.com'
        //当弹窗打开时，且没有生成二维码时，生成二维码
        if (!loginQrCodeUrl) {
            // 发送生成二维码请求,由于公众号只有一个环境
            axios({
                method: 'get',
                url: `/get_param_code`,
                params: {
                    scene: sceneValue
                }
            }).then((res) => {
                setLoginQrCodeUrl(res.data)
                setSceneValue(sceneValue) //后期可以换成匿名登录的id，使得匿名登录的id与openid绑定
            })
        }
    }, [loginQrCodeUrl])

    //通过场景值轮询判断是否登录成功
    useEffect(() => {
        if (isOpen) {
            const timer = setInterval(() => {
                axios({
                    method: 'get',
                    url: `/check_login`,
                    params: {
                        scene: sceneValue
                    }
                }).then((res) => {
                    console.log(res.data)
                    if (res.data.msg === 'success') {
                        //向缓存添加openid
                        localStorage.setItem('openid', res.data.openid)
                        context.setOpenid(res.data.openid)
                        setLoginQrCodeUrl('')
                        setOpenMessage(true)
                        onClose()
                        clearInterval(timer)
                    }
                })
            }, 2000);
            return () => {
                clearInterval(timer)
            }
        }
    }, [isOpen])


    return <div>
        <Snackbar
            open={OpenMessage}
            onClose={() => setOpenMessage(false)}
            autoHideDuration={1000}
            severity="error"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            message='✅ 登录成功'
        />
        <Float open={isOpen} title={title || '👀 请先登录'} onClose={onClose}>
            <div className={style.code}>
                <img className={style.image} src={loginQrCodeUrl} alt='生成中，请稍后'></img>
                <div className='my-2 text-labelMedium' >微信扫一扫关注公众号进行登录</div>
            </div>
        </Float>
    </div>
}

export default LogInWX;

LogInWX.propTypes = {
    isOpen: PropsType.bool, //弹窗是否打开
    onClose: PropsType.func, //关闭弹窗的回调函数
    title: PropsType.string, //弹窗标题
}