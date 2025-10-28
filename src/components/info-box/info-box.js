/**
 * 
 * @param {object} props 
 * @param {string} props.postcode
 * @param {string} props.climateZone
 * @param {string} props.brand
 * @param {string} props.model
 * @param {string} props.productClass
 * @returns 
 */
export default function InfoBox(props) {
  const { postcode, brand, model, climateZone, productClass } = props;

  return (
    <div
      class="nsw-global-alert nsw-global-alert--light js-global-alert nsw-col-lg-10"
      role="alert"
      style={{ marginBottom: '7%' }}
    >
      <div class="nsw-global-alert__wrapper">
        <div class="nsw-global-alert__content">
          <ul role="list" style={{listStyleType: "none", paddingLeft: "0"}}>
            { postcode && <li><b>Postcode: </b> {postcode}</li> }
            { climateZone && <li style={{marginTop: "1rem"}}><b>BCA Climate Zone: </b> {climateZone.charAt(climateZone.length - 1)}</li> }
            { brand && <li style={{marginTop: "1rem"}}><b>Brand: </b> {brand}</li> }
            { model && <li style={{marginTop: "1rem"}}><b>Model: </b> {model}</li> }
            { productClass && <li style={{marginTop: "1rem"}}><b>Product Class: </b> {productClass}</li> }
          </ul>
        </div>
      </div>
    </div>
  )
}
