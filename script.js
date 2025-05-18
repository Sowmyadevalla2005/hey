document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDetails = document.getElementById('modal-project-details');
    const closeButton = document.querySelector('.close-button');
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.style.cursor = 'pointer'; // Indicate clickable
        project.addEventListener('click', () => {
            const title = project.getAttribute('data-title');
            const details = project.getAttribute('data-details').split('|'); // Split details by |

            modalTitle.textContent = title;
            modalDetails.innerHTML = ''; // Clear previous details
            const detailsList = document.createElement('ul');
            details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                detailsList.appendChild(li);
            });
            modalDetails.appendChild(detailsList);

            modal.style.display = 'block';
        });
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when the user clicks outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add fade-in animation on scroll
const sections = document.querySelectorAll('section');

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            // Optionally stop observing once it's appeared if not dynamic
            // observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the section is visible
});

sections.forEach(section => {
    // Don't add fade-in to the hero section as it's usually visible on load
    if (!section.classList.contains('hero')) {
        section.classList.add('fade-in'); // Add the base fade-in class initially
        fadeInObserver.observe(section);
    }
});

// Accordion functionality for all sections
const accordionHeadings = document.querySelectorAll('section:not(.hero) h2');

accordionHeadings.forEach(heading => {
    const sectionDetails = heading.nextElementSibling; // Get the next sibling, which should be .section-details
    const toggleIcon = heading.querySelector('.toggle-icon');

    // Hide details by default and set initial icon position
    if (sectionDetails && sectionDetails.classList.contains('section-details')) {
        sectionDetails.classList.remove('show');
        if (toggleIcon) {
             toggleIcon.style.transform = 'rotate(0deg)'; // Initially point down
        }
    }

    heading.addEventListener('click', () => {
        // Find the .section-details sibling
        const targetDetails = heading.nextElementSibling;
        const targetIcon = heading.querySelector('.toggle-icon');

        if (targetDetails && targetDetails.classList.contains('section-details')) {
            const isVisible = targetDetails.classList.contains('show');

            // Close all other open accordions (optional, but common)
            accordionHeadings.forEach(otherHeading => {
                if (otherHeading !== heading) {
                    const otherDetails = otherHeading.nextElementSibling;
                    const otherIcon = otherHeading.querySelector('.toggle-icon');
                    if (otherDetails && otherDetails.classList.contains('section-details') && otherDetails.classList.contains('show')) {
                         otherDetails.classList.remove('show');
                         if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                         }
                    }
                }
            });

            // Toggle the clicked section's details
            if (isVisible) {
                targetDetails.classList.remove('show');
                if (targetIcon) {
                    targetIcon.style.transform = 'rotate(0deg)'; // Rotate down
                }
            } else {
                targetDetails.classList.add('show');
                 if (targetIcon) {
                    targetIcon.style.transform = 'rotate(180deg)'; // Rotate up
                }
            }
        }
    });
});

// Remove the specific Education section accordion code
// const educationHeading = document.querySelector('#education h2');
// const educationDetails = document.querySelector('#education .education-details');
// const educationToggleIcon = document.querySelector('#education .toggle-icon');
//
// educationHeading.addEventListener('click', () => {
//     const isVisible = educationDetails.classList.contains('show');
//     if (isVisible) {
//         educationDetails.classList.remove('show');
//         educationToggleIcon.style.transform = 'rotate(0deg)'; // Rotate down
//     } else {
//         educationDetails.classList.add('show');
//         educationToggleIcon.style.transform = 'rotate(180deg)'; // Rotate up
//     }
// }); 
