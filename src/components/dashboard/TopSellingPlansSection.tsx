
import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import CartBg from '../../assets/images/icons/cart-bg.png';

export default function TopSellingPlansSection() {
  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="">
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            Top Selling Plans Per Program
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            Top 3 selling plans across all programs
          </p>
        </div>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      <div className="d-flex flex-column flex-md-row mt-2 w-100 gap-3">
        <div
          className="position-relative w-100"
          style={{ backgroundColor: "#012040", borderRadius: "8px" }}
        >
          <div className="selling-plan-card p-3 d-flex flex-column">
            <h1>Travel Assistance Gold Sport</h1>
            <h2>$11,423</h2>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <p>155 Units Sold</p>
              <span>+1.5%</span>
            </div>
          </div>
          <img
            src={CartBg}
            alt="bg"
            className="position-absolute"
            style={{ bottom: 0, right: 0 }}
          />
        </div>
        <div
          className="position-relative w-100"
          style={{ backgroundColor: "#012040", borderRadius: "8px" }}
        >
          <div className="selling-plan-card p-3 d-flex flex-column">
            <h1>Second Medical Opinion Diamond</h1>
            <h2>$4,252</h2>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <p>62 Units Sold</p>
              <span style={{ backgroundColor: "#dd1d1d" }}>-2.3%</span>
            </div>
          </div>
          <img
            src={CartBg}
            alt="bg"
            className="position-absolute"
            style={{ bottom: 0, right: 0 }}
          />
        </div>
        <div
          className="position-relative w-100"
          style={{ backgroundColor: "#012040", borderRadius: "8px" }}
        >
          <div className="selling-plan-card p-3 d-flex flex-column">
            <h1>Mental Health Program Black</h1>
            <h2>$18,876</h2>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <p>247 Units Sold</p>
              <span style={{ backgroundColor: "#eefbf0" }}>+3.2%</span>
            </div>
          </div>
          <img
            src={CartBg}
            alt="bg"
            className="position-absolute"
            style={{ bottom: 0, right: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
