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

  const esc_calculation_min_price = Math.floor(escCertificates * escMinPrice)
  const esc_calculation_max_price = Math.floor(escCertificates * escMaxPrice)
  const prc_calculation_min_price = Math.floor(prcCertificates * prcMinPrice)
  const prc_calculation_max_price = Math.floor(prcCertificates * prcMaxPrice)

  return (
    <>
      {(escCertificates > 0 || prcCertificates > 0) && (
        <div className="nsw-m-bottom-xxl">
          <h4 style={{marginBottom: '1.25rem'}}>How much is the incentive?</h4>
          <p>
            Certificate prices can change daily and this estimate is a
            guide only. The incentive will vary due to a number of factors, including:
          </p>
          <ul className="nsw-m-bottom-xl">
            <li className="nsw-m-top-0">changing certificate prices</li>
            <li className="nsw-m-top-0">business administration costs</li>
            <li className="nsw-m-top-0">travel and transportation costs</li>
            <li className="nsw-m-top-0">the model you install</li>
            <li className="nsw-m-top-0">the complexity of the installation and the need for any extra building work</li>
          </ul>

          {escCertificates > 0 && (
            <div className="nsw-container nsw-m-bottom-lg" style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Alert
                as="info"
                title={`Potential ESCs Incentives $${esc_calculation_min_price} - $${esc_calculation_max_price}*`}
                style={{ marginTop: 0 }}
              >
                <p>
                  *Actual incentive amount will vary depending on certificate pricing and
                  administrative fees
                </p>
              </Alert>
            </div>
          )}

          {prcCertificates > 0 && (
            <div className="nsw-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Alert
                as="info"
                title={`Potential PRCs Incentives $${prc_calculation_min_price} - $${prc_calculation_max_price}*`}
                style={{ marginTop: 0 }}
              >
                <p>
                  *Actual incentive amount will vary depending on certificate pricing and
                  administrative fees
                </p>
              </Alert>
            </div>
          )}
        </div>
      )}
    </>
  );
}
