const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    type: "full-time",
    location: "new-york",
    description: "Develop amazing applications.",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Facebook",
    type: "part-time",
    location: "san-francisco",
    description: "Analyze data trends.",
  },
  {
    id: 3,
    title: "Remote Developer",
    company: "Microsoft",
    type: "remote",
    location: "remote",
    description: "Work remotely on cloud solutions.",
  },
];

function loadJobs() {
  const container = document.getElementById("jobs-container");
  container.innerHTML = "";
  jobsData.forEach((job) => {
    let jobElement = document.createElement("div");
    jobElement.className = "job";
    jobElement.innerHTML = `<h3>${job.title}</h3><p>${job.company}</p>`;
    jobElement.onclick = () => showJobDetails(job);
    container.appendChild(jobElement);
  });
}

function showJobDetails(job) {
  document.getElementById("job-info").innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Type:</strong> ${job.type}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
        <button onclick="saveJob('${job.title}')">Save Job</button>
    `;
}

function filterJobs() {
  const typeFilter = document.getElementById("job-type").value;
  const locationFilter = document.getElementById("job-location").value;
  const container = document.getElementById("jobs-container");
  container.innerHTML = "";

  let filteredJobs = jobsData.filter(
    (job) =>
      (typeFilter === "all" || job.type === typeFilter) &&
      (locationFilter === "all" || job.location === locationFilter)
  );

  filteredJobs.forEach((job) => {
    let jobElement = document.createElement("div");
    jobElement.className = "job";
    jobElement.innerHTML = `<h3>${job.title}</h3><p>${job.company}</p>`;
    jobElement.onclick = () => showJobDetails(job);
    container.appendChild(jobElement);
  });

  if (filteredJobs.length === 0) {
    container.innerHTML = "<p>No jobs found.</p>";
  }
}

function saveJob(jobTitle) {
  alert(`${jobTitle} has been saved!`);
}

document.addEventListener("DOMContentLoaded", loadJobs);
