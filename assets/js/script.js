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
const knowledgeBase = [
  // Basic interactions
  { question: "hi", answer: "Hello! I'm Nevin's portfolio assistant. How can I help you today?" },
  { question: "hello", answer: "Hi there! I can tell you all about Nevin's skills, projects, and experience. What would you like to know?" },
  { question: "what is your name", answer: "I'm Nevin's portfolio chatbot, designed to share information about his skills, projects, and background." },
  { question: "what can you do", answer: "I can answer questions about Nevin's education, work experience, technical skills, projects, and personal interests like his YouTube channel and Medium articles." },
  { question: "bye", answer: "Goodbye! Feel free to return if you have more questions about Nevin's portfolio." },
  { question: "thank you", answer: "You're welcome! If you have more questions about Nevin, I'm here to help." },
  
  // Personal information
  { question: "tell me about nevin", answer: "Nevin is a Data Science and Machine Learning professional with a Master's from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more. He also runs a vlogging YouTube channel and writes technical articles on Medium." },
  { question: "who is nevin", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "contact information", answer: "You can reach Nevin at nselby@wisc.edu or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "phone number", answer: "Nevin's phone number is +1 (608) 239-6451." },
  { question: "email address", answer: "Nevin's email address is nselby@wisc.edu." },

  // Education
  { question: "education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "where did nevin study", answer: "Nevin completed his Master's in Data Science at University of Wisconsin-Madison and his Bachelor's in Computer Science at Indian Institute of Information Technology, Kottayam." },
  { question: "gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison and a 9.15/10.0 GPA in his Bachelor's program at IIIT Kottayam." },
  { question: "masters gpa", answer: "Nevin's Master's GPA at UW-Madison is 3.70/4.0." },
  { question: "bachelors gpa", answer: "Nevin's Bachelor's GPA at IIIT Kottayam is 9.15/10.0." },
  { question: "coursework", answer: "Nevin's Master's coursework includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization. His Bachelor's coursework covered Machine Learning, Data Structures, Cloud Computing, and Statistical Learning." },
  { question: "masters coursework", answer: "Nevin's Master's coursework at UW-Madison includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization" },
  { question: "bachelors coursework", answer: "Nevin's Bachelor's coursework at IIIT Kottayam included Machine Learning, Data Structures, Cloud Computing, and Statistical Learning" },
  { question: "masters degree", answer: "Nevin is pursuing a Master of Science in Data Science from the University of Wisconsin-Madison, expected to graduate in May 2025." },
  { question: "bachelors degree", answer: "Nevin holds a Bachelor of Technology in Computer Science from the Indian Institute of Information Technology, Kottayam, completed in May 2023." },
  { question: "when did nevin start masters", answer: "Nevin started his Master's program at UW-Madison in Fall 2023 (September 2023)." },
  { question: "when did nevin graduate bachelors", answer: "Nevin graduated with his Bachelor's degree from IIIT Kottayam in May 2023." },
  { question: "bachelors final year project", answer: "For his Bachelor's final year project, Nevin developed an advanced machine learning system that focused on computer vision applications. The project demonstrated his early expertise in AI technologies and laid the foundation for his graduate studies in Data Science." },
  { question: "final year project", answer: "Nevin's Bachelor's final year project involved developing a computer vision application using deep learning techniques. He implemented various CNN architectures and demonstrated practical applications of AI in real-world scenarios." },
  { question: "thesis", answer: "Nevin's Master's program at UW-Madison is course-based and doesn't require a thesis. However, his academic projects demonstrate significant research and practical applications in machine learning and data science." },
  
  // Visa Status and Work Authorization
  { question: "visa status", answer: "Nevin is currently on an F-1 student visa in the United States while completing his Master's degree at UW-Madison." },
  { question: "work authorization", answer: "Nevin is authorized to work in the US with his F-1 visa status through OPT and potentially 2 years of STEM OPT extension (total 3 years). He may require work visa sponsorship for long-term employment in the US. He is also authorized to work in India without restrictions." },
  { question: "can nevin work in us", answer: "Yes, Nevin can work in the US through F-1 OPT (Optional Practical Training) for 1 year, with eligibility for an additional 2 years of STEM OPT extension due to his Data Science degree. For long-term employment, he may require H-1B or other work visa sponsorship." },
  { question: "need sponsorship", answer: "Nevin has work authorization through F-1 OPT and STEM OPT (potentially up to 3 years total), but would require visa sponsorship for long-term employment in the US beyond that period." },
  { question: "when did nevin come to us", answer: "Nevin came to the United States in Fall 2023 (September 2023) to pursue his Master's degree at the University of Wisconsin-Madison." },
  { question: "OPT", answer: "Nevin is eligible for 1 year of OPT (Optional Practical Training) plus 2 additional years of STEM OPT extension due to his Data Science degree, allowing for up to 3 years of work authorization in the US after completing his Master's program." },
  { question: "citizenship", answer: "Nevin is an Indian citizen currently in the US on an F-1 student visa while pursuing his Master's degree." },
  { question: "international student", answer: "Yes, Nevin is an international student from India studying at the University of Wisconsin-Madison on an F-1 visa." },
  
  // Work Experience
  { question: "work experience", answer: "Nevin's work experience includes: Data Science Intern at Wisconsin School of Business (using ML, NLP, ETL pipelines), Assistant in AI/Data Research at UW College of Agricultural & Life Sciences (implementing CV models, AWS pipelines), and Graduate Researcher at Wisconsin Institute for Discovery (developing active learning systems)." },
  { question: "professional experience", answer: "Nevin has worked as a Data Science Intern analyzing Starbucks unionization impacts using GPT-3.5 and BERT, an AI/Data Research Assistant developing ML models for cranberry classification using ResNet50 and YOLOv8, and a Graduate Researcher implementing active learning pipelines with CLIP and Stable Diffusion." },
  { question: "current job", answer: "Nevin is currently a Data Science Intern at Wisconsin School of Business where he investigates Starbucks unionization impact using NLP techniques, optimizes GPT API costs, and develops ETL pipelines." },
  { question: "wisconsin school of business", answer: "At Wisconsin School of Business, Nevin analyzed Starbucks unionization impact using GPT-3.5-Turbo and BERT, streamlined SQL-driven ETL pipelines, optimized GPT API costs by 25%, and used CLIP-based multimodal embeddings for Etsy artwork price prediction. He also developed interactive Tableau dashboards visualizing trends in customer feedback." },
  { question: "wisconsin school of business tools", answer: "At Wisconsin School of Business, Nevin used GPT-3.5-Turbo, BERT for fine-tuning, SQL for ETL pipelines, CLIP for multimodal embeddings, Tableau for dashboards, and prompt optimization techniques for GPT API cost reduction." },
  { question: "uw college", answer: "At UW College of Agricultural & Life Sciences, Nevin engineered cranberry classification models using ResNet50 improving accuracy by 25%, implemented YOLOv8 for object detection with 15% enhanced precision, built AWS ML pipelines with S3 and SageMaker integrated with MLflow, and performed time-series analysis on cranberry growth patterns." },
  { question: "uw college tools", answer: "At UW College of Agricultural & Life Sciences, Nevin used ResNet50, YOLOv8, semi-supervised learning with CLIP, Albumentations for data augmentation, AWS (S3, SageMaker), MLflow for model tracking, and Matplotlib/Seaborn for visualization." },
  { question: "wisconsin institute for discovery", answer: "At Wisconsin Institute for Discovery, Nevin implemented an automated active learning pipeline with CLIP and Stable Diffusion, reducing manual annotation by 80%, innovated an image labeling system that refined CLIP's predictions, and benchmarked model performance against 20+ research papers." },
  { question: "wisconsin institute for discovery tools", answer: "At Wisconsin Institute for Discovery, Nevin used CLIP, Stable Diffusion, active learning techniques, and benchmarking methodologies while working with ImageNet, CIFAR-10, and CIFAR-100 datasets." },
  
  // Projects
  { question: "projects", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "automl", answer: "AutoML-ify is an innovative end-to-end ML pipeline using Streamlit that enables users to upload datasets and automate data cleaning, preprocessing, EDA, and model selection. It uses RandomizedSearchCV for hyperparameter tuning across 10+ ML algorithms (XGBoost, SVM), Pickle for model persistence, and Plotly for interactive visualizations." },
  { question: "automl tools", answer: "For the AutoML-ify project, Nevin used Streamlit for the frontend, Pandas for data manipulation, Scikit-learn for preprocessing and modeling, RandomizedSearchCV for hyperparameter tuning, XGBoost and SVM among 10+ algorithms, Pickle for model persistence, and Plotly for interactive visualizations." },
  { question: "weather prediction", answer: "Not Your Basic Weather Prediction is a weather forecasting system using XGBoost, Streamlit, and MLflow that provides real-time temperature forecasting with ±2°C accuracy. It features an automated MLOps pipeline with GitHub Actions for daily data drift checks and model retraining when drift exceeds a predefined threshold." },
  { question: "weather prediction tools", answer: "For the Weather Prediction project, Nevin used XGBoost as the primary algorithm, Streamlit for the user interface, MLflow for tracking experiments, GitHub Actions for CI/CD and automation, and data drift monitoring techniques." },
  { question: "whatsapp chat", answer: "The WhatsApp Chat Analysis project is an interactive dashboard that analyzes WhatsApp chat data, extracting insights on user activity, peak messaging times, emoji usage, and engagement levels from over 100,000 messages. It processes up to 200MB of exported chat logs with an average processing time under 10 seconds." },
  { question: "whatsapp chat tools", answer: "For the WhatsApp Chat Analysis project, Nevin used Python for text parsing and analysis, efficient string operations and caching for performance optimization, and visualization libraries to display user activity, messaging patterns, and emoji usage trends." },
  { question: "github", answer: "You can find Nevin's projects on his GitHub: github.com/nevinselby" },
  { question: "most impressive project", answer: "Nevin's most impressive project is AutoML-ify, which automates the entire machine learning pipeline from data cleaning to model deployment using Streamlit, multiple ML algorithms, and interactive visualizations, demonstrating his ability to build end-to-end data science solutions." },
  
  // Skills and Tools
  { question: "what are nevin's skills", answer: "Nevin's skills include Machine Learning (PyTorch, TensorFlow, Scikit-learn, XGBoost), MLOps (Docker, Kubernetes, MLflow), Computer Vision (CLIP, Stable Diffusion, ResNet, YOLO), NLP (BERT, GPT), Data Analysis & Visualization (SQL, Tableau, Power BI), Cloud technologies (AWS), and programming in Python, SQL, C++, and JavaScript." },
  { question: "technical skills", answer: "Nevin is skilled in Python, PyTorch, TensorFlow, SQL, AWS (SageMaker, Lambda, S3), Docker, Kubernetes, MLflow, CLIP, Stable Diffusion, BERT, GPT, ResNet, YOLO, Tableau, and Power BI. His strongest skills are in Python, PyTorch, and AWS." },
  { question: "programming languages", answer: "Nevin is proficient in Python (expert level), SQL (advanced), C++ (intermediate), and JavaScript (intermediate). Python is his strongest programming language, which he uses extensively for ML and data science work." },
  { question: "python libraries", answer: "Nevin is proficient with many Python libraries including PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, Plotly, Transformers, Streamlit, Flask, and automation libraries. He's especially strong with PyTorch, Pandas, and Scikit-learn." },
  { question: "machine learning", answer: "Nevin has expertise in various ML areas including PyTorch, TensorFlow, Scikit-learn, Transformers, LLMs (worked with GPT-3.5), Computer Vision (CLIP, Stable Diffusion, ResNet50, YOLOv8), and NLP (BERT fine-tuning). His strongest ML skills are in computer vision and working with transformer-based models." },
  { question: "machine learning frameworks", answer: "Nevin is experienced with PyTorch (expert), TensorFlow (advanced), Scikit-learn (expert), Hugging Face Transformers (advanced), XGBoost (advanced), and has implemented various CNN architectures like ResNet and YOLO. PyTorch is his preferred deep learning framework." },
  { question: "deep learning", answer: "Nevin has deep learning experience implementing ResNet50 for cranberry classification, using CLIP and Stable Diffusion for active learning pipelines, fine-tuning BERT for sentiment analysis, and working with multimodal embeddings. He's strongest in computer vision and transformers applications." },
  { question: "computer vision", answer: "Nevin's computer vision experience includes developing ResNet50 models for cranberry classification (25% accuracy improvement), implementing YOLOv8 for object detection (15% precision enhancement), using CLIP for image labeling, and Stable Diffusion for data augmentation. He's implemented custom data augmentation using Albumentations." },
  { question: "nlp", answer: "Nevin's NLP experience includes fine-tuning BERT models for sentiment analysis on customer reviews, using GPT-3.5-Turbo for text generation and analysis, implementing prompt optimization techniques for LLMs, and analyzing WhatsApp chat data for user behavior insights." },
  { question: "data analysis", answer: "Nevin's data analysis skills include SQL (advanced querying and ETL), Tableau and Power BI for visualization, Matplotlib/Seaborn/Plotly for Python-based visualization, A/B Testing, Hypothesis Testing, Regression Analysis, and time-series analysis. He's especially strong in SQL-based analysis and interactive visualizations." },
  { question: "cloud", answer: "Nevin has experience with AWS services including SageMaker, Lambda, and S3. He's implemented end-to-end ML pipelines on AWS integrated with MLflow, enabling seamless model versioning and deployment. He's also worked with data platforms like Snowflake and PostgreSQL." },
  { question: "aws experience", answer: "Nevin has substantial AWS experience, having worked with SageMaker for ML model deployment, S3 for data storage, Lambda for serverless computing, and integrated these services with MLflow for model tracking. He's implemented complete ML pipelines on AWS for production use cases." },
  { question: "databases", answer: "Nevin is experienced with SQL databases including PostgreSQL, data warehousing solutions like Snowflake, and has built ETL pipelines for data transformation and loading. He's proficient in advanced SQL operations and database optimization techniques." },
  { question: "mlops", answer: "Nevin's MLOps experience includes working with Docker, Kubernetes, MLflow, Weights & Biases, and Git. He's built automated ML pipelines with GitHub Actions for continuous model monitoring, data drift detection, and automated retraining when needed." },
  { question: "data visualization", answer: "Nevin is skilled in data visualization using Tableau, Power BI, Matplotlib, Seaborn, and Plotly. He's created interactive dashboards for customer sentiment analysis, cranberry growth patterns, and WhatsApp chat insights." },
  { question: "strongest skills", answer: "Nevin's strongest technical skills are in Python programming, PyTorch for deep learning, computer vision applications (especially with CLIP and ResNet), MLOps automation, and AWS cloud implementations. He excels at building end-to-end ML pipelines from data processing to deployment." },
  { question: "most proficient tools", answer: "Nevin is most proficient with Python, PyTorch, Scikit-learn, Pandas, AWS SageMaker, SQL, Tableau, and Git. He's particularly strong with PyTorch for deep learning implementations and AWS for cloud-based ML solutions." },
  { question: "favorite technologies", answer: "Nevin's favorite technologies to work with are PyTorch for deep learning research, CLIP for multimodal applications, AWS SageMaker for ML deployment, and Streamlit for building interactive data applications. He particularly enjoys working with computer vision models and transformer architectures." },
  
  // Certifications
  { question: "certifications", answer: "Nevin holds several certifications including AWS Machine Learning Foundations 2022 (Udacity), Computer Vision (Kaggle), Intro to Deep Learning (Kaggle), and NLP Bootcamp (AI Planet). These certifications complement his formal education and demonstrate his commitment to continuous learning." },
  { question: "aws certification", answer: "Nevin has completed the AWS Machine Learning Foundations certification through Udacity in 2022, demonstrating his knowledge of cloud-based ML implementations and AWS services for data science workflows." },
  { question: "kaggle certifications", answer: "Nevin has earned Kaggle certifications in Computer Vision and Intro to Deep Learning, validating his expertise in these domains through practical assessments and competitions." },
  { question: "nlp certification", answer: "Nevin completed the NLP Bootcamp certification from AI Planet, covering topics like text preprocessing, sentiment analysis, named entity recognition, and implementing transformer models." },
  { question: "online courses", answer: "Besides his formal education, Nevin has completed online courses and certifications in AWS Machine Learning, Computer Vision, Deep Learning, and NLP from platforms like Udacity, Kaggle, and AI Planet." },
  
  // Personal Interests
  { question: "youtube channel", answer: "Nevin runs a YouTube vlogging channel where he shares his adventures and personal experiences. His channel focuses on lifestyle content and day-in-the-life style videos, showing his life outside of his technical work." },
  { question: "youtube", answer: "Nevin has a YouTube channel dedicated to vlogging and sharing his adventures. It's a creative outlet separate from his technical work where he documents his experiences and travels." },
  { question: "medium", answer: "Nevin writes technical articles on Medium, sharing his knowledge about data science, machine learning, and programming concepts. His articles cover topics from beginner to advanced levels in AI and data science." },
  { question: "medium articles", answer: "On Medium, Nevin publishes technical articles covering topics like data science methodologies, ML model optimization, coding best practices, MLOps, computer vision techniques, and emerging technology trends." },
  { question: "hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel, writing technical articles on Medium, traveling, photography, and exploring new technologies in his spare time." },
  
  // Research and Academic Interests
  { question: "research", answer: "Nevin has research experience at Wisconsin Institute for Discovery working on automated active learning pipelines using CLIP and Stable Diffusion, and at UW College of Agricultural & Life Sciences researching cranberry phenology classification and optimization." },
  { question: "research interests", answer: "Nevin's research interests include computer vision, active learning methodologies, multimodal learning with CLIP, application of transformer models, NLP, and applying AI to real-world problems like agricultural optimization." },
  { question: "academic strengths", answer: "Nevin's academic strengths include machine learning theory, statistics, algorithm development, research methodology, and translating complex concepts into practical implementations. He maintained high GPAs in both his Bachelor's (9.15/10.0) and Master's (3.70/4.0) programs." },
  
  // Specific Technical Questions
  { question: "nlp experience", answer: "Nevin has NLP experience through his work at Wisconsin School of Business where he used GPT-3.5-Turbo and fine-tuned BERT models on customer reviews for sentiment analysis, optimized prompts to reduce API costs by 25%, and analyzed Starbucks unionization impact through text analysis." },
  { question: "computer vision experience", answer: "Nevin's computer vision experience includes developing ResNet50 and YOLOv8 models for cranberry classification and object detection, implementing CLIP and Stable Diffusion for image labeling and data augmentation, custom augmentation techniques with Albumentations, and semi-supervised learning approaches." },
  { question: "mlops experience", answer: "Nevin's MLOps experience includes setting up end-to-end ML pipelines on AWS with SageMaker and MLflow, implementing automated model monitoring and retraining with GitHub Actions, working with Docker and Kubernetes for containerization, and using versioning tools for model management." },
  { question: "data engineering", answer: "Nevin's data engineering experience includes building SQL-driven ETL pipelines with 90% reduction in manual intervention, working with data warehousing solutions like Snowflake, implementing data transformation workflows, and setting up automated data processing systems for ML model training." },
  
  // Projects - Additional Details
  { question: "automl details", answer: "The AutoML-ify project handles data cleaning (missing values, outliers), feature engineering (encoding, scaling), automated EDA with visual reports, model selection across 10+ algorithms, hyperparameter tuning with RandomizedSearchCV, cross-validation, model evaluation with multiple metrics, and one-click deployment. It reduced the typical ML workflow from days to minutes." },
  { question: "weather prediction details", answer: "The Weather Prediction project uses historical weather data, geolocation information, and seasonal patterns for forecasting. It employs XGBoost as the primary algorithm with feature engineering for temporal patterns, implements automated drift detection to identify when predictions become less accurate, and uses MLflow to track experiment results and model versions." },
  { question: "whatsapp chat details", answer: "The WhatsApp Chat Analysis project preprocesses raw chat exports, handles multi-format messages including media and links, analyzes messaging patterns by time of day and day of week, tracks emoji usage and sentiment trends, identifies group dynamics and participant engagement levels, and visualizes all insights through an interactive dashboard." },
  
  // Strengths and Work Style
  { question: "strengths", answer: "Nevin's key strengths include his deep technical knowledge in ML/AI, ability to quickly adopt new technologies, end-to-end project implementation skills, strong mathematical foundation, communication skills evidenced by his Medium articles, and experience across multiple domains of AI including computer vision, NLP, and MLOps." },
  { question: "work style", answer: "Nevin has a methodical approach to problem-solving, values collaboration as shown in his work with cranberry growers, demonstrates research rigor through his benchmarking against 20+ papers, and has a track record of delivering measurable improvements (25% accuracy increase, 90% reduction in manual processes) in his projects." },
  { question: "communication skills", answer: "Nevin has strong communication skills demonstrated through his technical writing on Medium, collaborative work with domain experts like cranberry growers, ability to translate complex ML concepts into business insights, and content creation on his YouTube channel." },
  
  // Career Goals
  { question: "career goals", answer: "Nevin aims to further develop his expertise in applied machine learning, particularly in computer vision and multimodal learning, while building scalable AI systems that solve real-world problems. He's interested in roles that combine research innovation with practical implementation." },
  { question: "future plans", answer: "After completing his Master's in May 2025, Nevin plans to work in an AI/ML role that allows him to apply his technical skills to challenging problems, potentially in computer vision or multimodal learning applications. He's open to opportunities in the US (with his OPT/STEM OPT work authorization) or internationally." },
  
  // Additional Skills and Knowledge
  { question: "big data", answer: "Nevin has experience with big data technologies and has worked with large datasets in his projects, including processing 200MB chat logs and working with ImageNet for computer vision research." },
  { question: "devops", answer: "Nevin has DevOps experience through his MLOps work, including CI/CD implementation with GitHub Actions, containerization with Docker, and orchestration with Kubernetes." },
  { question: "agile", answer: "Nevin is familiar with Agile development methodologies and has applied them in his project work, particularly when collaborating on research initiatives and developing software solutions." },
  { question: "leadership", answer: "Nevin has demonstrated leadership through his project implementations, guiding technical decisions, and collaborating with stakeholders like cranberry growers to ensure solutions meet practical needs." },
  
  // Fallback Response
  { question: "fallback", answer: "I don't have specific information about that aspect of Nevin's background. Would you like to know about his education, work experience, technical skills, projects, or visa status instead?" },

  // Education
  { question: "education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology (2019-2023) with a 9.15/10.0 GPA." },
  { question: "where did nevin study", answer: "Nevin completed his Master's in Data Science at University of Wisconsin-Madison and his Bachelor's in Computer Science at Indian Institute of Information Technology." },
  { question: "gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program and a 9.15/10.0 GPA in his Bachelor's program." },
  { question: "coursework", answer: "Nevin's Master's coursework includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization. His Bachelor's coursework covered Machine Learning, Data Structures, Cloud Computing, and Statistical Learning." },
  
  // Work Experience
  { question: "work experience", answer: "Nevin's work experience includes: Data Science Intern at Wisconsin School of Business, Assistant in AI/Data Research at UW College of Agricultural & Life Sciences, and Graduate Researcher at Wisconsin Institute for Discovery." },
  { question: "professional experience", answer: "Nevin has worked as a Data Science Intern analyzing Starbucks unionization impacts, an AI/Data Research Assistant developing ML models for cranberry classification, and a Graduate Researcher implementing active learning pipelines." },
  { question: "current job", answer: "Nevin is currently a Data Science Intern at Wisconsin School of Business where he investigates Starbucks unionization impact using NLP techniques and develops ETL pipelines." },
  { question: "wisconsin school of business", answer: "At Wisconsin School of Business, Nevin analyzed Starbucks unionization impact using GPT-3.5-Turbo and BERT, streamlined SQL-driven ETL pipelines, optimized GPT API costs, and developed interactive Tableau dashboards." },
  { question: "uw college", answer: "At UW College of Agricultural & Life Sciences, Nevin engineered cranberry classification models using ResNet50 and YOLOv8, implemented AWS ML pipelines, and performed time-series analysis on cranberry growth patterns." },
  { question: "wisconsin institute for discovery", answer: "At Wisconsin Institute for Discovery, Nevin implemented an automated active learning pipeline with CLIP and Stable Diffusion, reducing manual annotation by 80%, and developed statistical models to benchmark image classification techniques." },
  
  // Projects
  { question: "projects", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline), Not Your Basic Weather Prediction (a weather forecasting system), and WhatsApp Chat Analysis (an interactive dashboard for chat analysis)." },
  { question: "automl", answer: "AutoML-ify is an innovative end-to-end ML pipeline using Streamlit that enables users to upload datasets and automate data cleaning, preprocessing, EDA, and model selection with minimal human intervention." },
  { question: "weather prediction", answer: "Not Your Basic Weather Prediction is a weather forecasting system using XGBoost, Streamlit, and MLflow that provides real-time temperature forecasting with ±2°C accuracy and features an automated MLOps pipeline." },
  { question: "whatsapp chat", answer: "The WhatsApp Chat Analysis project is an interactive dashboard that analyzes WhatsApp chat data, extracting insights on user activity, peak messaging times, emoji usage, and engagement levels from over 100,000 messages." },
  { question: "github", answer: "You can find Nevin's projects on his GitHub: github.com/nevinselby" },
  
  // Skills
  { question: "what are nevin's skills", answer: "Nevin's skills include Machine Learning (PyTorch, TensorFlow, Scikit-learn), MLOps (Docker, Kubernetes, MLflow), Data Analysis & Visualization (SQL, Tableau, Power BI), Cloud technologies (AWS), and programming in Python, SQL, C++, and JavaScript." },
  { question: "technical skills", answer: "Nevin is skilled in Python, PyTorch, TensorFlow, SQL, AWS (SageMaker, Lambda, S3), Docker, Kubernetes, MLflow, Tableau, and Power BI." },
  { question: "programming languages", answer: "Nevin is proficient in Python, SQL, C++, and JavaScript." },
  { question: "machine learning", answer: "Nevin has expertise in various ML areas including PyTorch, TensorFlow, Scikit-learn, Transformers, LLMs, Computer Vision, and NLP." },
  { question: "data analysis", answer: "Nevin's data analysis skills include SQL, Tableau, Power BI, Matplotlib, Seaborn, Excel, A/B Testing, Hypothesis Testing, and Regression Analysis." },
  { question: "cloud", answer: "Nevin has experience with AWS services including SageMaker, Lambda, and S3, as well as data platforms like Snowflake and PostgreSQL." },
  
  // Personal Interests
  { question: "youtube channel", answer: "Nevin runs a YouTube vlogging channel where he shares his adventures and personal experiences. His channel focuses on lifestyle content and day-in-the-life style videos." },
  { question: "youtube", answer: "Nevin has a YouTube channel dedicated to vlogging and sharing his adventures. It's a creative outlet separate from his technical work." },
  { question: "medium", answer: "Nevin writes technical articles on Medium, sharing his knowledge about data science, machine learning, and programming concepts." },
  { question: "medium articles", answer: "On Medium, Nevin publishes technical articles covering topics like data science, ML model optimization, coding best practices, and technology trends." },
  { question: "hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel and writing technical articles on Medium." },
  
  // Research
  { question: "research", answer: "Nevin has research experience at Wisconsin Institute for Discovery where he worked on automated active learning pipelines using CLIP and Stable Diffusion, and at UW College of Agricultural & Life Sciences researching cranberry phenology." },
  { question: "research interests", answer: "Nevin's research interests include computer vision, active learning, NLP, and applying AI to real-world problems like agricultural optimization." },
  
  // Specific Technical Questions
  { question: "nlp experience", answer: "Nevin has NLP experience through his work at Wisconsin School of Business where he used GPT-3.5-Turbo and fine-tuned BERT models on customer reviews for sentiment analysis." },
  { question: "computer vision", answer: "Nevin's computer vision experience includes developing ResNet50 and YOLOv8 models for cranberry classification and object detection, as well as implementing CLIP and Stable Diffusion for image labeling." },
  { question: "mlops", answer: "Nevin's MLOps experience includes working with Docker, Kubernetes, MLflow, Weights & Biases, and Git, plus setting up automated pipelines with GitHub Actions for model monitoring and retraining." },

  // Basic interactions
  { question: "hello!", answer: "Hello! I'm Nevin's portfolio assistant. How can I help you today?" },
  { question: "heya", answer: "Hi there! I can tell you all about Nevin's skills, projects, and experience. What would you like to know?" },
  { question: "what is your name", answer: "I'm Nevin's portfolio chatbot - NevBot, designed to share information about his skills, projects, and background." },
  { question: "what can you do", answer: "I can answer questions about Nevin's education, work experience, technical skills, projects, and personal interests like his YouTube channel and Medium articles." },
  { question: "bye", answer: "Goodbye! Feel free to return if you have more questions about Nevin's portfolio." },
  { question: "thank you", answer: "You're welcome! If you have more questions about Nevin, I'm here to help." },

  // Variations of basic interactions
  { question: "hey", answer: "Hey there! How can I assist you today?" },
  { question: "what do you know about nevin", answer: "I have a detailed profile of Nevin, including his education, work experience, projects, research, and more!" },
  { question: "who are you", answer: "I'm a chatbot built to provide information about Nevin's career, skills, and interests." },

  // Personal information
  { question: "tell me about nevin", answer: "Nevin is a Data Science and Machine Learning professional with a Master's from UW-Madison. He has experience in ML, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more." },
  { question: "who is nevin", answer: "Nevin John Selby is a Data Science professional with a strong background in AI, NLP, and machine learning research. He has worked on multiple projects in academia and industry." },
  { question: "how can I contact nevin", answer: "You can reach Nevin via email at nselby@wisc.edu or on LinkedIn: linkedin.com/in/nevinselby." },
  { question: "what is nevin's linkedin", answer: "Nevin's LinkedIn profile is: linkedin.com/in/nevinselby." },
  { question: "does nevin have a github", answer: "Yes! You can check out Nevin’s GitHub projects at github.com/nevinselby." },

  // Additional personal details
  { question: "where is nevin from", answer: "Nevin is originally from India and moved to the US for his Master's degree." },
  { question: "when did nevin come to the US", answer: "Nevin arrived in the US in Fall 2023 for his Master's in Data Science at UW-Madison." },

  // Education
  { question: "education", answer: "Nevin holds a Master's in Data Science from UW-Madison (GPA: 3.70/4.0) and a Bachelor's in Computer Science from IIIT Kottayam (GPA: 9.15/10.0)." },
  { question: "what universities did nevin attend", answer: "Nevin studied at the University of Wisconsin-Madison for his Master's and Indian Institute of Information Technology Kottayam for his Bachelor's." },
  { question: "gpa", answer: "Nevin achieved a 3.70/4.0 GPA in his Master's program and a 9.15/10.0 GPA in his Bachelor's program." },

  // Additional education details
  { question: "what is nevin's field of study", answer: "Nevin's field of study is Data Science, with a strong foundation in Machine Learning and Artificial Intelligence." },
  { question: "did nevin take deep learning courses", answer: "Yes, he studied Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization as part of his coursework." },

  // Work Authorization & Visa
  { question: "visa status", answer: "Nevin is currently on an F-1 Visa, with work authorization under STEM OPT." },
  { question: "does nevin need visa sponsorship", answer: "Yes, Nevin may require work sponsorship in the future after his STEM OPT period ends." },

  // Work Experience
  { question: "work experience", answer: "Nevin has worked as a Data Science Intern at Wisconsin School of Business, an AI/Data Research Assistant at UW College of Agricultural & Life Sciences, and a Graduate Researcher at Wisconsin Institute for Discovery." },
  { question: "where has nevin worked", answer: "Nevin has worked in academic research and industry roles, including positions at the Wisconsin School of Business and the Wisconsin Institute for Discovery." },

  // More job details
  { question: "what is nevin currently working on", answer: "Nevin is working as a Data Science Intern at Wisconsin School of Business, focusing on NLP-based sentiment analysis and ETL automation." },
  { question: "does nevin have experience in NLP", answer: "Yes, he has applied NLP for sentiment analysis, chatbot development, and text classification using GPT and BERT models." },

  // Skills
  { question: "what are nevin's skills", answer: "Nevin's skills include Python, SQL, PyTorch, TensorFlow, AWS, Docker, Kubernetes, Tableau, and Power BI." },
  { question: "does nevin know cloud computing", answer: "Yes, he has hands-on experience with AWS (SageMaker, Lambda, S3) and cloud-based ML deployments." },

  // Certifications
  { question: "certifications", answer: "Nevin holds certifications in AWS Machine Learning (Udacity), Computer Vision (Kaggle), Intro to Deep Learning (Kaggle), and NLP Bootcamp (AI Planet)." },
  { question: "is nevin certified in AWS", answer: "Yes, Nevin has completed the AWS Machine Learning Foundations course from Udacity." },

  // Projects
  { question: "projects", answer: "Nevin's major projects include AutoML-ify (automated ML pipelines), Not Your Basic Weather Prediction (real-time forecasting), and WhatsApp Chat Analysis (message insights)." },
  { question: "what is AutoML-ify", answer: "AutoML-ify is an ML automation tool using Streamlit that allows users to upload datasets and automatically build machine learning models." },
  { question: "what is Not Your Basic Weather Prediction", answer: "It is a weather prediction system using XGBoost and Streamlit, providing real-time temperature forecasting." },

  // Research
  { question: "does nevin do research", answer: "Yes, Nevin has conducted research in AI, active learning, and NLP at Wisconsin Institute for Discovery and UW College of Agricultural & Life Sciences." },
  { question: "what are nevin's research interests", answer: "His research focuses on deep learning, active learning, AI-driven automation, and real-world ML applications." },

  // Personal Interests
  { question: "hobbies", answer: "Nevin enjoys vlogging, writing technical articles on Medium, and keeping up with advancements in AI." },
  { question: "does nevin have a youtube channel", answer: "Yes, he runs a YouTube vlogging channel where he shares experiences and insights about data science." },
  { question: "does nevin write on medium", answer: "Yes, he writes technical articles covering AI, ML, and data science concepts on Medium." },

  // Fun Questions
  { question: "does nevin like AI", answer: "Absolutely! Nevin is passionate about AI and enjoys researching machine learning advancements." },
  { question: "what programming languages does nevin know", answer: "Python, SQL, C++, and JavaScript." },
  { question: "what databases does nevin use", answer: "He has experience with PostgreSQL, Snowflake, and MySQL." },

  // Basic questions
  { question: "hi", answer: "Hello! I'm Nevin's portfolio assistant. How can I help you today?" },
  { question: "hello", answer: "Hi there! I can tell you all about Nevin's skills, projects, and experience. What would you like to know?" },
  { question: "hey", answer: "Hey there! How can I assist you today?" },
  { question: "what is your name", answer: "I'm Nevin's portfolio chatbot, designed to share information about his skills, projects, and background." },
  { question: "who are you", answer: "I'm a chatbot built to provide information about Nevin's career, skills, and interests." },
  { question: "bye", answer: "Goodbye! Feel free to return if you have more questions about Nevin's portfolio." },
  { question: "thank you", answer: "You're welcome! If you have more questions about Nevin, I'm here to help." },
  { question: "i am not in a happy mood right now", answer: "I'm here for you. If you need a distraction, I can tell you about Nevin's work, projects, or hobbies." },
  { question: "can you cheer me up", answer: "Of course! Did you know Nevin has a YouTube channel where he shares fun and insightful experiences? Maybe checking it out will lift your spirits!" },

  // Personal information
  { question: "who is nevin", answer: "Nevin John Selby is a Data Science professional with expertise in AI, NLP, and machine learning research. He has worked on multiple projects in academia and industry." },
  { question: "tell me about nevin", answer: "Nevin is a Data Science and Machine Learning professional with a Master's from UW-Madison. He has experience in ML, NLP, computer vision, and data engineering." },
  { question: "how do I contact nevin", answer: "You can reach Nevin via email at nselby@wisc.edu or on LinkedIn: linkedin.com/in/nevinselby." },
  { question: "does nevin have a linkedin", answer: "Yes! You can connect with Nevin on LinkedIn at linkedin.com/in/nevinselby." },

  // Variations of contact info
  { question: "what is nevin's email", answer: "Nevin's email address is nselby@wisc.edu." },
  { question: "can I connect with nevin on github", answer: "Yes! You can check out Nevin’s GitHub projects at github.com/nevinselby." },

  // Education
  { question: "where did nevin study", answer: "Nevin studied at the University of Wisconsin-Madison for his Master's and Indian Institute of Information Technology Kottayam for his Bachelor's." },
  { question: "what degree does nevin have", answer: "Nevin holds a Master's in Data Science from UW-Madison and a Bachelor's in Computer Science from IIIT Kottayam." },
  { question: "what was nevin's gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program and a 9.15/10.0 GPA in his Bachelor's program." },

  // Work Authorization & Visa
  { question: "can nevin work in the US?", answer: "Yes, Nevin is authorized to work in the US under F-1 OPT (1+2 years STEM extension). He may require work sponsorship in the future." },
  { question: "is nevin eligible to work in the US?", answer: "Yes, Nevin has work authorization under F-1 OPT and is eligible for a 2-year STEM extension." },
  { question: "does nevin need visa sponsorship?", answer: "Yes, Nevin may require work sponsorship in the future after his STEM OPT period ends." },

  // Work Experience
  { question: "what work experience does nevin have", answer: "Nevin has worked as a Data Science Intern at Wisconsin School of Business, an AI/Data Research Assistant at UW College of Agricultural & Life Sciences, and a Graduate Researcher at Wisconsin Institute for Discovery." },
  { question: "where has nevin worked before", answer: "Nevin has worked in academic research and industry roles, including positions at the Wisconsin School of Business and the Wisconsin Institute for Discovery." },
  { question: "what is nevin currently working on", answer: "Nevin is working as a Data Science Intern at Wisconsin School of Business, focusing on NLP-based sentiment analysis and ETL automation." },

  // Skills
  { question: "what are nevin's skills", answer: "Nevin's skills include Python, SQL, PyTorch, TensorFlow, AWS, Docker, Kubernetes, Tableau, and Power BI." },
  { question: "does nevin have experience in cloud computing?", answer: "Yes, he has hands-on experience with AWS (SageMaker, Lambda, S3) and cloud-based ML deployments." },

  // Projects
  { question: "can you tell me about any projects nevin has worked on?", answer: "Sure! Nevin's key projects include AutoML-ify (an ML automation tool), Not Your Basic Weather Prediction (real-time forecasting), and WhatsApp Chat Analysis (message insights)." },
  { question: "tell me about nevin's projects", answer: "Sure! Nevin's key projects include AutoML-ify (an ML automation tool), Not Your Basic Weather Prediction (real-time forecasting), and WhatsApp Chat Analysis (message insights)." },
  { question: "projects", answer: "Sure! Nevin's key projects include AutoML-ify (an ML automation tool), Not Your Basic Weather Prediction (real-time forecasting), and WhatsApp Chat Analysis (message insights)." },
  { question: "projects he has worked in", answer: "Sure! Nevin's key projects include AutoML-ify (an ML automation tool), Not Your Basic Weather Prediction (real-time forecasting), and WhatsApp Chat Analysis (message insights)." },
  { question: "give me a list of projects nevin has worked on", answer: "Nevin has worked on projects such as AutoML-ify, Not Your Basic Weather Prediction, WhatsApp Chat Analysis, and an Etsy price prediction model using CLIP embeddings." },
  { question: "what is nevin's most impressive project?", answer: "One of Nevin’s most impressive projects is AutoML-ify, an ML automation tool that simplifies model building with no human intervention." },
  { question: "what are some of nevin's projects?", answer: "Nevin's key projects include AutoML-ify (an ML automation tool), Not Your Basic Weather Prediction (real-time forecasting), and WhatsApp Chat Analysis (message insights)." },

  // Research
  { question: "does nevin have research experience?", answer: "Yes, Nevin has conducted research in AI, active learning, and NLP at Wisconsin Institute for Discovery and UW College of Agricultural & Life Sciences." },
  { question: "what topics has nevin researched?", answer: "Nevin’s research focuses on deep learning, active learning, AI-driven automation, and real-world ML applications." },

  // Personal Interests
  { question: "what does nevin do in his free time?", answer: "Nevin enjoys vlogging, writing technical articles on Medium, and keeping up with advancements in AI." },
  { question: "does nevin have a youtube channel?", answer: "Yes! Nevin runs a vlogging YouTube channel where he shares experiences and insights about data science and life in the US." },
  { question: "does nevin write blogs?", answer: "Yes, he writes technical articles covering AI, ML, and data science concepts on Medium." },

  // Fun & Conversational Questions
  { question: "does nevin enjoy AI?", answer: "Absolutely! Nevin is passionate about AI and enjoys researching machine learning advancements." },
  { question: "what programming languages does nevin know?", answer: "Python, SQL, C++, and JavaScript." },
  { question: "what databases has nevin worked with?", answer: "He has experience with PostgreSQL, Snowflake, and MySQL." },
  { question: "what are nevin's strongest skills?", answer: "Nevin excels in machine learning, NLP, MLOps, cloud computing, and deep learning." },
  { question: "why should we hire nevin?", answer: "Nevin brings strong expertise in AI and ML, hands-on experience with real-world projects, and a passion for innovation." }

];

// Improved Text Processing Functions
function preprocessText(text) {
  return text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")  // Remove punctuation
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
    
    // Technical skills
    'machine': 1.5, 'learning': 1.5, 'data': 1.4, 'science': 1.4, 'python': 1.5,
    'pytorch': 1.5, 'tensorflow': 1.4, 'deep': 1.4, 'skills': 1.4, 'proficient': 1.4,
    'ml': 1.5, 'ai': 1.5, 'nlp': 1.5, 'computer': 1.4, 'vision': 1.4,
    'programming': 1.3, 'tools': 1.3, 'frameworks': 1.4, 'aws': 1.4, 'cloud': 1.3,
    'strongest': 1.5, 'best': 1.4, 'expert': 1.5, 'advanced': 1.4, 'clip': 1.4,
    'bert': 1.4, 'gpt': 1.4, 'sql': 1.4, 'database': 1.3, 'visualization': 1.3,
    'tableau': 1.3, 'powerbi': 1.3, 'docker': 1.3, 'kubernetes': 1.3, 'mlops': 1.4,
    
    // Experience
    'experience': 1.4, 'work': 1.4, 'job': 1.4, 'intern': 1.4, 'internship': 1.4,
    'research': 1.4, 'researcher': 1.4, 'assistant': 1.3, 'professional': 1.3,
    'current': 1.4, 'wisconsin': 1.3, 'business': 1.3, 'agricultural': 1.3, 'discovery': 1.3,
    
    // Projects
    'project': 1.4, 'projects': 1.4, 'automl': 1.5, 'weather': 1.4, 'whatsapp': 1.4,
    'github': 1.4, 'streamlit': 1.3, 'xgboost': 1.3, 'mlflow': 1.3, 'analysis': 1.3,
    
    // Visa and work authorization
    'visa': 1.6, 'status': 1.5, 'f1': 1.6, 'authorization': 1.6, 'opt': 1.6,
    'stem': 1.6, 'sponsor': 1.5, 'sponsorship': 1.5, 'international': 1.5, 'student': 1.4,
    'work': 1.5, 'authorized': 1.6, 'legally': 1.5, 'us': 1.4, 'india': 1.4,
    
    // Personal
    'nevin': 1.5, 'youtube': 1.4, 'channel': 1.3, 'medium': 1.4, 'articles': 1.3,
    'hobbies': 1.3, 'interests': 1.3, 'vlog': 1.3, 'vlogging': 1.3, 'technical': 1.3,
    'writing': 1.3,
    
    // Certifications
    'certification': 1.5, 'certifications': 1.5, 'certified': 1.5, 'udacity': 1.4,
    'kaggle': 1.4, 'bootcamp': 1.3
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