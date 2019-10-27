import React from 'react';
import { Link } from 'react-router-dom';
const NavSeachbar = () => {
  return (
    <nav className='blue' style={{ marginBottom: '16px' }}>
      <div className='nav-wrapper' style={{ display: 'flex' }}>
        {/* <form style={{ width: '90%' }}>
          <div className='input-field'>
            <input id='search' type='search' required />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form> */}
        <ul
          id='nav-mobile'
          className='right hide-on-med-and-down'
          style={{ marginLeft: 'auto' }}
        >
          <li>
            <Link to='/'>Todo Lists</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavSeachbar;
