let token; // Track if the user is signed in; var is not initialized here so that it doesn't reset when the page reload
// Initialize form with default fields
document.addEventListener("DOMContentLoaded", function() {
    initializeForm();

    token = localStorage.getItem("authToken");

    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token; //Axios/Client now sends an Authorization header to the server which each request
    }

    switchSignIn();
});

const signedInPage = document.getElementById("mainPage");
const signedOutPage = document.getElementById("mainPageSignedOut");
// Signin feedback
function switchSignIn(){ // defined again as its own function so that the page updates on sign in
    if (token) {
        signedInPage.classList.remove("hidden");
        signedOutPage.classList.add("hidden");
    } else {
        signedInPage.classList.add("hidden");
        signedOutPage.classList.remove("hidden");
    }
}

// End Signin feedback

// Initialize form with 4 default rows (each row has Job Title and Years of Experience)
// This should be changed to initialize only 1 default row
function initializeForm() {
    // Initialize 4 default rows
    const container = document.getElementById('jobCriteriaContainer');
    //for (let i = 0; i < 4; i++) {
        addJobCriteriaRow();
}

// Navigate to main page
function goToMainPage() {
    const mainPage = document.getElementById('mainPage');
    const mainPageSignedOut = document.getElementById('mainPageSignedOut');
    const jobSearchPage = document.getElementById('jobSearchPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    const authPage = document.getElementById('authPage');
    
    // Hide all pages
    jobSearchPage.classList.add('hidden');
    jobResultsPage.classList.add('hidden');
    resumeAnalysisPage.classList.add('hidden');
    authPage.classList.add('hidden');
    
    // Show main page based on login status
    if (token){
        if (mainPage) mainPage.classList.remove('hidden');
        if (mainPageSignedOut) mainPageSignedOut.classList.add('hidden');
    }else{
        if (mainPage) mainPage.classList.add('hidden');
        if (mainPageSignedOut) mainPageSignedOut.classList.remove('hidden');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show job search form page
function showJobSearchForm() {
    const mainPage = document.getElementById('mainPage');
    const mainPageSignedOut = document.getElementById('mainPageSignedOut');
    const jobSearchPage = document.getElementById('jobSearchPage');
    
    // Hide main pages
    if (mainPage) mainPage.classList.add('hidden');
    if (mainPageSignedOut) mainPageSignedOut.classList.add('hidden');
    
    // Show job search page
    if (jobSearchPage) jobSearchPage.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0); 
}

// Cancel form and return to main page
function cancelForm() {
    const mainPage = document.getElementById('mainPage');
    const mainPageSignedOut = document.getElementById('mainPageSignedOut');
    const jobSearchPage = document.getElementById('jobSearchPage');
    
    if (jobSearchPage) jobSearchPage.classList.add('hidden');
    
    // Show appropriate main page based on login status
    if (token) {
        if (mainPage) mainPage.classList.remove('hidden');
        if (mainPageSignedOut) mainPageSignedOut.classList.add('hidden');
    } else {
        if (mainPage) mainPage.classList.add('hidden');
        if (mainPageSignedOut) mainPageSignedOut.classList.remove('hidden');
    }
    
    // Reset form
    resetForm();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Add a new row with Job Title and Years of Experience side by side
function addJobCriteriaRow() {
    const container = document.getElementById('jobCriteriaContainer');
    const rowCount = container.children.length;
    
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';
    inputRow.id = `jobCriteriaRow_${rowCount}`;
    
    // Job Title / Technology input
    const jobTitleInput = document.createElement('input');
    jobTitleInput.type = 'text';
    jobTitleInput.className = 'input-field job-title-input';
    jobTitleInput.name = `jobTitle_${rowCount}`;
    jobTitleInput.placeholder = 'Job Title / Technology (e.g., Software Engineer, React)';
    
    // Years of Experience input
    const experienceInput = document.createElement('input');
    experienceInput.type = 'number';
    experienceInput.className = 'input-field experience-input';
    experienceInput.name = `experience_${rowCount}`;
    experienceInput.placeholder = 'Years (e.g., 3, 5)';
    experienceInput.min = '0';
    experienceInput.step = '0.5';
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = () => removeJobCriteriaRow(inputRow);
    
    // Append elements to row
    inputRow.appendChild(jobTitleInput);
    inputRow.appendChild(experienceInput);
    
    // Only show remove button if there's more than 1 row
    if (rowCount > 0) {
        inputRow.appendChild(removeBtn);
    }
    
    container.appendChild(inputRow);
}

// Remove a row from the container
function removeJobCriteriaRow(rowElement) {
    const container = document.getElementById('jobCriteriaContainer');
    if (container.children.length > 1) {
        container.removeChild(rowElement);
        updateRemoveButtons();
    }
}

// Update remove buttons visibility (hide if only 1 row remains)
function updateRemoveButtons() {
    const container = document.getElementById('jobCriteriaContainer');
    const rows = container.children;
    
    for (let i = 0; i < rows.length; i++) {
        const removeBtn = rows[i].querySelector('.remove-btn');
        if (removeBtn) {
            // Show remove button if there's more than 1 row
            if (rows.length > 1) {
                // Ensure remove button is in the row
                if (!rows[i].contains(removeBtn)) {
                    rows[i].appendChild(removeBtn);
                }
            } else {
                removeBtn.remove();
            }
        } else if (rows.length > 1) {
            // Add remove button if it doesn't exist and there's more than 1 row
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => removeJobCriteriaRow(rows[i]);
            rows[i].appendChild(removeBtn);
        }
    }
}

// Mock job data generator
let currentJobIndex = 0;
let allJobs = [];

// Generate mock job data
function generateMockJobs(count = 10) {
    const jobTitles = [
        'Senior Software Engineer', 'Frontend Developer', 'Full Stack Developer',
        'Backend Engineer', 'DevOps Engineer', 'Mobile Developer', 'Data Engineer',
        'Product Manager', 'UX Designer', 'QA Engineer', 'Cloud Architect',
        'Security Engineer', 'Machine Learning Engineer', 'System Administrator'
    ];
    
    const locations = [
        'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX',
        'Boston, MA', 'Remote', 'Chicago, IL', 'Los Angeles, CA',
        'Denver, CO', 'Portland, OR'
    ];
    
    const salaries = [
        '$120,000 - $150,000', '$100,000 - $130,000', '$90,000 - $120,000',
        '$130,000 - $160,000', '$110,000 - $140,000', '$95,000 - $125,000',
        '$140,000 - $180,000', '$85,000 - $115,000'
    ];
    
    const requirements = [
        'Experience with React and TypeScript',
        '5+ years of software development experience',
        'Strong problem-solving skills',
        'Experience with cloud platforms (AWS, GCP, or Azure)',
        'Excellent communication and teamwork abilities',
        'Knowledge of CI/CD pipelines',
        'Understanding of database design and optimization',
        'Experience with agile development methodologies'
    ];
    
    const jobs = [];
    for (let i = 0; i < count; i++) {
        const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const salary = salaries[Math.floor(Math.random() * salaries.length)];
        
        // Generate 3-5 random requirements
        const numRequirements = Math.floor(Math.random() * 3) + 3;
        const shuffled = [...requirements].sort(() => 0.5 - Math.random());
        const matchReasons = shuffled.slice(0, numRequirements);
        
        jobs.push({
            id: `job-${currentJobIndex + i}`,
            title: jobTitle,
            location: location,
            salary: salary,
            matchReasons: matchReasons
        });
    }
    return jobs;
}

// Display jobs on the results page
function displayJobs(jobs) {
    const container = document.getElementById('jobCardsContainer');
    const resultsCount = document.getElementById('resultsCount');
    
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        container.appendChild(jobCard);
    });
    
    // Update results count
    resultsCount.textContent = container.children.length;
}

// Create a job card element
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.id = job.id;
    
    card.innerHTML = `
        <div class="job-card-header">
            <div>
                <h3 class="job-title">${job.title}</h3>
                <div class="job-meta">
                    <div class="meta-item">
                        <span class="meta-label">💰 Salary:</span>
                        <span class="meta-value">${job.salary}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">📍 Location:</span>
                        <span class="meta-value">${job.location}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="match-section">
            <h4 class="match-title">Why You Match</h4>
            <ul class="match-reasons">
                ${job.matchReasons.map((reason, index) => `
                    <li class="match-reason">
                        <span class="match-reason-number">${index + 1}</span>
                        <span class="match-reason-text">${reason}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="job-card-footer">
            <button class="apply-btn" onclick="handleApply('${job.id}')">Apply</button>
        </div>
    `;
    
    return card;
}

// Handle apply button click
function handleApply(jobId) {
    const jobCard = document.getElementById(jobId);
    const jobTitle = jobCard.querySelector('.job-title').textContent;
    alert(`Application submitted for: ${jobTitle}\n\nThank you for your interest! We'll be in touch soon.`);
}

