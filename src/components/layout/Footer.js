import React from 'react';

import FooterNSW, { FooterLinks, FooterLower } from 'nsw-ds-react/footer/footer';

export default function Footer() {
  return (
    <FooterNSW style={{ marginTop: '8%' }}>
      <FooterLower>
        <div className="nsw-container">
          <p>
            We pay respect to the Traditional Custodians and First Peoples of NSW, and acknowledge
            their continued connection to their country and culture.
          </p>
          <hr />
          <FooterLinks
            footerLinks={[
              {
                url: '#',
                text: 'Accessibility',
              },
              {
                url: '#',
                text: 'Copyright',
              },
              {
                url: '#',
                text: 'Disclaimer',
              },
              {
                url: '#',
                text: 'Privacy',
              },
              {
                url: '#',
                text: 'Content Sources',
              },
              {
                url: '#',
                text: 'RSS',
              },
              {
                url: '#',
                text: 'Contact Us',
              },
            ]}
          />
          <p>Copyright © 2022</p>
        </div>
      </FooterLower>
    </FooterNSW>
  );
}
