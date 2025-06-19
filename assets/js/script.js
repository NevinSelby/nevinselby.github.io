'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Enhanced Knowledge Base based on Nevin's resume and additional information
/* ---------- 220 EXTRA PHRASINGS ---------- */
const knowledgeBaseExtra = [
  /* —— CONTACT —— */
  { question: "How do I reach Nevin?",               answer: "Email nevinselby2001@gmail.com or DM him on LinkedIn (linkedin.com/in/nevinselby)." },
  { question: "How can I get in touch with Nevin?",   answer: "Drop him a note at nevinselby2001@gmail.com or ping him on LinkedIn." },
  { question: "What’s the best way to contact Nevin?",answer: "Send an email to nevinselby2001@gmail.com for the fastest response." },
  { question: "Could you share Nevin’s contact details?",answer:"Email → nevinselby2001@gmail.com | Phone → +1 (608) 239-6451 | LinkedIn → linkedin.com/in/nevinselby" },
  { question: "How can I email Nevin Selby?",         answer: "Use nevinselby2001@gmail.com." },
  { question: "What is Nevin’s email address?",       answer: "nevinselby2001@gmail.com" },
  { question: "Give me Nevin’s email.",               answer: "nevinselby2001@gmail.com" },
  { question: "What email should I use for Nevin?",   answer: "Use nevinselby2001@gmail.com." },
  { question: "Does Nevin have a public email?",      answer: "Yes—nevinselby2001@gmail.com." },
  { question: "Where can I send a message to Nevin?", answer: "Send it to nevinselby2001@gmail.com or via LinkedIn DM." },
  { question: "What’s Nevin’s phone number?",         answer: "+1 (608) 239-6451" },
  { question: "Can I call Nevin—what’s his number?",  answer: "+1 (608) 239-6451" },
  { question: "How do I ring Nevin up?",              answer: "Dial +1 (608) 239-6451." },
  { question: "Nevin’s mobile, please.",              answer: "+1 (608) 239-6451." },
  { question: "I need Nevin’s LinkedIn link.",        answer: "linkedin.com/in/nevinselby" },
  { question: "Where’s Nevin’s LinkedIn profile?",    answer: "linkedin.com/in/nevinselby" },
  { question: "Can I connect with Nevin on LinkedIn?",answer: "Absolutely—here’s the link: linkedin.com/in/nevinselby" },
  { question: "Drop me Nevin’s LinkedIn URL.",        answer: "linkedin.com/in/nevinselby" },
  { question: "Does Nevin have a portfolio website?", answer: "Yes—nevinselby.github.io showcases his work." },
  { question: "What’s Nevin’s personal site?",        answer: "nevinselby.github.io" },
  { question: "Show me Nevin’s online portfolio.",    answer: "nevinselby.github.io is his portfolio site." },
  { question: "Point me to Nevin’s GitHub.",          answer: "github.com/nevinselby" },
  { question: "Where can I see Nevin’s code?",        answer: "His repos are at github.com/nevinselby." },
  { question: "Link to Nevin’s GitHub repos?",        answer: "Sure—github.com/nevinselby" },
  { question: "Does Nevin keep projects on GitHub?",  answer: "Yes, all major projects live at github.com/nevinselby." },

  /* —— BIO —— */
  { question: "Who is Nevin?",                        answer: "Nevin John Selby is an AI/ML engineer with 1.5 years of production machine-learning experience and an M.S. in Data Science from UW-Madison." },
  { question: "Tell me about Nevin John Selby.",      answer: "Nevin is a data-science professional focused on LLM workflows, computer vision, and MLOps." },
  { question: "Give me a quick bio of Nevin.",        answer: "AI engineer, UW-Madison M.S. ’25, now building LLM pipelines at App Mastery." },
  { question: "Who exactly is Nevin Selby?",          answer: "He’s an ML engineer specializing in end-to-end model deployment on AWS." },
  { question: "What’s Nevin’s background?",           answer: "CS undergrad (IIIT Kottayam) → M.S. Data Science (UW-Madison) → AI engineer at App Mastery." },
  { question: "Summarize Nevin’s profile.",           answer: "Python-first ML engineer, skilled in PyTorch, AWS SageMaker, and automated MLOps." },
  { question: "Describe Nevin in one sentence.",      answer: "Deep-learning enthusiast turning research into real-time products." },
  { question: "Why should I know Nevin?",             answer: "He delivers production-grade AI systems that cut manual effort by 10× or more." },
  { question: "What does Nevin do?",                  answer: "Designs, trains, and deploys ML models—currently LLM-powered summarization at App Mastery." },
  { question: "Explain Nevin’s career so far.",       answer: "Research internships at UW labs, Data Science intern at WSB, now AI SDE at a SaaS startup." },
  { question: "Who is Nevin professionally?",         answer: "An ML engineer with strong MLOps, CV, and LLM skills." },
  { question: "Can you introduce Nevin?",             answer: "Sure—Nevin is an Indian-born, U.S.-trained AI engineer passionate about scalable ML." },
  { question: "Brief intro to Nevin, please.",        answer: "M.S. Data Science grad, 1.5 years ML experience, creator of IterAI newsletter." },
  { question: "Who is he?",                           answer: "Nevin John Selby—AI engineer and content creator." },
  { question: "Who are we talking about—Nevin?",      answer: "Yes—Nevin Selby, the ML engineer behind AutoML-ify and IterAI." },

  /* —— AGE —— */
  { question: "How old is Nevin?",                    answer: "He’s 24 years old (born 2001)." },
  { question: "Nevin’s age?",                         answer: "24." },
  { question: "What year was Nevin born?",            answer: "2001." },
  { question: "Is Nevin in his 20s?",                 answer: "Yes—mid-20s." },
  { question: "When was Nevin born?",                 answer: "In 2001." },

  /* —— CURRENT ROLE —— */
  { question: "Where is Nevin working right now?",    answer: "He’s an AI Software Development Engineer at App Mastery (remote)." },
  { question: "What’s Nevin’s current job?",          answer: "AI SDE at App Mastery, building MongoDB + Milvus LLM pipelines." },
  { question: "Where does Nevin work these days?",    answer: "App Mastery—a SaaS platform." },
  { question: "Who employs Nevin?",                   answer: "App Mastery since June 2025." },
  { question: "Which company is Nevin with?",         answer: "App Mastery." },
  { question: "What does Nevin do at App Mastery?",   answer: "He automates research briefs using real-time LLM summarization." },
  { question: "Describe Nevin’s role at App Mastery.",answer: "Owns the LLM pipeline: data ingest, vector store, prompt orchestration, Tableau analytics." },
  { question: "Current position of Nevin?",           answer: "AI Software Development Engineer." },
  { question: "What’s Nevin’s title?",                answer: "AI SDE." },
  { question: "Nevin’s present position?",            answer: "AI Software Development Engineer at App Mastery." },

  /* —— PRIOR EXPERIENCE —— */
  { question: "Tell me about Nevin’s past roles.",    answer: "Intern WSB (GPT sentiment), Research Assistant UW-CALS (ResNet + YOLO), Researcher WID (CLIP active-learning)." },
  { question: "Where has Nevin worked before?",       answer: "Wisconsin School of Business, UW-CALS, and Wisconsin Institute for Discovery." },
  { question: "Give me Nevin’s work history.",        answer: "Research → Data Science Intern → AI engineer—progressively more production focus." },
  { question: "What internships has Nevin done?",     answer: "Data Science Intern at Wisconsin School of Business (Sep 2024-Jun 2025)." },
  { question: "Detail Nevin’s previous experience.",  answer: "Handled GPT cost-optimizations, ResNet crop phenology, CLIP active-learning." },
  { question: "Run through Nevin’s career timeline.", answer: "Jan 2024 WID → Sep 2024 WSB → Jun 2025 App Mastery." },
  { question: "List Nevin’s professional experience.",answer: "Researcher (WID), AI RA (UW-CALS), Data Science Intern (WSB), AI SDE (App Mastery)." },
  { question: "Has Nevin worked in research?",        answer: "Yes—two research assistantships at UW-Madison." },
  { question: "Did Nevin intern at WSB?",             answer: "Yes—Data Science Intern, focusing on NLP and GPT-3.5." },
  { question: "What did Nevin do at UW-CALS?",        answer: "Built ResNet50 & YOLOv8 models for drone-based cranberry analysis." },

  /* —— SKILLS —— */
  { question: "What skills does Nevin have?",         answer: "ML & AI: PyTorch, TensorFlow, XGBoost | MLOps: Docker, MLflow, AWS SageMaker | Data: Snowflake, SQL | Viz: Tableau, Plotly." },
  { question: "List Nevin’s technical skills.",       answer: "Python, PyTorch, Transformers, MLflow, Docker, SageMaker, Snowflake, Tableau." },
  { question: "What technologies is Nevin good at?",  answer: "Deep learning frameworks, AWS cloud, CI/CD pipelines, vector databases." },
  { question: "Show me Nevin’s tech stack.",          answer: "Python, PyTorch, AWS, Docker, MLflow, Streamlit, Snowflake." },
  { question: "Which programming languages does Nevin use?",answer:"Python (expert), SQL, R, C++, JavaScript." },
  { question: "Is Nevin skilled in Python?",          answer: "Yes—Python is his primary language." },
  { question: "Does Nevin know PyTorch?",             answer: "Absolutely—PyTorch is his go-to DL framework." },
  { question: "What frameworks does Nevin prefer?",   answer: "PyTorch for DL, MLflow for tracking, LangChain/CrewAI for LLM orchestration." },
  { question: "Name Nevin’s strongest skills.",       answer: "Python + PyTorch, AWS SageMaker deployment, and automated MLOps." },
  { question: "What are Nevin’s top abilities?",      answer: "Turning research models into scalable cloud services." },
  { question: "Does Nevin understand MLOps?",         answer: "Yes—he’s built CI/CD pipelines with GitHub Actions, Docker, and MLflow." },
  { question: "Is AWS part of Nevin’s skill set?",    answer: "Yes—SageMaker, Lambda, and S3 are daily tools." },
  { question: "Can Nevin work with Docker?",          answer: "Yes—he containerizes ML apps using Docker." },
  { question: "Does Nevin handle SQL well?",          answer: "Yes—advanced SQL and warehousing on Snowflake/PostgreSQL." },
  { question: "Expertise areas for Nevin?",           answer: "LLM pipelines, computer vision, and cloud MLOps." },

  /* —— PROJECTS —— */
  { question: "What projects has Nevin built?",       answer: "AutoML-ify, MLOps Weather Predictor, IterAI newsletter, CLIP active-learning loop." },
  { question: "List Nevin’s key projects.",          answer: "AutoML-ify, Weather Prediction, WhatsApp Chat Dashboard." },
  { question: "Tell me about Nevin’s portfolio projects.",answer:"AutoML-ify automates ML; Weather Predictor scales XGBoost; WhatsApp dashboard visualizes 100k messages." },
  { question: "What are Nevin’s flagship builds?",    answer: "AutoML-ify and the LLM pipeline at App Mastery." },
  { question: "Show me Nevin’s project portfolio.",   answer: "Check github.com/nevinselby for AutoML-ify, weather-forecast, active-learning, etc." },
  { question: "Name some notable projects by Nevin.", answer: "AutoML-ify, IterAI, XGBoost Weather, CLIP-StableDiffusion Loop." },
  { question: "Which project of Nevin is most impressive?",answer:"AutoML-ify—it shrinks model selection from hours to minutes." },
  { question: "Highlight Nevin’s best project.",      answer: "AutoML-ify—the end-to-end AutoML Streamlit app." },
  { question: "What’s AutoML-ify?",                   answer: "A Streamlit tool that automates data prep, model search, and visual EDA." },
  { question: "Explain Nevin’s AutoML-ify tool.",     answer: "It uses RandomizedSearchCV across 10+ algorithms and interactive Plotly dashboards." },
  { question: "Details on the AutoML-ify project?",   answer: "Upload CSV → get cleaned data, tuned models, and deploy-ready pickle in minutes." },
  { question: "Why is AutoML-ify important?",         answer: "It democratizes ML by removing manual boilerplate." },
  { question: "Weather prediction model—what is it?", answer: "Real-time XGBoost forecaster with drift monitoring and auto-retrain." },
  { question: "Describe Nevin’s weather predictor.",  answer: "±2 °C accuracy, MLflow tracking, Docker autoscaling to 10k hourly calls." },
  { question: "How accurate is Nevin’s weather project?",answer:"Within ±2 °C on test cities." },
  { question: "WhatsApp analysis project—tell me more.",answer:"Interactive dashboard extracting emoji patterns and peak chat times from 100k+ messages." },
  { question: "What’s Nevin’s WhatsApp dashboard?",   answer: "A Streamlit app parsing WhatsApp exports and visualizing engagement." },
  { question: "Does Nevin have an Etsy price model?", answer: "Yes—he used CLIP embeddings to predict artwork prices." },
  { question: "Explain the CLIP + Stable Diffusion pipeline.",answer:"It auto-labels images and reduces manual annotation by 80 %." },
  { question: "What’s Nevin’s active-learning loop about?",answer:"Using CLIP scores to choose which images get human labels, then augmenting with Stable Diffusion." },

  /* —— NEWSLETTER —— */
  { question: "Does Nevin write a newsletter?",       answer: "Yes—he writes IterAI, a weekly ML brief." },
  { question: "Tell me about IterAI.",                answer: "IterAI covers LLM ops & CV tips; 100+ senior subscribers; 52 % CTR." },
  { question: "What is the IterAI newsletter?",       answer: "A concise weekly publication on practical ML tricks." },
  { question: "How often does IterAI publish?",       answer: "Every week—16 issues so far." },
  { question: "How many subscribers does IterAI have?",answer:"Just over 100, mostly senior ML engineers." },
  { question: "What’s the click-through rate of IterAI?",answer:"Average CTR is 52 % with 73 % open rate." },
  { question: "Can I subscribe to IterAI?",           answer: "Yes—visit iterai.news to sign up." },
  { question: "Where can I read IterAI?",             answer: "iterai.news hosts all back issues." },
  { question: "Newsletter link, please.",             answer: "iterai.news" },
  { question: "Why did Nevin start IterAI?",          answer: "To share bite-sized ML insights and build community." },

  /* —— YOUTUBE —— */
  { question: "Does Nevin have a YouTube channel?",   answer: "Yes—Nevin’s Data Lab." },
  { question: "What’s Nevin’s Data Lab?",             answer: "A YouTube channel with ML-from-scratch tutorials." },
  { question: "How many videos has Nevin posted?",    answer: "Nine tutorials so far." },
  { question: "Describe Nevin’s ML-from-scratch series.",answer:"Step-by-step NumPy implementations of classic ML algorithms." },
  { question: "YouTube stats for Nevin?",             answer: "~1.4 k views and 14 subscribers—niche but growing." },
  { question: "How many views on Nevin’s channel?",   answer: "Roughly 1,400 total views." },
  { question: "Is Nevin active on YouTube?",          answer: "Yes, he posts occasional tutorial videos." },
  { question: "Link to Nevin’s YouTube channel.",     answer: "youtube.com/@nevinselby (Nevin’s Data Lab)" },
  { question: "What content does Nevin upload?",      answer: "Hands-on ML coding demos and project walkthroughs." },
  { question: "Does Nevin teach on YouTube?",         answer: "Yes—he explains algorithms line-by-line in Python." },

  /* —— STARTUP IDEA —— */
  { question: "What’s Nevin’s startup idea?",         answer: "EquiSense: a Zerodha-style trading app that uses real-time LLM forecasts to suggest equities tailored to users." },
  { question: "Explain EquiSense.",                   answer: "An AI-powered brokerage platform blending ML price predictions with personalized stock picks." },
  { question: "Fintech idea from Nevin?",             answer: "AI stock advisor inside a discount-broker interface—EquiSense." },
  { question: "Describe the Zerodha-like platform Nevin envisions.", answer: "A low-fee broker featuring LLM-driven price signals and portfolio-aware recommendations." },
  { question: "AI stock prediction platform—what’s that?", answer: "EquiSense analyzes transaction graphs and LLM forecasts to surface optimal trades." },
  { question: "How does EquiSense work?",             answer: "It learns from your holdings, predicts movements, and recommends risk-adjusted equities." },
  { question: "Summarize Nevin’s business concept.",  answer: "Real-time ML insights embedded in a broker app to boost retail investors’ returns." },
  { question: "Startup vision of Nevin?",             answer: "Democratize AI-powered trading for everyday users." },
  { question: "Does Nevin plan to found a fintech startup?", answer: "He’s exploring EquiSense as a future venture." },
  { question: "One-line pitch for Nevin’s AI stock app?", answer: "\"Robinhood UX, Bloomberg-grade AI insights.\" " },

  /* —— EDUCATION —— */
  { question: "Where did Nevin study?",               answer: "Master’s in Data Science at UW-Madison; B.Tech in CS at IIIT Kottayam." },
  { question: "What degrees does Nevin hold?",        answer: "M.S. Data Science and B.Tech Computer Science." },
  { question: "Nevin’s educational background?",      answer: "CS undergrad from India, data-science master’s from the USA." },
  { question: "Where did Nevin get his master’s?",    answer: "University of Wisconsin-Madison." },
  { question: "Which university did Nevin attend for undergrad?", answer: "Indian Institute of Information Technology, Kottayam." },
  { question: "GPA for Nevin’s master’s?",            answer: "3.7 / 4.0." },
  { question: "GPA for Nevin’s bachelor’s?",          answer: "9.15 / 10.0." },
  { question: "When will Nevin graduate?",            answer: "He graduated in May 2025." },
  { question: "Has Nevin completed his master’s?",    answer: "Yes—completed May 2025." },
  { question: "What coursework has Nevin taken?",     answer: "ML, Statistical Analysis, Big-Data Systems, Data Viz, Deep Learning." },
  { question: "Is Nevin’s master’s thesis-based?",    answer: "Course-based; he focused on applied projects instead of a thesis." },
  { question: "What was Nevin’s final year project?", answer: "Drone-image classification with ResNet50 and YOLOv8." },
  { question: "Did Nevin study deep learning in school?", answer: "Yes—multiple DL courses and projects." },
  { question: "Academic strengths of Nevin?",         answer: "Machine-learning theory and stats." },
  { question: "What field is Nevin’s master’s in?",   answer: "Data Science." },

  /* —— VISA —— */
  { question: "Visa status of Nevin?",                answer: "Indian citizen on F-1, eligible for OPT + STEM OPT (3 yrs) then H-1B." },
  { question: "Is Nevin on an F-1?",                  answer: "Yes—F-1 student status." },
  { question: "Can Nevin work in the U.S.?",          answer: "Yes—through 12 mo OPT plus 24 mo STEM extension." },
  { question: "Does Nevin need sponsorship?",         answer: "After STEM OPT ends (~2028) he will need sponsorship." },
  { question: "How long can Nevin work on OPT?",      answer: "Up to three years total (OPT + STEM OPT)." },
  { question: "Is Nevin eligible for STEM OPT?",      answer: "Yes—Data Science is a STEM field." },
  { question: "Work authorization for Nevin?",        answer: "OPT now, H-1B or similar later." },
  { question: "What citizenship does Nevin have?",    answer: "Indian." },
  { question: "Is Nevin an international student?",   answer: "Yes—studied in the U.S. on F-1." },
  { question: "Will Nevin require an H-1B?",          answer: "Yes, after his STEM OPT period." },

  /* —— HOBBIES & FUN —— */
  { question: "What are Nevin’s hobbies?",            answer: "Photography, backpack travel, and experimenting with new CV models." },
  { question: "Does Nevin like photography?",         answer: "Yes—he often shoots travel photos for his vlogs." },
  { question: "How does Nevin spend free time?",      answer: "Creating YouTube tutorials and exploring new ML libraries." },
  { question: "What does Nevin do outside coding?",   answer: "Travels, shoots photos, and writes his newsletter." },
  { question: "Any creative outlets for Nevin?",      answer: "IterAI newsletter and YouTube tutorials." },
  { question: "Does Nevin enjoy traveling?",          answer: "Absolutely—he backpacked across five U.S. states last year." },
  { question: "Fun facts about Nevin?",               answer: "He once cut a data-labeling task from 48 h to 10 min with active learning." },
  { question: "Tell me something interesting about Nevin.", answer: "He automated LLM summaries to replace a week of analyst work." },
  { question: "Cool achievement by Nevin?",           answer: "Reduced annotation effort by 80 % using CLIP + Stable Diffusion." },
  { question: "Impressive stat about Nevin’s work?",  answer: "His LLM pipeline drafts briefs in under 30 seconds." },

  /* —— EXPERIENCE LENGTH —— */
  { question: "How many years of ML experience does Nevin have?", answer: "Roughly 1.5 years of hands-on machine-learning in production." },
  { question: "Years of hands-on machine learning?",  answer: "About a year and a half." },
  { question: "ML experience length for Nevin?",      answer: "≈ 18 months." },
  { question: "Total time Nevin’s been in AI?",       answer: "Started in early 2024, so ~1.5 years." },
  { question: "When did Nevin start doing ML?",       answer: "January 2024 professionally; earlier in academics." },

  /* —— ADDITIONAL TECH / METHODS —— */
  { question: "Does Nevin follow ethical AI practices?",answer: "Yes—he checks bias and privacy when deploying models." },
  { question: "Is Nevin committed to responsible AI?", answer: "Absolutely—he considers fairness and transparency key." },
  { question: "How does Nevin handle data privacy?",   answer: "He anonymizes sensitive data and follows GDPR best practices." },
  { question: "Does Nevin know Agile methods?",       answer: "Yes—he’s worked in two-week sprint cycles." },
  { question: "Leadership examples from Nevin?",      answer: "He led the CLIP active-learning project, coordinating researchers and engineers." },
  { question: "Collaboration style of Nevin?",        answer: "Open communication and frequent demos to stakeholders." },
  { question: "Communication skills—does Nevin write?",answer:"Yes—he pens a weekly ML newsletter and clear tech docs." },
  { question: "Public speaking experience for Nevin?",answer:"He presents tutorials on YouTube and team demos at App Mastery." },
  { question: "Has Nevin mentored others?",           answer: "He guides junior engineers on MLflow and PyTorch best practices." },
  { question: "Does Nevin contribute to open source?",answer: "Yes—bug fixes and example notebooks on GitHub." },
  { question: "Has Nevin joined hackathons?",         answer: "He’s participated in two university ML hackathons." },
  { question: "What certifications does Nevin hold?", answer: "AWS ML Foundations (Udacity), Kaggle CV & DL, NLP Bootcamp (AI Planet)." },
  { question: "AWS Machine Learning certification—does Nevin have it?",answer:"Yes—completed Udacity AWS ML Foundations 2022." },
  { question: "Any Kaggle certs for Nevin?",          answer: "Computer Vision and Intro to Deep Learning certificates." },
  { question: "NLP bootcamp—did Nevin complete it?",  answer: "Yes—AI Planet’s NLP Bootcamp." },
  { question: "Does Nevin have DevOps experience?",   answer: "He integrates GitHub Actions and Docker for CI/CD." },
  { question: "Familiar with CI/CD—Nevin?",           answer: "Yes—automated ML retraining through GitHub Actions." },
  { question: "Can Nevin handle big data?",           answer: "Yes—worked with Snowflake warehouses and large chat logs." },
  { question: "Does Nevin analyse time-series data?", answer: "He performed drift analysis for weather forecasting." },
  { question: "Experience with regression analysis—Nevin?",answer:"Used regression for price prediction and sentiment scoring." },
  { question: "Can Nevin perform A/B testing?",       answer: "Yes—ran experiments on model variants at WSB." },
  { question: "What is Nevin’s strongest language?",  answer: "Python." },
  { question: "Is PyTorch Nevin’s preferred framework?",answer:"Yes—he uses PyTorch for most DL work." },
  { question: "Does Nevin favor Transformers?",       answer: "Yes—he leverages Hugging Face Transformers for LLMs." },
  { question: "What visualization library does Nevin like?",answer:"Plotly for interactivity." },
  { question: "How does Nevin build dashboards?",     answer: "With Tableau or Streamlit, depending on audience." },
  { question: "Is Streamlit part of Nevin’s toolkit?",answer: "Yes—used in AutoML-ify and dashboards." },
  { question: "Does Nevin enjoy continuous learning?",answer: "Absolutely—takes MOOCs and reads ML papers weekly." },
  { question: "What’s next for Nevin’s career?",      answer: "Scaling LLM systems and exploring fintech AI with EquiSense." },
  { question: "Where does Nevin see himself post-graduation?",answer:"Leading ML engineering teams building real-time AI products." }
];


