# Mohammad Kothi - Personal Portfolio Website

A modern, responsive, and customizable portfolio website designed for a first-year student and aspiring software developer.

---

## 🌟 Structure & Features

This website is organized exactly according to your requested structure:

1. **Top Greeting (Hero)**:
   - Big words: *"Hi, my name is Mohammad Kothi"* with an introductory subtitle.
2. **Profile Split Layout**:
   - **Left Half**: Photo card with clean borders, hover glow, and status indicator.
   - **Right Half**: Personal details card:
     - **Age**: 18 Years
     - **Gender**: Male
     - **Qualification**: 12th Pass Out (CBSE)
     - **12th School**: Hanifa School
     - **Passing Year**: 2026
     - **Current Institution**: Newton School of Technology (1st Year Degree)
3. **Below the Photo**:
   - **What I've Built (Projects)**:
     - **Kothi Steel Ltd website** (In progress, 2026) - Steel company showcase in Godhra, Gujarat.
     - **Ridgeline Roofing** (In progress, 2026) - US roofing template with live GitHub link.
     - **Business OS** (Concept, 2026) - Linux-based operating system for industrial businesses.
     - **College lab work** (Practice, 2026) - Python workshop & Git exercises from 1st semester.
   - **What I Work With (Skills)**:
     - **Comfortable**: Python, Git, GitHub
     - **Building with**: HTML & CSS, TypeScript, Web design
     - **Learning**: Data structures & algorithms, Linux command line, Quant research (WorldQuant BRAIN)
   - **Certificates**: Academic and course achievements cards.
   - **Academic Background & Competitive Exams**:
     - **Newton School of Technology**: 1st Year Degree Student
     - **Competitive Exams**: JEE Mains 2026 (94+ percentile) & JEE Advanced 2026 (Qualified, AIR 29099)
     - **12th CBSE (Hanifa School)**: 89.2% overall, 94% in PCM (Passing Year: 2026)
     - **10th GSEB**: 80% overall (95 in Maths, 93 in Science)
   - **Contact & Socials**: Email, LinkedIn, and GitHub links.

---

## 🚀 How to Run & View the Website

You don't need any complex setup or node installation!

### Method 1: Direct in Browser
Simply navigate to your `Portfolio` folder and double-click `index.html` (it will open in Google Chrome, Safari, or Edge).

### Method 2: VS Code Live Server
If you use VS Code:
1. Install the extension **"Live Server"**.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 📸 How to Add Your Own Photo

1. Take your photo and name it `profile.jpg` (or `.png`).
2. Copy it into the `images/` folder inside this project.
3. Open `index.html` around line 76 and update the `src` attribute:
   ```html
   <!-- Change this: -->
   <img id="profile-img" src="images/profile-placeholder.svg" alt="Mohammad Kothi" class="profile-img" />

   <!-- To this: -->
   <img id="profile-img" src="images/profile.jpg" alt="Mohammad Kothi" class="profile-img" />
   ```

---

## ✏️ How to Customize Your Details

Open `index.html` in any text editor:
- **Institution Name**: Search for `Your Junior College / High School Name` and replace it with your actual school/college name.
- **Projects**: Search for `<!-- Project Card 1 -->` to edit the titles, descriptions, and GitHub links.
- **Social Links**: At the bottom of `index.html` in the `#contact` section, replace `your-email@example.com` and GitHub/LinkedIn URLs with your real usernames.

---

## 🌐 Free Hosting on GitHub Pages

1. Create a repository on [GitHub](https://github.com) named `portfolio` or `<your-username>.github.io`.
2. Push this folder's code to the repository.
3. In your GitHub repository, go to **Settings** > **Pages** > select branch `main` and root `/`, then click **Save**.
4. Your website will be live worldwide in 1-2 minutes!

