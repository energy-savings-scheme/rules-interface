import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';
import ScheduleTile from './ScheduleTile';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { Breadcrumbs } from 'nsw-ds-react/breadcrumbs/breadcrumb';
import { HeroBanner } from 'nsw-ds-react/heroBanner/heroBanner';

import 'nsw-design-system/src/main.scss';
import '@fontsource/public-sans';
import '@fontsource/public-sans/600.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function SolarBatteryCertificatePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'homepage',
          src: '/SolarBattery.jpg',
        }}
        intro="Residential and small business"
        title="Solar battery - certificates"
      />

      <div className="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
        <div className="nsw-container">
          <div className="nsw-layout">
            <div className="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced">
                <div className="nsw-col nsw-col-md-12">
                  <p className="nsw-content-block__copy">
                    The Safeguard certificate estimator estimates certificates for installing a new battery for apartments or connecting your solar battery to a Virtual Power Plan (VPP)
                    {/* <ul>
                      <li>installation of a new residential solar battery or</li>
                      <li>
                        sign up of a solar battery to a demand response contract, often called a
                        virtual power plant (VPP)
                      </li>
                    </ul> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="nsw-section nsw-section--off-white"
        style={{ backgroundColor: '#F5F5F5', fontFamily: 'sans-serif' }}
      >
        <div className="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div className="nsw-layout">
            <div className="nsw-layout__main">
              <h2 className="nsw-content-block__title" style={{ paddingBottom: '2%' }}>
                Estimate certificates
              </h2>
              <div className="nsw-grid">
                {/* <div className="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new residential battery energy storage system"
                    headline="Install a new solar battery"
                    image="BESS1.jpg"
                    highlight
                    links={[
                      {
                        href: '#residential-solar-battery-certificates',
                        title: 'Estimate certificates',
                      },
                    ]}
                  />
                </div> */}
                <div className="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new battery for residential apartments"
                    headline="Install a new battery for apartments"
                    image="BESS3.jpg"
                    highlight
                    links={[
                      {
                        href: '#residential-apartments-battery-certificates',
                        title: 'Estimate certificates',
                      },
                    ]}
                  />
                </div>
                <div className="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Onboard a behind the meter battery with a Virtual Power Plant (VPP)"
                    headline="Sign a solar battery up to a Virtual Power Plant"
                    image="BESS2.jpg"
                    highlight
                    links={[
                      {
                        href: '#residential-solar-battery-demand-response-certificates',
                        title: 'Estimate certificates',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
        <div className="nsw-container">
          <div className="nsw-layout">
            <div className="nsw-layout__main">
              <h4>More options</h4>
              <br></br>

              <div className="nsw-grid nsw-grid--spaced">
                <div className="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                  <div className="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                    <div className="nsw-card__content null">
                      <div className="nsw-card__title">
                        <a href="#" className="nsw-card__link">
                          Back to estimator homepage
                        </a>
                      </div>
                      <span
                        className="material-icons nsw-material-icons nsw-card__icon"
                        focusable="false"
                        aria-hidden="true"
                      >
                        east
                      </span>
                    </div>
                  </div>
                </div>

                <div className="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                  <div className="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                    <div className="nsw-card__content null">
                      <div className="nsw-card__title">
                        <a href="/#core-eligibility" className="nsw-card__link">
                          Check core eligibility
                        </a>
                      </div>
                      <span
                        className="material-icons nsw-material-icons nsw-card__icon"
                        focusable="false"
                        aria-hidden="true"
                      >
                        east
                      </span>
                    </div>
                  </div>
                </div>

                <div className="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                  <div className="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                    <div className="nsw-card__content null">
                      <div className="nsw-card__title">
                        <a href="/#solar-battery-eligibility" className="nsw-card__link">
                          Review eligibility for this activity
                        </a>
                      </div>
                      <span
                        className="material-icons nsw-material-icons nsw-card__icon"
                        focusable="false"
                        aria-hidden="true"
                      >
                        east
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
