// Mobile Menu Toggle (will complete next)
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll reveal animation setup
    // Will add AOS library later
});


// Add to main.js
// Scroll animation trigger
function checkVisibility() {
    const aboutSection = document.querySelector('.about-content');
    const rect = aboutSection.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8);
    
    if (isVisible) {
        aboutSection.classList.add('visible');
        window.removeEventListener('scroll', checkVisibility);
    }
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') 
            ? '<i class="bx bx-x"></i>' 
            : '<i class="bx bx-menu"></i>';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
        });
    });
    
    // Existing smooth scroll and visibility checks...
});


// Update checkVisibility function
function checkVisibility() {
    const elements = document.querySelectorAll('.about-content, .timeline-item');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Timeline Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const timelineCards = document.querySelectorAll('.timeline-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter cards
        const filter = button.dataset.filter;
        
        timelineCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Horizontal scroll animation
const timelineScroll = document.querySelector('.timeline-scroll');
let isDown = false;
let startX;
let scrollLeft;

timelineScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - timelineScroll.offsetLeft;
    scrollLeft = timelineScroll.scrollLeft;
});

timelineScroll.addEventListener('mouseleave', () => {
    isDown = false;
});

timelineScroll.addEventListener('mouseup', () => {
    isDown = false;
});

timelineScroll.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineScroll.offsetLeft;
    const walk = (x - startX) * 2;
    timelineScroll.scrollLeft = scrollLeft - walk;
});


// Project Data - Mix of GitHub and Dummy Projects
const dummyProjects = [
    {
        name: "Sales Data Analysis",
        description: "Interactive Power BI dashboard analyzing sales trends across multiple regions with predictive insights.",
        skills: ["Power BI", "Data Visualization", "DAX", "SQL"],
        category: "data",
        links: {
            live: "#",
            code: "#"
        },
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Database Management System",
        description: "University database system with complex queries, stored procedures, and optimization techniques.",
        skills: ["SQL", "Oracle", "Database Design", "Normalization"],
        category: "sql",
        links: {
            live: "#",
            code: "#"
        },
        image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
];

// Fetch GitHub Projects
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/dinesh12042003/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        return repos.map(repo => {
            // Categorize based on repo topics/language
            let category = 'web';
            if (repo.topics && repo.topics.includes('machine-learning')) category = 'ai';
            if (repo.language === 'Jupyter Notebook') category = 'data';
            
            return {
                name: repo.name,
                description: repo.description || 'No description available',
                skills: repo.topics || [repo.language || 'Code'],
                category: category,
                links: {
                    live: repo.homepage || `https://dinesh12042003.github.io/${repo.name}`,
                    code: repo.html_url
                },
                image: `https://opengraph.githubassets.com/1/dinesh12042003/${repo.name}`
            };
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const seeMoreBtn = document.getElementById('see-more-btn');
    let currentFilter = 'all';
    let isExpanded = false;
    const maxInitial = 6; // Show first 6 projects by default

    // Initialize - always show the button
    seeMoreBtn.style.display = 'flex';
    updateProjectVisibility();
    updateSeeMoreButton();

    // See More button functionality
    seeMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        updateProjectVisibility();
        updateSeeMoreButton();
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            isExpanded = false; // Reset expansion when changing filters
            updateProjectVisibility();
            updateSeeMoreButton();
        });
    });

    function updateProjectVisibility() {
        let visibleCount = 0;
        
        projectCards.forEach((card) => {
            const matchesFilter = currentFilter === 'all' || card.dataset.category === currentFilter;
            
            if (matchesFilter) {
                if (isExpanded || visibleCount < maxInitial) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });
    }

    function updateSeeMoreButton() {
        const matchingProjects = Array.from(projectCards).filter(card => 
            currentFilter === 'all' || card.dataset.category === currentFilter
        );
        
        if (matchingProjects.length <= maxInitial) {
            // Disable button if <= maxInitial projects
            seeMoreBtn.disabled = true;
            seeMoreBtn.classList.add('disabled');
        } else {
            // Enable button if > maxInitial projects
            seeMoreBtn.disabled = false;
            seeMoreBtn.classList.remove('disabled');
        }
        
        // Update button text
        seeMoreBtn.innerHTML = isExpanded 
            ? '<span>Show Less</span><i class="bx bx-chevron-up"></i>'
            : '<span>See More</span><i class="bx bx-chevron-down"></i>';
    }
});



// Update to include projects
function checkVisibility() {
    const elements = document.querySelectorAll('.about-content, .timeline-item, .project-card');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
            el.classList.add('visible');
        }
    });
}


// Update year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Footer theme toggle (for mobile)
const footerThemeToggle = document.getElementById('theme-toggle-footer');
if (footerThemeToggle) {
    footerThemeToggle.addEventListener('click', () => {
        document.getElementById('theme-toggle').click(); // Trigger main toggle
    });
    
    // Sync icon state
    document.addEventListener('DOMContentLoaded', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        footerThemeToggle.innerHTML = currentTheme === 'dark' 
            ? '<i class="bx bx-sun"></i>'
            : '<i class="bx bx-moon"></i>';
    });
}


// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// Skills logo animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

function animateSkills() {
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Trigger when section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.querySelector('.skills-logos');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}



document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
    }
});
