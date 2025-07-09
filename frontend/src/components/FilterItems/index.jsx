import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
    {
        label: 'Full Time',
        employmentTypeId: 'FULLTIME',
    },
    {
        label: 'Part Time',
        employmentTypeId: 'PARTTIME',
    },
    {
        label: 'Freelance',
        employmentTypeId: 'FREELANCE',
    },
    {
        label: 'Internship',
        employmentTypeId: 'INTERNSHIP',
    },
]

const salaryRangesList = [
    {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
    },
    {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
    },
    {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
    },
    {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
    },
]

const FilterItems = props => {
    const { updateEmpType, updateEmpSalary } = props
    const [profileDetails, setProfileDetail] = useState({})
    const [loading, setLoadingStatus] = useState(false)
    const [status, setStatus] = useState(true)
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        const getProfileDetails = async () => {
            setLoadingStatus(true)
            const url = `https://apis.ccbp.in/profile`
            const jwtToken = Cookies.get('jwt_token')
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            try {
                console.log('Start fetching')
                const response = await fetch(url, options)
                const profileData = await response.json()
                if (response.ok) {
                    const filteredData = {
                        name: profileData.profile_details.name,
                        profileImageUrl: profileData.profile_details.profile_image_url,
                        shortBio: profileData.profile_details.short_bio,
                    }
                    setProfileDetail(filteredData)
                } else {
                    setStatus(false)
                }
            } catch (e) {
                console.log(e)
                setStatus(false)
            } finally {
                console.log('Complete fetching')
                setLoadingStatus(false)
            }
        }
        getProfileDetails()
    }, [retry])
    const retryClicked = () => {
        setRetry(true)
        setLoadingStatus(true)
    }

    const renderProfileView = () => (
        <div className="profile-container">
            <div className="profile-header-container">
                <img src={profileDetails.profileImageUrl} alt="profile" />
                <h1 className="profile-name">{profileDetails.name}</h1>
            </div>
            <p className="profile-description">{profileDetails.shortBio}</p>
        </div>
    )
    const renderFailureView = () => (
        <div className="retry-container">
            <button type="button" className="btn" onClick={retryClicked}>
                Retry
            </button>
        </div>
    )

    const renderFinalProfile = () =>
        status ? renderProfileView() : renderFailureView()
    return (
        <div className="filter-container">
            {loading ? (
                <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
                </div>
            ) : (
                renderFinalProfile()
            )}
            <hr />
            <div className="filter-type-container">
                <h1 className="filter-type-heading">Type of Employment</h1>
                <ul className="filter-type-lists">
                    {employmentTypesList.map(each => (
                        <li key={each.employmentTypeId} className="list-item">
                            <input
                                type="checkbox"
                                className="type-checkbox"
                                value={each.employmentTypeId}
                                onChange={updateEmpType}
                                id={each.employmentTypeId}
                            />
                            <label htmlFor={each.employmentTypeId}>{each.label}</label>
                        </li>
                    ))}
                </ul>
                <hr />

                <h1 className="filter-salary-heading">Salary Range</h1>
                <ul className="filter-salary-lists">
                    {salaryRangesList.map(each => (
                        <li key={each.salaryRangeId} className="list-item">
                            <input
                                type="radio"
                                name="salaryRange"
                                className="salary-checkbox"
                                id={each.salaryRangeId}
                                onChange={updateEmpSalary}
                                value={each.salaryRangeId}
                            />
                            <label htmlFor={each.salaryRangeId}>{each.label}</label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FilterItems
