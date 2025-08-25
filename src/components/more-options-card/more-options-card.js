import React from 'react';

export default function MoreOptionsCard(props) {
  const { options, coreEligibility } = props;
  const isCoreEligibility = coreEligibility ? coreEligibility : false;
  let defaultOptions = [
    { title: 'Back to estimator homepage', link: '#' },
    { title: 'Check core eligibility', link: '/#core-eligibility#' },
  ];
  if (isCoreEligibility) {
    defaultOptions = [
      { title: 'Estimate certificates for an activity', link: '#certificate-estimation' },
      { title: 'Check eligibility for an activity', link: '#eligibility' },
    ];
  }
  const allOptions = [...defaultOptions, ...options];

  return (
    <div className="nsw-col-md-12" style={{ paddingTop: '9%', width: '80%' }}>
      <h4>More options</h4>
      <br></br>

      <div className="nsw-grid nsw-grid--spaced">
        {allOptions.map((option) => {
          return (
            <div
              className={`nsw-col ${isCoreEligibility ? 'nsw-col-md-6' : 'nsw-col-md-4'}`}
              style={{ height: '12vw' }}
            >
              <div className="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                <div className="nsw-card__content null">
                  <div className="nsw-card__title">
                    <a href={option.link} className="nsw-card__link">
                      {option.title}
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
          );
        })}
      </div>
    </div>
  );
}
