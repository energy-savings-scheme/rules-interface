import React from 'react';
import {submitFeedbackFormAnalytics} from 'lib/analytics';


export default function FeedbackComponent(props) {
  return (
    <div className="nsw-section nsw-section--box nsw-bg--off-white">
      <div className="nsw-container">
        <div className="nsw-display-flex nsw-justify-content-evenly nsw-align-items-center">
          <span className="nsw-small"><b>Was this tool helpful for you today?</b></span>
          <div className="nsw-list nsw-list--8">
            <button type="button" className="nsw-button nsw-button--dark nsw-p-top-sm nsw-p-bottom-sm nsw-m-right-sm" onClick={() => {
              submitFeedbackFormAnalytics(true)
            }}>
              <span
                className="material-icons nsw-material-icons"
                focusable="false"
                aria-hidden="true"
              >
                thumb_up
              </span>
              <span>Yes</span>
            </button>
            <button type="button" className="nsw-button nsw-button--dark nsw-p-top-sm nsw-p-bottom-sm" onClick={() => {
              submitFeedbackFormAnalytics(false)
            }}>
              <span
                className="material-icons nsw-material-icons"
                focusable="false"
                aria-hidden="true"
              >
                thumb_down
              </span>
              <span>No</span>
            </button>
          </div>
          <span className="nsw-small">Your rating will help us improve the Safeguard Certificate Estimator</span>
        </div>
      </div>
    </div>
  );
}