import { createTheme } from '@mui/material/styles'; //正确的引入方式
// When using TypeScript 3.x and below
// import '@mui/lab/themeAugmentation';

//主题
const theme = createTheme({

    //组件
    components: {

        MuiSvgIcon: {
            styleOverrides: {

            },
            //变体
            variants: [
                {
                    props: { type: 'btnIcon' },
                    style: {
                        width: '18px',
                        height: '18px',
                    },
                },
            ],
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                }
            }
        },

        MuiButton: {
            styleOverrides: {
                //全局定制按钮样式
                root: {
                    borderRadius: '20px',
                    padding: '10px 24px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 500,
                },
                containedSecondary: {
                    color: '#0D1D2A',
                },
            },

            variants: [
                {
                    props: { variant: 'elevated' },
                    style: {
                        boxShadow: '0px 1px 2px 0px #C2C2C2FF',
                        color: '#006397',
                    },
                },
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: '#006397FF',
                        color: '#FFFFFFFF',
                        
                    },
                },
                {
                    props: { variant: 'filledTonal' },
                    style: {
                        backgroundColor: '#D4E4F6FF',
                        color: '#0D1D2AFF',
                    },
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        border: '1px solid #72787EFF',
                        color: '#006397',
                    },
                },
                //点击后？
                {
                    props: { hasIcon: 'ture' },
                    style: {
                        padding: '10px 24px 10px 16px',

                        //点击后样式继承父级
                        '&:onClick': {
                            backgroundColor: 'inherit',
                            color: 'inherit',
                        }

                    },
                },
            ],
        },
    },

    //边框
    border: '1px solid #72787EFF',

    //字体
    typography: {
        //页面大标题
        headlineLarge: {
            fontSize: '32px',
            lineHeight: '40px',
            fontWeight: 400,
        },
        //页面中标题
        headlineMedium: {
            fontSize: '28px',
            lineHeight: '36px',
            fontWeight: 400,
        },
        //页面小标题
        headlineSmall: {
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 400,
        },
        //卡片等大标题
        titleLarge: {
            fontSize: '22px',
            lineHeight: '28px',
            fontWeight: 400,
        },

        //卡片等中标题
        titleMedium: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
        },

        //卡片等小标题
        titleSmall: {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
        },

        //大标签
        labelLarge: {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
        },
        //中标签
        labelMedium: {
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: 500,
        },
        //小标签
        labelSmall: {
            fontSize: '11px',
            lineHeight: '16px',
            fontWeight: 500,
        },

        //内容文字
        bodyMedium: {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 'Regular',
        },

          //内容文字(小号)
          bodySmall: {
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: 400,
        },
    },

    color: {
        onBg: '#1A1C1EFF', //在背景上的颜色
        surface: '#FCFCFF', //中性颜色
        onSurface: '#1A1C1E', //在中性颜色上
        surfaceVariant: "#DEE3EB", //中性变体颜色
        onSurfaceVariant: "#42474E", //在中性变体颜色上
        primary: '#006397', //主题色
        second: '#51606F', //次要色
        tertiary:'#67587A', //第三色
        error: '#BA1A1A', //错误色
    },

    //调色板
    palette: {
        primary: {
            main: '#006397',
        },
        secondary: {
            main: '#D4E4F6',
        }
    },

    //组件
    //气泡框样式
    popoverPaper: {
        backgroundColor: 'rgba(0, 0, 0, 0.45);',
        color: 'white',
        padding: '8px',
        fontSize: '12px',
    },
})

export default theme