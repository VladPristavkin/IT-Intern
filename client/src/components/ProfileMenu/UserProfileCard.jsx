import React from "react"
import AccountLogo from '../../assets/profile_account_circle.svg';
import Logout from '../../assets/logout.svg'

const UserProfileCard = () => {
    return (
        <div className="profile-card">
        <div className="profile-card-content">
            <div className="user-info">
                <div className="user-avatar">
                    <img
                    src={AccountLogo}
                    alt="Account"
                    className="account-logo"
                />
                </div>
                <div>
                    <div className="username">SamostBrodit123</div>
                    <div className="user-role">Студент</div>
                </div>
            </div>
            <div className="profile-arrow">
                <img
                src={Logout}
                alt="Logout"
                className="logout"
                />
            </div>
        </div>
    </div>
    );
}

export default UserProfileCard