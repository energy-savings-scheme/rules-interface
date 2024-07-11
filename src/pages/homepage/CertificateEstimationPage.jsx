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

export default function CertificateEstimationPage(props) {
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
        intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
        title="Safeguard certificate estimator"
      />

      <div class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced" style={{ fontFamily: 'sans-serif' }}>
                <div className="nsw-col nsw-col-md-12">
                  <h2>Certificate estimation</h2>

                  <p className="nsw-content-block__copy">
                    Estimate how many certificates can be created for an activity. Activities
                    include replacing or installing new equipment or appliances which are more
                    energy efficient.
                  </p>

                  <p className="nsw-content-block__copy">You will need:</p>

                  <ul>
                    <li>the postcode of the site installation</li>
                    <li>the brand and model number of the equipment being installed.</li>
                  </ul>

                  <p className="nsw-content-block__copy">
                    Some activities may require additional technical information. Where possible,
                    this information has been pulled in from the relevant product registry. Please
                    double-check the fields to make sure they are accurate to your expected
                    equipment specifications. Please note that results are indicative only and
                    cannot be promoted or published.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-content-block__title" style={{ paddingBottom: '2%' }}>
                Residential and small business
              </h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing air conditioner with a high efficiency air conditioner"
                    headline="Air conditioner"
                    image="/ResidentialAC.jpg"
                    links={[
                      {
                        href: '/#residential-ac-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace an existing pool pump with a high efficiency pool pump"
                    headline="Pool pump"
                    image="/ResidentialPoolPumps.jpg"
                    links={[
                      {
                        href: '#residential-pool-pump-certificates',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>

                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Remove a spare refrigerator or freezer"
                    headline="Spare refrigerator or freezer"
                    image="/ResidentialFridgeFreezerRemoval.jpeg"
                    links={[
                      {
                        href: '#residential-refrigerators-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>

                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace an existing gas or electric water heater with an (air source) heat pump or solar (electric boosted) water heater"
                    headline="Hot water heater"
                    image="HotWaterTile.jpg"
                    links={[
                      {
                        href: '#hot-water-heater-certificate',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new solar battery, sign it up to a demand response contract, or do both"
                    headline="Solar battery"
                    image="SolarBattery.jpg"
                    links={[
                      {
                        href: '#solar-battery-certificates',
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

      <section class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-content-block__title" style={{ paddingBottom: '2%' }}>
                Commercial
              </h2>
              <div className="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing air conditioner with a high efficiency
      air conditioner"
                    headline="Air conditioner"
                    image="CommercialAC.jpeg"
                    links={[
                      {
                        href: '#commercial-ac-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace one or more existing hot water boilers or water heaters with one or more air source heat pump water heater systems"
                    headline="Heat pump water heater"
                    image="CommercialHeatPumpWaterHeater.jpeg"
                    links={[
                      {
                        href: '#commercial-heat-pump-water-heater-certificates',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new high efficiency refrigerated cabinet or replace an existing
      refrigerated cabinet"
                    headline="Refrigerated cabinet"
                    image="CommercialRefrigeratedCabinet.jpg"
                    links={[
                      {
                        href: '#refrigerated-cabinet-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Refrigerated Cabinet"
                    link="#refrigerated-cabinet-estimator"
                    image="CommercialRefrigeratedCabinet.jpg"
                    highlight
                  >
                    <CardCopy>
                      Install a new high efficiency refrigerated cabinet or replace an existing
                      refrigerated cabinet
                    </CardCopy>
                  </Card>
                </div> */}

                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing motor with a high efficiency motor"
                    headline="Ventilation or refrigeration motor"
                    image="CommercialVentilationRefrigeration.jpeg"
                    links={[
                      {
                        href: '#commercial-motors-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>

                <div className="nsw-col-md-12" style={{ paddingTop: '9%', width: '80%' }}>
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

                    {/* <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
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
                    </div> */}

                    <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                      <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                        <div class="nsw-card__content null">
                          <div class="nsw-card__title">
                            <a href="/#eligibility" class="nsw-card__link">
                              Check eligibility requirements
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
        </div>
      </section>
    </Fragment>
  );
}
