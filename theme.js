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
                containedPrimary: {
                    color: '#FFFFFF',
                    backgroundColor: '#006397',
                },
                fullWidth: {
                    borderRadius: '0px',
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

        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#DEE3EB',
                    color: '#42474E',
                }
            }
        }
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
})

export default theme