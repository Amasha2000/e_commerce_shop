import React from "react";
import "./topbar.css";
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
        <div className="topbarIconContainer">
          <Link to="/"><LineStyleIcon /></Link>
          </div>  
        <div className="topbarIconContainer">
          <Link to="/products"><StorefrontIcon /></Link>
          </div>
          <div className="topbarIconContainer">
          <Link to="/users"><PermIdentityIcon /></Link>
          </div>
          <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
