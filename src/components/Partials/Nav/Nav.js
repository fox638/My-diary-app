import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'


class Nav extends Component {
  render() {
    return (
      <div className="menu">
       <div className="menu__wrapper">
        <ul className="menu__list">
            <li className='menu__item'>
                <NavLink to='/' className='menu__link' activeClassName='menu__link--active'>Главная</NavLink>
            </li>
            <li className='menu__item'>
                <NavLink to='/diary' className='menu__link' activeClassName='menu__link--active'>Дневник</NavLink>
            </li>
            <li className='menu__item'>
                <NavLink to='/about' className='menu__link' activeClassName='menu__link--active'>О сайте</NavLink>
            </li>
        </ul>
       </div>
      </div>
    )
  }
}


export default Nav