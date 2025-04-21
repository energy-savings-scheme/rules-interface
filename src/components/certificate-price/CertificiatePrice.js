import Alert from 'nsw-ds-react/alert/alert';

export default function CertificiatePrice(props) {
  const {
    escCertificates = 0,
    prcCertificates = 0,
    escMinPrice = 0,
    escMaxPrice = 0,
    prcMinPrice = 0,
    prcMaxPrice = 0
  } = props;

  const esc_calculation_min_price = escCertificates * escMinPrice
  const esc_calculation_max_price = escCertificates * escMaxPrice
  const prc_calculation_min_price = prcCertificates * prcMinPrice
  const prc_calculation_max_price = prcCertificates * prcMaxPrice

  return (
    <>
      {(escCertificates > 0 || prcCertificates > 0) && (
        <div>
          <h4 className="nsw-m-bottom-lg">DRAFT HEADING How much is the incentive?</h4>
          <p>
            DRAFT ONLY Please note that certificate prices can changes daily and this estimate is a
            guide only. Incentives are calculated by the number of certificates multiplied by the
            certificate price, then minus administration costs.
          </p>
          <p>
            The actual incentive will vary according to fluctuating certificate prices and
            administration costs such as:
          </p>
          <ul className="nsw-m-bottom-xl">
            <li className="nsw-m-top-0">travel and transportation costs</li>
            <li className="nsw-m-top-0">the model you choose to install</li>
            <li className="nsw-m-top-0">the complexity of installation and the need for any additional building work
            </li>
          </ul>

          {escCertificates > 0 && (
            <div className="nsw-container nsw-m-bottom-md" style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="nsw-layout">
                <div className="nsw-layout__sidebar nsw-layout__sidebar--desktop">
                  <div className="nsw-docs__box nsw-docs__box--large">
                <span style={{ display: 'block', marginTop: '1rem' }}>
                  <b>ESCs Certificates {escCertificates}</b>
                </span>
                  </div>
                </div>
                <main className="nsw-layout__main">
                  <div className="nsw-docs__box nsw-docs__box--large">
                    <Alert
                      as="info"
                      title={`Potential ESCs Incentives $${Math.floor(esc_calculation_min_price)} - $${Math.floor(esc_calculation_max_price)}*`}
                      style={{ marginTop: 0 }}
                    >
                      <p>
                        * Actual incentive amount will vary depending on certificate pricing and
                        administrative fees
                      </p>
                    </Alert>
                  </div>
                </main>
              </div>
            </div>
          )}

          {prcCertificates > 0 && (
            <div className="nsw-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="nsw-layout">
                <div className="nsw-layout__sidebar nsw-layout__sidebar--desktop">
                  <div className="nsw-docs__box nsw-docs__box--large">
                <span style={{ display: 'block', marginTop: '1rem' }}>
                  <b>PRCs Certificates {prcCertificates}</b>
                </span>
                  </div>
                </div>
                <main className="nsw-layout__main">
                  <div className="nsw-docs__box nsw-docs__box--large">
                    <Alert
                      as="info"
                      title={`Potential PRCs Incentives $${Math.floor(prc_calculation_min_price)} - $${Math.floor(prc_calculation_max_price)}*`}
                      style={{ marginTop: 0 }}
                    >
                      <p>
                        * Actual incentive amount will vary depending on certificate pricing and
                        administrative fees
                      </p>
                    </Alert>
                  </div>
                </main>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
