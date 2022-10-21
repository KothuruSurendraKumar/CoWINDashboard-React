// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    cowinData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(`https://apis.ccbp.in/covid-vaccination-data`)
    const fetchData = await response.json()
    console.log(fetchData)
    if (response.ok === true) {
      const formattedData = {
        last7DaysVaccination: fetchData.last_7_days_vaccination.map(
          eachItem => ({
            vaccineDate: eachItem.vaccine_date,
            dose1: eachItem.dose_1,
            dose2: eachItem.dose_2,
          }),
        ),
        vaccinationByAge: fetchData.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
        vaccinationByGender: fetchData.vaccination_by_gender.map(
          eachElement => ({
            count: eachElement.count,
            gender: eachElement.gender,
          }),
        ),
      }
      console.log(formattedData)
      this.setState({
        cowinData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderVaccinationStates = () => {
    const {cowinData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccineCoverageDetails={cowinData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccineGenderDetails={cowinData.vaccinationByGender}
        />
        <VaccinationByAge vaccineAgeDetails={cowinData.vaccinationByAge} />
      </>
    )
  }

  renderLoaderView = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewerPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStates()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="cowin-dashboaed">
          <div className="cowin-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <p className="logo-text">Co-WIN</p>
          </div>
          <h1 className="header">CoWIN Vaccination in India</h1>
          {this.renderViewerPage()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
