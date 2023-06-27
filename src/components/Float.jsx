import React, { useEffect, useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropsType from 'prop-types'
import style from '../styles/Float.module.css'

/**
 * 弹窗
 * @param {any} children 子内容
 * @param {boolean} open 是否打开
 * @param {function} onClose 关闭回调
 * @param {string} title 弹窗标题
 * @returns 
 */
function Float(props) {

    const { title, children, open, onClose } = props
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        setIsOpen(open)
    }, [open])

    const toggleDrawer = (newOpen) => () => {
        setIsOpen(newOpen);
    };

    const Puller = styled(Box)(({ theme }) => ({
        width: 30,
        height: 6,
        backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    }));

    return (
        <SwipeableDrawer
            className={style.root}
            classes={{ paper: style.paper }}
            open={isOpen}
            anchor="bottom"
            onClose={onClose}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={56}
            disableSwipeToOpen={false}
        >
            <Box
                sx={{
                    px: 2,
                    pb: 2,
                    height: '100%',
                    overflow: 'auto',
                }}>
                <Puller />
                <div className={style.title}>
                    <Typography
                        className={style.titleText}
                        variant='titleMedium'
                        sx={{ pd: 2, color: '#1A1C1E' }}>
                        {title || '反馈缺失内容'}
                    </Typography>
                    <HighlightOffIcon className={style.close} onClick={onClose} />
                </div>
            </Box>
            {children}
        </SwipeableDrawer>
    )
}

export default Float


Float.propTypes = {
    children: PropsType.node, //弹窗的子元素
    open: PropsType.bool, //弹窗是否打开
    onClose: PropsType.func, //关闭弹窗的回调函数
    title: PropsType.string, //弹窗的标题
}