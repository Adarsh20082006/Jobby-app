import { Link } from 'react-router-dom'
import Navbar from '../Navbar/index'
import './index.css'

const Home = () => (
    <div className="main-container">
        <Navbar />
        <div className="home-main-container">
            <div className="home-container">
                <div className="home-texts-container">
                    <h1 className="home-heading">Find The Job That Fits Your Life</h1>
                    <p className="home-description">
                        Millions of people are searching for jobs, salary information,
                        company reviews. Find the job that fits your abilities and
                        potential.
                    </p>
                    <Link to="/jobs" className="btn home-btn">
                        Find Jobs
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

export default Home
