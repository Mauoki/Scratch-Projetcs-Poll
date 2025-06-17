// This file handles the functionality for the public voting page, including displaying projects, managing votes using localStorage, and updating the vote counts.

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');
    const voteButtons = document.querySelectorAll('.vote-button');

    // Fetch projects from JSON file
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(data => {
            displayProjects(data);
        })
        .catch(error => console.error('Error fetching projects:', error));

    function displayProjects(projects) {
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <iframe src="${project.scratchLink}" width="400" height="300"></iframe>
                <p>Votes: <span id="votes-${project.id}">${getVoteCount(project.id)}</span></p>
                <button class="vote-button" data-id="${project.id}">Vote</button>
            `;

            projectsContainer.appendChild(projectElement);
        });

        // Add event listeners to vote buttons
        voteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-id');
                castVote(projectId);
            });
        });
    }

    function castVote(projectId) {
        let votes = JSON.parse(localStorage.getItem('votes')) || {};
        votes[projectId] = (votes[projectId] || 0) + 1;
        localStorage.setItem('votes', JSON.stringify(votes));
        updateVoteCount(projectId);
    }

    function updateVoteCount(projectId) {
        const voteCountElement = document.getElementById(`votes-${projectId}`);
        voteCountElement.textContent = getVoteCount(projectId);
    }

    function getVoteCount(projectId) {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        return votes[projectId] || 0;
    }
});