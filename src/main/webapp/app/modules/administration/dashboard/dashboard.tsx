import React, { useEffect } from 'react';
import '../css/vendor/simplebar.css';
import '../css/vendor/style.css';
import { useAppDispatch } from 'app/config/store';

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="container-lg">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="card mb-4 text-white bg-primary">
              <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div className="fs-4 fw-semibold">26K <span className="fs-6 fw-normal">(-12.4%
                    <svg className="icon">
                    </svg>)</span></div>
                  <div>Users</div>
                </div>
                <div className="dropdown">
                  <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg className="icon">

                    </svg>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                </div>
              </div>
              <div className="c-chart-wrapper mt-3 mx-3" >
                <canvas className="chart" id="card-chart1" height="70"></canvas>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card mb-4 text-white bg-info">
              <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div className="fs-4 fw-semibold">$6.200 <span className="fs-6 fw-normal">(40.9%
                    <svg className="icon">

                    </svg>)</span></div>
                  <div>Income</div>
                </div>
                <div className="dropdown">
                  <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg className="icon">

                    </svg>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                </div>
              </div>
              <div className="c-chart-wrapper mt-3 mx-3">
                <canvas className="chart" id="card-chart2" height="70"></canvas>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card mb-4 text-white bg-warning">
              <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div className="fs-4 fw-semibold">2.49% <span className="fs-6 fw-normal">(84.7%
                    <svg className="icon">
                    </svg>)</span></div>
                  <div>Conversion Rate</div>
                </div>
                <div className="dropdown">
                  <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg className="icon">
                    </svg>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                </div>
              </div>
              <div className="c-chart-wrapper mt-3" >
                <canvas className="chart" id="card-chart3" height="70"></canvas>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card mb-4 text-white bg-danger">
              <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div className="fs-4 fw-semibold">44K <span className="fs-6 fw-normal">(-23.6%
                    <svg className="icon">
                    </svg>)</span></div>
                  <div>Sessions</div>
                </div>
                <div className="dropdown">
                  <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg className="icon">
                    </svg>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                </div>
              </div>
              <div className="c-chart-wrapper mt-3 mx-3">
                <canvas className="chart" id="card-chart4" height="70"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="card-title mb-0">Traffic</h4>
                <div className="small text-medium-emphasis">January - July 2022</div>
              </div>
              <div className="btn-toolbar d-none d-md-block" role="toolbar" aria-label="Toolbar with buttons">
                <div className="btn-group btn-group-toggle mx-3" data-coreui-toggle="buttons">
                  <input className="btn-check" id="option1" type="radio" name="options" />
                  <label className="btn btn-outline-secondary"> Day</label>
                  <input className="btn-check" id="option2" type="radio" name="options" />
                  <label className="btn btn-outline-secondary active"> Month</label>
                  <input className="btn-check" id="option3" type="radio" name="options" />
                  <label className="btn btn-outline-secondary"> Year</label>
                </div>
                <button className="btn btn-primary" type="button">
                  <svg className="icon">

                  </svg>
                </button>
              </div>
            </div>
            <div className="c-chart-wrapper">
              <canvas className="chart" id="main-chart" height="300"></canvas>
            </div>
          </div>
          <div className="card-footer">
            <div className="row row-cols-1 row-cols-md-5 text-center">
              <div className="col mb-sm-2 mb-0">
                <div className="text-medium-emphasis">Visits</div>
                <div className="fw-semibold">29.703 Users (40%)</div>
                <div className="progress progress-thin mt-2">
                  <div className="progress-bar bg-success" role="progressbar"></div>
                </div>
              </div>
              <div className="col mb-sm-2 mb-0">
                <div className="text-medium-emphasis">Unique</div>
                <div className="fw-semibold">24.093 Users (20%)</div>
                <div className="progress progress-thin mt-2">
                  <div className="progress-bar bg-info" role="progressbar" ></div>
                </div>
              </div>
              <div className="col mb-sm-2 mb-0">
                <div className="text-medium-emphasis">Pageviews</div>
                <div className="fw-semibold">78.706 Views (60%)</div>
                <div className="progress progress-thin mt-2">
                  <div className="progress-bar bg-warning" role="progressbar"></div>
                </div>
              </div>
              <div className="col mb-sm-2 mb-0">
                <div className="text-medium-emphasis">New Users</div>
                <div className="fw-semibold">22.123 Users (80%)</div>
                <div className="progress progress-thin mt-2">
                  <div className="progress-bar bg-danger" role="progressbar" ></div>
                </div>
              </div>
              <div className="col mb-sm-2 mb-0">
                <div className="text-medium-emphasis">Bounce Rate</div>
                <div className="fw-semibold">40.15%</div>
                <div className="progress progress-thin mt-2">
                  <div className="progress-bar" role="progressbar" ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-4">
            <div className="card mb-4">
              <div className="card-header position-relative d-flex justify-content-center align-items-center">
                <svg className="icon icon-3xl text-white my-4">

                </svg>
                <div className="chart-wrapper position-absolute top-0 start-0 w-100 h-100">
                  <canvas id="social-box-chart-1" height="90"></canvas>
                </div>
              </div>
              <div className="card-body row text-center">
                <div className="col">
                  <div className="fs-5 fw-semibold">89k</div>
                  <div className="text-uppercase text-medium-emphasis small">friends</div>
                </div>
                <div className="vr"></div>
                <div className="col">
                  <div className="fs-5 fw-semibold">459</div>
                  <div className="text-uppercase text-medium-emphasis small">feeds</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="card mb-4" >
              <div className="card-header position-relative d-flex justify-content-center align-items-center">
                <svg className="icon icon-3xl text-white my-4">

                </svg>
                <div className="chart-wrapper position-absolute top-0 start-0 w-100 h-100">
                  <canvas id="social-box-chart-2" height="90"></canvas>
                </div>
              </div>
              <div className="card-body row text-center">
                <div className="col">
                  <div className="fs-5 fw-semibold">973k</div>
                  <div className="text-uppercase text-medium-emphasis small">followers</div>
                </div>
                <div className="vr"></div>
                <div className="col">
                  <div className="fs-5 fw-semibold">1.792</div>
                  <div className="text-uppercase text-medium-emphasis small">tweets</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="card mb-4" >
              <div className="card-header position-relative d-flex justify-content-center align-items-center">
                <svg className="icon icon-3xl text-white my-4">
                </svg>
                <div className="chart-wrapper position-absolute top-0 start-0 w-100 h-100">
                  <canvas id="social-box-chart-3" height="90"></canvas>
                </div>
              </div>
              <div className="card-body row text-center">
                <div className="col">
                  <div className="fs-5 fw-semibold">500+</div>
                  <div className="text-uppercase text-medium-emphasis small">contacts</div>
                </div>
                <div className="vr"></div>
                <div className="col">
                  <div className="fs-5 fw-semibold">292</div>
                  <div className="text-uppercase text-medium-emphasis small">feeds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">Traffic &amp; Sales</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-6">
                        <div className="border-start border-start-4 border-start-info px-3 mb-3"><small className="text-medium-emphasis">New Clients</small>
                          <div className="fs-5 fw-semibold">9.123</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border-start border-start-4 border-start-danger px-3 mb-3"><small className="text-medium-emphasis">Recuring Clients</small>
                          <div className="fs-5 fw-semibold">22.643</div>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Monday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar" ></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Tuesday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Wednesday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Thursday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Friday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Saturday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend"><span className="text-medium-emphasis small">Sunday</span></div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-info" role="progressbar"></div>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-danger" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-6">
                        <div className="border-start border-start-4 border-start-warning px-3 mb-3"><small className="text-medium-emphasis">Pageviews</small>
                          <div className="fs-5 fw-semibold">78.623</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border-start border-start-4 border-start-success px-3 mb-3"><small className="text-medium-emphasis">Organic</small>
                          <div className="fs-5 fw-semibold">49.123</div>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <svg className="icon icon-lg me-2">

                        </svg>
                        <div>Male</div>
                        <div className="ms-auto fw-semibold">43%</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-warning" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-5">
                      <div className="progress-group-header">
                        <svg className="icon icon-lg me-2">
                        </svg>
                        <div>Female</div>
                        <div className="ms-auto fw-semibold">37%</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-warning" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <svg className="icon icon-lg me-2">
                        </svg>
                        <div>Organic Search</div>
                        <div className="ms-auto fw-semibold me-2">191.235</div>
                        <div className="text-medium-emphasis small">(56%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-success" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <svg className="icon icon-lg me-2">

                        </svg>
                        <div>Facebook</div>
                        <div className="ms-auto fw-semibold me-2">51.223</div>
                        <div className="text-medium-emphasis small">(15%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-success" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <svg className="icon icon-lg me-2">
                        </svg>
                        <div>Twitter</div>
                        <div className="ms-auto fw-semibold me-2">37.564</div>
                        <div className="text-medium-emphasis small">(11%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-success" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <svg className="icon icon-lg me-2">
                        </svg>
                        <div>LinkedIn</div>
                        <div className="ms-auto fw-semibold me-2">27.319</div>
                        <div className="text-medium-emphasis small">(8%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-thin">
                          <div className="progress-bar bg-success" role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border mb-0">
                    <thead className="table-light fw-semibold">
                      <tr className="align-middle">
                        <th className="text-center">
                          <svg className="icon">
                          </svg>
                        </th>
                        <th>User</th>
                        <th className="text-center">Country</th>
                        <th>Usage</th>
                        <th className="text-center">Payment Method</th>
                        <th>Activity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="align-middle">
                        <td className="text-center">
                          <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/1.jpg" alt="user@email.com" /><span className="avatar-status bg-success"></span></div>
                        </td>
                        <td>
                          <div>Yiorgos Avraamu</div>
                          <div className="small text-medium-emphasis"><span>New</span> | Registered: Jan 1, 2020</div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-start">
                              <div className="fw-semibold">50%</div>
                            </div>
                            <div className="float-end"><small className="text-medium-emphasis">Jun 11, 2020 - Jul 10, 2020</small></div>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-success" role="progressbar"></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold">10 sec ago</div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <svg className="icon">
                              </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Info</a><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item text-danger" href="#">Delete</a></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="align-middle">
                        <td className="text-center">
                          <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/2.jpg" alt="user@email.com" /><span className="avatar-status bg-danger"></span></div>
                        </td>
                        <td>
                          <div>Avram Tarasios</div>
                          <div className="small text-medium-emphasis"><span>Recurring</span> | Registered: Jan 1, 2020</div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-start">
                              <div className="fw-semibold">10%</div>
                            </div>
                            <div className="float-end"><small className="text-medium-emphasis">Jun 11, 2020 - Jul 10, 2020</small></div>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-info" role="progressbar"></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold">5 minutes ago</div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <svg className="icon">
                              </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Info</a><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item text-danger" href="#">Delete</a></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="align-middle">
                        <td className="text-center">
                          <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/3.jpg" alt="user@email.com" /><span className="avatar-status bg-warning"></span></div>
                        </td>
                        <td>
                          <div>Quintin Ed</div>
                          <div className="small text-medium-emphasis"><span>New</span> | Registered: Jan 1, 2020</div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-start">
                              <div className="fw-semibold">74%</div>
                            </div>
                            <div className="float-end"><small className="text-medium-emphasis">Jun 11, 2020 - Jul 10, 2020</small></div>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-warning" role="progressbar"></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold">1 hour ago</div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <svg className="icon">
                              </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Info</a><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item text-danger" href="#">Delete</a></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="align-middle">
                        <td className="text-center">
                          <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/4.jpg" alt="user@email.com" /><span className="avatar-status bg-secondary"></span></div>
                        </td>
                        <td>
                          <div>Enéas Kwadwo</div>
                          <div className="small text-medium-emphasis"><span>New</span> | Registered: Jan 1, 2020</div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-start">
                              <div className="fw-semibold">98%</div>
                            </div>
                            <div className="float-end"><small className="text-medium-emphasis">Jun 11, 2020 - Jul 10, 2020</small></div>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-danger" role="progressbar"></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold">Last month</div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <svg className="icon">
                              </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Info</a><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item text-danger" href="#">Delete</a></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="align-middle">
                        <td className="text-center">
                          <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/5.jpg" alt="user@email.com" /><span className="avatar-status bg-success"></span></div>
                        </td>
                        <td>
                          <div>Agapetus Tadeáš</div>
                          <div className="small text-medium-emphasis"><span>New</span> | Registered: Jan 1, 2020</div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-start">
                              <div className="fw-semibold">22%</div>
                            </div>
                            <div className="float-end"><small className="text-medium-emphasis">Jun 11, 2020 - Jul 10, 2020</small></div>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-info" role="progressbar"></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold">Last week</div>
                        </td>
                        <td>
                          <div className="dropdown dropup">
                            <button className="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <svg className="icon">
                              </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Info</a><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item text-danger" href="#">Delete</a></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="align-middle">
                        <td className="text-center">
                          <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/6.jpg" alt="user@email.com" /><span className="avatar-status bg-danger"></span></div>
                        </td>
                        <td>
                          <div>Friderik Dávid</div>
                          <div className="small text-medium-emphasis"><span>New</span> | Registered: Jan 1, 2020</div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-start">
                              <div className="fw-semibold">43%</div>
                            </div>
                            <div className="float-end"><small className="text-medium-emphasis">Jun 11, 2020 - Jul 10, 2020</small></div>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-success" role="progressbar"></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <svg className="icon icon-xl">
                          </svg>
                        </td>
                        <td>
                          <div className="small text-medium-emphasis">Last login</div>
                          <div className="fw-semibold">Yesterday</div>
                        </td>
                        <td>
                          <div className="dropdown dropup">
                            <button className="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <svg className="icon">
                              </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Info</a><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item text-danger" href="#">Delete</a></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