// Load more jobs
function loadMoreJobs() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';
    
    // Simulate API call delay
    setTimeout(() => {
        const newJobs = generateMockJobs(5);
        allJobs = [...allJobs, ...newJobs];
        displayJobs(newJobs);
        currentJobIndex += newJobs.length;
        
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More';
        
        // Hide Load More button if we've loaded enough jobs (demo: 30 jobs max)
        if (currentJobIndex >= 30) {
            loadMoreBtn.classList.add('hidden');
        }
    }, 500);
}


// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    // Check if file is uploaded
    if (!file) {
        alert('Please upload a resume file.');
        return;
    }
    
    // Show loading indicator and navigate to analysis page
    showResumeAnalysisPage();
    showLoadingIndicator();
    
    // Prepare form data
    const formData = new FormData();
    formData.append('myFile', file);
    
    // Collect job criteria (job title + experience pairs)
    const rows = document.querySelectorAll('#jobCriteriaContainer .input-row');
    const criteria = [];
    rows.forEach((row) => {
        const jobTitleInput = row.querySelector('.job-title-input');
        const experienceInput = row.querySelector('.experience-input');
        
        if (jobTitleInput && (jobTitleInput.value.trim() || experienceInput.value.trim())) {
            criteria.push({
                jobTitle: jobTitleInput.value.trim(),
                experience: experienceInput.value.trim() ? parseFloat(experienceInput.value) : null
            });
        }
    });
    
    // Add other form data
    formData.append('criteria', JSON.stringify(criteria));
    formData.append('keywords', document.getElementById('keywordsInput').value);
    
    // Send to server
    axios.post('http://127.0.0.1:3000/api/upload/resume', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        console.log('Resume analyzed successfully:', response.data);
        // Hide loading indicator immediately before displaying results
        hideLoadingIndicator();
        // Then display the results
        displayAnalysisResults(response.data);
    })
    .catch(error => {
        console.error('Error analyzing resume:', error);
        // Hide loading indicator on error
        hideLoadingIndicator();
        showError('Failed to analyze resume. Please try again.');
    });
}

