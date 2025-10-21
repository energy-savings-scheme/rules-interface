import { useState, useRef, useEffect } from 'react';
import { submitFeedbackFormAnalytics } from 'lib/analytics';
import { focusElement } from 'lib/helper';

export default function FeedbackComponent(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [uiSectionHeight, setUiSectionHeight] = useState(0);
  const feedbackEmail = 'sustainability@environment.nsw.gov.au';
  const uiSectionRef = useRef(null);

  useEffect(() => {
    if (uiSectionRef.current) {
      setUiSectionHeight(uiSectionRef.current.offsetHeight);
    }
  }, [uiSectionRef]);

  useEffect(() => {
    if (feedbackMessage) {
      focusElement("feedback-message");
    }
  }, [feedbackMessage])

  return (
    <>
      <section
        className="nsw-section nsw-section--box nsw-bg--off-white"
        style={{
          position: 'absolute',
          left: '0',
          width: '100vw',
          display: isSubmitted ? 'none' : 'block',
        }}
        ref={uiSectionRef}
      >
        <div role="group" style={{ display: 'flex' }}>
          <div
            className="nsw-col-md-6 nsw-m-right-xs"
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <span className="nsw-small">
              <b>Was this tool helpful for you today?</b>
            </span>
            <button
              type="button"
              className="nsw-button nsw-button--dark nsw-p-top-sm nsw-p-bottom-sm nsw-m-left-md"
              aria-describedby="help-text-rating"
              onClick={() => {
                submitFeedbackFormAnalytics(true);
                setIsSubmitted(true);
                setFeedbackMessage('Thank you for your feedback. You can also contact us on ');
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
          <div
            className="nsw-col-md-6 nsw-m-left-xs"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              className="nsw-button nsw-button--dark nsw-p-top-sm nsw-p-bottom-sm nsw-m-right-md"
              aria-describedby="help-text-rating"
              onClick={() => {
                submitFeedbackFormAnalytics(false);
                setIsSubmitted(true);
                setFeedbackMessage(
                  'Thank you for your feedback. If you would like to provide us with more details you can contact us on ',
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
            <span id="help-text-rating" className="nsw-small">
              Your rating will help us improve the Safeguard Certificate Estimator
            </span>
          </div>
        </div>
      </section>
      <div
        style={{ height: uiSectionHeight, display: isSubmitted ? 'none' : 'block' }}
        className="nsw-m-bottom-xxl"
      ></div>
      <div id="feedback-message" className="nsw-container" style={{ display: isSubmitted ? 'block' : 'none' }} tabIndex="-1">
        <p className="nsw-small">
          {feedbackMessage}
          <strong className="nsw-text-underline">{feedbackEmail}</strong>
        </p>
      </div>
    </>
  );
}
