"use client"
import FlowCardList from '@/components/FlowCardList'
import GenerateFloat from '@/components/GenerateFloat'
import React, { useState } from "react";

export default function Home() {

  const [topic, setTopic] = useState('')
  const [open, setOpen] = useState(false)

  //点击主题卡片
  const onClick = (topic) => {
    setTopic(topic)
    setOpen(v => !v)
  }

  return (
    <main className='primary'>
      <FlowCardList onClick={onClick} />
      <GenerateFloat open={open} topic={topic} onClose={() => { setOpen(v => !v) }} />
    </main>
  )
}
