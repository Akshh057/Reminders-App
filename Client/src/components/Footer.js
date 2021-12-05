import React from "react";
import "./Styles/Footer.css";
import FavoriteIcon from '@material-ui/icons/Favorite';

const Footer = () => {
  return <div className="footer">
    <p>
      E'DAY <FavoriteIcon className="heart" fontSize="small" /> REMINDERS
    </p>
  </div>;
};

export default Footer;
