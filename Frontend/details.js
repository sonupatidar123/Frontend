document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('name');
    const detailsTitle = document.getElementById('details-title');
    const syllabusSection = document.getElementById('syllabus-section');
    const roadmapSection = document.getElementById('roadmap-section');
    const booksSection = document.getElementById('books-section');
    const videosSection = document.getElementById('videos-section');
    const linksSection = document.getElementById('links-section');
    const collegesSection = document.getElementById('colleges-section');
    const selectedOption = document.getElementById('selected-option');

    // Example details data
    const detailsData = {
        "JEE Main": {
            syllabus: ["<a href='https://drive.google.com/drive/folders/0B2rBz2I_ncambWd2TkZlTjhMOXM?ddrp=1B&resourcekey=0-bMRGwJpFaB9sPJLiEI915Q' target='_blank'>JEE Main Syllabus</a>"],
            roadmap: [""],
            books: [
                "<a href='https://drive.google.com/file/d/1z6o-S2JSaKR0Zea9Hxr1WN0oKFvdk2Yn/view' target='_blank'>Physical Chemistry by O.P. Tandon</a>",
                "<a href='https://drive.google.com/file/d/1vEG8HmrvYHWJiMfwrRLuDsf_5yoCJtVx/view' target='_blank'>Organic Chemistry by O.P. Tandon</a>",
                "<a href='https://drive.google.com/file/d/1Ak972gTHvvwSOKBelz2RFessWB_-mJJj/edit' target='_blank'>Inorganic Chemistry by J.D. Lee</a>"
            ],
            videos: ["<a href='https://www.youtube.com/watch?v=example1' target='_blank'>Physics Video 1</a>", "<a href='https://www.youtube.com/watch?v=example2' target='_blank'>Chemistry Video 1</a>", "<a href='https://www.youtube.com/watch?v=example3' target='_blank'>Mathematics Video 1</a>"],
            links: ["<a href='https://jeemain.nta.nic.in/' target='_blank'>JEE Main Official Website</a>", "<a href='https://www.example.com/jee-main-preparation' target='_blank'>JEE Main Preparation Tips</a>"],
            colleges: ["<a href = 'https://collegedunia.com/jee-main-score-accepting-colleges' target='_blank'>JEE Main Accepting Colleges</a>"]
        },
        "NEET": {
            syllabus: ["Biology", "Chemistry", "Physics"],
            roadmap: ["Step 1", "Step 2", "Step 3"],
            books: ["Book A", "Book B", "Book C"],
            videos: ["Video A", "Video B", "Video C"],
            links: ["Link A", "Link B", "Link C"],
            colleges: ["College A", "College B", "College C"]
        },
        
        // Add more details data for other exams and courses
    };

    if (detailsData[itemName]) {
        const details = detailsData[itemName];
        detailsTitle.textContent = itemName;
        selectedOption.textContent = itemName;
        selectedOption.style.display = 'block'; // Show selected option

        syllabusSection.querySelector('ul').innerHTML = details.syllabus.map(item => `<li>${item}</li>`).join('');
        roadmapSection.querySelector('ul').innerHTML = details.roadmap.map(item => `<li>${item}</li>`).join('');
        booksSection.querySelector('ul').innerHTML = details.books.map(item => `<li>${item}</li>`).join('');
        videosSection.querySelector('ul').innerHTML = details.videos.map(item => `<li>${item}</li>`).join('');
        linksSection.querySelector('ul').innerHTML = details.links.map(item => `<li>${item}</li>`).join('');
        collegesSection.querySelector('ul').innerHTML = details.colleges.map(item => `<li>${item}</li>`).join('');

        // Hide all sections initially
        syllabusSection.querySelector('ul').style.display = 'none';
        roadmapSection.querySelector('ul').style.display = 'none';
        booksSection.querySelector('ul').style.display = 'none';
        videosSection.querySelector('ul').style.display = 'none';
        linksSection.querySelector('ul').style.display = 'none';
        collegesSection.querySelector('ul').style.display = 'none';

        // Add click event listeners to show content on click
        syllabusSection.querySelector('h3').addEventListener('click', function () {
            toggleSection(syllabusSection);
        });
        roadmapSection.querySelector('h3').addEventListener('click', function () {
            toggleSection(roadmapSection);
        });
        booksSection.querySelector('h3').addEventListener('click', function () {
            toggleSection(booksSection);
        });
        videosSection.querySelector('h3').addEventListener('click', function () {
            toggleSection(videosSection);
        });
        linksSection.querySelector('h3').addEventListener('click', function () {
            toggleSection(linksSection);
        });
        collegesSection.querySelector('h3').addEventListener('click', function () {
            toggleSection(collegesSection);
        });
    } else {
        detailsTitle.textContent = "Details not available";
        selectedOption.textContent = "Details not available";
        selectedOption.style.display = 'block'; // Show selected option
    }

    function toggleSection(section) {
        const content = section.querySelector('ul');
        if (content.style.display === 'none') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    }

    const trendingBtn = document.getElementById('trending-btn');
    const trendingSection = document.getElementById('trending-section');
    const categoriesLink = document.querySelector('.categories-link');
    const categoriesDropdown = document.querySelector('.categories-dropdown');
    const fieldContainer = document.querySelector('.field-container');
    const fieldTitle = document.getElementById('field-title');

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

    // Toggle Categories Dropdown
    categoriesLink.addEventListener('click', function (e) {
        e.preventDefault();
        categoriesDropdown.classList.toggle('show');
        trendingSection.classList.remove('show'); // Close trending when categories are opened
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
});