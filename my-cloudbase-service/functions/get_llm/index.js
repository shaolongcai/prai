const axios = require('axios');
const EventSource = require('eventsource');

exports.main = async (event, context) => {
  // 调用接口获取 SSE 数据
  const response = await axios.post('https://api.dify.ai/v1/completion-messages', {
    inputs: {},
    query: 'Hi',
    response_mode: 'streaming',
    user: 'abc-123',
  }, {
    headers: {
      Authorization: 'Bearer app-ptXk2Da7v9ZR5OqNZIo26ucm',
      'Content-Type': 'application/json',
    },
    responseType: 'stream', // 设置响应类型为 stream，以便获取 SSE 数据
  });

  // 创建 EventSource 对象监听 SSE 数据
  const source = new EventSource(response.data);
  source.onmessage = (event) => {
    console.log('Received message:', event.data);
  };

  return 'SSE 监听已启动';
};