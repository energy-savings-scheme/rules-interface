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
    }, [])

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
        title="Safeguard Certificate Estimator"
      />

      <div class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced" style={{ fontFamily: 'sans-serif' }}>
                <div className="nsw-col nsw-col-md-12">
                  <h2>Eligibility Requirements</h2>

                  {/* <br></br> */}
                  <p className="nsw-content-block__copy">
                  Answer questions directly from the rules to check scheme eligibility requirements and activity-specific requirements. 
                  </p>
                  <p className="nsw-content-block__copy">
                  Explanations are provided when the eligibility requirements for a scheme or for a particular activity are not met.

                  </p>

                </div>
              </div>

              <h2 className="nsw-content-block__title">Check core eligibility requirements</h2>

                    <p className="nsw-content-block__copy">
                    Check the basic core scheme eligibility requirements which are common across all activities.
                    </p>

            </div>
          </div>
        </div>
      </div>

      <section class="nsw-section nsw-section" style={{paddingBottom: '0px', paddingTop: '0px'}}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Check core eligibility requirements"
                    link="#base-eligibility"
                    image="/ResidentialPoolPumps.jpg"
                    highlight
                  >
                    <CardCopy>
                    Check what the schemes core eligibility requirements are
                    </CardCopy>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="nsw-section nsw-section">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div class="nsw-grid">
              <div className="nsw-col nsw-col-md-12">

              <h2 className="nsw-content-block__title">Check activity specific requirements</h2>
                <p className="nsw-content-block__copy">
                Choose an activity below to check the scheme eligibility requirements that are unique to this activity.
                </p>

              </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-content-block__title" style={{paddingBottom: '2%'}}>Residential and Small Business</h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing air conditioner with a high efficiency air conditioner"
                    headline="Air Conditioner"
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
                    headline="Pool Pump"
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
                    headline="Spare Refrigerator or Freezer"
                    image="/ResidentialFridgeFreezerRemoval.jpeg"
                    links={[
                      {
                        href: '#residential-refrigeration-activity-requirements',
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

      <section class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-content-block__title" style={{paddingBottom: '2%'}}>Commercial</h2>
              <div className="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing air conditioner with a high efficiency
      air conditioner"
                    headline="Air Conditioner"
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
                    copy="Replace one or more existing hot water boilers or water heaters with one or
          more air source heat pump water heater systems"
                    headline="Heat Pump Water Heater"
                    image="CommercialHeatPumpWaterHeater.jpeg"
                    links={[
                      {
                        href: '#commercial-water-heater-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                    ]}
                  />
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new high efficiency refrigerated cabinet or replace an existing
      refrigerated cabinet"
                    headline="Refrigerated Cabinet"
                    image="CommercialRefrigeratedCabinet.jpg"
                    links={[
                      {
                        href: '#refrigerated-cabinet-activity-requirements',
                        title: 'Check Activity Eligibility',
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
                    headline="Ventilation or Refrigeration motor"
                    image="CommercialVentilationRefrigeration.jpeg"
                    links={[
                      {
                        href: '#commercial-motors-activity-requirements',
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
      
    </Fragment>
  )
}