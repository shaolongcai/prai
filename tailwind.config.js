/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Note the addition of the `app` directory.
    // '.src/app/**/*.{js,ts,jsx,tsx,mdx}', 
    // '.src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // '.src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'onBg': '#1A1C1EFF',
      'surface': '#FCFCFF',
      'onSurface': '#1A1C1E',
      'surfaceVariant': "#DEE3EB", //中性变体颜色
      'onSurfaceVariant': "#42474E", //在中性变体颜色上
      'primary': '#006397', //主题色
      'second': '#51606F', //次要色
      'tertiary': '#67587A', //第三色
      'error': '#BA1A1A', //错误色
      'secondaryContainer': '#D4E4F6', //次要容器颜色
      'onSecondaryContainer': '#0D1D2A', //在次要容器颜色上
    },
    fontSize: {
      'titleSmall': ['14px',
        {
          lineHeight: '20px',
          fontWeight: 500,
        },
      ]
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}