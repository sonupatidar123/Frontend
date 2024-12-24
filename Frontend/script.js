document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const categoriesLink = document.querySelector('.categories-link');
    const categoriesDropdown = document.querySelector('.categories-dropdown');
    const trendingBtn = document.getElementById('trending-btn');
    const trendingSection = document.getElementById('trending-section');
    const fieldContainer = document.querySelector('.field-container');
    const fieldTitle = document.getElementById('field-title');
    const searchSection = document.querySelector('.centered-search');
    const examsBox = document.getElementById('exams-box');
    const coursesBox = document.getElementById('courses-box');

    const data = {
        "Engineering": {
            exams: ["JEE Main", "JEE Advanced", "GATE", "State CETs"],
            courses: ["B.Tech", "M.Tech", "Diploma", "PhD"]
        },
        "Medical": {
            exams: ["NEET", "AIIMS"],
            courses: ["MBBS", "BDS", "BAMS", "BHMS"]
        },
        "Law": {
            exams: ["CLAT", "AILET", "LSAT India"],
            courses: ["BA LLB", "BBA LLB"]
        },
        "Management": {
            exams: ["CAT", "XAT", "CMAT", "NMAT"],
            courses: ["BBA", "MBA", "PGDM"]
        },
        "Defense": {
            exams: ["NDA", "CDS", "AFCAT", "CAPF"],
            courses: []
        },
        "Sarkari Jobs": {
            exams: ["SSC CGL", "SSC CHSL", "SSC JE"],
            courses: []
        },
        "Railways": {
            exams: ["RRB NTPC", "RRB Group D"],
            courses: []
        },
        "Civil Services": {
            exams: ["UPSC CSE", "State PCS"],
            courses: []
        },
        "Competitive Exams": {
            exams: ["GATE"],
            courses: ["M.Tech"]
        },
        "Higher School": {
            exams: [],
            courses: ["B.Sc.", "BA", "M.Sc.", "MA"]
        },
        "Others": {
            exams: [],
            courses: []
        }
    };

    // Add click event listener to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');
        });
    });

    // Toggle Categories Dropdown
    categoriesLink.addEventListener('click', function (e) {
        e.preventDefault();
        categoriesDropdown.classList.toggle('show');
        trendingSection.classList.remove('show'); // Close trending when categories are opened
    });

    // Toggle Trending Section
    trendingBtn.addEventListener('click', function () {
        trendingSection.classList.toggle('clicked');
        if (trendingSection.classList.contains('clicked')) {
            trendingSection.classList.add('show');
        } else {
            trendingSection.classList.remove('show');
        }
        categoriesDropdown.classList.remove('show'); // Close categories dropdown if open
    });

    // Close dropdowns if clicking outside
    document.addEventListener('click', function (e) {
        if (!categoriesLink.contains(e.target) && !categoriesDropdown.contains(e.target)) {
            categoriesDropdown.classList.remove('show');
        }
        if (!trendingBtn.contains(e.target) && !trendingSection.contains(e.target)) {
            trendingSection.classList.remove('show');
            trendingSection.classList.remove('clicked');
        }
    });

    // Handle category selection
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', function () {
            const selectedCategory = this.textContent;
            if (fieldTitle.textContent === selectedCategory && fieldContainer.style.display === 'block') {
                fieldContainer.style.display = 'none';
                searchSection.style.marginTop = '10px'; // Reset search bar position
                fieldTitle.classList.remove('active');
            } else {
                fieldTitle.textContent = selectedCategory;
                fieldContainer.style.display = 'block';
                fieldContainer.style.animation = 'fadeIn 1s ease-in-out forwards';
                searchSection.style.marginTop = '50px'; // Adjust search bar position
                fieldTitle.classList.add('active');

                // Update exams and courses based on selected category
                const { exams, courses } = data[selectedCategory];
                examsBox.innerHTML = `<h5>Exams</h5><ul>${exams.map(exam => `<li class="clickable">${exam}</li>`).join('')}</ul>`;
                coursesBox.innerHTML = `<h5>Courses</h5><ul>${courses.map(course => `<li class="clickable">${course}</li>`).join('')}</ul>`;

                // Add click event listeners to the new exam and course items
                addClickableEventListeners();
            }
            categoriesDropdown.classList.remove('show'); // Close categories dropdown when a field is selected
        });
    });

    // Handle field title click
    fieldTitle.addEventListener('click', function () {
        if (fieldContainer.style.display === 'block') {
            fieldContainer.style.display = 'none';
            searchSection.style.marginTop = '10px'; // Reset search bar position
            fieldTitle.classList.remove('active');
        } else {
            fieldContainer.style.display = 'block';
            fieldContainer.style.animation = 'fadeIn 1s ease-in-out forwards';
            searchSection.style.marginTop = '50px'; // Adjust search bar position
            fieldTitle.classList.add('active');
        }
    });

    // Ensure trending section slides in from the left when hovered
    trendingBtn.addEventListener('mouseenter', function () {
        if (!trendingSection.classList.contains('clicked')) {
            trendingSection.classList.add('show');
        }
    });
    trendingSection.addEventListener('mouseleave', function () {
        if (!trendingSection.classList.contains('clicked')) {
            trendingSection.classList.remove('show');
        }
    });

    // Ensure trending section stays open when clicked
    trendingBtn.addEventListener('click', function () {
        trendingSection.classList.toggle('clicked');
        if (trendingSection.classList.contains('clicked')) {
            trendingSection.classList.add('show');
        } else {
            trendingSection.classList.remove('show');
        }
    });

    const detailsCard = document.createElement('div');
    detailsCard.classList.add('details-card');
    detailsCard.innerHTML = `
        <button class="close-btn">&times;</button>
        <h2 id="details-title"></h2>
        <div class="section" id="syllabus-section">
            <h3>Syllabus</h3>
            <ul id="syllabus-list"></ul>
        </div>
        <div class="section" id="roadmap-section">
            <h3>Roadmap</h3>
            <ul id="roadmap-list"></ul>
        </div>
        <div class="section" id="books-section">
            <h3>Books and Resources</h3>
            <ul id="books-list"></ul>
        </div>
        <div class="section" id="videos-section">
            <h3>Videos</h3>
            <ul id="videos-list"></ul>
        </div>
        <div class="section" id="links-section">
            <h3>Important Links</h3>
            <ul id="links-list"></ul>
        </div>
        <div class="section" id="colleges-section">
            <h3>Colleges</h3>
            <ul id="colleges-list"></ul>
        </div>
    `;
    document.body.appendChild(detailsCard);

    const closeBtn = detailsCard.querySelector('.close-btn');
    closeBtn.addEventListener('click', function () {
        detailsCard.classList.remove('show');
    });

    function showDetails(title, details) {
        document.getElementById('details-title').textContent = title;
        document.getElementById('syllabus-list').innerHTML = details.syllabus.map(item => `<li>${item}</li>`).join('');
        document.getElementById('roadmap-list').innerHTML = details.roadmap.map(item => `<li>${item}</li>`).join('');
        document.getElementById('books-list').innerHTML = details.books.map(item => `<li>${item}</li>`).join('');
        document.getElementById('videos-list').innerHTML = details.videos.map(item => `<li>${item}</li>`).join('');
        document.getElementById('links-list').innerHTML = details.links.map(item => `<li>${item}</li>`).join('');
        document.getElementById('colleges-list').innerHTML = details.colleges.map(item => `<li>${item}</li>`).join('');
        detailsCard.classList.add('show');
    }

    // Example details data
    const detailsData = {
        "JEE Main": {
            syllabus: ["Physics", "Chemistry", "Mathematics"],
            roadmap: ["Step 1", "Step 2", "Step 3"],
            books: ["Book 1", "Book 2", "Book 3"],
            videos: ["Video 1", "Video 2", "Video 3"],
            links: ["Link 1", "Link 2", "Link 3"],
            colleges: ["College 1", "College 2", "College 3"]
        },
        // Add more details data for other exams and courses
    };

    function addClickableEventListeners() {
        document.querySelectorAll('.clickable').forEach(item => {
            item.addEventListener('click', function () {
                const itemName = this.textContent;
                // Navigate to the details page with the item name as a query parameter
                window.location.href = `details.html?name=${encodeURIComponent(itemName)}`;
            });
        });
    }

    // Call the function to add event listeners initially
    addClickableEventListeners();

    document.querySelectorAll('.clickable').forEach(item => {
        item.addEventListener('click', function () {
            const itemName = this.textContent;
            if (detailsData[itemName]) {
                showDetails(itemName, detailsData[itemName]);
            } else {
                console.log(`No details available for ${itemName}`);
            }
        });
    });
});
