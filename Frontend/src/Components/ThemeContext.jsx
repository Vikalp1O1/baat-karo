import React, { createContext, useEffect, useState } from 'react'

const ThemeContextChange = createContext();
function ThemeContext({children}) {

    const [theme,setTheme] = useState(()=>{
      return  localStorage.getItem('chat-theme')|| 'night';
    });


    useEffect(()=>{
        localStorage.setItem('chat-theme',theme);
        document.documentElement.setAttribute("data-theme",theme);
    },[theme,setTheme])
  return (

    <ThemeContextChange.Provider  value={{theme,setTheme}}>
        {children}

    </ThemeContextChange.Provider>
    
  )
}

export default ThemeContext
export {ThemeContextChange}