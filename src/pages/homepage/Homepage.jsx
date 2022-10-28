import React, { Fragment, useState } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';
import ScheduleTile from './ScheduleTile';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';

export default function Homepage(props) {
  const { variables, schedules } = props;

  return (
    <Fragment>
      {/* Search section */}
      <br></br>
      <div className="nsw-layout">
        <div className="nsw-row">
          <figure
            class="nsw-media"
            style={{
              position: 'relative',
              height: '380px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              style={{ minHeight: '100%', minWidth: '100%', objectFit: 'cover' }}
              src="/LandingPageHero.jpg"
              alt="Landing page hero"
            />
          </figure>
        </div>
      </div>

      <div class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced">
                <div className="nsw-col nsw-col-md-12">
                  <h2 className="nsw-content-block__title">
                    Energy Savings Scheme and Peak Demand Reduction Scheme Certificate Estimator
                  </h2>
                  <br></br>
                  <p className="nsw-content-block__copy">
                    Use our Safeguard Certificate Estimator to check eligibility and get an idea of
                    how many Energy Savings Certificates (ESCs) and Peak Demand Reduction
                    Certificates (PRCs) your activity may qualify for. Remember, results are an
                    indication only and cannot be promoted or published.
                  </p>
                  <p className="nsw-content-block__copy">
                    The Estimator is based on the latest Energy Savings Scheme rule and Peak Demand
                    Reduction Scheme rule. To complete the certificate estimation you may need
                    product information from the IPART Product Registry, GEMS Registry or VEU
                    Product Registry.
                  </p>
                  <p className="nsw-content-block__copy">
                    If you have any questions or feedback about this tool, please contact
                    sustainability@environment.nsw.gov.au
                  </p>
                </div>
              </div>
              <br></br>
              <br></br>
              <h2 className="nsw-content-block__title">Which activity are you interested in?</h2>
            </div>
          </div>
        </div>
      </div>

      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <br></br>
              <br></br>
              <h2 className="nsw-col nsw-content-block__title">Residential</h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card headline="Air Conditioner" link="commercialac/" image="/ResidentialAC.jpg">
                    <CardCopy>
                      Install a new or replace an existing air conditioner with a high efficiency
                      air conditioner
                    </CardCopy>
                  </Card>
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card headline="Pool Pump" link="compare" image="/ResidentialPoolPumps.jpg">
                    <CardCopy>
                      Replace an existing pool pump with a high efficiency pool pump
                    </CardCopy>
                  </Card>
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Spare Refrigerator or Freezer"
                    link="compare"
                    image="/ResidentialRefrigeratorFreezer.jpeg"
                  >
                    <CardCopy>Remove a spare refrigerator or freezer</CardCopy>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>

      <section class="nsw-section nsw-section--off-white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <br></br>
              <h2 className="nsw-col nsw-content-block__title">Commercial</h2>
              <div className="nsw-grid">
                <div className="nsw-col nsw-col-md-4">
                  <Card headline="Air Conditioner" link="commercialac/" image="CommercialAC.jpeg">
                    <CardCopy>
                      Install a new or replace an existing air conditioner with a high efficiency
                      air conditioner
                    </CardCopy>
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Heat Pump Water Heater"
                    link="commercialwh/"
                    image="CommercialHeatPumpWaterHeater.jpeg"
                  >
                    <CardCopy>
                      Replace one or more existing hot water boilers or water heaters with one or
                      more air source heat pump water heater systems
                    </CardCopy>
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Refrigerated Cabinet"
                    link="compare2activities"
                    image="CommercialRefrigeratedCabinet.jpg"
                  >
                    <CardCopy>
                      Install a new high efficiency refrigerated cabinet or replace an existing
                      refrigerated cabinet
                    </CardCopy>
                  </Card>
                </div>

                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Ventilation or Refrigeration motor"
                    link="compare2activities"
                    image="CommercialVentilationRefrigeration.jpeg"
                  >
                    <CardCopy>
                      Install a new high efficiency ventilation or refrigeration motor
                    </CardCopy>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
    </Fragment>
  );
}