// Show job results page
function showJobResults() {
    const jobSearchPage = document.getElementById('jobSearchPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    
    jobSearchPage.classList.add('hidden');
    jobResultsPage.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Reset form to initial state
function resetForm() {
    // Clear all dynamic fields
    document.getElementById('jobCriteriaContainer').innerHTML = '';
    
    // Clear keywords
    document.getElementById('keywordsInput').value = '';
    
    // Reinitialize with default fields
    initializeForm();
}
function showAccount(){
    const token = localStorage.getItem("authToken");

    if (token) {
        // User is logged in → show account panel
        showAccountPanel();
    } else {
        // User not logged in → show login page
        showLoginPage();
    }
}

function showAccountPanel() {
    const panel = document.getElementById("accountPanel");
    panel.classList.remove("hidden");

    //Fetch user info from the server
    axios.get("http://localhost:3000/auth/me")
        .then(res => {
            document.getElementById("account-email").innerText = truncateText(res.data.user.email);
            document.getElementById("account-resume").innerText = truncateText(res.data.user.resume);
            document.getElementById("account-keywords").innerText = truncateText(res.data.user.keywords);
        })
        .catch(() => {
            // token invalid/expired → auto logout
            logout();
        });
}
function closeAccountPanel() {
    document.getElementById("accountPanel").classList.add("hidden");
}

function logout() {
    token = null;                    // clear in-memory token
    localStorage.removeItem("authToken"); // remove from storage
    switchSignIn();                   // update UI immediately
}
function truncateText(text, maxLength = 150) {
    if (!text) return ""; // handle null/undefined
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// Auth Page Functions
function showLoginPage() {
    const authPage = document.getElementById('authPage');
    if (authPage) {
        authPage.classList.remove('hidden');
        authPage.style.display = 'flex';
        // Show login form by default
        switchAuthTab('login');
    }
}

function closeAuthPage() {
    const authPage = document.getElementById('authPage');
    if (authPage) {
        authPage.classList.add('hidden');
        authPage.style.display = 'none';
        // Reset forms
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
    }
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');
    
    // Remove inline styles to use CSS classes instead
    if (signupFormContainer) {
        signupFormContainer.style.maxHeight = "";
        signupFormContainer.style.overflowY = "";
    }

    if (tab === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginFormContainer.classList.remove('hidden');
        signupFormContainer.classList.add('hidden');
        
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupFormContainer.classList.remove('hidden');
        loginFormContainer.classList.add('hidden');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
      try {
        const response = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password
        });

        const { token: jwtToken } = response.data;

        // Store JWT for future requests
        localStorage.setItem("authToken", jwtToken);
        // IMPORTANT: update axios after login
        axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
        token = localStorage.getItem("authToken");

        console.log("Login successful!");
        alert("Logged in successfully!");

    } catch (err) {
        console.error(err.response.data);
        alert(err.response.data.error || "Login failed");
    }
    
    // Close auth page immediately
    closeAuthPage();
    //isSignedIn=true;
    //sessionStorage.setItem("isSignedIn", true);
    switchSignIn();
    console.log(`User logged in: ${email}`);
}

async function handleSignup(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const username = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        // Don't reset form - keep user input
        return;
    }
    
    try {
        const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        password
        });

        console.log(response.data.message); // "User created successfully"
        alert("Sign-up successful! You can now log in.");

        // Only reset form on success
        const signupForm = document.getElementById('signupForm');
        if (signupForm) signupForm.reset();
    
    // Switch to login tab
    switchAuthTab('login');
    
    // Pre-fill email in login form
    document.getElementById('loginEmail').value = email;
    
    } catch (err) {
        console.error(err.response?.data || err);
        const errorMessage = err.response?.data?.error || "Sign-up failed. Please try again.";
        alert(errorMessage);
        // Don't reset form on error - keep user input so they can fix mistakes
        return;
    }
}

