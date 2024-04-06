import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
const Layout = ({children}) => {
    const location = useLocation();
    useEffect(() => {
        document.title = `Your Site | ${location.pathname}`;
      }, [location]);
  return (
    <div>{children}</div>
  )
}

export default Layout