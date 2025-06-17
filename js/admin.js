// This file manages the administration functionalities, including adding new projects, editing existing ones, and displaying the current vote counts.

const password = "admin123"; // Simple password for admin access
let projects = [];

// Fetch projects from JSON file
async function fetchProjects() {
    const response = await fetch('data/projects.json');
    projects = await response.json();
    displayProjects();
}

// Display projects in the admin panel
function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button onclick="editProject(${index})">Edit</button>
            <button onclick="deleteProject(${index})">Delete</button>
        `;
        projectList.appendChild(projectItem);
    });
}

// Add a new project
function addProject() {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;

    if (title && description) {
        const newProject = { title, description, votes: 0 };
        projects.push(newProject);
        saveProjects();
        displayProjects();
    }
}

// Edit an existing project
function editProject(index) {
    const title = prompt("Edit project title:", projects[index].title);
    const description = prompt("Edit project description:", projects[index].description);

    if (title && description) {
        projects[index].title = title;
        projects[index].description = description;
        saveProjects();
        displayProjects();
    }
}

// Delete a project
function deleteProject(index) {
    if (confirm("Are you sure you want to delete this project?")) {
        projects.splice(index, 1);
        saveProjects();
        displayProjects();
    }
}

// Save projects to JSON file (simulated)
function saveProjects() {
    // In a real application, you would send a request to the server to save the updated projects
    console.log("Projects saved:", projects);
}

// Admin login
function adminLogin() {
    const inputPassword = document.getElementById('admin-password').value;
    if (inputPassword === password) {
        document.getElementById('admin-panel').style.display = 'block';
        fetchProjects();
    } else {
        alert("Incorrect password!");
    }
}

// Event listeners
document.getElementById('admin-login-button').addEventListener('click', adminLogin);
document.getElementById('add-project-button').addEventListener('click', addProject);