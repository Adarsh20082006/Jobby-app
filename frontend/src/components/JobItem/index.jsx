import { Link } from 'react-router-dom'
import { IoIosStar } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import './index.css'

const JobItem = props => {
    const { jobInfo } = props
    const {
        companyLogoUrl,
        employmentType,
        jobDescription,
        location,
        packagePerAnnum = '',
        rating,
        title,
        id,
    } = jobInfo
    return (
        <Link className="link" to={`/jobs/${id}`}>
            <li key={id} className="jobItem-container">
                <div className="jobItem-header">
                    <img src={companyLogoUrl} alt="company logo" className="logo-img" />
                    <div className="jobItem-title-container">
                        <h1 className="jobItem-title">{title}</h1>
                        <div className="rating-container">
                            <IoIosStar className="star-icon" />
                            <p>{rating}</p>
                        </div>
                    </div>
                </div>
                <div className="jobItem-info-container">
                    <div className="left-info-container">
                        <div className="location-container">
                            <IoLocationSharp className="location-icon" />
                            <p className="address">{location}</p>
                        </div>
                        <div className="employment-type-container">
                            <MdWork className="employment-type-icon" />
                            <p className="employment-type">{employmentType}</p>
                        </div>
                    </div>
                    {packagePerAnnum !== '' && (
                        <div className="right-container">
                            <p className="salary">{packagePerAnnum}</p>
                        </div>
                    )}
                </div>
                <div className="description-container">
                    <h1 className="description-title">Description</h1>
                    <p className="description">{jobDescription}</p>
                </div>
            </li>
        </Link>
    )
}

export default JobItem
