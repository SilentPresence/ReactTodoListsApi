import React from 'react';

const Navbar = () => {
  return (
    <nav className='blue' style={{ marginBottom: '16px' }}>
      <div className='nav-wrapper'>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <a href='/'>Todo Lists</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
