
import "./IntroPage.css";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FaShield } from "react-icons/fa6";
import { introBoxData } from "../components/Data";
import { Building2 } from "lucide-react";

const IntroPage = () => {

    const navigate = useNavigate();

  return (
    <div className="intro-container">
        <div className="top-header">
            <img src={logo} alt="HostelMate" />
            <button id="intro-login" onClick={ () =>  navigate('/login') }>Login</button>
        </div>

        <div className="middle-intro">
            <span id="caption"><FaShield size={15} color="#ff8c3a"/>Secure & Easy to use</span>
            <div id="heading-intro">
                <h1 id="head-intro">Manage Your <span>PG Hostel</span> Effortlessly</h1>
            </div>
            <p id="sentence">A complete solution for PG and hostel owners to manage rooms, tenants, payments, and complaints all in one place.</p>
            <button id="getstarted-intro" onClick={ () => navigate('/signup')}>Get Started</button>
        </div>

        <div className="middletwo-intro">
            <h2>Everything You Need</h2>
            <p>Streamline your hostel operations with our comprehensive management features.</p>
        </div>

        <div className="container-box">
            {
                introBoxData.map((item, index) => (
                    <div key={index} className='box'>
                        <div className="icon-wrapper" style={{color:"#ff8c3a"}}>{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))
            }
        </div>

        <div className="middle-three">
            <h1>Ready to Simplify Hostel Management?</h1>
            <p>Join now and experience hassle-free hostel management with our intuitive platform.</p>
            <button id="sign-intro" onClick={() => navigate('/signup')}>Sign Up Now</button>
        </div>

        <hr style={{ width:'90%', margin:'20px auto' }} />

        <div className="footer">
            <div id="left-footer">
                <Building2 color="#ff8c3a"/>
                <h3>PG Hostel Management</h3>
            </div>

            <div id="right-footer">
                <p>&copy; 2025 PG Hostel Management. All rights reserved.</p>
            </div>
        </div>

    </div>
  );
};

export default IntroPage;
