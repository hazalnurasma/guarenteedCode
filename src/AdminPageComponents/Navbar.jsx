import arclk from './Assets/global.png';
import user from './Assets/user.png';
import './Navbar.css';

function Navbar() {
    return(
        <>
            <div className="navbar-container">
                <div className="arclk-logo">
                    <img className="logo" src={arclk}></img>
                </div>
                
                <div className="user-section">
                    <a className="first-button">Admin Page</a>
                    <img className="user" src={user}></img>
                </div>
            </div>
        </>

    );
};

export default Navbar;