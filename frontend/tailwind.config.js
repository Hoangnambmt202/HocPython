/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   'xs': '360px',     // Điện thoại nhỏ (Galaxy A series, Xiaomi)
    //   'sm': '480px',     // Điện thoại phổ biến (iPhone SE, Android cỡ nhỏ)
    //   'md': '640px',     // Điện thoại trung bình
    //   'lg': '768px',     // Tablet dọc
    //   'xl': '1024px',    // Tablet ngang, laptop nhỏ
    //   '2xl': '1280px',   // Desktop
    // },
    extend: {
      boxShadow: {
        xl: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [import('@tailwindcss/typography')],
};
