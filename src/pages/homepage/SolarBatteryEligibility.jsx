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

export default function SolarBatteryEligibilityPage(props) {
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
        intro="Residential"
        title="Solar battery - eligibility"
      />

      <div class="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced">
                <div className="nsw-col nsw-col-md-12">
                  <p className="nsw-content-block__copy">
                    The Safeguard certificate estimator reviews eligibility for:
                    <ul>
                      <li>installation of a new residential solar battery or</li>
                      <li>signing up a solar battery to a demand response contract</li>
                    </ul>
                  </p>
                  <p className="nsw-content-block__copy">
                    Both of these activities are for residential buildings only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        class="nsw-section nsw-section--off-white"
        style={{ backgroundColor: '#F5F5F5', fontFamily: 'sans-serif' }}
      >
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-content-block__title" style={{ paddingBottom: '2%' }}>
                Check eligibility
              </h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new residential battery energy storage system"
                    headline="Install a new solar battery"
                    image="BESS1.jpg"
                    highlight
                    links={[
                      {
                        href: '/#residential-solar-battery-eligibility',
                        title: 'Check eligibility',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Sign a residential battery energy storage system up to a demand response contract"
                    headline="Sign a solar battery up to a demand response contract"
                    image="BESS2.jpg"
                    highlight
                    links={[
                      {
                        href: '/#residential-solar-battery-demand-response-eligibility',
                        title: 'Check eligibility',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h4>More options</h4>
              <br></br>

              <div class="nsw-grid nsw-grid--spaced">
                <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                  <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                    <div class="nsw-card__content null">
                      <div class="nsw-card__title">
                        <a href="#" class="nsw-card__link">
                          Back to estimator homepage
                        </a>
                      </div>
                      <span
                        class="material-icons nsw-material-icons nsw-card__icon"
                        focusable="false"
                        aria-hidden="true"
                      >
                        east
                      </span>
                    </div>
                  </div>
                </div>

                <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                  <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                    <div class="nsw-card__content null">
                      <div class="nsw-card__title">
                        <a href="/#core-eligibility" class="nsw-card__link">
                          Check core eligibility
                        </a>
                      </div>
                      <span
                        class="material-icons nsw-material-icons nsw-card__icon"
                        focusable="false"
                        aria-hidden="true"
                      >
                        east
                      </span>
                    </div>
                  </div>
                </div>

                <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                  <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                    <div class="nsw-card__content null">
                      <div class="nsw-card__title">
                        <a href="/#solar-battery-certificates" class="nsw-card__link">
                          Estimate certificates for this activity
                        </a>
                      </div>
                      <span
                        class="material-icons nsw-material-icons nsw-card__icon"
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
