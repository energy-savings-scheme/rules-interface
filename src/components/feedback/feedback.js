import { useState, useRef, useEffect } from 'react';
import {submitFeedbackFormAnalytics} from 'lib/analytics';
import './feedback.css';


export default function FeedbackComponent(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [uiSectionHeight, setUiSectionHeight] = useState(0);
  const feedbackEmail = 'sustainability@environment.nsw.gov.au'
  const uiSectionRef = useRef(null);

  useEffect(() => {
    if (uiSectionRef.current) {
      setUiSectionHeight(uiSectionRef.current.offsetHeight);
    }
  }, [uiSectionRef]);

  return (
    <>
      <section
        className={`nsw-section nsw-section--box nsw-bg--off-white feedback-container ${
          isSubmitted ? 'hide' : ''
        }`}
        ref={uiSectionRef}
      >
        <div className="display-flex">
          <div className="feedback-left-block nsw-col-md-6 nsw-m-right-xs">
            <span className="nsw-small">
              <b>Was this tool helpful for you today?</b>
            </span>
            <button
              type="button"
              className="nsw-button nsw-button--dark nsw-p-top-sm nsw-p-bottom-sm nsw-m-left-md"
              onClick={() => {
                submitFeedbackFormAnalytics(true);
                setIsSubmitted(true);
                setFeedbackMessage('Thanks for your feedback! You can also contact us on ');
              }}
            >
              <span
                className="material-icons nsw-material-icons"
                focusable="false"
                aria-hidden="true"
              >
                thumb_up
              </span>
              <span>Yes</span>
            </button>
          </div>
          <div className="feedback-right-block nsw-col-md-6 nsw-m-left-xs">
            <button
              type="button"
              className="nsw-button nsw-button--dark nsw-p-top-sm nsw-p-bottom-sm nsw-m-right-md"
              onClick={() => {
                submitFeedbackFormAnalytics(false);
                setIsSubmitted(true);
                setFeedbackMessage(
                  'Thanks for your feedback, if you would like to provide us with more details you contact us on ',
                );
              }}
            >
              <span
                className="material-icons nsw-material-icons"
                focusable="false"
                aria-hidden="true"
              >
                thumb_down
              </span>
              <span>No</span>
            </button>
            <span className="nsw-small">
              Your rating will help us improve the Safeguard Certificate Estimator
            </span>
          </div>
        </div>
      </section>
      <div
        style={{ height: uiSectionHeight }}
        className={`nsw-m-bottom-xxl ${isSubmitted ? 'hide' : ''}`}
      ></div>
      <div className={`nsw-container ${isSubmitted ? '' : 'hide'}`}>
        <p className="nsw-small">
          {feedbackMessage}
          <strong className="nsw-text-underline">{feedbackEmail}</strong>
        </p>
      </div>
    </>
  );
}