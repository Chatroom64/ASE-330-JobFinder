// Initialize form with default fields
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// Initialize form with 4 default rows (each row has Job Title and Years of Experience)
function initializeForm() {
    // Initialize 4 default rows
    const container = document.getElementById('jobCriteriaContainer');
    for (let i = 0; i < 4; i++) {
        addJobCriteriaRow();
    }
}

// Navigate to main page
function goToMainPage() {
    const mainPage = document.getElementById('mainPage');
    const jobSearchPage = document.getElementById('jobSearchPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    const authPage = document.getElementById('authPage');
    
    // Hide all pages
    jobSearchPage.classList.add('hidden');
    jobResultsPage.classList.add('hidden');
    resumeAnalysisPage.classList.add('hidden');
    authPage.classList.add('hidden');
    
    // Show main page
    mainPage.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show job search form page
function showJobSearchForm() {
    const mainPage = document.getElementById('mainPage');
    const jobSearchPage = document.getElementById('jobSearchPage');
    
    mainPage.classList.add('hidden');
    jobSearchPage.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Cancel form and return to main page
function cancelForm() {
    const mainPage = document.getElementById('mainPage');
    const jobSearchPage = document.getElementById('jobSearchPage');
    
    jobSearchPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    
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
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log('Resume analyzed successfully:', response.data);
        hideLoadingIndicator();
        displayAnalysisResults(response.data);
    })
    .catch(error => {
        console.error('Error analyzing resume:', error);
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

function handleLogin(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // In a real app, this would send to a server
    console.log('Login attempt:', { email, rememberMe });
    
    // Close auth page immediately
    closeAuthPage();
    
    // You could update the UI to show the user is logged in
    // For example, change "Account" button to show user name
    // For demo purposes, we'll just log it
    console.log(`User logged in: ${email}`);
}

function handleSignup(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // In a real app, this would send to a server
    console.log('Signup attempt:', { name, email });
    
    // Switch to login tab
    switchAuthTab('login');
    
    // Pre-fill email in login form
    document.getElementById('loginEmail').value = email;
    
    // For demo purposes, just log the success
    console.log(`Account created: ${name} (${email})`);
}

// Show resume analysis page
function showResumeAnalysisPage() {
    const mainPage = document.getElementById('mainPage');
    const jobSearchPage = document.getElementById('jobSearchPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    const authPage = document.getElementById('authPage');
    
    // Hide all pages
    mainPage.classList.add('hidden');
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
    
    loadingIndicator.classList.add('hidden');
}

// Display analysis results
function displayAnalysisResults(data) {
    const analysisResults = document.getElementById('analysisResults');
    analysisResults.classList.remove('hidden');
    
    // Parse the analysis data (assuming it comes from Gemini API)
    // The structure may vary based on your API response
    const analysis = data.analysis || data;
    
    let html = '';
    
    // Personal Information Section
    if (analysis.personalInfo || analysis.name || analysis.email) {
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">👤</span>
                    <h3 class="section-title">Personal Information</h3>
                </div>
                <div class="info-grid">
                    ${analysis.name ? `
                        <div class="info-item">
                            <span class="info-label">Name</span>
                            <span class="info-value">${analysis.name}</span>
                        </div>
                    ` : ''}
                    ${analysis.email ? `
                        <div class="info-item">
                            <span class="info-label">Email</span>
                            <span class="info-value">${analysis.email}</span>
                        </div>
                    ` : ''}
                    ${analysis.phone ? `
                        <div class="info-item">
                            <span class="info-label">Phone</span>
                            <span class="info-value">${analysis.phone}</span>
                        </div>
                    ` : ''}
                    ${analysis.location ? `
                        <div class="info-item">
                            <span class="info-label">Location</span>
                            <span class="info-value">${analysis.location}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Skills Section
    if (analysis.skills && analysis.skills.length > 0) {
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">💼</span>
                    <h3 class="section-title">Skills</h3>
                </div>
                <div class="skills-list">
                    ${analysis.skills.map(skill => `
                        <span class="skill-tag">${skill}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Experience Section
    if (analysis.experience && analysis.experience.length > 0) {
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">💼</span>
                    <h3 class="section-title">Work Experience</h3>
                </div>
                ${analysis.experience.map(exp => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <div>
                                <div class="experience-title">${exp.title || exp.position || 'N/A'}</div>
                                <div class="experience-company">${exp.company || exp.employer || 'N/A'}</div>
                            </div>
                            ${exp.period || exp.duration ? `
                                <div class="experience-period">${exp.period || exp.duration}</div>
                            ` : ''}
                        </div>
                        ${exp.description ? `
                            <div class="experience-description">${exp.description}</div>
                        ` : ''}
                        ${exp.achievements && exp.achievements.length > 0 ? `
                            <ul class="experience-achievements">
                                ${exp.achievements.map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Education Section
    if (analysis.education && analysis.education.length > 0) {
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">🎓</span>
                    <h3 class="section-title">Education</h3>
                </div>
                ${analysis.education.map(edu => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <div>
                                <div class="experience-title">${edu.degree || edu.qualification || 'N/A'}</div>
                                <div class="experience-company">${edu.school || edu.institution || 'N/A'}</div>
                            </div>
                            ${edu.year || edu.period ? `
                                <div class="experience-period">${edu.year || edu.period}</div>
                            ` : ''}
                        </div>
                        ${edu.description ? `
                            <div class="experience-description">${edu.description}</div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Summary Section (if available)
    if (analysis.summary || analysis.overview) {
        html += `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">📝</span>
                    <h3 class="section-title">Summary</h3>
                </div>
                <div class="section-content">${analysis.summary || analysis.overview}</div>
            </div>
        `;
    }
    
    // If no structured data, display raw analysis text
    if (!html && (analysis.text || analysis.analysisText || typeof analysis === 'string')) {
        html = `
            <div class="analysis-section">
                <div class="section-header">
                    <span class="section-icon">📄</span>
                    <h3 class="section-title">Analysis Results</h3>
                </div>
                <div class="section-content">${analysis.text || analysis.analysisText || analysis}</div>
            </div>
        `;
    }
    
    analysisResults.innerHTML = html;
    
    // Store analysis data for later use
    window.currentAnalysisData = data;
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

// Search jobs from analysis
function searchJobsFromAnalysis() {
    // Use the analysis data to search for jobs
    // For now, navigate to job results page
    // In a real implementation, you would send the analysis data to the server
    // to get matching jobs
    
    const resumeAnalysisPage = document.getElementById('resumeAnalysisPage');
    const jobResultsPage = document.getElementById('jobResultsPage');
    
    resumeAnalysisPage.classList.add('hidden');
    jobResultsPage.classList.remove('hidden');
    
    // Generate and display jobs based on analysis
    // This is a placeholder - in real implementation, you'd fetch from server
    currentJobIndex = 0;
    allJobs = generateMockJobs(10);
    
    document.getElementById('jobCardsContainer').innerHTML = '';
    document.getElementById('loadMoreBtn').classList.remove('hidden');
    
    displayJobs(allJobs);
    currentJobIndex = allJobs.length;
    
    window.scrollTo(0, 0);
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

