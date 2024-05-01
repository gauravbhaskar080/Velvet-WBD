import React from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/Footer.css"

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <footer>
      <div className="footer-col">
        <h4 className="footer-heading">Products</h4>
        <ul className="footer-list">
          <li><Link to="#" className="footer-link">Tiles</Link></li>
          <li><Link to="#" className="footer-link">Furniture</Link></li>
          <li><Link to="#" className="footer-link">Sanitary</Link></li>
          <li><Link to="#" className="footer-link">Artifacts</Link></li>
          <li><Link to="#" className="footer-link">Paint</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-heading">Network</h4>
        <ul className="footer-list">
          <li><a href="https://dir.indiamart.com/chennai/interior-design.html" className="footer-link">Interior Design Services</a></li>
          <li><Link to="#" className="footer-link">Home Renovation Contractors</Link></li>
          <li><Link to="#" className="footer-link">Furniture Stores</Link></li>
          <li><Link to="#" className="footer-link">Home Improvement Blogs</Link></li>
          <li><Link to="#" className="footer-link">DIY Home Decor Ideas</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-heading">Companies</h4>
        <ul className="footer-list">
          <li><a href="https://www.kajariaceramics.com/" className="footer-link">Kajariya </a></li>
          <li><a href="https://www.somanyceramics.com/" className="footer-link">Somany</a></li>
          <li><a href="https://www.asianpaints.com/campaign/asian-paints-safe-painting-service/index-new-service.html?cid=PS_GA_DM_A&utm_source=Google_Search_Brand&utm_medium=cpc&utm_campaign=SPS_GOOGLE_PAID&utm_id=BHPS_BSEP_K12_FY2425&utm_adgroup=Core_broad&utm_term=asian%20paints&utm_term=e-c&gad_source=1&gclid=Cj0KCQjw0MexBhD3ARIsAEI3WHJ2nx5K_iqIWhwpvywk-4rkvtUx6_jMPjvOjYZPnLekTbJF09LvN3YaAmnLEALw_wcB" className="footer-link">Asian Paints</a></li>
          <li><a href="https://www.ikea.com/in/en/?gad_source=1&gclid=Cj0KCQjw0MexBhD3ARIsAEI3WHKt1PIBjYQIZOXYHi-2aW8FxaUjILIXafLVpHh2h1pAWpssJEM-BlAaAtbvEALw_wcB" className="footer-link">Ikea</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-heading">Follow Us</h4>
        <div className="links">
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <Link to="#"><i className="fab fa-facebook-f"></i></Link>
          <Link to="#"><i className="fab fa-twitter"></i></Link>
          <Link to="#"><i className="fab fa-instagram"></i></Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
