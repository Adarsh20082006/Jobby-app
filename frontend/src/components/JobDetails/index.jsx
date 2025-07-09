import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { IoIosStar } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { GoLinkExternal } from 'react-icons/go'
import JobItem from '../JobItem/index'
import Navbar from '../Navbar/index'
import './index.css'

const JobDetails = () => {
    const { id } = useParams()
    const [jobInfo, setJobInfo] = useState([])
    const [similarJobsInfo, setSimilarJobsInfo] = useState([])

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token')
        const getJobInfo = async () => {
            const url = `https://apis.ccbp.in/jobs/${id}`
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
            try {
                const response = await fetch(url, options)
                if (response.ok) {
                    const responseJobData = await response.json()
                    const jobData = responseJobData.job_details
                    const similarJobsData = responseJobData.similar_jobs.map(each => ({
                        companyLogoUrl: each.company_logo_url,
                        employmentType: each.employment_type,
                        id: each.id,
                        jobDescription: each.job_description,
                        location: each.location,
                        rating: each.rating,
                        title: each.title,
                    }))
                    const filteredJobData = {
                        companyLogoUrl: jobData.company_logo_url,
                        companyWebsiteLink: jobData.company_website_url,
                        employmentType: jobData.employment_type,
                        id: jobData.id,
                        jobDescription: jobData.job_description,
                        skills: [
                            ...jobData.skills.map(each => ({
                                imgUrl: each.image_url,
                                name: each.name,
                            })),
                        ],
                        lifeAtCompany: jobData.life_at_company.description,
                        imageUrl: jobData.life_at_company.image_url,
                        location: jobData.location,
                        packagePerAnnum: jobData.package_per_annum,
                        rating: jobData.rating,
                    }
                    setJobInfo(filteredJobData)
                    setSimilarJobsInfo(similarJobsData)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getJobInfo()
    }, [id])
    const {
        companyLogoUrl,
        companyWebsiteLink,
        employmentType,
        jobDescription,
        skills,
        lifeAtCompany,
        imageUrl,
        location,
        packagePerAnnum,
        rating,
    } = jobInfo

    return (
        <div className="job-details-outer-container">
            <Navbar />
            <div className="job-details-main-container">
                <div className="job-details-container">
                    <div className="jobItem-header">
                        <img
                            src={companyLogoUrl}
                            alt="job details company logo"
                            className="logo-img"
                        />
                        <div className="jobItem-title-container">
                            <h1 className="jobItem-title">Title</h1>
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
                        <div className="right-container">
                            <p className="salary">{packagePerAnnum}</p>
                        </div>
                    </div>
                    <div className="description-container">
                        <div className="description-header">
                            <h1 className="description-title">Description</h1>
                            <a className="external-link" href={companyWebsiteLink}>
                                <p>Visit</p>
                                <GoLinkExternal />
                            </a>
                        </div>

                        <p className="description">{jobDescription}</p>
                    </div>
                    <div className="skills-container">
                        <h1 className="skills-heading">Skills</h1>
                        <ul className="skills-lists">
                            {skills?.map(each => (
                                <li key={each.name} className="each-skill-container">
                                    <img src={each.imgUrl} alt={each.name} />
                                    <p className="each-skill-name">{each.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h1 className="company-life-heading">Life at Company</h1>
                    <div className="company-life-container">
                        <div className="company-life-left">
                            <p className="company-life-description">{lifeAtCompany}</p>
                        </div>
                        <div className="company-life-right">
                            <img src={imageUrl} alt="life at company" />
                        </div>
                    </div>
                </div>
                <div className="similar-jobs-main-container">
                    <h1 className="similar-jobs-heading">Similar Jobs</h1>
                    <div className="similar-jobs-container">
                        <ul className="similar-jobs-lists">
                            {similarJobsInfo.map(each => (
                                <JobItem key={each.id} jobInfo={each} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
