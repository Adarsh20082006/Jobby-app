import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import { BsSearch } from 'react-icons/bs'
import FilterItems from '../FilterItems/index'
import JobItem from '../JobItem/index'
import Navbar from '../Navbar/index'
import './index.css'

const Jobs = () => {
    const [loading, setLoadingStatus] = useState(false)
    const [allJobs, setJobs] = useState([])
    const [empType, setEmpType] = useState([])
    const [empSalary, setEmpSalary] = useState('')
    const [sText, setSText] = useState('')
    const [sQuery, setSQuery] = useState('')
    const [status, setStatus] = useState(true)

    const updateEmpType = e => {
        const { value, checked } = e.target
        if (checked) setEmpType(prev => [...prev, value])
        else setEmpType(prev => prev.filter(each => each !== value))
    }
    const updateEmpSalary = e => {
        const { value, checked } = e.target
        if (checked) setEmpSalary(value)
    }
    useEffect(() => {
        const getJobs = async () => {
            setLoadingStatus(true)
            // setStatus(true)
            console.log('Loading...')
            const url = `https://apis.ccbp.in/jobs?employment_type=${empType.join()}&minimum_package=${empSalary}&search=${sQuery}`
            const jwtToken = Cookies.get('jwt_token')
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            try {
                const response = await fetch(url, options)
                const jobsData = await response.json()
                if (response.ok) {
                    const { jobs } = jobsData
                    const updatedJobs = jobs.map(each => ({
                        companyLogoUrl: each.company_logo_url,
                        employmentType: each.employment_type,
                        id: each.id,
                        jobDescription: each.job_description,
                        location: each.location,
                        packagePerAnnum: each.package_per_annum,
                        rating: each.rating,
                        title: each.title,
                    }))
                    setJobs(updatedJobs)
                } else {
                    setStatus(false)
                }
            } catch (e) {
                setStatus(false)
                console.log(e)
            } finally {
                setLoadingStatus(false)
            }
            console.log('Loaded!')
        }
        getJobs()
    }, [empSalary, empType, sQuery, status])

    const retryClicked = () => {
        setStatus(true)
    }

    const renderFailurePage = () => (
        <div className="jobs-failure-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
                We cannot seem to find the page you are looking for
            </p>
            <button type="button" className="btn" onClick={retryClicked}>
                Retry
            </button>
        </div>
    )
    const succesView = () => (
        <ul className="jobs-lists">
            {allJobs.map(each => (
                <JobItem key={each.id} jobInfo={each} />
            ))}
        </ul>
    )
    const renderPage = () => (status ? succesView() : renderFailurePage())

    const renderJobs = () => (
        <div className="main-container">
            <div className="jobs-main-container">
                <Navbar />
                <div className="jobs-container">
                    <div className="jobs-filter-container">
                        <FilterItems
                            updateEmpSalary={updateEmpSalary}
                            updateEmpType={updateEmpType}
                        />
                    </div>
                    <div className="jobs-cards-container">
                        <div className="search-container">
                            <input
                                type="search"
                                placeholder="Search"
                                className="search-box"
                                value={sText}
                                onChange={e => setSText(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setSQuery(sText)}
                                data-testid="searchButton"
                                className="search-button"
                            >
                                <BsSearch className="search-icon" />
                            </button>
                        </div>
                        {loading ? (
                            <div className="loader-container" data-testid="loader">
                                <Loader
                                    type="ThreeDots"
                                    color="#ffffff"
                                    height="50"
                                    width="50"
                                />
                            </div>
                        ) : (
                            renderPage()
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return renderJobs()
}

export default Jobs
