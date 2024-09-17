import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobSearch({ searchTitle, setSearchTitle, searchLocation, setSearchLocation, handleSearch }) {
  return (
    <section className="text-center py-5" style={{ backgroundColor: "#7878b965", height: "300px" }}>
      <h1 className="fw-bold">Find Your Dream Job Now</h1>
      <h4 className="mb-4">5 lakh+ jobs for you to explore</h4>
      <div className="search-container mx-auto">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Job Title, Keywords, or Company"
            aria-label="Job Title, Keywords, or Company"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Location"
            aria-label="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button className="btn btn-primary search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default JobSearch;