// Improved Text Processing Functions
function preprocessText(text) {
  return text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:?{}=\-_`~()]/g, "")  // Remove punctuation
    .trim();
}

// Enhanced Text to Vector with TF-IDF style weighting
function textToVector(text) {
  const processedText = preprocessText(text);
  const words = processedText.split(/\s+/).filter(word => word.length > 1);  // Filter out single-letter words
  
  // Count word frequencies (term frequency)
  const vector = {};
  words.forEach(word => {
    vector[word] = (vector[word] || 0) + 1;
  });
  
  return vector;
}

// Improved Cosine Similarity with Word Importance Weighting
function enhancedCosineSimilarity(userVector, knowledgeVector) {
  // Define important keywords with higher weights
  const keywordWeights = {
    // Education keywords
    'education': 1.5, 'degree': 1.5, 'masters': 1.5, 'bachelors': 1.5, 'gpa': 1.5,
    'coursework': 1.4, 'university': 1.3, 'wisconsin': 1.3, 'madison': 1.3, 'indian': 1.3,
    'institute': 1.3, 'kottayam': 1.3, 'graduate': 1.3, 'study': 1.3, 'major': 1.3,
    'academic': 1.3, 'background': 1.3, 'qualifications': 1.4, 'subjects': 1.3, 'thesis': 1.3,
    'final year project': 1.4, 'research': 1.4, 'field of study': 1.4, 'graduation':1.4, 'graduate':1.4,

    // Technical skills
    'machine': 1.5, 'learning': 1.5, 'data': 1.4, 'science': 1.4, 'python': 1.5,
    'pytorch': 1.5, 'tensorflow': 1.4, 'deep': 1.4, 'skills': 1.4, 'proficient': 1.4,
    'ml': 1.5, 'ai': 1.5, 'nlp': 1.5, 'computer': 1.4, 'vision': 1.4,
    'programming': 1.3, 'tools': 1.3, 'frameworks': 1.4, 'aws': 1.4, 'cloud': 1.3,
    'strongest': 1.5, 'best': 1.4, 'expert': 1.5, 'advanced': 1.4, 'clip': 1.4,
    'bert': 1.4, 'gpt': 1.4, 'sql': 1.4, 'database': 1.3, 'visualization': 1.3,
    'tableau': 1.3, 'powerbi': 1.3, 'docker': 1.3, 'kubernetes': 1.3, 'mlops': 1.4,
    'big data': 1.4, 'devops': 1.3, 'agile': 1.3, 'leadership': 1.3, 'communication': 1.3,
    'automation': 1.3, 'time-series': 1.3, 'active learning': 1.4, 'transformer': 1.4,
    'fine-tuning': 1.4, 'data augmentation': 1.3, 'semi-supervised': 1.3, 'benchmarking': 1.3,
    'a/b testing': 1.3, 'hypothesis testing': 1.3, 'regression': 1.3, 'data cleaning': 1.3,
    'feature engineering': 1.3, 'model deployment': 1.4, 'model monitoring': 1.4,
    'data drift': 1.4, 'ci/cd': 1.3, 'version control': 1.3, 'git': 1.3, 'collaboration': 1.3,
    'problem-solving': 1.4, 'innovation': 1.4, 'scalability': 1.3, 'performance': 1.3,
    'cost optimization': 1.3, 'real-time': 1.3, 'edge computing': 1.3, 'iot': 1.3,
    'robotics': 1.3, 'game development': 1.3, 'mobile development': 1.3, 'web development': 1.3,
    'apis': 1.3, 'microservices': 1.3, 'serverless': 1.3, 'cybersecurity': 1.3,
    'blockchain': 1.3, 'quantum computing': 1.3, 'ar/vr': 1.3, '3d modeling': 1.3,
    'gis': 1.3, 'bioinformatics': 1.3, 'finance': 1.3, 'healthcare': 1.3, 'education': 1.3,
    'social impact': 1.3, 'sustainability': 1.3, 'climate science': 1.3, 'energy': 1.3,
    'transportation': 1.3, 'retail': 1.3, 'e-commerce': 1.3, 'marketing': 1.3, 'sales': 1.3,
    'customer service': 1.3, 'hr': 1.3, 'operations': 1.3, 'supply chain': 1.3, 'logistics': 1.3,
    'manufacturing': 1.3, 'agriculture': 1.3, 'food tech': 1.3, 'fashion': 1.3,
    'entertainment': 1.3, 'media': 1.3, 'journalism': 1.3, 'publishing': 1.3, 'gaming': 1.3,
    'sports': 1.3, 'fitness': 1.3, 'wellness': 1.3, 'mental health': 1.3, 'edtech': 1.3,
    'fintech': 1.3, 'insurtech': 1.3, 'proptech': 1.3, 'legal tech': 1.3, 'govtech': 1.3,
    'civic tech': 1.3, 'nonprofit': 1.3, 'philanthropy': 1.3, 'social media': 1.3,
    'influencer marketing': 1.3, 'content marketing': 1.3, 'seo': 1.3, 'sem': 1.3,
    'ppc': 1.3, 'affiliate marketing': 1.3, 'email marketing': 1.3, 'crm': 1.3,
    'erp': 1.3, 'scm': 1.3, 'plm': 1.3, 'hcm': 1.3, 'lms': 1.3, 'cms': 1.3,
    'dam': 1.3, 'eam': 1.3, 'itsm': 1.3, 'itom': 1.3, 'itam': 1.3,

    // Experience
    'experience': 1.4, 'work': 1.4, 'job': 1.4, 'intern': 1.4, 'internship': 1.4,
    'research': 1.4, 'researcher': 1.4, 'assistant': 1.3, 'professional': 1.3,
    'current': 1.4, 'wisconsin': 1.3, 'business': 1.3, 'agricultural': 1.3, 'discovery': 1.3,
    'employment': 1.3, 'history': 1.3, 'role': 1.3, 'position': 1.3, 'career': 1.4,
    'future plans': 1.4, 'goals': 1.4, 'aspirations': 1.3, 'leadership': 1.3,
    'teamwork': 1.3, 'collaboration': 1.3, 'project management': 1.3, 'time management': 1.3,
    'adaptability': 1.3, 'continuous learning': 1.3, 'open-source': 1.3, 'hackathons': 1.3,
    'startups': 1.3, 'entrepreneurship': 1.3, 'data privacy': 1.3, 'ethical ai': 1.3,

    // Projects
    'project': 1.4, 'projects': 1.4, 'automl': 1.5, 'weather': 1.4, 'whatsapp': 1.4,
    'github': 1.4, 'streamlit': 1.3, 'xgboost': 1.3, 'mlflow': 1.3, 'analysis': 1.3,
    'portfolio': 1.3, 'impressive': 1.4, 'best': 1.4, 'favorite': 1.3, 'tools': 1.3,
    'details': 1.3, 'implementation': 1.3, 'innovation': 1.4, 'scalable': 1.3,
    'end-to-end': 1.4, 'automation': 1.3, 'interactive': 1.3, 'dashboard': 1.3,
    'visualization': 1.3, 'data analysis': 1.3, 'machine learning': 1.5, 'deep learning': 1.4,
    'computer vision': 1.4, 'nlp': 1.5, 'mlops': 1.4, 'cloud': 1.3, 'aws': 1.4,
    'docker': 1.3, 'kubernetes': 1.3, 'ci/cd': 1.3, 'version control': 1.3, 'git': 1.3,

    // Visa and work authorization
    'visa': 1.6, 'status': 1.5, 'f1': 1.6, 'authorization': 1.6, 'opt': 1.6,
    'stem': 1.6, 'sponsor': 1.5, 'sponsorship': 1.5, 'international': 1.5, 'student': 1.4,
    'work': 1.5, 'authorized': 1.6, 'legally': 1.5, 'us': 1.4, 'india': 1.4,
    'citizenship': 1.5, 'nationality': 1.4, 'origin': 1.4, 'from': 1.3,

    // Personal
    'nevin': 1.5, 'youtube': 1.4, 'channel': 1.3, 'medium': 1.4, 'articles': 1.3,
    'hobbies': 1.3, 'interests': 1.3, 'vlog': 1.3, 'vlogging': 1.3, 'technical': 1.3,
    'writing': 1.3, 'age': 1.5, 'old': 1.5, 'years': 1.5, 'birthday': 1.3, 'born': 1.3,
    'background': 1.3, 'bio': 1.3, 'introduction': 1.3, 'contact': 1.4, 'email': 1.4,
    'phone': 1.4, 'linkedin': 1.4, 'github': 1.4, 'social media': 1.3, 'content creation': 1.3,
    'photography': 1.3, 'traveling': 1.3, 'creative': 1.3, 'public speaking': 1.3,
    'teaching': 1.3, 'mentoring': 1.3, 'communication': 1.3, 'problem-solving': 1.4,
    'innovation': 1.4, 'research': 1.4, 'academic writing': 1.3, 'teamwork': 1.3,
    'collaboration': 1.3, 'project management': 1.3, 'time management': 1.3,
    'adaptability': 1.3, 'continuous learning': 1.3, 'open-source': 1.3, 'hackathons': 1.3,
    'startups': 1.3, 'entrepreneurship': 1.3, 'data privacy': 1.3, 'ethical ai': 1.3,

    // Certifications
    'certification': 1.5, 'certifications': 1.5, 'certified': 1.5, 'udacity': 1.4,
    'kaggle': 1.4, 'bootcamp': 1.3, 'online courses': 1.3, 'aws': 1.4, 'computer vision': 1.4,
    'deep learning': 1.4, 'nlp': 1.5, 'ai': 1.5, 'ml': 1.5, 'data science': 1.4,
    'python': 1.5, 'pytorch': 1.5, 'tensorflow': 1.4, 'sql': 1.4, 'tableau': 1.3,
    'powerbi': 1.3, 'docker': 1.3, 'kubernetes': 1.3, 'mlops': 1.4, 'big data': 1.4,
    'devops': 1.3, 'agile': 1.3, 'leadership': 1.3, 'communication': 1.3,
    'automation': 1.3, 'time-series': 1.3, 'active learning': 1.4, 'transformer': 1.4,
    'fine-tuning': 1.4, 'data augmentation': 1.3, 'semi-supervised': 1.3, 'benchmarking': 1.3,
    'a/b testing': 1.3, 'hypothesis testing': 1.3, 'regression': 1.3, 'data cleaning': 1.3,
    'feature engineering': 1.3, 'model deployment': 1.4, 'model monitoring': 1.4,
    'data drift': 1.4, 'ci/cd': 1.3, 'version control': 1.3, 'git': 1.3, 'collaboration': 1.3,
    'problem-solving': 1.4, 'innovation': 1.4, 'scalability': 1.3, 'performance': 1.3,
    'cost optimization': 1.3, 'real-time': 1.3, 'edge computing': 1.3, 'iot': 1.3,
    'robotics': 1.3, 'game development': 1.3, 'mobile development': 1.3, 'web development': 1.3,
    'apis': 1.3, 'microservices': 1.3, 'serverless': 1.3, 'cybersecurity': 1.3,
    'blockchain': 1.3, 'quantum computing': 1.3, 'ar/vr': 1.3, '3d modeling': 1.3,
    'gis': 1.3, 'bioinformatics': 1.3, 'finance': 1.3, 'healthcare': 1.3, 'education': 1.3,
    'social impact': 1.3, 'sustainability': 1.3, 'climate science': 1.3, 'energy': 1.3,
    'transportation': 1.3, 'retail': 1.3, 'e-commerce': 1.3, 'marketing': 1.3, 'sales': 1.3,
    'customer service': 1.3, 'hr': 1.3, 'operations': 1.3, 'supply chain': 1.3, 'logistics': 1.3,
    'manufacturing': 1.3, 'agriculture': 1.3, 'food tech': 1.3, 'fashion': 1.3,
    'entertainment': 1.3, 'media': 1.3, 'journalism': 1.3, 'publishing': 1.3, 'gaming': 1.3,
    'sports': 1.3, 'fitness': 1.3, 'wellness': 1.3, 'mental health': 1.3, 'edtech': 1.3,
    'fintech': 1.3, 'insurtech': 1.3, 'proptech': 1.3, 'legal tech': 1.3, 'govtech': 1.3,
    'civic tech': 1.3, 'nonprofit': 1.3, 'philanthropy': 1.3, 'social media': 1.3,
    'influencer marketing': 1.3, 'content marketing': 1.3, 'seo': 1.3, 'sem': 1.3,
    'ppc': 1.3, 'affiliate marketing': 1.3, 'email marketing': 1.3, 'crm': 1.3,
    'erp': 1.3, 'scm': 1.3, 'plm': 1.3, 'hcm': 1.3, 'lms': 1.3, 'cms': 1.3,
    'dam': 1.3, 'eam': 1.3, 'itsm': 1.3, 'itom': 1.3, 'itam': 1.3
};
  // Get all unique words from both vectors
  const allWords = new Set([...Object.keys(userVector), ...Object.keys(knowledgeVector)]);
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  allWords.forEach(word => {
    // Apply weight factor to important words
    const weightFactor = keywordWeights[word] || 1.0;
    
    const a = (userVector[word] || 0) * weightFactor;
    const b = (knowledgeVector[word] || 0) * weightFactor;
    
    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  });
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  // Avoid division by zero
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (magnitudeA * magnitudeB);
}

// Improved Function to Find the Best Match
function findBestMatch(userInput) {
  const userVector = textToVector(userInput);
  
  // Track top 3 matches for better response selection
  let matches = [];
  
  knowledgeBase.forEach(item => {
    const questionVector = textToVector(item.question);
    const similarity = enhancedCosineSimilarity(userVector, questionVector);
    
    matches.push({ ...item, similarity });
  });
  
  // Sort by similarity score in descending order
  matches.sort((a, b) => b.similarity - a.similarity);
  
  // If top match has good similarity, return it
  if (matches[0].similarity > 0.6) {
    return matches[0].answer;
  }
  // If we have multiple decent matches, consider combining information
  else if (matches[0].similarity > 0.4 && matches[1].similarity > 0.3) {
    // Check if the top matches are related (having similar answers)
    const answer1Words = new Set(preprocessText(matches[0].answer).split(/\s+/));
    const answer2Words = new Set(preprocessText(matches[1].answer).split(/\s+/));
    
    // Simple way to check answer similarity - count common words
    let commonWords = 0;
    answer1Words.forEach(word => {
      if (answer2Words.has(word)) commonWords++;
    });
    
    // If answers seem related, return the better match
    return matches[0].answer;
  }
  // If no good match, search for keywords in the input
  else {
    const keywords = preprocessText(userInput).split(/\s+/);
    const keywordMatches = [];
    
    // Check each knowledge base entry for keyword matches
    knowledgeBase.forEach(item => {
      const questionWords = new Set(preprocessText(item.question).split(/\s+/));
      let matchCount = 0;
      
      keywords.forEach(keyword => {
        if (questionWords.has(keyword)) matchCount++;
      });
      
      if (matchCount > 0) {
        keywordMatches.push({ ...item, matchCount });
      }
    });
    
    if (keywordMatches.length > 0) {
      // Sort by match count
      keywordMatches.sort((a, b) => b.matchCount - a.matchCount);
      return keywordMatches[0].answer;
    }
    
    return "I don't have specific information about that. Could you try rephrasing your question about Nevin's background, skills, or projects?";
  }
}

// Chatbot Elements
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');
const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');

// Event Listeners
chatbotSendBtn.addEventListener('click', handleUserInput);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleUserInput();
});

// Function to Add a Message to the Chatbot
function addMessage(message, isUser = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbot-message');
  messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
}

// Function to Handle User Input
function handleUserInput() {
  const userInput = chatbotInput.value.trim();
  if (userInput === "") return;

  addMessage(userInput, true); // Add user message
  chatbotInput.value = ""; // Clear input

  // Add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('chatbot-message', 'bot-message', 'typing-indicator');
  typingIndicator.textContent = "...";
  chatbotMessages.appendChild(typingIndicator);

  // Simulate a short delay for processing (more natural)
  setTimeout(() => {
    // Remove typing indicator
    chatbotMessages.removeChild(typingIndicator);
    
    // Get and display response
    const response = findBestMatch(userInput);
    addMessage(response);
  }, 600);
}

// Event Listeners
chatbotSendBtn.addEventListener('click', handleUserInput);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleUserInput();
});

// Show welcome message after page load
window.addEventListener('load', () => {
  chatbotContainer.style.display = 'block';
  setTimeout(() => {
    addMessage("Hi! I'm Nevin's portfolio assistant. Ask me anything about his skills, experience, projects, or interests!");
  }, 500);
});