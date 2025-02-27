import React, { Fragment } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from 'nsw-ds-react/breadcrumbs/breadcrumb';

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();

  let path = {};

  if (location.pathname === '/') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for homepage"
          items={[
            {
              link: '#',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              text: 'Safeguard certificate estimator',
            },
          ]}
        />
      </div>
    );
  }

  if (location.pathname === '/core-eligibility') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for certificates"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard certificate estimator',
            },
            {
              link: '#eligibility',
              text: 'Eligibility',
            },
            {
              text: 'Core Eligibility',
            },
          ]}
        />
      </div>
    );
  }

  if (location.pathname === '/eligibility') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for eligibility"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard certificate estimator',
            },
            {
              text: 'Eligibility',
            },
          ]}
        />
      </div>
    );
  }

  if (location.pathname === '/certificate-estimation') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for eligibility"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard certificate estimator',
            },
            {
              text: 'Certificate Estimation',
            },
          ]}
        />
      </div>
    );
  }

  if (
    location.pathname === '/commercial-ac-activity-requirements' ||
    location.pathname === '/residential-ac-activity-requirements' ||
    location.pathname === '/commercial-motors-activity-requirements' ||
    location.pathname === '/residential-pool-pump-eligibility' ||
    location.pathname === '/residential-refrigeration-activity-requirements' ||
    location.pathname === '/refrigerated-cabinet-activity-requirements' ||
    location.pathname === '/commercial-water-heater-activity-requirements' ||
    location.pathname === '/electric-residential-heat-pump-activity-requirements' ||
    location.pathname === '/gas-residential-heat-pump-activity-requirements' ||
    location.pathname === '/hot-water-heater-eligibility' ||
    location.pathname === '/residential-solar-water-heater-activity-requirements' ||
    location.pathname === '/residential-solar-gas-water-heater-activity-requirements' ||
    location.pathname === '/residential-solar-battery-eligibility' ||
    location.pathname === '/solar-battery-eligibility' ||
    location.pathname === '/residential-solar-battery-demand-response-eligibility' ||
    location.pathname === '/commercial-water-heater-f17-activity-requirements' ||
    location.pathname === '/commercial-heat-pump-water-heater-eligibility' ||
    location.pathname === '/commercial-heat-pump-water-heater-new-air-source-eligibility' ||
    location.pathname === '/commercial-gas-to-heat-pump-water-heater-eligibility' ||
    location.pathname === '/commercial-new-heat-pump-water-heater-eligibility' ||
    location.pathname === '/commercial-electric-to-heat-pump-water-heater-eligibility'
  ) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for certificates"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard certificate estimator',
            },
            {
              link: '#eligibility',
              text: 'Eligibility',
            },
            {
              text: 'Activity Eligibility',
            },
          ]}
        />
      </div>
    );
  }

  if (
    location.pathname === '/residential-ac-estimator' ||
    location.pathname === '/commercial-ac-estimator' ||
    location.pathname === '/refrigerated-cabinet-estimator' ||
    location.pathname === '/residential-pool-pump-certificates' ||
    location.pathname === '/commercial-motors-estimator' ||
    location.pathname === '/residential-refrigerators-estimator' ||
    location.pathname === '/commercial-wh-estimator' ||
    location.pathname === '/electric-heat-pumps-estimator' ||
    location.pathname === '/gas-heat-pumps-estimator' ||
    location.pathname === '/hot-water-heater-certificate' ||
    location.pathname === '/residential-solar-water-heater-estimator' ||
    location.pathname === '/residential-gas-replacement-solar-water-heater-estimator' ||
    location.pathname === '/solar-battery-certificates' ||
    location.pathname === '/residential-solar-battery-certificates' ||
    location.pathname === '/residential-solar-battery-demand-response-certificates' ||
    location.pathname === '/commercial-heat-pump-water-heater-certificates' ||
    location.pathname === '/commercial-electric-to-heat-pump-water-heater-certificates' ||
    location.pathname === '/commercial-new-heat-pump-water-heater-certificates' ||
    location.pathname === '/commercial-gas-to-heat-pump-water-heater-certificates'
  ) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for certificates"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard certificate estimator',
            },
            {
              link: '#certificate-estimation',
              text: 'Certificate Estimation',
            },
            {
              text: 'Estimator',
            },
          ]}
        />
      </div>
    );
  }

  return null;
}
