import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as BoltIcon } from './icons/bolt.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { ReactComponent as MessengerIcon } from './icons/messenger.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'

import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group'

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />}></NavItem>
      <NavItem icon={<BellIcon />}></NavItem>
      <NavItem icon={<MessengerIcon />}></NavItem>

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />

      </NavItem>
    </Navbar>
  );
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      <a href={props.linkTo || '#'} target={props.onBlankPage === false ? '_blank' : '_self'} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>

        <span className="icon-button">{props.leftIcon}</span>

        <p>{props.children}</p>

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >

        <div className="menu" >

          <DropdownItem
            linkTo="https://google.com" onBlankPage={true} leftIcon={<BoltIcon />}
          >
            My profile
          </DropdownItem>

          <DropdownItem
            leftIcon={<CogIcon />} rightIcon={<ChevronIcon />} goToMenu="settings"
          >
            Settings
          </DropdownItem>

          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropdownItem>
        </div>

      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >

        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>

        </div>

      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}


export default App;
