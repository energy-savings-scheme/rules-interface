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

export default function HotWaterCertificatePage(props) {
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
          src: '/LandingPageHero.jpg',
        }}
        intro="Residential and small business"
        title="Hot water heater certificates"
      />

      <div class="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced">
                <div className="nsw-col nsw-col-md-12">
                  <p className="nsw-content-block__copy">
                    The Safeguard certificate estimator calculates certificates for the replacement
                    of an electric or gas water heater with:
                    <ul>
                      <li>an air source heat pump or </li>
                      <li>a solar electric-boosted water heater</li>
                    </ul>
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
                Estimate certificates
              </h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace an existing electric water heater with an (air source) heat pump water heater"
                    headline="Replace an electric water heater with a heat pump"
                    image="D17cropped,optimised).jpg"
                    highlight
                    links={[
                      {
                        href: '/#electric-heat-pumps-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace an existing gas water heater with an (air source) heat pump water heater"
                    headline="Replace a gas water heater with a heat pump"
                    image="D19(optimised).jpg"
                    highlight
                    links={[
                      {
                        href: '#gas-heat-pumps-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    headline="Replace an electric water heater with a solar water heater"
                    copy="Replace an existing electric water heater with a solar (electric boosted) water heater"
                    image="iStock-1373843137(optimised).jpg"
                    highlight
                    links={[
                      {
                        href: '#residential-solar-water-heater-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    headline="Replace a gas water heater with a solar water heater"
                    copy="Replace an existing gas water heater with a solar (electric boosted) water heater"
                    image="iStock-1322180347(optimised).jpg"
                    highlight
                    links={[
                      {
                        href: '#residential-gas-replacement-solar-water-heater-estimator',
                        title: 'Estimate Scheme Certificates',
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
                        <a href="/#hot-water-heater-eligibility" class="nsw-card__link">
                          Review eligibility for this activity
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
