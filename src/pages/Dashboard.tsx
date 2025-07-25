function Dashboard() {
    return (<>
        <div className="d-flex justify-content-start justify-content-md-between align-items-start align-items-md-center p-3 flex-column flex-md-row gap-2">
          <div className="">
            <h5 className="p-0 m-0" style={{"fontWeight": 600, "fontSize": "18px"}}>
              Dashboard
            </h5>
            <p className="p-0 m-0" style={{"color": "#4b647e", "fontSize": "13px"}}>
              Monitor key performance of Product and Agency sales
            </p>
          </div>
          <div className="d-flex gap-3 justify-content-start align-items-start">
            <button type="button" className="btn btn-outline-primary rounded-pill">
              Filter by
            </button>
            <button type="button" className="btn btn-outline-primary rounded-pill">
              This Year
            </button>
          </div>
        </div>

        <div className="p-3 bg-white mx-3 rounded-2">
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div className="">
              <h1 className="p-0 m-0" style={{"fontSize": "14px", "fontWeight": "600"}}>
                Sales Target Completion
              </h1>
              <p className="p-0 m-0 mt-1" style={{"color": "#4b647e", "fontSize": "13px"}}>
                Track progress toward annual sales targets by program
              </p>
            </div>
            <img src="./images/icons/link-icon.svg" alt="link-icon" />
          </div>
          <div
            className="d-flex flex-column flex-xl-row gap-2 justify-content-start align-items-start w-100 mt-3"
          >
            <div
              className="rounded-2 p-3 d-flex flex-column align-items-start justify-content-center top-sales-target bg-sales-target"
            >
              <div
                className="d-flex w-100 justify-content-between align-items-center mb-2"
              >
                <span style={{"fontWeight": "600"}}>Total Sales Target</span>
                <span style={{"fontWeight": "600"}}>80%</span>
              </div>
              <div className="progress w-100 mb-2 progress-sales-target">
                <div className="progress-bar progress-bar-sales-target"
                  role="progressbar"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div
                className="d-flex w-100 justify-content-between sales-target-labels"
              >
                <span>0K</span>
                <span>100K</span>
              </div>
            </div>
            <div className="row w-100 ms-xl-2 mx-0">
              <div className="col-12 col-md-6 col-xl-3 border">
                <div
                  className="trip-card d-flex align-items-center justify-content-start gap-3"
                >
                  <canvas id="shortTripChart" width="52" height="52"></canvas>
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
                <div
                  className="trip-card d-flex align-items-center justify-content-start gap-3"
                >
                  <canvas id="studentTripChart" width="52" height="52"></canvas>
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
                <div
                  className="trip-card d-flex align-items-center justify-content-start gap-3"
                >
                  <canvas
                    id="yearlyMultiTripChart"
                    width="52"
                    height="52"
                  ></canvas>
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
                <div
                  className="trip-card d-flex align-items-center justify-content-start gap-3"
                >
                  <canvas
                    id="longStayTripChart"
                    width="52"
                    height="52"
                  ></canvas>
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

        <div
          className="d-flex flex-column flex-xl-row w-100 justify-content-between align-items-start p-3 gap-3"
        >
          <div className="p-3 bg-white rounded-2 w-xl-70">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div className="">
                <h1 className="p-0 m-0" style={{"fontSize": "14px", "fontWeight": "600"}}>
                  Revenue From Renewals
                </h1>
                <p className="p-0 m-0 mt-1" style={{"color": "#4b647e", "fontSize": "13px"}}>
                  Income generated from customers through renewals
                </p>
              </div>
              <img src="./images/icons/link-icon.svg" alt="link-icon" />
            </div>
            <div className="row align-items-end" style={{"marginTop": "22px"}}>
              <div className="col-12 col-md-6 d-flex align-items-end gap-2">
                <div
                  style={{"width": "12px",
                    "height": "84px",
                    "background": "#a6e97a",
                    "borderRadius": "4px",
                  }}
                ></div>
                <div
                  style={{"width": "12px",
                    "height": "14px",
                    "background":" #6ee0f5",
                    "borderRadius": "4px"
                  }}
                ></div>
                <div>
                  <div
                    style={{"color": "#21272a", "fontSize": "13px", "fontWeight": "700"}}
                  >
                    $49,223.00
                  </div>
                  <div style={{"color": "#4b647e", "fontSize": "11px"}}>
                    Total renewal done
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div>
                      <div
                        style={{"color": "#21272a",
                          "fontSize": "13px",
                          "fontWeight": "700"
                        }}
                      >
                        $3,872.00
                      </div>
                      <div style={{"color": "#4b647e", "fontSize": "11px"}}>
                        Total commissions earned
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 d-flex align-items-end gap-2 mt-4 mt-md-0"
              >
                <div
                  style={{
                    "width": "12px",
                    "height": "91px",
                    "background": "#a6e97a",
                    "borderRadius": "4px",
                  }}
                ></div>
                <div
                  style={{"width": "12px",
                    "height": "27px",
                    "background": "#6ee0f5",
                    "borderRadius": "4px"
                  }}
                ></div>
                <div>
                  <div
                    style={{"color": "#21272a", "fontSize": "13px", "fontWeight": "700"}}
                  >
                    $52,424.00
                  </div>
                  <div style={{"color": "#4b647e", "fontSize": "11px"}}>
                    Projected revenue for "2025"
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div>
                      <div
                        style={{"color": "#21272a",
                          "fontSize": "13px",
                          "fontWeight": 700,
                        }}
                      >
                        $1,423
                      </div>
                      <div style={{"color": "#4b647e", "fontSize": "11px"}}>
                        Project commissions for "2025"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-2 w-100">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div className="">
                <h1 className="p-0 m-0" style={{"fontSize": "14px", "fontWeight": "600"}}>
                  Top Selling Plans Per Program
                </h1>
                <p className="p-0 m-0 mt-1" style={{"color": "#4b647e", "fontSize": "13px"}}>
                  Top 3 selling plans across all programs
                </p>
              </div>
              <img src="./images/icons/link-icon.svg" alt="link-icon" />
            </div>
            <div className="d-flex flex-column flex-md-row mt-2 w-100 gap-3">
              <div
                className="position-relative w-100"
                style={{"backgroundColor": "#012040", "borderRadius": "8px"}}
              >
                <div className="selling-plan-card p-3 d-flex flex-column">
                  <h1>Travel Assistance Gold Sport</h1>
                  <h2>$11,423</h2>
                  <div
                    className="d-flex w-100 justify-content-between align-items-center"
                  >
                    <p>155 Units Sold</p>
                    <span>+1.5%</span>
                  </div>
                </div>
                <img
                  src="./images/icons/cart-bg.png"
                  alt="bg"
                  className="position-absolute"
                  style={{"bottom": 0, "right": 0}}
                />
              </div>
              <div
                className="position-relative w-100"
                style={{"backgroundColor": "#012040", "borderRadius": "8px"}}
              >
                <div className="selling-plan-card p-3 d-flex flex-column">
                  <h1>Second Medical Opinion Diamond</h1>
                  <h2>$4,252</h2>
                  <div
                    className="d-flex w-100 justify-content-between align-items-center"
                  >
                    <p>62 Units Sold</p>
                    <span style={{"backgroundColor": "#dd1d1d"}}>-2.3%</span>
                  </div>
                </div>
                <img
                  src="./images/icons/cart-bg.png"
                  alt="bg"
                  className="position-absolute"
                  style={{"bottom": 0, "right": 0}}
                />
              </div>
              <div
                className="position-relative w-100"
                style={{"backgroundColor": "#012040", "borderRadius": "8px"}}
              >
                <div className="selling-plan-card p-3 d-flex flex-column">
                  <h1>Mental Health Program Black</h1>
                  <h2>$18,876</h2>
                  <div
                    className="d-flex w-100 justify-content-between align-items-center"
                  >
                    <p>247 Units Sold</p>
                    <span style={{"backgroundColor": "#eefbf0"}}>+3.2%</span>
                  </div>
                </div>
                <img
                  src="./images/icons/cart-bg.png"
                  alt="bg"
                  className="position-absolute"
                  style={{"bottom": 0, "right": 0}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-xl-row p-3 gap-3">
          <div className="p-3 bg-white rounded-2 flex-fill w-100">
            <div className="d-flex justify-content-between align-items-center">
              <h1
                style={{
                  "fontSize": "14px",
                  "fontWeight": "600",
                  "color": "#21272a",
                  "margin": 0,
                }}
              >
                KPI Comparison
              </h1>
              <div className="ms-auto">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success active chart-toggle-btn text-dark"
                    style={{"height": "25px",
                      "width": "90px",
                      "borderRadius": "18px 0 0 18px",
                      "fontSize": "12px",
                      "fontWeight": "500",
                      "backgroundColor": "#7cc249",
                      "border": "1px solid #7cc249"
                    }}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className="btn text-dark btn-sm btn-outline-success chart-toggle-btn"
                    style={{"height": "25px",
                      "width": "90px",
                      "borderRadius": "0 18px 18px 0",
                      "fontSize": "12px",
                      "fontWeight": "500",
                      "border": "1px solid #7cc249"
                    }}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>

            <div className="kpi-chart">
              <canvas id="kpiComparisonChart" height="420"></canvas>
            </div>
          </div>
          <div className="p-3 bg-white rounded-2 flex-fill w-100">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{"minHeight": "48px"}}
            >
              <div>
                <h1
                  style={{"fontSize": "14px",
                    "fontWeight": "600",
                    "color": "#21272a",
                    "margin": "0"}}
                >
                  Total Commission Earned
                </h1>
                <div
                  className="d-flex align-items-center"
                  style={{"gap": "32px", "marginTop": "4px"}}
                >
                  <div
                    style={{"fontSize": "13px", "fontWeight": "600", "color": "#21272a"}}
                  >
                    $4.2k
                    <span
                      style={{
                        "color": "#4caf50",
                        "fontSize": "10px",
                        "fontWeight": "500",
                        "background": "#eefbf0",
                        "borderRadius": "12px",
                        "padding": "2px 6px",
                        "marginLeft": "2px",
                        "border": "1px solid #4caf50",
                      }}
                      >+3.2%</span
                    >
                  </div>
                  <div
                    style={{"fontSize": "13px", "fontWeight": "600", "color": "#21272a"}}
                  >
                    $2.1k
                    <span
                      style={{"color": "#4caf50",
                        "fontSize": "10px",
                        "fontWeight": "500",
                        "background": "#eefbf0",
                        "borderRadius": "12px",
                        "padding": "2px 6px",
                        "marginLeft": "2px",
                        "border": "1px solid #4caf50",
                      }}
                      >+1.5%</span
                    >
                  </div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{"gap": "16px", "marginTop": "2px"}}
                >
                  <span style={{"fontSize": "12px", "color": "#4b647e"}}
                    >Total commissions</span
                  >
                  <span style={{"fontSize": "12px", "color": "#4b647e"}}
                    >Avg. Commissions paid</span
                  >
                </div>
              </div>
            </div>
            <div className="commission-chart">
              <canvas id="commissionEarnedChart" height="370"></canvas>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="p-3 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h1
                style={{"fontSize": "14px",
                  "fontWeight": "600",
                  "color": "#21272a",
                  "margin": 0,
                }}
              >
                Quote Performance Overview
              </h1>
              <div className="ms-auto">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success active chart-toggle-btn text-dark"
                    style={{"height": "25px",
                      "width": "90px",
                      "borderRadius": "18px 0 0 18px",
                      "fontSize": "12px",
                      "fontWeight": 500,
                      "backgroundColor": "#7cc249",
                      "border": "1px solid #7cc249"
                    }}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className="btn text-dark btn-sm btn-outline-success chart-toggle-btn"
                    style={{"height": "25px",
                      "width": "90px",
                      "borderRadius": "0 18px 18px 0",
                      "fontSize": "12px",
                      "fontWeight": 500,
                      "border": "1px solid #7cc249"
                    }}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>
            <div
              className="d-flex align-items-center"
              style={{"gap": "32px", "marginTop": "4px"}}
            >
              <div className="">
                <div style={{"fontSize": "13px", "fontWeight": 600, "color": "#21272a"}}>
                  $342k
                  <span
                    style={{"color": "#4caf50",
                      "fontSize": "10px",
                      "fontWeight": "500",
                      "background": "#eefbf0",
                      "borderRadius": "12px",
                      "padding": "2px 6px",
                      "marginLeft": "2px",
                      "border": "1px solid #4caf50"
                    }}
                    >+2.5%</span
                  >
                </div>
                <span style={{"fontSize": "12px", "color": "#4b647e"}}
                  >Total Quotes Generated</span>
              </div>
              <div className="">
                <div style={{"fontSize": "13px", "fontWeight": 600, "color": "#21272a"}}>
                  80%
                  <span
                    style={{"color": "#4caf50",
                      "fontSize": "10px",
                      "fontWeight": 500,
                      "background": "#eefbf0",
                      "borderRadius": "12px",
                      "padding": "2px 6px",
                      "marginLeft": "2px",
                      "border": "1px solid #4caf50",
                    }}
                    >+1.5%</span
                  >
                </div>
                <span style={{"fontSize": "12px", "color": "#4b647e"}}
                  >Closing Ratio</span
                >
              </div>
              <div className="">
                <div style={{"fontSize": "13px", "fontWeight": 600, "color": "#21272a"}}>
                  $43K
                  <span
                    style={{"color": "#4caf50",
                      "fontSize": "10px",
                      "fontWeight": 500,
                      "background": "#eefbf0",
                      "borderRadius": "12px",
                      "padding": "2px 6px",
                      "marginLeft": "2px",
                      "border": "1px solid #4caf50"
                    }}
                    >+2.3%</span
                  >
                </div>
                <span style={{fontSize: 12, color: '#4b647e'}}>Average Quotes Generated</span>

              </div>
            </div>
            <div className="d-flex flex-column flex-xl-row gap-5 mt-3">
            {/* Average Quotes Generated Chart */}
            <div className="border w-100 p-3">
                <h1 className="mb-5" style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                Average Quotes Generated
                </h1>
                <div className="ratio-chart">
                <canvas id="avgQuotesChart" height={250} />
                </div>
            </div>
            {/* Closing Ratio Percentage Chart */}
            <div className="border w-100 p-3">
                <h1 className="mb-5" style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                Closing Ratio Percentage
                </h1>
                <div className="ratio-chart">
                <canvas id="closingRatioChart" height={250} />
                </div>
            </div>
            </div>
          </div>
        </div>
        <div className="d-flex p-3 flex-column flex-xl-row gap-3">
          <div className="p-3 bg-white rounded-2 w-100">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <h1 className="p-0 m-0" style={{fontSize: 14, fontWeight: 600}}>
                Agent Performance
              </h1>
              <img src="./images/icons/link-icon.svg" alt="link-icon" />
            </div>
            <div className="d-flex align-items-center gap-3 mt-3">
              <div className="">
                <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                $2172K
                </div>
                <span style={{fontSize: 12, color: '#4b647e'}}>Total sales</span>
              </div>
              <div className="">
                <div>
                <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                    $305K
                </div>
                <span style={{fontSize: 12, color: '#4b647e'}}>Avg. Profit from Agent sales</span>
                </div>

              </div>
            </div>
            <div className="performance-chart-container">
              <div className="performance-labels">
                <div>
                <div style={{marginBottom: 18}}>
                    <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                    Leslie King
                    </div>
                    <div style={{fontSize: 11, color: '#4b647e'}}>WE ASSIST</div>
                </div>
                <div style={{marginBottom: 18}}>
                    <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                    Bertha Walters
                    </div>
                    <div style={{fontSize: 11, color: '#4b647e'}}>
                    Infinity Transactional Ser...
                    </div>
                </div>
                </div>

               <div style={{marginBottom: 18}}>
  <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
    Heidi Jordan
  </div>
  <div style={{fontSize: 11, color: '#4b647e'}}>
    Palma &amp; Company
  </div>
</div>

            <div style={{marginBottom: 18}}>
            <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                Norman Ramos
            </div>
            <div style={{fontSize: 11, color: '#4b647e'}}>BEN-IN</div>
            </div>

            <div style={{marginBottom: 18}}>
            <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                Sylvia Burton
            </div>
            <div style={{fontSize: 11, color: '#4b647e'}}>
                Columbia Tours
            </div>
            </div>

            <div>
            <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
                Tracey Ford
            </div>
            <div style={{fontSize: 11, color: '#4b647e'}}>
                PBC INTERNATIONAL
            </div>
            </div>
        </div>
              <div className="performance-chart">
                <canvas id="agentPerformanceChart" height="450"></canvas>
              </div>
            </div>
          </div>
<div className="p-3 bg-white rounded-2 w-100">
  <div className="d-flex justify-content-between align-items-start gap-3">
    <h1 classname="p-0 m-0" style={{fontSize: 14, fontWeight: 600}}>
      Agency Performance
    </h1>
    <img src="./images/icons/link-icon.svg" alt="link-icon" />
  </div>
  <div className="d-flex align-items-center gap-3 mt-3">
    <div className>
      <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
        $2172K
      </div>
      <span style={{fontSize: 12, color: '#4b647e'}}>Total sales</span>
    </div>
    <div className="">
      <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
        $4.2K
      </div>
      <span style={{fontSize: 12, color: '#4b647e'}}>Avg. Profit from Agency sales</span>
    </div>
  </div>
  {/* Agency Performance chart */}
  <div className="performance-chart-container">
    <div className="performance-labels">
      <div style={{marginBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
          Columbia Tours
        </div>
        <div style={{fontSize: 11, color: '#4b647e'}}>WE ASSIST</div>
      </div>
      <div style={{marginBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
          Palma &amp; Company
        </div>
        <div style={{fontSize: 11, color: '#4b647e'}}>
          Infinity Transactional Ser...
        </div>
      </div>
      <div style={{marginBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
          PBC International
        </div>
        <div style={{fontSize: 11, color: '#4b647e'}}>WE ASSIST</div>
      </div>
      <div style={{marginBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
          Norman Ramos
        </div>
        <div style={{fontSize: 11, color: '#4b647e'}}>BEN-IN</div>
      </div>
      <div style={{marginBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
          Infinity Services
        </div>
        <div style={{fontSize: 11, color: '#4b647e'}}>
          Columbia Tours
        </div>
      </div>
      <div>
        <div style={{fontSize: 13, fontWeight: 600, color: '#21272a'}}>
          DUV Internationls!
        </div>
        <div style={{fontSize: 11, color: '#4b647e'}}>WE ASSIST</div>
      </div>
    </div>
    <div className="performance-chart">
      <canvas id="agencyPerformanceChart" height={450} />
    </div>
  </div>
</div>
        </div>
    </>)
}

export default Dashboard;