import { useContext } from 'react';
import { globalContext } from '@/app/layout';

/**
 * 生成前的前置检查
 * @returns  cancelDrag 检查方法
 */
function useDragCheck() {

    const context = useContext(globalContext);

    //拖拽时的前置检查
    const preCheck = async () => {
        let checkRes = {}
        //检查是否有登录态
        if (localStorage.getItem('openid') === null) {
            checkRes.action = 'openLogin'
            checkRes.message = '未登录'
            checkRes.code = 'fail'
            return checkRes
        }
        //检查次数
        const countRes = await handleCount()
        if (countRes.code === 'fail') {
            checkRes.code = 'fail'
            checkRes.message = '😬 你今天的拖拽次数已用完，明天再来吧'
            checkRes.action = 'openMember'
            return checkRes
        }
        checkRes.code = 'success'
        checkRes.message = '次数满足'
        checkRes.quota = countRes.quota
        return checkRes
    }

    //扣减次数
    const handleCount = () => {
        //调用云函数，todo：处理faile的时候，promise
        return new Promise((resolve) => {
            const app = context.app
            app.callFunction({
                name: 'handle_quota',
                data: {
                    openid: context.openid,
                    id: id
                }
            }).then(res => {
                console.log(res)
                const quota = res.result.quota
                const msg = res.result.msg
                let countRes = {}
                if (msg === 'fail') {
                    countRes.code = 'fail'
                }
                else {
                    countRes.code = 'success'
                    countRes.quota = quota
                }
                resolve(countRes)
            })
        })
    }


    return { preCheck };
}


export default useDragCheck;