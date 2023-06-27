// 平台切换工具会修改该值
const platformType = 'jsDesign';
//平台，默认即时设计 platform
let platform = null;
//默认高度，蓝湖 640  即时设计 600  Figma 600
let plaHeight = 700;
let url = 'https://inspiration-9g1159fid21da3f2-1314154270.tcloudbaseapp.com/componentsJsMay29/';
switch (platformType) {
  //蓝湖
  case 'mg':
    // eslint-disable-next-line no-undef
    platform = mg;
    plaHeight = 740;
    url =
      'https://inspiration-9g1159fid21da3f2-1314154270.tcloudbaseapp.com/componentsMgMay29/index.html#/';
    break;
  case 'pixso':
    // eslint-disable-next-line no-undef
    platform = pixso;
    plaHeight = 700;
    // eslint-disable-next-line no-unused-vars
    url =
      'https://inspiration-9g1159fid21da3f2-1314154270.tcloudbaseapp.com/figma/index.html#/';
    break;
  default:
    // eslint-disable-next-line no-undef
    platform = jsDesign;
    break;
}


//正式
// platform.showUI(`<script >window.location.href = "${url}"</script>`, { width: 360, height: plaHeight });

//开发
platform.showUI(`<script>window.location.href = "http://localhost:3000/out "</script>`, {
  width: 800,
  height: plaHeight,
});

//生成流程到画布
platform.ui.onmessage = msg => {
  const type = platformType === 'mg' ? msg.pluginMessage.type : msg.type
  switch (type) {
    case 'generateText':
      generateText(msg)
      break;
    default:
      break;
  }
};

const generateText = (msg) => {
  console.log('msg',msg)
  //生成一个矩形
  const frame = platform.createFrame()
  frame.name = msg.name
  // frame.resize(458, 682)
  frame.layoutMode = "VERTICAL"
  frame.primaryAxisSizingMode = "AUTO"
  frame.counterAxisSizingMode = "AUTO"
  frame.layoutGrow = 1
  frame.x = platform.viewport.center.x
  frame.y = platform.viewport.center.y
  frame.effects = [
    {
      "type": "DROP_SHADOW",
      "color": {
        "r": 0,
        "g": 0,
        "b": 0,
        "a": 0.25
      },
      "offset": {
        "x": 0,
        "y": 2
      },
      "radius": 4,
      "spread": 0,
      "visible": true,
      "blendMode": "NORMAL",
      "showShadowBehindNode": false
    }
  ]
  frame.fills = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 1,
        "g": 0.8509803921568627,
        "b": 0.4
      }
    }
  ]
  frame.cornerRadius = 4
  drawText(frame, msg.text)
}

const drawText = (frame, content) => {
  const text = platform.createText()
  text.characters = content
  text.textAutoResize = "HEIGHT"
  frame.appendChild(text)
}