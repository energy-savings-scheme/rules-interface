import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';

export default function CommercialWH(props) {
  const { entities, variables } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      {/* Search section */}
      <br></br>
      <div className="nsw-layout">
        <div class="nsw-hero-banner nsw-hero-banner--dark">
          <div class="nsw-hero-banner__container">
            <div class="nsw-hero-banner__wrapper">
              <div class="nsw-hero-banner__box">
                <img
                  class="nsw-hero-banner__image"
                  src="/commercial_wh/WH1_Activity_Page_Hero.jpeg"
                  alt=""
                  style={{ top: '90%' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="nsw-row">
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
              style={{ minHeight: '100%', minWidth: '100%', objectFit: 'fill' }}
              src="/commercialac/HVAC2Hero.jpeg"
              alt="HVAC2 Hero"
            />
          </figure>
        </div> */}
      </div>
      <br></br>
      <div className="nsw-container">
        <div className="nsw-grid nsw-grid--spaced">
          <div className="nsw-col nsw-col-md-12">
            <h2 className="nsw-content-block__title">Commercial Heat Pump Water Heater</h2>
            <p className="nsw-content-block__copy">
              ESS Activity F16 and PDRS Activity WH1 address the replacement of one or more existing
              commercial hot water boilers or water heaters with one or more air source heat pump
              water heater systems. Electric heat pump water heaters are eligible under both schemes
              but gas heat pump water heaters are only eligible under the ESS.
            </p>
          </div>
        </div>
        <br></br>
        <div className="nsw-grid">
          <h2 className="nsw-col nsw-content-block__title">
            Which eligibility requirements would you like to check?
          </h2>
          <div className="nsw-col nsw-col-md-4">
            <Card
              headline="Review schemes base eligibility, activity requirements and estimate certificates"
              link="base_eligibility_commercialwh/"
              image="/commercialac/baseeleg.jpeg"
            >
              {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                Review schemes base eligibility, activity requirements and estimate certificates</b></p> */}
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-4">
            <Card
              headline="Check activity requirements and estimate certificates"
              link="compare"
              image="/commercialac/actelig.jpeg"
            >
              {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
            Check activity requirements and estimate certificates</b></p> */}
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-4">
            <Card
              link="certificate-estimator/"
              image="/commercialac/certlogo.jpeg"
              headline="Estimate certificates only"
            >
              {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
          Estimate certificates only</b></p> */}
            </Card>
          </div>
        </div>
      </div>
      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <br></br>
              <br></br>
              <h2 className="nsw-col nsw-content-block__title">
                Check your eligibility and estimate certificates
              </h2>
              <div class="nsw-grid">
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Review schemes base eligibility, activity requirements and estimate certificates"
                    link="base_eligibility_commercialwh/"
                    image="/commercialac/navigation_row/full_flow_card.jpeg"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Review schemes base eligibility, activity requirements and estimate certificates</b></p> */}
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Check activity requirements and estimate certificates"
                    link="compare2activities"
                    image="/commercialac/navigation_row/activity_certificates.png"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Check activity requirements and estimate certificates</b></p> */}
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Estimate certificates only"
                    link="compare2activities"
                    image="/commercialac/navigation_row/certificates_only.jpg"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Estimate certificates only</b></p> */}
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
