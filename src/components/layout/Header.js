import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from 'nsw-ds-react/main-nav/mainNav';
import 'nsw-design-system/dist/css/main.css';

export default function Header(props) {
  return (
    <Fragment>
      <div className="nsw-masthead" style={{ marginBottom: 20, backgroundColor: '#ffffff' }}>
        <div className="nsw-container">
          <div className="nsw-row">
            <div className="nsw-col" style={{ padding: 'inherit' }}>
              <Link to="/" className="nsw-header__logo-link">
                <img src="/PRIMARY-nsw-logo.png" height="80" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MainNav
        navItems={[
          {
            text: 'Home',
            url: '/',
          },
          {
            text: 'Safeguard Digital Tools',
            url: '/',
          },
          {
            text: 'Energy Savings Scheme',
            url: '/',
          },
          {
            text: 'Peak Demand Reduction Scheme',
            url: '/',
          },
        ]}
      />
    </Fragment>
  );
}
