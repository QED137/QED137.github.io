<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="Data Scientist, Machine Learning, AI, MLOps, Cloud Computing, Python, Monte Carlo Simulations">
    <meta name="description" content="Janmajay Kumar - Physicist & Data Scientist specializing in AI, MLOps, and Cloud Technologies. Open to Work!">
    <meta property="og:title" content="Janmajay Kumar - Data Scientist & AI Engineer">
    <meta property="og:description" content="Transforming Data into Insights with Python, ML, and Cloud Technology">
    <meta property="og:image" content="images/edit_pic.png">
    <meta property="og:url" content="https://janmajay.de">
    
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <script defer src="script.js"></script>
</head>
<body id="top">
    
    <!-- Navigation -->
    <nav class="navbar">
        <ul class="nav-links">
            <li><a href="#top" class="active">Home</a></li>
            <li><a href="about/about.html">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contacts">Contact</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="landing">
        <div class="banner">
            <div class="developer-info">
                <h3 class="greeting">Welcome to the Page of</h3>
                <h1 class="name">Janmajay Kumar</h1>
                <p class="about">Transforming Data into Insights with Python, ML, and Cloud Technology.</p>
                <div class="cv">
                    <a href="images/Janmajay_Kumar_data_analystCV.pdf" download>
                        <button class="btn cv-btn">Download CV</button>
                    </a>
                    <span>Open-to-Work</span>
                </div>
                <div class="social-media">
                    <a href="https://www.linkedin.com/in/janmajay-kumar-82b37121/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/QED137" target="_blank"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
            <div class="developer-img">
                <img src="./images/edit_pic.png" alt="Janmajay Kumar" class="myimage">
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="projects" id="projects">
        <h1 class="section-heading">Portfolio</h1>
        <h3 class="sub-heading">My <span>Projects</span></h3>
        <div class="projects-cards">
            <div class="project-card">
                <div class="project-img">
                    <img src="images/logo-tuebingen.jpg" alt="Neutron Capture Simulation" />
                </div>
                <h3>Neutron Capture & Cerenkov Simulation</h3>
                <p>Simulating neutron capture for LEGEND-1000 experiments using GEANT4 and ROOT.</p>
                <a href="https://github.com/QED137/GEANT4_Netron_Capture_LEGEND100" target="_blank" class="project-btn">View Project</a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contacts">
        <h1>Contact</h1>
        <form id="contact-form">
            <label>Name <input type="text" id="name" required></label>
            <label>Email <input type="email" id="email" required></label>
            <label>Message <textarea id="message" required></textarea></label>
            <button type="submit">Send Message</button>
        </form>
        <p id="success-message" style="display:none;color:green;">Message Sent Successfully!</p>
    </section>

    <script>
        document.getElementById("contact-form").addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementById("success-message").style.display = "block";
        });
    </script>

</body>
</html>