// Show resume analysis page
function showResumeAnalysisPage() {
    const mainPage = document.getElementById('mainPage');
    const mainPageSignedOut = document.getElementById('mainPageSignedOut');
    const jobSearchPage = document.getElementById('jobSearchPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    const authPage = document.getElementById('authPage');
    
    // Hide all pages
    if (mainPage) mainPage.classList.add('hidden');
    if (mainPageSignedOut) mainPageSignedOut.classList.add('hidden');
    jobSearchPage.classList.add('hidden');
    jobResultsPage.classList.add('hidden');
    authPage.classList.add('hidden');
    
    // Show analysis page
    resumeAnalysisPage.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show loading indicator
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const analysisResults = document.getElementById('analysisResults');
    
    loadingIndicator.classList.remove('hidden');
    analysisResults.classList.add('hidden');
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const analysisResults = document.getElementById('analysisResults');
    
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
        loadingIndicator.classList.add('hidden');
    }
    if (analysisResults) {
        analysisResults.style.display = 'block';
        analysisResults.classList.remove('hidden');
    }
}

// Display analysis results with editable fields
function displayAnalysisResults(data) {
    // Immediately hide loading indicator and show results container
    // This must happen first, before any processing
    const loadingIndicator = document.getElementById('loadingIndicator');
    const analysisResults = document.getElementById('analysisResults');
    
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
        loadingIndicator.classList.add('hidden');
    }
    if (analysisResults) {
        analysisResults.style.display = 'block';
        analysisResults.classList.remove('hidden');
    }
    
    // Parse the analysis data - try different possible response structures
    let analysisText = null;
    if (data.remoteResponse) {
        analysisText = typeof data.remoteResponse === 'string' ? data.remoteResponse : data.remoteResponse.result || data.remoteResponse;
    } else if (data.analysis) {
        analysisText = typeof data.analysis === 'string' ? data.analysis : data.analysis.result || data.analysis;
    } else if (data.text) {
        analysisText = data.text;
    } else if (data.result) {
        analysisText = data.result;
    } else {
        analysisText = JSON.stringify(data);
    }
    
    // Parse the text format: SKILLS_TECHNOLOGIES: ..., JOB_TITLES_ROLES: ..., INDUSTRY_DOMAINS: ...
    const analysis = parseAnalysisText(analysisText);
    
    let html = '';
    
    // Personal Information Section (Editable) - Optional, only show if data exists
    if (analysis.personalInfo && (analysis.personalInfo.name || analysis.personalInfo.email)) {
        const personalInfo = analysis.personalInfo || {};
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">👤</span>
                    <h3 class="section-title">Personal Information</h3>
                </div>
                <div class="info-grid editable-grid">
                    <div class="info-item editable-item">
                        <label class="info-label">Name</label>
                        <input type="text" class="editable-input" value="${escapeHtml(personalInfo.name || '')}" data-field="name" placeholder="Enter your name">
                    </div>
                    <div class="info-item editable-item">
                        <label class="info-label">Email</label>
                        <input type="email" class="editable-input" value="${escapeHtml(personalInfo.email || '')}" data-field="email" placeholder="Enter your email">
                    </div>
                    <div class="info-item editable-item">
                        <label class="info-label">Phone</label>
                        <input type="tel" class="editable-input" value="${escapeHtml(personalInfo.phone || '')}" data-field="phone" placeholder="Enter your phone">
                    </div>
                    <div class="info-item editable-item">
                        <label class="info-label">Location</label>
                        <input type="text" class="editable-input" value="${escapeHtml(personalInfo.location || '')}" data-field="location" placeholder="Enter your location">
                    </div>
                </div>
            </div>
        `;
    }
    
    // Skills Section (Editable)
    const skills = analysis.skills || [];
    html += `
        <div class="analysis-section">
            <div class="section-header">
                <span class="section-icon">💼</span>
                <h3 class="section-title">Skills & Technologies</h3>
                <button class="add-skill-btn" onclick="addSkillTag()">+ Add Skill</button>
            </div>
            <div class="skills-list editable-skills" id="skillsList">
                ${skills.map((skill, index) => `
                    <div class="skill-tag-wrapper">
                        <input type="text" class="skill-tag editable" value="${escapeHtml(skill)}" data-index="${index}">
                        <button class="remove-skill-btn" onclick="removeSkillTag(this)">×</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Job Titles & Roles Section (Editable)
    const jobTitles = analysis.jobTitles || [];
    html += `
        <div class="analysis-section">
            <div class="section-header">
                <span class="section-icon">👔</span>
                <h3 class="section-title">Job Titles & Roles</h3>
                <button class="add-skill-btn" onclick="addJobTitleTag()">+ Add Title</button>
            </div>
            <div class="skills-list editable-skills" id="jobTitlesList">
                ${jobTitles.map((title, index) => `
                    <div class="skill-tag-wrapper">
                        <input type="text" class="skill-tag editable" value="${escapeHtml(title)}" data-index="${index}">
                        <button class="remove-skill-btn" onclick="removeSkillTag(this)">×</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Industry Domains Section (Editable)
    const industries = analysis.industries || [];
    html += `
        <div class="analysis-section">
            <div class="section-header">
                <span class="section-icon">🏢</span>
                <h3 class="section-title">Industry Domains</h3>
                <button class="add-skill-btn" onclick="addIndustryTag()">+ Add Industry</button>
            </div>
            <div class="skills-list editable-skills" id="industriesList">
                ${industries.map((industry, index) => `
                    <div class="skill-tag-wrapper">
                        <input type="text" class="skill-tag editable" value="${escapeHtml(industry)}" data-index="${index}">
                        <button class="remove-skill-btn" onclick="removeSkillTag(this)">×</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // If parsing failed or no structured data, show raw text as editable
    if (!analysis.skills.length && !analysis.jobTitles.length && !analysis.industries.length) {
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">📄</span>
                    <h3 class="section-title">Raw Analysis</h3>
                </div>
                <textarea class="editable-textarea full-textarea" placeholder="Edit your resume analysis" readonly>${escapeHtml(analysisText)}</textarea>
                <p class="analysis-note">Note: The analysis could not be parsed into structured format. Please review the raw text above.</p>
            </div>
        `;
    }
    
    analysisResults.innerHTML = html;
    
    // Store analysis data for later use
    window.currentAnalysisData = data;
    window.editedAnalysisData = parseEditedData();
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Parse edited data from the form
function parseEditedData() {
    const data = {
        personalInfo: {},
        skills: [],
        jobTitles: [],
        industries: [],
        experience: [],
        education: [],
        summary: ''
    };
    
    // Get personal info
    const nameInput = document.querySelector('input[data-field="name"]');
    const emailInput = document.querySelector('input[data-field="email"]');
    const phoneInput = document.querySelector('input[data-field="phone"]');
    const locationInput = document.querySelector('input[data-field="location"]');
    
    if (nameInput) data.personalInfo.name = nameInput.value;
    if (emailInput) data.personalInfo.email = emailInput.value;
    if (phoneInput) data.personalInfo.phone = phoneInput.value;
    if (locationInput) data.personalInfo.location = locationInput.value;
    
    // Get skills
    const skillInputs = document.querySelectorAll('#skillsList .skill-tag');
    skillInputs.forEach(input => {
        if (input.value.trim()) {
            data.skills.push(input.value.trim());
        }
    });
    
    // Get job titles
    const jobTitleInputs = document.querySelectorAll('#jobTitlesList .skill-tag');
    jobTitleInputs.forEach(input => {
        if (input.value.trim()) {
            data.jobTitles.push(input.value.trim());
        }
    });
    
    // Get industries
    const industryInputs = document.querySelectorAll('#industriesList .skill-tag');
    industryInputs.forEach(input => {
        if (input.value.trim()) {
            data.industries.push(input.value.trim());
        }
    });
    
    // Get experience
    const experienceItems = document.querySelectorAll('#experienceList .experience-item');
    experienceItems.forEach(item => {
        const title = item.querySelector('.experience-title-input')?.value || '';
        const company = item.querySelector('.experience-company-input')?.value || '';
        const period = item.querySelector('.experience-period-input')?.value || '';
        const description = item.querySelector('.experience-description')?.value || '';
        
        if (title || company || description) {
            data.experience.push({ title, company, period, description });
        }
    });
    
    // Get education
    const educationItems = document.querySelectorAll('#educationList .experience-item');
    educationItems.forEach(item => {
        const degree = item.querySelector('.experience-title-input')?.value || '';
        const school = item.querySelector('.experience-company-input')?.value || '';
        const year = item.querySelector('.experience-period-input')?.value || '';
        const description = item.querySelector('.experience-description')?.value || '';
        
        if (degree || school) {
            data.education.push({ degree, school, year, description });
        }
    });
    
    // Get summary
    const summaryTextarea = document.querySelector('.summary-textarea');
    if (summaryTextarea) {
        data.summary = summaryTextarea.value;
    }
    
    return data;
}

// Add skill tag
function addSkillTag() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;
    
    const skillCount = skillsList.children.length;
    const skillWrapper = document.createElement('div');
    skillWrapper.className = 'skill-tag-wrapper';
    skillWrapper.innerHTML = `
        <input type="text" class="skill-tag editable" value="" data-index="${skillCount}" placeholder="Enter skill">
        <button class="remove-skill-btn" onclick="removeSkillTag(this)">×</button>
    `;
    skillsList.appendChild(skillWrapper);
    skillWrapper.querySelector('.skill-tag').focus();
}

// Remove skill tag
function removeSkillTag(button) {
    button.parentElement.remove();
}

// Add experience item
function addExperienceItem() {
    const experienceList = document.getElementById('experienceList');
    if (!experienceList) return;
    
    const expCount = experienceList.children.length;
    const expItem = document.createElement('div');
    expItem.className = 'experience-item editable-item';
    expItem.setAttribute('data-index', expCount);
    expItem.innerHTML = `
        <div class="experience-header">
            <div class="experience-inputs">
                <input type="text" class="editable-input experience-title-input" value="" placeholder="Job Title">
                <input type="text" class="editable-input experience-company-input" value="" placeholder="Company">
            </div>
            <input type="text" class="editable-input experience-period-input" value="" placeholder="Period">
        </div>
        <textarea class="editable-textarea experience-description" placeholder="Job description"></textarea>
        <button class="remove-item-btn" onclick="removeExperienceItem(this)">Remove</button>
    `;
    experienceList.appendChild(expItem);
}

// Remove experience item
function removeExperienceItem(button) {
    button.closest('.experience-item').remove();
}

// Add education item
function addEducationItem() {
    const educationList = document.getElementById('educationList');
    if (!educationList) return;
    
    const eduCount = educationList.children.length;
    const eduItem = document.createElement('div');
    eduItem.className = 'experience-item editable-item';
    eduItem.setAttribute('data-index', eduCount);
    eduItem.innerHTML = `
        <div class="experience-header">
            <div class="experience-inputs">
                <input type="text" class="editable-input experience-title-input" value="" placeholder="Degree">
                <input type="text" class="editable-input experience-company-input" value="" placeholder="School">
            </div>
            <input type="text" class="editable-input experience-period-input" value="" placeholder="Year">
        </div>
        <textarea class="editable-textarea experience-description" placeholder="Additional details"></textarea>
        <button class="remove-item-btn" onclick="removeEducationItem(this)">Remove</button>
    `;
    educationList.appendChild(eduItem);
}

// Remove education item
function removeEducationItem(button) {
    button.closest('.experience-item').remove();
}

// Parse analysis text from Gemini response
function parseAnalysisText(text) {
    const result = {
        skills: [],
        jobTitles: [],
        industries: []
    };
    
    if (!text || typeof text !== 'string') {
        return result;
    }
    
    // Parse SKILLS_TECHNOLOGIES
    const skillsMatch = text.match(/SKILLS_TECHNOLOGIES:\s*(.+?)(?=JOB_TITLES_ROLES:|INDUSTRY_DOMAINS:|$)/is);
    if (skillsMatch) {
        result.skills = skillsMatch[1]
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
    }
    
    // Parse JOB_TITLES_ROLES
    const jobTitlesMatch = text.match(/JOB_TITLES_ROLES:\s*(.+?)(?=INDUSTRY_DOMAINS:|SKILLS_TECHNOLOGIES:|$)/is);
    if (jobTitlesMatch) {
        result.jobTitles = jobTitlesMatch[1]
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
    }
    
    // Parse INDUSTRY_DOMAINS
    const industriesMatch = text.match(/INDUSTRY_DOMAINS:\s*(.+?)(?=SKILLS_TECHNOLOGIES:|JOB_TITLES_ROLES:|$)/is);
    if (industriesMatch) {
        result.industries = industriesMatch[1]
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
    }
    
    return result;
}

// Add job title tag
function addJobTitleTag() {
    const jobTitlesList = document.getElementById('jobTitlesList');
    if (!jobTitlesList) return;
    
    const count = jobTitlesList.children.length;
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-tag-wrapper';
    wrapper.innerHTML = `
        <input type="text" class="skill-tag editable" value="" data-index="${count}" placeholder="Enter job title">
        <button class="remove-skill-btn" onclick="removeSkillTag(this)">×</button>
    `;
    jobTitlesList.appendChild(wrapper);
    wrapper.querySelector('.skill-tag').focus();
}

// Add industry tag
function addIndustryTag() {
    const industriesList = document.getElementById('industriesList');
    if (!industriesList) return;
    
    const count = industriesList.children.length;
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-tag-wrapper';
    wrapper.innerHTML = `
        <input type="text" class="skill-tag editable" value="" data-index="${count}" placeholder="Enter industry">
        <button class="remove-skill-btn" onclick="removeSkillTag(this)">×</button>
    `;
    industriesList.appendChild(wrapper);
    wrapper.querySelector('.skill-tag').focus();
}

// Show error message
function showError(message) {
    const analysisResults = document.getElementById('analysisResults');
    analysisResults.classList.remove('hidden');
    analysisResults.innerHTML = `
        <div class="analysis-section">
            <div class="section-header">
                <span class="section-icon">⚠️</span>
                <h3 class="section-title">Error</h3>
            </div>
            <div class="section-content" style="color: #ff4444;">${message}</div>
        </div>
    `;
}

// Go back to form
function goBackToForm() {
    const jobSearchPage = document.getElementById('jobSearchPage');
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    
    resumeAnalysisPage.classList.add('hidden');
    jobSearchPage.classList.remove('hidden');
    
    window.scrollTo(0, 0);
}

// Search jobs from analysis - search for each skill separately
async function searchJobsFromAnalysis() {
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    
    resumeAnalysisPage.classList.add('hidden');
    jobResultsPage.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Get edited analysis data or original data
    const editedData = window.editedAnalysisData || parseEditedData();
    const originalData = window.currentAnalysisData;
    
    // Parse skills from edited data or original analysis
    let allSkills = [];
    let jobTitles = [];
    
    if (editedData && editedData.skills && editedData.skills.length > 0) {
        allSkills = editedData.skills;
    } else if (originalData && originalData.remoteResponse) {
        const analysisText = originalData.remoteResponse;
        const parsed = parseAnalysisText(analysisText);
        allSkills = parsed.skills || [];
        jobTitles = parsed.jobTitles || [];
    }
    
    // If no skills found, try to get from analysis text directly
    if (allSkills.length === 0 && originalData && originalData.remoteResponse) {
        const analysisText = originalData.remoteResponse;
        const skillsMatch = analysisText.match(/SKILLS_TECHNOLOGIES:\s*(.+?)(?=JOB_TITLES_ROLES:|INDUSTRY_DOMAINS:|$)/is);
        if (skillsMatch) {
            allSkills = skillsMatch[1]
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);
        }
    }
    
    // If still no skills, use job titles as search terms
    if (allSkills.length === 0 && jobTitles.length > 0) {
        allSkills = jobTitles;
    }
    
    // Fallback if no skills or job titles
    if (allSkills.length === 0) {
        allSkills = ['developer'];
    }
    
    console.log('Searching jobs for skills:', allSkills);

    // --- Show loading state ---
    const jobCardsContainer = document.getElementById('jobCardsContainer');
    jobCardsContainer.innerHTML = '<div class="loading-indicator"><div class="spinner"></div><p>Searching jobs for your skills...</p></div>';
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) resultsCount.textContent = '0';

    // Search for each skill separately and combine results
    const allJobs = [];
    const jobIdSet = new Set(); // To avoid duplicates
    
    try {
        // Search for each skill
        const searchPromises = allSkills.map(skill => {
            const searchQuery = `${skill} developer jobs`;
            console.log(`Searching for: ${searchQuery}`);
            
            return axios.get('http://127.0.0.1:3000/api/search/jobs', {
                params: {
                    query: searchQuery,
                    page: 1,
                    num_pages: 1
                }
            })
            .then(response => {
                const jobs = response.data.data || [];
                // Add skill information to each job and filter duplicates
                return jobs.map(job => {
                    const jobId = job.job_id || job.job_title + job.job_city;
                    if (!jobIdSet.has(jobId)) {
                        jobIdSet.add(jobId);
                        job.matchedSkill = skill;
                        return job;
                    }
                    return null;
                }).filter(job => job !== null);
            })
            .catch(error => {
                console.error(`Error searching for ${skill}:`, error);
                return [];
            });
        });
        
        // Wait for all searches to complete
        const searchResults = await Promise.all(searchPromises);
        
        // Combine all results
        searchResults.forEach(jobs => {
            allJobs.push(...jobs);
        });
        
        console.log(`Found ${allJobs.length} total jobs from ${allSkills.length} skills`);
        
        // Display results
        jobCardsContainer.innerHTML = '';
        
        if (allJobs.length === 0) {
            jobCardsContainer.innerHTML = `
                <div class="no-jobs-message">
                    <p>No jobs found for your skills: ${allSkills.join(', ')}</p>
                    <p>Try editing your skills in the analysis results page.</p>
                </div>
            `;
        } else {
            // Sort by relevance (jobs with matched skills first)
            allJobs.sort((a, b) => {
                // Prioritize jobs that match multiple skills
                return (b.matchedSkill ? 1 : 0) - (a.matchedSkill ? 1 : 0);
            });
            
            allJobs.forEach(job => {
                const title = job.job_title || job.title || 'No Title';
                const salary = job.job_min_salary && job.job_max_salary 
                    ? `$${job.job_min_salary.toLocaleString()} - $${job.job_max_salary.toLocaleString()}`
                    : job.job_min_salary 
                    ? `$${job.job_min_salary.toLocaleString()}+`
                    : job.salary || 'Salary not specified';
                const location = job.job_city && job.job_country
                    ? `${job.job_city}, ${job.job_country}`
                    : job.job_city
                    ? job.job_city
                    : job.job_country
                    ? job.job_country
                    : job.location || 'Remote';
                const description = job.job_description 
                    ? job.job_description.substring(0, 200) + '...' 
                    : job.job_highlights?.items?.join(' ')?.substring(0, 200) + '...'
                    || 'No description available.';
                const applyLink = job.job_apply_link || job.job_google_link || job.url || '#';
                const company = job.employer_name || job.company_name || 'Company not specified';
                const matchedSkill = job.matchedSkill || '';

                const card = document.createElement('div');
                card.className = 'job-card';
                card.innerHTML = `
                    <div class="job-card-header">
                        <div>
                            <h3 class="job-title">${escapeHtml(title)}</h3>
                            <div class="job-company">${escapeHtml(company)}</div>
                            <div class="job-meta">
                                <div class="meta-item">
                                    <span class="meta-label">💰 Salary:</span>
                                    <span class="meta-value">${escapeHtml(salary)}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">📍 Location:</span>
                                    <span class="meta-value">${escapeHtml(location)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${matchedSkill ? `
                        <div class="matched-skill-badge">
                            <span class="badge-icon">🎯</span>
                            Matched: <strong>${escapeHtml(matchedSkill)}</strong>
                        </div>
                    ` : ''}
                    <div class="match-section">
                        <h4 class="match-title">Job Description</h4>
                        <div class="section-content">${escapeHtml(description)}</div>
                    </div>
                    <div class="job-card-footer">
                        <a href="${applyLink}" target="_blank" rel="noopener noreferrer" class="apply-btn">Apply</a>
                    </div>
                `;
                jobCardsContainer.appendChild(card);
            });
        }
        
        // Update results count
        if (resultsCount) {
            resultsCount.textContent = allJobs.length;
        }
        
        // Show load more button if there are results
        if (loadMoreBtn && allJobs.length > 0) {
            loadMoreBtn.classList.remove('hidden');
        }
        
    } catch (error) {
        jobCardsContainer.innerHTML = `
            <div class="error-message">
                <p style="color:#ff4444;">Failed to load jobs. Please try again.</p>
                <p style="color:#666; font-size:14px;">Error: ${error.message}</p>
            </div>
        `;
        console.error('JSearch API error:', error);
    }
}

// Close auth page when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const authPage = document.getElementById('authPage');
    if (authPage) {
        authPage.addEventListener('click', function(e) {
            if (e.target === authPage) {
                closeAuthPage();
            }
        });
    }
    
    // Add form submission handler
    const form = document.getElementById('jobSearchForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});


