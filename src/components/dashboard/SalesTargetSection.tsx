import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import DoughnutChart from '../DoughnutChart';

export default function SalesTargetSection() {
  return (
    <div className="p-3 bg-white mx-3 rounded-2">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="">
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            Sales Target Completion
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            Track progress toward annual sales targets by program
          </p>
        </div>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      <div className="d-flex flex-column flex-xl-row gap-2 justify-content-start align-items-start w-100 mt-3">
        <div className="rounded-2 p-3 d-flex flex-column align-items-start justify-content-center top-sales-target bg-sales-target">
          <div className="d-flex w-100 justify-content-between align-items-center mb-2">
            <span style={{ fontWeight: "600" }}>Total Sales Target</span>
            <span style={{ fontWeight: "600" }}>80%</span>
          </div>
          <div className="progress w-100 mb-2 progress-sales-target">
            <div 
              className="progress-bar progress-bar-sales-target"
              role="progressbar"
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="d-flex w-100 justify-content-between sales-target-labels">
            <span>0K</span>
            <span>100K</span>
          </div>
        </div>
        <div className="row w-100 ms-xl-2 mx-0">
          <div className="col-12 col-md-6 col-xl-3 border">
            <div className="trip-card d-flex align-items-center justify-content-start gap-3">
              <DoughnutChart 
                percentage={83}
                primaryColor="#7ac142"
                textColor="#7ac142"
                backgroundColor="#f0f2f4"
                size={52}
                cutout="80%"
                animationDuration={1000}
                showTooltips={false}
              />
              <div>
                <div className="trip-title">Short Trip</div>
                <div>
                  <span className="trip-amount">$25K</span>
                  <span className="trip-total">/$30K</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 border">
            <div className="trip-card d-flex align-items-center justify-content-start gap-3">
              <DoughnutChart 
                percentage={96}
                primaryColor="#7ac142"
                textColor="#7ac142"
                backgroundColor="#f0f2f4"
                size={52}
                cutout="80%"
                animationDuration={1000}
                showTooltips={false}
              />
              <div>
                <div className="trip-title">Student Trip</div>
                <div>
                  <span className="trip-amount">$29K</span>
                  <span className="trip-total">/$30K</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 border">
            <div className="trip-card d-flex align-items-center justify-content-start gap-3">
              <DoughnutChart 
                percentage={95}
                primaryColor="#7ac142"
                textColor="#7ac142"
                backgroundColor="#f0f2f4"
                size={52}
                cutout="80%"
                animationDuration={1000}
                showTooltips={false}
              />
              <div>
                <div className="trip-title">Yearly Multi Trip</div>
                <div>
                  <span className="trip-amount">$19K</span>
                  <span className="trip-total">/$20K</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 border">
            <div className="trip-card d-flex align-items-center justify-content-start gap-3">
              <DoughnutChart 
                percentage={35}
                primaryColor="#e74c3c"
                textColor="#e74c3c"
                backgroundColor="#f0f2f4"
                size={52}
                cutout="80%"
                animationDuration={1000}
                showTooltips={false}
              />
              <div>
                <div className="trip-title">Long Stay Trips</div>
                <div>
                  <span className="trip-amount">$7K</span>
                  <span className="trip-total">/$20K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
