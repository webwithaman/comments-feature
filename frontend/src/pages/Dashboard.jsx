import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfoFromJwtToken } from "../utils/auth";

const Dashboard = () => {

  return (
    <div>
      <h2 className="text-center mb-4">Dashboard</h2>

      <div className="card mx-auto" style={{ width: "18rem" }}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
          className="card-img-top w-50 mx-auto"
          alt="..."
        />
        <div className="card-body text-center">
          <h5 className="card-title">{getUserInfoFromJwtToken().name}</h5>
          <h5 className="card-title">{getUserInfoFromJwtToken().email}</h5>

          <button className="btn btn-info mt-5">
            <Link className="text-light text-decoration-none" to="/comments">
              Join Comment Section
            </Link>
          </button>

          <button className="btn btn-secondary mt-3">
            <Link
              className="text-light text-decoration-none"
              to="/login"
              onClick={() => {
                localStorage.removeItem("jwtToken");
              }}
            >
              Logout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
