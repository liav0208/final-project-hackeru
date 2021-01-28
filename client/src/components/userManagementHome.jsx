import React from "react";

const UserManagementHome = ({ user }) => {
  return (
    <div className="um__home">
      <header className="um__header">
        <h1 className="um__header-main">Welcome {user && user.name}</h1>
        <h4 className="um__header-sub">
          Here you can manage your profile. upload an user photo, edit your
          profile and some more stuff
        </h4>
      </header>
    </div>
  );
};

export default UserManagementHome;
