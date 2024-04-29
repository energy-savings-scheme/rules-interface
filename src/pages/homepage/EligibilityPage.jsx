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

export default function EligibilityPage(props) {
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

      <div class="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced">
                <div className="nsw-col nsw-col-md-12">
                  <h2>Eligibility requirements</h2>

                  {/* <br></br> */}
                  <p className="nsw-content-block__copy">
                    You can check the eligibility requirements for both certificate schemes and an
                    activity.
                  </p>
                  <p className="nsw-content-block__copy">
                    Answer questions from the{' '}
                    <a
                      href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                      target="_blank"
                    >
                      Energy Savings Scheme
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                      target="_blank"
                    >
                      Peak Demand Reduction Scheme
                    </a>{' '}
                    rules to check scheme eligibility requirements and activity-specific
                    requirements.
                  </p>
                  <p className="nsw-content-block__copy">
                    Check if an activity is compliant with the scheme rules and eligible for
                    certificates.
                  </p>
                  <p className="nsw-content-block__copy">
                    Please note that the estimator is a guide and does not ensure your eligibility
                    to receive incentives. An Accredited Certificate Provider must be engaged before
                    any installation work begins.
                  </p>
                </div>
              </div>

              <h2 className="nsw-content-block__title">Check core eligibility requirements</h2>

              <p className="nsw-content-block__copy">
                Review the basic eligibility requirements for the schemes. These conditions are
                common across all activities and are required to meet compliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        class="nsw-section nsw-section"
        style={{ paddingBottom: '0px', paddingTop: '0px', fontFamily: 'sans-serif' }}
      >
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Check core eligibility"
                    link="#core-eligibility"
                    image="/iStock_000020810378_XXXLarge(optimised).jpg"
                    highlight
                  >
                    <CardCopy></CardCopy>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="nsw-section nsw-section" style={{ fontFamily: 'sans-serif' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div class="nsw-grid">
                <div className="nsw-col nsw-col-md-12">
                  <h2 className="nsw-content-block__title">Check activity specific requirements</h2>
                  <p className="nsw-content-block__copy">
                    Choose an activity below to check the scheme eligibility requirements that are
                    unique to that activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="nsw-section nsw-section--off-white"
        style={{ backgroundColor: '#F5F5F5', fontFamily: 'sans-serif' }}
      >
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
                        href: '/#residential-ac-activity-requirements',
                        title: 'Check Activity Eligibility',
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
                        href: '#pool-pumps-activity-requirements',
                        title: 'Check Activity Eligibility',
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
                        href: '#residential-refrigeration-activity-requirements',
                        title: 'Check Activity Eligibility',
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
                        href: '#hot-water-heater-eligibility',
                        title: 'Check Activity Eligibility',
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
                        href: '#solar-battery-eligibility',
                        title: 'Check Activity Eligibility',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="nsw-section nsw-section--white" style={{ fontFamily: 'sans-serif' }}>
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
                        href: '#commercial-ac-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install or replace an existing hot water boiler or heater with an air source heat pump water heater system"
                    headline="Heat pump water heater"
                    image="CommercialHeatPumpWaterHeater.jpeg"
                    links={[
                      {
                        href: '#commercial-heat-pump-water-heater-eligibility',
                        title: 'Check Activity Eligibility',
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
                        href: '#refrigerated-cabinet-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                    ]}
                  />
                </div>

                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing motor with a high efficiency motor"
                    headline="Ventilation or refrigeration motor"
                    image="CommercialVentilationRefrigeration.jpeg"
                    links={[
                      {
                        href: '#commercial-motors-activity-requirements',
                        title: 'Check Activity Eligibility',
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

                    <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                      <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                        <div class="nsw-card__content null">
                          <div class="nsw-card__title">
                            <a href="#certificate-estimation" class="nsw-card__link">
                              Estimate certificates
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
