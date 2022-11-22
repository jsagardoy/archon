import LoginButton from './LoginButton'
import React from 'react'
import SideMenu from './SideMenu'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.loginContainer}>
      <SideMenu />
      <h2>Archon</h2>
     <LoginButton />
    </div>
  )
}

export default Header
