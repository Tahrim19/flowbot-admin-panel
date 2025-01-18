// // dark and light theme toggle. {if using modes, dont use this as tokens errors/}
// import React, { createContext, useState, useContext } from 'react';
// import { ConfigProvider , theme} from 'antd';

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [themeMode, setThemeMode] = useState('light'); // Default theme is light

//   const toggleTheme = () => {
//     setThemeMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const algorithm = themeMode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;

//   return (
//     <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>
//       <ConfigProvider theme={{ algorithm }}>
//         {children}
//       </ConfigProvider>
//     </ThemeContext.Provider>
//   );
// };



// light theme only


import React, { createContext, useContext, useState } from "react";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css"; // Ensure you include Ant Design's CSS reset.
import './index.css';


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    token: {
      fontFamily: "Poppins",
      // fontFamily: "Roboto",
      // fontFamily: "Montserrat",
      colorPrimary: "#1890ff", // Primary color
      colorBgBase: "#ffffff", // Background base
      colorTextBase: "#000000", // Text base color
      borderRadiusBase: "4px", // Border radius for components
      colorBgContainer: "#f0f2f5", // Background for containers
      hoverColor :' #1581e5',
    },
  };

  const [theme] = useState(lightTheme);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
