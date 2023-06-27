"use client"
import FlowCardList from '@/components/FlowCardList'
import GenerateFloat from '@/components/GenerateFloat'
import LogInWX from '@/components/LogInWx';
import React, { useState } from "react";

export default function Home() {

  const [topic, setTopic] = useState('')
  const [open, setOpen] = useState(false)
  const [openLogIn, setOpenLogIn] = useState(false)

  //点击主题卡片
  const onClick = (topic) => {
    setTopic(topic)
    setOpen(v => !v)
  }

  return (
    <main className='primary overflow-y-hidden overflow-x-hidden' >
      <FlowCardList onClick={onClick} />
      <GenerateFloat open={open}
        topic={topic}
        onClose={() => { setOpen(v => !v) }}
        handleOpenLogIn={() => { setOpenLogIn(v => !v) }}
      />
      <div className='absolute bottom-4 left-4 w-fit text-labelMedium text-second  '>
        📌 每日可使用 50 次，不足可以添加下方微信申请增加<br />
        📌 功能反馈及建议，可添加微信caibao8425<br />
        📌 所有数据均不会保存到数据库，请及时保存结果到画布中
      </div>
      <LogInWX isOpen={openLogIn} onClose={() => { setOpenLogIn(v => !v) }} />
    </main>
  )
}
