import React, { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "@/config/api";

const JobRecommendations = () => {
 const [jobs, setJobs] = useState([]);
 const [filteredJobs, setFilteredJobs] = useState([]);
 const [search, setSearch] = useState("");
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
 const fetchJobs = async () => {
 try {
 const res = await axios.get(`${BACKEND_URL}/job-recommendations`);
 setJobs(res.data.jobs);
 setFilteredJobs(res.data.jobs);
 setLoading(false);
 } catch (err) {
 setError("Failed to load jobs.");
 setLoading(false);
 console.error(err);
 }
 };

 fetchJobs();
 }, []);

 const handleSearchChange = (e) => {
 const value = e.target.value.toLowerCase();
 setSearch(value);

 const filtered = jobs.filter((job) =>
 job.job_title.toLowerCase().includes(value) ||
 job.employer_name.toLowerCase().includes(value) ||
 job.job_city?.toLowerCase().includes(value) ||
 job.job_country?.toLowerCase().includes(value)
 );

 setFilteredJobs(filtered);
 };

 if (loading) return (
 <div className="min-h-screen text-[var(--text-main)] flex items-center justify-center">
 <p className="text-center text-[var(--text-main)] font-bold text-sm ">Fetching jobs...</p>
 </div>
 );
 if (error) return (
 <div className="min-h-screen text-[var(--text-main)] flex items-center justify-center">
 <p className="text-center text-red-400 font-bold text-sm">{error}</p>
 </div>
 );

 return (
 <div className="min-h-screen text-[var(--text-main)] p-6 md:p-8 space-y-8 font-sans">
 {/* Header */}
 <div className="space-y-2">
 <h1 className="text-3xl font-extrabold text-[var(--text-main)] flex items-center gap-2">
 💼 Recommended Jobs for You
 </h1>
 <p className="text-[var(--text-muted)] text-sm">
 Discover career opportunities hand-picked based on your placement profile.
 </p>
 </div>

 {/* Search Input */}
 <div className="max-w-xl">
 <input
 type="text"
 value={search}
 onChange={handleSearchChange}
 placeholder="Search jobs by title, company, or location..."
 className="w-full glass-input px-5 py-3 rounded-xl transition-all shadow-md"
 />
 </div>

 {/* Job Cards */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredJobs.length > 0 ? (
 filteredJobs.map((job, index) => (
 <div
 key={index}
 className="glass-panel p-6 shadow-xl flex flex-col justify-between hover:border-[var(--text-muted)] hover:shadow-sm transition duration-300 group"
 >
 <div>
 <h2 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--text-main)] transition-colors mb-2">
 {job.job_title}
 </h2>
 
 <p className="text-xs text-[var(--text-muted)] mb-1 leading-relaxed">
 <strong className="text-[var(--accent-cyan)]">{job.employer_name}</strong> • {job.job_city || "Remote"}, {job.job_country || "India"}
 </p>
 
 <p className="text-[11px] text-[var(--text-muted)]">
 Type: {job.job_employment_type} | Posted:{" "}
 {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
 </p>
 </div>

 <div className="mt-6 pt-4 border-t border-[var(--border-glass)] flex items-center justify-between">
 <a
 href={job.job_apply_link}
 target="_blank"
 rel="noopener noreferrer"
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-2.5 px-5 rounded-xl text-xs transition duration-200 active:scale-95 shadow-sm"
 >
 Apply Now
 </a>
 
 <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase">
 Verified Job
 </span>
 </div>
 </div>
 ))
 ) : (
 <p className="text-center text-[var(--text-muted)] col-span-3 py-12">No jobs found for your search 😕</p>
 )}
 </div>
 </div>
 );
};


export default JobRecommendations;