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
  { question: "hey", answer: "Hey there! How can I assist you today?" },
  { question: "heya", answer: "Hi there! I can tell you all about Nevin's skills, projects, and experience. What would you like to know?" },
  { question: "what is your name", answer: "I'm Nevin's portfolio chatbot - NevBot, designed to share information about his skills, projects, and background." },
  { question: "who are you", answer: "I'm a chatbot built to provide information about Nevin's career, skills, and interests." },
  { question: "what can you do", answer: "I can answer questions about Nevin's education, work experience, technical skills, projects, and personal interests like his YouTube channel and Medium articles." },
  { question: "what do you know about nevin", answer: "I have a detailed profile of Nevin, including his education, work experience, projects, research, and more!" },
  { question: "bye", answer: "Goodbye! Feel free to return if you have more questions about Nevin's portfolio." },
  { question: "thank you", answer: "You're welcome! If you have more questions about Nevin, I'm here to help." },
  { question: "i am not in a happy mood right now", answer: "I'm here for you. If you need a distraction, I can tell you about Nevin's work, projects, or hobbies." },
  { question: "can you cheer me up", answer: "Of course! Did you know Nevin has a YouTube channel where he shares fun and insightful experiences? Maybe checking it out will lift your spirits!" },

  // Personal information
  { question: "tell me about nevin", answer: "Nevin is a Data Science and Machine Learning professional with a Master's from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more. He also runs a vlogging YouTube channel and writes technical articles on Medium." },
  { question: "tell me about him", answer: "Nevin is a Data Science and Machine Learning professional with a Master's from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more. He also runs a vlogging YouTube channel and writes technical articles on Medium." },
  { question: "who is nevin", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "who is he", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "brief me about him", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "brief me about nevin", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "nevin bio", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "nevin's background", answer: "Nevin is a Data Science and Machine Learning professional with a Master's from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more." },
  { question: "introduce nevin", answer: "Nevin John Selby is a Data Science professional with a Master's from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "contact information", answer: "You can reach Nevin at nselby@wisc.edu or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "how can I contact nevin", answer: "You can reach Nevin at nselby@wisc.edu or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "contact details", answer: "You can reach Nevin at nselby@wisc.edu or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "how to reach nevin", answer: "You can reach Nevin at nselby@wisc.edu or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "phone number", answer: "Nevin's phone number is +1 (608) 239-6451." },
  { question: "nevin's phone", answer: "Nevin's phone number is +1 (608) 239-6451." },
  { question: "email address", answer: "Nevin's email address is nselby@wisc.edu." },
  { question: "nevin's email", answer: "Nevin's email address is nselby@wisc.edu." },
  { question: "what is nevin's linkedin", answer: "Nevin's LinkedIn profile is: linkedin.com/in/nevinselby." },
  { question: "does nevin have a linkedin", answer: "Yes! You can connect with Nevin on LinkedIn at linkedin.com/in/nevinselby." },
  { question: "linkedin profile", answer: "Nevin's LinkedIn profile is: linkedin.com/in/nevinselby." },
  { question: "github profile", answer: "You can find Nevin's projects on his GitHub: github.com/nevinselby" },
  { question: "does nevin have a github", answer: "Yes! You can check out Nevin's GitHub projects at github.com/nevinselby." },
  { question: "can I connect with nevin on github", answer: "Yes! You can check out Nevin's GitHub projects at github.com/nevinselby." },
  { question: "where is nevin from", answer: "Nevin is originally from India and moved to the US for his Master's degree." },
  { question: "nevin's origin", answer: "Nevin is originally from India and moved to the US for his Master's degree." },
  { question: "nevin's nationality", answer: "Nevin is originally from India and moved to the US for his Master's degree." },
  { question: "where did nevin come from", answer: "Nevin is originally from India and moved to the US for his Master's degree." },

  // Education
  { question: "education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "what are nevins educational qualifications", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "where did nevin study", answer: "Nevin completed his Master's in Data Science at University of Wisconsin-Madison and his Bachelor's in Computer Science at Indian Institute of Information Technology, Kottayam." },
  { question: "where did he get his degree", answer: "Nevin completed his Master's in Data Science at University of Wisconsin-Madison and his Bachelor's in Computer Science at Indian Institute of Information Technology, Kottayam." },
  { question: "list nevins education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "what is nevin currently studying", answer: "Nevin is pursuing a Master of Science in Data Science from the University of Wisconsin-Madison, expected to graduate in May 2025." },
  { question: "nevins education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "his education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "education history", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "academic background", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (2023-2025) with a 3.70/4.0 GPA and a Bachelor's in Computer Science from Indian Institute of Information Technology, Kottayam (2019-2023) with a 9.15/10.0 GPA." },
  { question: "gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison and a 9.15/10.0 GPA in his Bachelor's program at IIIT Kottayam." },
  { question: "nevin's gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison and a 9.15/10.0 GPA in his Bachelor's program at IIIT Kottayam." },
  { question: "what's his gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison and a 9.15/10.0 GPA in his Bachelor's program at IIIT Kottayam." },
  { question: "masters gpa", answer: "Nevin's Master's GPA at UW-Madison is 3.70/4.0." },
  { question: "bachelors gpa", answer: "Nevin's Bachelor's GPA at IIIT Kottayam is 9.15/10.0." },
  { question: "coursework", answer: "Nevin's Master's coursework includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization. His Bachelor's coursework covered Machine Learning, Data Structures, Cloud Computing, and Statistical Learning." },
  { question: "what courses did nevin take", answer: "Nevin's Master's coursework includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization. His Bachelor's coursework covered Machine Learning, Data Structures, Cloud Computing, and Statistical Learning." },
  { question: "subjects studied", answer: "Nevin's Master's coursework includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization. His Bachelor's coursework covered Machine Learning, Data Structures, Cloud Computing, and Statistical Learning." },
  { question: "masters coursework", answer: "Nevin's Master's coursework at UW-Madison includes Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization" },
  { question: "bachelors coursework", answer: "Nevin's Bachelor's coursework at IIIT Kottayam included Machine Learning, Data Structures, Cloud Computing, and Statistical Learning" },
  { question: "masters degree", answer: "Nevin is pursuing a Master of Science in Data Science from the University of Wisconsin-Madison, expected to graduate in May 2025." },
  { question: "bachelors degree", answer: "Nevin holds a Bachelor of Technology in Computer Science from the Indian Institute of Information Technology, Kottayam, completed in May 2023." },
  { question: "when did nevin start masters", answer: "Nevin started his Master's program at UW-Madison in Fall 2023 (September 2023)." },
  { question: "when does nevin graduate", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "when is he graduating", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "graduating in?", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "when graduating?", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "graduation", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "graduation", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "masters graduation", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "masters degree graduation", answer: "Nevin will graduate on May 2025. He is currently looking for full time roles starting in May/June 2025." },
  { question: "when does nevins masters degree end", answer: "Nevin's Master's degree will end on May 2025. i.e He will graduate in May 2025." },
  { question: "when will nevin finish his studies", answer: "Nevin will complete his studies in May 2025 and will graduate the same month." },  
  { question: "what is nevin's graduation date", answer: "Nevin's graduation date is set for May 2025. He is seeking full-time roles starting in May/June 2025." },  
  { question: "when does nevin complete his master's program", answer: "Nevin will complete his Master's program in May 2025 and graduate that month." },  
  { question: "when is nevin done with school", answer: "Nevin will be done with school in May 2025, which is when he graduates." },  
  { question: "when did nevin graduate bachelors", answer: "Nevin graduated with his Bachelor's degree from IIIT Kottayam in May 2023." },
  { question: "when did nevins bachelors end", answer: "Nevin graduated with his Bachelor's degree from IIIT Kottayam in May 2023." },
  { question: "when did nevin come to us", answer: "Nevin came to the United States in Fall 2023 (September 2023) to pursue his Master's degree at the University of Wisconsin-Madison." },
  { question: "when did nevin come to the US", answer: "Nevin arrived in the US in Fall 2023 for his Master's in Data Science at UW-Madison." },
  { question: "bachelors final year project", answer: "For his Bachelor's final year project, Nevin developed an advanced machine learning system that focused on computer vision applications. The project demonstrated his early expertise in AI technologies and laid the foundation for his graduate studies in Data Science." },
  { question: "final year project", answer: "Nevin's Bachelor's final year project involved developing a computer vision application using deep learning techniques. He implemented various CNN architectures and demonstrated practical applications of AI in real-world scenarios." },
  { question: "thesis", answer: "Nevin's Master's program at UW-Madison is course-based and doesn't require a thesis. However, his academic projects demonstrate significant research and practical applications in machine learning and data science." },
  { question: "what is nevin's field of study", answer: "Nevin's field of study is Data Science, with a strong foundation in Machine Learning and Artificial Intelligence." },
  { question: "did nevin take deep learning courses", answer: "Yes, he studied Machine Learning, Statistical Analysis, Statistical Models, Big Data Systems, and Data Visualization as part of his coursework." },

  // Visa Status and Work Authorization
  { question: "visa status", answer: "Nevin is currently on an F-1 student visa in the United States while completing his Master's degree at UW-Madison." },
  { question: "nevin's visa", answer: "Nevin is currently on an F-1 student visa in the United States while completing his Master's degree at UW-Madison." },
  { question: "visa type", answer: "Nevin is currently on an F-1 student visa in the United States while completing his Master's degree at UW-Madison." },
  { question: "whats his visa type", answer: "Nevin is currently on an F-1 student visa in the United States while completing his Master's degree at UW-Madison." },
  { question: "what visa does nevin have", answer: "Nevin is currently on an F-1 student visa in the United States while completing his Master's degree at UW-Madison." },
  { question: "work authorization", answer: "Nevin is authorized to work in the US with his F-1 visa status through OPT and potentially 2 years of STEM OPT extension (total 3 years). He may require work visa sponsorship for long-term employment in the US. He is also authorized to work in India without restrictions." },
  { question: "can nevin work in us", answer: "Yes, Nevin can work in the US through F-1 OPT (Optional Practical Training) for 1 year, with eligibility for an additional 2 years of STEM OPT extension due to his Data Science degree. For long-term employment, he may require H-1B or other work visa sponsorship." },
  { question: "can nevin work in the US?", answer: "Yes, Nevin is authorized to work in the US under F-1 OPT (1+2 years STEM extension). He may require work sponsorship in the future." },
  { question: "is nevin eligible to work in the US?", answer: "Yes, Nevin has work authorization under F-1 OPT and is eligible for a 2-year STEM extension." },
  { question: "us work permit", answer: "Nevin is authorized to work in the US with his F-1 visa status through OPT and potentially 2 years of STEM OPT extension (total 3 years). For long-term employment, he may require H-1B or other work visa sponsorship." },
  { question: "need sponsorship", answer: "Nevin has work authorization through F-1 OPT and STEM OPT (potentially up to 3 years total), but would require visa sponsorship for long-term employment in the US beyond that period." },
  { question: "does nevin need visa sponsorship", answer: "Nevin has work authorization through F-1 OPT and STEM OPT (potentially up to 3 years total), but would require visa sponsorship for long-term employment in the US beyond that period." },
  { question: "does nevin need visa sponsorship?", answer: "Yes, Nevin may require work sponsorship in the future after his STEM OPT period ends." },
  { question: "will nevin need sponsorship", answer: "Nevin has work authorization through F-1 OPT and STEM OPT (potentially up to 3 years total), but would require visa sponsorship for long-term employment in the US beyond that period." },
  { question: "OPT", answer: "Nevin is eligible for 1 year of OPT (Optional Practical Training) plus 2 additional years of STEM OPT extension due to his Data Science degree, allowing for up to 3 years of work authorization in the US after completing his Master's program." },
  { question: "what is nevin's opt status", answer: "Nevin is eligible for 1 year of OPT (Optional Practical Training) plus 2 additional years of STEM OPT extension due to his Data Science degree, allowing for up to 3 years of work authorization in the US after completing his Master's program." },
  { question: "citizenship", answer: "Nevin is an Indian citizen currently in the US on an F-1 student visa while pursuing his Master's degree." },
  { question: "what citizenship does nevin have", answer: "Nevin is an Indian citizen currently in the US on an F-1 student visa while pursuing his Master's degree." },
  { question: "international student", answer: "Yes, Nevin is an international student from India studying at the University of Wisconsin-Madison on an F-1 visa." },
  { question: "is nevin an international student", answer: "Yes, Nevin is an international student from India studying at the University of Wisconsin-Madison on an F-1 visa." },

  // Work Experience
  { question: "work experience", answer: "Nevin's work experience includes: Data Science Intern at Wisconsin School of Business (using ML, NLP, ETL pipelines), Assistant in AI/Data Research at UW College of Agricultural & Life Sciences (implementing CV models, AWS pipelines), and Graduate Researcher at Wisconsin Institute for Discovery (developing active learning systems)." },
  { question: "professional experience", answer: "Nevin has worked as a Data Science Intern analyzing Starbucks unionization impacts using GPT-3.5 and BERT, an AI/Data Research Assistant developing ML models for cranberry classification using ResNet50 and YOLOv8, and a Graduate Researcher implementing active learning pipelines with CLIP and Stable Diffusion." },
  { question: "job experience", answer: "Nevin's work experience includes: Data Science Intern at Wisconsin School of Business (using ML, NLP, ETL pipelines), Assistant in AI/Data Research at UW College of Agricultural & Life Sciences (implementing CV models, AWS pipelines), and Graduate Researcher at Wisconsin Institute for Discovery (developing active learning systems)." },
  { question: "where has nevin worked", answer: "Nevin has worked in academic research and industry roles, including positions at the Wisconsin School of Business, UW College of Agricultural & Life Sciences, and the Wisconsin Institute for Discovery." },
  { question: "nevin's work history", answer: "Nevin's work experience includes: Data Science Intern at Wisconsin School of Business (using ML, NLP, ETL pipelines), Assistant in AI/Data Research at UW College of Agricultural & Life Sciences (implementing CV models, AWS pipelines), and Graduate Researcher at Wisconsin Institute for Discovery (developing active learning systems)." },
  { question: "employment history", answer: "Nevin's work experience includes: Data Science Intern at Wisconsin School of Business (using ML, NLP, ETL pipelines), Assistant in AI/Data Research at UW College of Agricultural & Life Sciences (implementing CV models, AWS pipelines), and Graduate Researcher at Wisconsin Institute for Discovery (developing active learning systems)." },
  { question: "current job", answer: "Nevin is currently a Data Science Intern at Wisconsin School of Business where he investigates Starbucks unionization impact using NLP techniques, optimizes GPT API costs, and develops ETL pipelines." },
  { question: "where does nevin work now", answer: "Nevin is currently a Data Science Intern at Wisconsin School of Business where he investigates Starbucks unionization impact using NLP techniques, optimizes GPT API costs, and develops ETL pipelines." },
  { question: "what is nevin currently working on", answer: "Nevin is working as a Data Science Intern at Wisconsin School of Business, focusing on NLP-based sentiment analysis and ETL automation." },
  { question: "current role", answer: "Nevin is currently a Data Science Intern at Wisconsin School of Business where he investigates Starbucks unionization impact using NLP techniques, optimizes GPT API costs, and develops ETL pipelines." },
  { question: "wisconsin school of business", answer: "At Wisconsin School of Business, Nevin analyzed Starbucks unionization impact using GPT-3.5-Turbo and BERT, streamlined SQL-driven ETL pipelines, optimized GPT API costs by 25%, and used CLIP-based multimodal embeddings for Etsy artwork price prediction. He also developed interactive Tableau dashboards visualizing trends in customer feedback." },
  { question: "wisconsin school of business role", answer: "At Wisconsin School of Business, Nevin analyzed Starbucks unionization impact using GPT-3.5-Turbo and BERT, streamlined SQL-driven ETL pipelines, optimized GPT API costs by 25%, and used CLIP-based multimodal embeddings for Etsy artwork price prediction. He also developed interactive Tableau dashboards visualizing trends in customer feedback." },
  { question: "wisconsin school of business tools", answer: "At Wisconsin School of Business, Nevin used GPT-3.5-Turbo, BERT for fine-tuning, SQL for ETL pipelines, CLIP for multimodal embeddings, Tableau for dashboards, and prompt optimization techniques for GPT API cost reduction." },
  { question: "uw college", answer: "At UW College of Agricultural & Life Sciences, Nevin engineered cranberry classification models using ResNet50 improving accuracy by 25%, implemented YOLOv8 for object detection with 15% enhanced precision, built AWS ML pipelines with S3 and SageMaker integrated with MLflow, and performed time-series analysis on cranberry growth patterns." },
  { question: "uw college role", answer: "At UW College of Agricultural & Life Sciences, Nevin engineered cranberry classification models using ResNet50 improving accuracy by 25%, implemented YOLOv8 for object detection with 15% enhanced precision, built AWS ML pipelines with S3 and SageMaker integrated with MLflow, and performed time-series analysis on cranberry growth patterns." },
  { question: "uw college tools", answer: "At UW College of Agricultural & Life Sciences, Nevin used ResNet50, YOLOv8, semi-supervised learning with CLIP, Albumentations for data augmentation, AWS (S3, SageMaker), MLflow for model tracking, and Matplotlib/Seaborn for visualization." },
  { question: "wisconsin institute for discovery", answer: "At Wisconsin Institute for Discovery, Nevin implemented an automated active learning pipeline with CLIP and Stable Diffusion, reducing manual annotation by 80%, innovated an image labeling system that refined CLIP's predictions, and benchmarked model performance against 20+ research papers." },
  { question: "wisconsin institute for discovery role", answer: "At Wisconsin Institute for Discovery, Nevin implemented an automated active learning pipeline with CLIP and Stable Diffusion, reducing manual annotation by 80%, innovated an image labeling system that refined CLIP's predictions, and benchmarked model performance against 20+ research papers." },
  { question: "wisconsin institute for discovery tools", answer: "At Wisconsin Institute for Discovery, Nevin used CLIP, Stable Diffusion, active learning techniques, and benchmarking methodologies while working with ImageNet, CIFAR-10, and CIFAR-100 datasets." },

  // Projects
  { question: "projects", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "tell me about nevin's projects", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "projects he has worked in", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "give me a list of projects nevin has worked on", answer: "Nevin has worked on projects such as AutoML-ify, Not Your Basic Weather Prediction, WhatsApp Chat Analysis, and an Etsy price prediction model using CLIP embeddings." },
  { question: "can you tell me about any projects nevin has worked on?", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "what are some of nevin's projects?", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "nevin's project portfolio", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline using Streamlit, RandomizedSearchCV, and Plotly), Not Your Basic Weather Prediction (XGBoost, MLflow, GitHub Actions), and WhatsApp Chat Analysis (interactive dashboard for analyzing chat data)." },
  { question: "automl", answer: "AutoML-ify is an innovative end-to-end ML pipeline using Streamlit that enables users to upload datasets and automate data cleaning, preprocessing, EDA, and model selection. It uses RandomizedSearchCV for hyperparameter tuning across 10+ ML algorithms (XGBoost, SVM), Pickle for model persistence, and Plotly for interactive visualizations." },
  { question: "automl project", answer: "AutoML-ify is an innovative end-to-end ML pipeline using Streamlit that enables users to upload datasets and automate data cleaning, preprocessing, EDA, and model selection. It uses RandomizedSearchCV for hyperparameter tuning across 10+ ML algorithms (XGBoost, SVM), Pickle for model persistence, and Plotly for interactive visualizations." },
  { question: "what is AutoML-ify", answer: "AutoML-ify is an ML automation tool using Streamlit that allows users to upload datasets and automatically build machine learning models. It uses RandomizedSearchCV for hyperparameter tuning across 10+ ML algorithms (XGBoost, SVM), Pickle for model persistence, and Plotly for interactive visualizations." },
  { question: "automl tools", answer: "For the AutoML-ify project, Nevin used Streamlit for the frontend, Pandas for data manipulation, Scikit-learn for preprocessing and modeling, RandomizedSearchCV for hyperparameter tuning, XGBoost and SVM among 10+ algorithms, Pickle for model persistence, and Plotly for interactive visualizations." },
  { question: "automl details", answer: "The AutoML-ify project handles data cleaning (missing values, outliers), feature engineering (encoding, scaling), automated EDA with visual reports, model selection across 10+ algorithms, hyperparameter tuning with RandomizedSearchCV, cross-validation, model evaluation with multiple metrics, and one-click deployment. It reduced the typical ML workflow from days to minutes." },
  { question: "weather prediction", answer: "Not Your Basic Weather Prediction is a weather forecasting system using XGBoost, Streamlit, and MLflow that provides real-time temperature forecasting with ±2°C accuracy. It features an automated MLOps pipeline with GitHub Actions for daily data drift checks and model retraining when drift exceeds a predefined threshold." },
  { question: "weather prediction project", answer: "Not Your Basic Weather Prediction is a weather forecasting system using XGBoost, Streamlit, and MLflow that provides real-time temperature forecasting with ±2°C accuracy. It features an automated MLOps pipeline with GitHub Actions for daily data drift checks and model retraining when drift exceeds a predefined threshold." },
  { question: "what is Not Your Basic Weather Prediction", answer: "It is a weather prediction system using XGBoost and Streamlit, providing real-time temperature forecasting with ±2°C accuracy. It features an automated MLOps pipeline with GitHub Actions for daily data drift checks and model retraining when drift exceeds a predefined threshold." },
  { question: "weather prediction tools", answer: "For the Weather Prediction project, Nevin used XGBoost as the primary algorithm, Streamlit for the user interface, MLflow for tracking experiments, GitHub Actions for CI/CD and automation, and data drift monitoring techniques." },
  { question: "weather prediction details", answer: "The Weather Prediction project uses historical weather data, geolocation information, and seasonal patterns for forecasting. It employs XGBoost as the primary algorithm with feature engineering for temporal patterns, implements automated drift detection to identify when predictions become less accurate, and uses MLflow to track experiment results and model versions." },
  { question: "whatsapp chat", answer: "The WhatsApp Chat Analysis project is an interactive dashboard that analyzes WhatsApp chat data, extracting insights on user activity, peak messaging times, emoji usage, and engagement levels from over 100,000 messages. It processes up to 200MB of exported chat logs with an average processing time under 10 seconds." },
  { question: "whatsapp chat project", answer: "The WhatsApp Chat Analysis project is an interactive dashboard that analyzes WhatsApp chat data, extracting insights on user activity, peak messaging times, emoji usage, and engagement levels from over 100,000 messages. It processes up to 200MB of exported chat logs with an average processing time under 10 seconds." },
  { question: "whatsapp chat tools", answer: "For the WhatsApp Chat Analysis project, Nevin used Python for text parsing and analysis, efficient string operations and caching for performance optimization, and visualization libraries to display user activity, messaging patterns, and emoji usage trends." },
  { question: "whatsapp chat details", answer: "The WhatsApp Chat Analysis project preprocesses raw chat exports, handles multi-format messages including media and links, analyzes messaging patterns by time of day and day of week, tracks emoji usage and sentiment trends, identifies group dynamics and participant engagement levels, and visualizes all insights through an interactive dashboard." },
  { question: "github", answer: "You can find Nevin's projects on his GitHub: github.com/nevinselby" },
  { question: "github repository", answer: "You can find Nevin's projects on his GitHub: github.com/nevinselby" },
  { question: "nevin's github", answer: "You can find Nevin's projects on his GitHub: github.com/nevinselby" },
  { question: "most impressive project", answer: "Nevin's most impressive project is AutoML-ify, which automates the entire machine learning pipeline from data cleaning to model deployment using Streamlit, multiple ML algorithms, and interactive visualizations, demonstrating his ability to build end-to-end data science solutions." },
  { question: "what is nevin's most impressive project?", answer: "One of Nevin's most impressive projects is AutoML-ify, an ML automation tool that simplifies model building with no human intervention." },
  { question: "best project", answer: "Nevin's most impressive project is AutoML-ify, which automates the entire machine learning pipeline from data cleaning to model deployment using Streamlit, multiple ML algorithms, and interactive visualizations, demonstrating his ability to build end-to-end data science solutions." },

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
  { question: "what are nevin's skills", answer: "Nevin's skills include Machine Learning (PyTorch, TensorFlow, Scikit-learn), MLOps (Docker, Kubernetes, MLflow), Data Analysis & Visualization (SQL, Tableau, Power BI), Cloud technologies (AWS), and programming in Python, SQL, C++, and JavaScript." },
  { question: "technical skills", answer: "Nevin is skilled in Python, PyTorch, TensorFlow, SQL, AWS (SageMaker, Lambda, S3), Docker, Kubernetes, MLflow, Tableau, and Power BI." },
  { question: "programming languages", answer: "Nevin is proficient in Python, SQL, C++, and JavaScript." },
  { question: "machine learning", answer: "Nevin has expertise in various ML areas including PyTorch, TensorFlow, Scikit-learn, Transformers, LLMs, Computer Vision, and NLP." },
  { question: "data analysis", answer: "Nevin's data analysis skills include SQL, Tableau, Power BI, Matplotlib, Seaborn, Excel, A/B Testing, Hypothesis Testing, and Regression Analysis." },
  { question: "cloud", answer: "Nevin has experience with AWS services including SageMaker, Lambda, and S3, as well as data platforms like Snowflake and PostgreSQL." },
  { question: "what are nevin's skills", answer: "Nevin's skills include Python, SQL, PyTorch, TensorFlow, AWS, Docker, Kubernetes, Tableau, and Power BI." },
  { question: "does nevin know cloud computing", answer: "Yes, he has hands-on experience with AWS (SageMaker, Lambda, S3) and cloud-based ML deployments." },
  { question: "what are nevin's skills", answer: "Nevin's skills include Python, SQL, PyTorch, TensorFlow, AWS, Docker, Kubernetes, Tableau, and Power BI." },
  { question: "does nevin have experience in cloud computing?", answer: "Yes, he has hands-on experience with AWS (SageMaker, Lambda, S3) and cloud-based ML deployments." },

  // Certifications
  { question: "certifications", answer: "Nevin holds several certifications including AWS Machine Learning Foundations 2022 (Udacity), Computer Vision (Kaggle), Intro to Deep Learning (Kaggle), and NLP Bootcamp (AI Planet). These certifications complement his formal education and demonstrate his commitment to continuous learning." },
  { question: "aws certification", answer: "Nevin has completed the AWS Machine Learning Foundations certification through Udacity in 2022, demonstrating his knowledge of cloud-based ML implementations and AWS services for data science workflows." },
  { question: "kaggle certifications", answer: "Nevin has earned Kaggle certifications in Computer Vision and Intro to Deep Learning, validating his expertise in these domains through practical assessments and competitions." },
  { question: "nlp certification", answer: "Nevin completed the NLP Bootcamp certification from AI Planet, covering topics like text preprocessing, sentiment analysis, named entity recognition, and implementing transformer models." },
  { question: "online courses", answer: "Besides his formal education, Nevin has completed online courses and certifications in AWS Machine Learning, Computer Vision, Deep Learning, and NLP from platforms like Udacity, Kaggle, and AI Planet." },
  { question: "certifications", answer: "Nevin holds certifications in AWS Machine Learning (Udacity), Computer Vision (Kaggle), Intro to Deep Learning (Kaggle), and NLP Bootcamp (AI Planet)." },
  { question: "is nevin certified in AWS", answer: "Yes, Nevin has completed the AWS Machine Learning Foundations course from Udacity." },

  // Personal Interests
  { question: "youtube channel", answer: "Nevin runs a YouTube vlogging channel where he shares his adventures and personal experiences. His channel focuses on lifestyle content and day-in-the-life style videos, showing his life outside of his technical work." },
  { question: "youtube", answer: "Nevin has a YouTube channel dedicated to vlogging and sharing his adventures. It's a creative outlet separate from his technical work where he documents his experiences and travels." },
  { question: "medium", answer: "Nevin writes technical articles on Medium, sharing his knowledge about data science, machine learning, and programming concepts. His articles cover topics from beginner to advanced levels in AI and data science." },
  { question: "medium articles", answer: "On Medium, Nevin publishes technical articles covering topics like data science methodologies, ML model optimization, coding best practices, MLOps, computer vision techniques, and emerging technology trends." },
  { question: "hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel, writing technical articles on Medium, traveling, photography, and exploring new technologies in his spare time." },
  { question: "tell me about his hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel, writing technical articles on Medium, traveling, photography, and exploring new technologies in his spare time." },
  { question: "tell me about nevins hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel, writing technical articles on Medium, traveling, photography, and exploring new technologies in his spare time." },
  { question: "list hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel, writing technical articles on Medium, traveling, photography, and exploring new technologies in his spare time." },
  { question: "detail on hobbies", answer: "Besides his technical work, Nevin enjoys creating content for his YouTube vlogging channel, writing technical articles on Medium, traveling, photography, and exploring new technologies in his spare time." },
  { question: "does nevin have a youtube channel", answer: "Yes, he runs a YouTube vlogging channel where he shares experiences and insights about data science." },
  { question: "does nevin write on medium", answer: "Yes, he writes technical articles covering AI, ML, and data science concepts on Medium." },
  { question: "what does nevin do in his free time?", answer: "Nevin enjoys vlogging, writing technical articles on Medium, and keeping up with advancements in AI." },
  { question: "does nevin have a youtube channel?", answer: "Yes! Nevin runs a vlogging YouTube channel where he shares experiences and insights about data science and life in the US." },
  { question: "does nevin write blogs?", answer: "Yes, he writes technical articles covering AI, ML, and data science concepts on Medium." },

  // Research and Academic Interests
  { question: "research", answer: "Nevin has research experience at Wisconsin Institute for Discovery working on automated active learning pipelines using CLIP and Stable Diffusion, and at UW College of Agricultural & Life Sciences researching cranberry phenology classification and optimization." },
  { question: "research interests", answer: "Nevin's research interests include computer vision, active learning methodologies, multimodal learning with CLIP, application of transformer models, NLP, and applying AI to real-world problems like agricultural optimization." },
  { question: "academic strengths", answer: "Nevin's academic strengths include machine learning theory, statistics, algorithm development, research methodology, and translating complex concepts into practical implementations. He maintained high GPAs in both his Bachelor's (9.15/10.0) and Master's (3.70/4.0) programs." },
  { question: "research", answer: "Nevin has research experience at Wisconsin Institute for Discovery where he worked on automated active learning pipelines using CLIP and Stable Diffusion, and at UW College of Agricultural & Life Sciences researching cranberry phenology." },
  { question: "research interests", answer: "Nevin's research interests include computer vision, active learning, NLP, and applying AI to real-world problems like agricultural optimization." },
  { question: "does nevin do research", answer: "Yes, Nevin has conducted research in AI, active learning, and NLP at Wisconsin Institute for Discovery and UW College of Agricultural & Life Sciences." },
  { question: "what are nevin's research interests", answer: "His research focuses on deep learning, active learning, AI-driven automation, and real-world ML applications." },
  { question: "does nevin have research experience?", answer: "Yes, Nevin has conducted research in AI, active learning, and NLP at Wisconsin Institute for Discovery and UW College of Agricultural & Life Sciences." },
  { question: "what topics has nevin researched?", answer: "Nevin’s research focuses on deep learning, active learning, AI-driven automation, and real-world ML applications." },

  // Specific Technical Questions
  { question: "nlp experience", answer: "Nevin has NLP experience through his work at Wisconsin School of Business where he used GPT-3.5-Turbo and fine-tuned BERT models on customer reviews for sentiment analysis, optimized prompts to reduce API costs by 25%, and analyzed Starbucks unionization impact through text analysis." },
  { question: "computer vision experience", answer: "Nevin's computer vision experience includes developing ResNet50 and YOLOv8 models for cranberry classification and object detection, implementing CLIP and Stable Diffusion for image labeling and data augmentation, custom augmentation techniques with Albumentations, and semi-supervised learning approaches." },
  { question: "mlops experience", answer: "Nevin's MLOps experience includes setting up end-to-end ML pipelines on AWS with SageMaker and MLflow, implementing automated model monitoring and retraining with GitHub Actions, working with Docker and Kubernetes for containerization, and using versioning tools for model management." },
  { question: "data engineering", answer: "Nevin's data engineering experience includes building SQL-driven ETL pipelines with 90% reduction in manual intervention, working with data warehousing solutions like Snowflake, implementing data transformation workflows, and setting up automated data processing systems for ML model training." },
  { question: "computer vision", answer: "Nevin's computer vision experience includes developing ResNet50 and YOLOv8 models for cranberry classification and object detection, as well as implementing CLIP and Stable Diffusion for image labeling." },
  { question: "mlops", answer: "Nevin's MLOps experience includes working with Docker, Kubernetes, MLflow, Weights & Biases, and Git, plus setting up automated pipelines with GitHub Actions for model monitoring and retraining." },

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

  //Age related Questions
  { question: "what is nevin's age", answer: "Nevin is 23 years old." },
  { question: "how old is nevin", answer: "Nevin is 23 years old." },
  { question: "what is his age", answer: "Nevin is 23 years old." },
  { question: "how old is he", answer: "Nevin is 23 years old." },
  { question: "nevin's age", answer: "Nevin is 23 years old." },
  { question: "age", answer: "Nevin is 23 years old." },

  // Additional technical questions
  { question: "what is nevin's tech stack", answer: "Nevin's tech stack includes Python, PyTorch, TensorFlow, AWS, Docker, Kubernetes, SQL, Tableau, and more. He specializes in machine learning, computer vision, and NLP." },
  { question: "what tools does nevin use", answer: "Nevin uses tools like PyTorch, TensorFlow, AWS SageMaker, Docker, Kubernetes, MLflow, Tableau, and Power BI for his projects." },
  { question: "what frameworks does nevin know", answer: "Nevin is proficient in frameworks like PyTorch, TensorFlow, Scikit-learn, Hugging Face Transformers, and XGBoost." },
  { question: "does nevin know deep learning", answer: "Yes, Nevin has extensive experience in deep learning, including working with models like ResNet, YOLO, CLIP, and Stable Diffusion." },
  { question: "what is nevin's expertise", answer: "Nevin's expertise lies in machine learning, computer vision, NLP, and MLOps. He is also skilled in data analysis, cloud computing, and building end-to-end ML pipelines." },
  { question: "what is nevin's primary programming language", answer: "Python is Nevin's primary programming language, which he uses extensively for machine learning and data science." },
  { question: "does nevin have experience with cloud platforms", answer: "Yes, Nevin has hands-on experience with AWS, including SageMaker, S3, and Lambda, for building and deploying machine learning models." },
  { question: "what is nevin's experience with NLP", answer: "Nevin has worked on NLP projects involving sentiment analysis, text generation, and prompt optimization using models like GPT-3.5 and BERT." },
  { question: "does nevin have experience with computer vision", answer: "Yes, Nevin has worked on computer vision projects involving ResNet, YOLO, CLIP, and Stable Diffusion for tasks like image classification and object detection." },
  { question: "what is nevin's experience with MLOps", answer: "Nevin has experience with MLOps tools like Docker, Kubernetes, MLflow, and GitHub Actions for automating ML pipelines and model deployment." },
  { question: "does nevin have experience with big data", answer: "Yes, Nevin has worked with large datasets, including processing 200MB chat logs and using big data tools like Snowflake and AWS S3." },
  { question: "what is nevin's experience with data visualization", answer: "Nevin is skilled in data visualization using tools like Tableau, Power BI, Matplotlib, Seaborn, and Plotly to create interactive dashboards and reports." },
  { question: "does nevin have experience with SQL", answer: "Yes, Nevin is proficient in SQL and has built ETL pipelines, performed advanced querying, and worked with databases like PostgreSQL and Snowflake." },
  { question: "what is nevin's experience with AI", answer: "Nevin has extensive experience in AI, including machine learning, deep learning, computer vision, NLP, and building scalable AI systems." },
  { question: "does nevin have experience with automation", answer: "Yes, Nevin has built automated ML pipelines using tools like GitHub Actions and MLflow for continuous integration and deployment." },
  { question: "what is nevin's experience with AWS", answer: "Nevin has worked with AWS services like SageMaker, S3, and Lambda for building, training, and deploying machine learning models." },
  { question: "does nevin have experience with Docker", answer: "Yes, Nevin has used Docker for containerizing machine learning models and deploying them in production environments." },
  { question: "does nevin have experience with Kubernetes", answer: "Yes, Nevin has used Kubernetes for orchestrating containerized applications and managing scalable ML deployments." },
  { question: "what is nevin's experience with Tableau", answer: "Nevin has created interactive dashboards and visualizations using Tableau to analyze and present data insights." },
  { question: "does nevin have experience with Power BI", answer: "Yes, Nevin has used Power BI for data visualization and creating business intelligence reports." },
  { question: "what is nevin's experience with Python", answer: "Nevin is an expert in Python and has used it extensively for machine learning, data analysis, and building end-to-end data science solutions." },
  { question: "does nevin have experience with C++", answer: "Yes, Nevin has intermediate experience with C++ and has used it for algorithm development and performance-critical applications." },
  { question: "does nevin have experience with JavaScript", answer: "Yes, Nevin has intermediate experience with JavaScript and has used it for building interactive web applications." },
  { question: "what is nevin's experience with data engineering", answer: "Nevin has built ETL pipelines, worked with data warehousing solutions like Snowflake, and implemented data transformation workflows for machine learning projects." },
  { question: "does nevin have experience with time-series analysis", answer: "Yes, Nevin has worked on time-series analysis projects, including analyzing cranberry growth patterns and weather forecasting." },
  { question: "what is nevin's experience with active learning", answer: "Nevin has implemented active learning pipelines using CLIP and Stable Diffusion, reducing manual annotation by 80% in his research projects." },
  { question: "does nevin have experience with transformer models", answer: "Yes, Nevin has worked with transformer models like BERT, GPT, and CLIP for NLP and computer vision tasks." },
  { question: "what is nevin's experience with GPT models", answer: "Nevin has used GPT-3.5-Turbo for text generation, sentiment analysis, and optimizing API costs in his projects." },
  { question: "does nevin have experience with fine-tuning models", answer: "Yes, Nevin has fine-tuned models like BERT for sentiment analysis and ResNet for image classification tasks." },
  { question: "what is nevin's experience with data augmentation", answer: "Nevin has implemented custom data augmentation techniques using Albumentations for improving model performance in computer vision tasks." },
  { question: "does nevin have experience with semi-supervised learning", answer: "Yes, Nevin has used semi-supervised learning techniques with CLIP for image labeling and classification tasks." },
  { question: "what is nevin's experience with benchmarking", answer: "Nevin has benchmarked model performance against 20+ research papers and implemented best practices for optimizing model accuracy and efficiency." },
  { question: "does nevin have experience with A/B testing", answer: "Yes, Nevin has conducted A/B testing for evaluating model performance and making data-driven decisions." },
  { question: "what is nevin's experience with hypothesis testing", answer: "Nevin has used hypothesis testing for statistical analysis and validating assumptions in his data science projects." },
  { question: "does nevin have experience with regression analysis", answer: "Yes, Nevin has performed regression analysis for predicting outcomes and understanding relationships between variables in datasets." },
  { question: "what is nevin's experience with data cleaning", answer: "Nevin has extensive experience in data cleaning, including handling missing values, outliers, and preprocessing datasets for machine learning." },
  { question: "does nevin have experience with feature engineering", answer: "Yes, Nevin has performed feature engineering tasks like encoding, scaling, and creating new features to improve model performance." },
  { question: "what is nevin's experience with model deployment", answer: "Nevin has deployed machine learning models using AWS SageMaker, Docker, and Kubernetes for production use cases." },
  { question: "does nevin have experience with model monitoring", answer: "Yes, Nevin has implemented model monitoring and retraining pipelines using GitHub Actions and MLflow for continuous improvement." },
  { question: "what is nevin's experience with data drift detection", answer: "Nevin has implemented data drift detection techniques to identify when model predictions become less accurate and trigger retraining." },
  { question: "does nevin have experience with CI/CD", answer: "Yes, Nevin has set up CI/CD pipelines using GitHub Actions for automating model training, testing, and deployment." },
  { question: "what is nevin's experience with version control", answer: "Nevin is proficient in Git and has used it for version control in collaborative projects and managing code repositories." },
  { question: "does nevin have experience with collaborative projects", answer: "Yes, Nevin has worked on collaborative projects, including academic research and industry internships, using tools like Git and Agile methodologies." },
  { question: "what is nevin's experience with Agile", answer: "Nevin is familiar with Agile development methodologies and has applied them in his project work for iterative development and collaboration." },
  { question: "does nevin have experience with leadership", answer: "Yes, Nevin has demonstrated leadership by guiding technical decisions, collaborating with stakeholders, and delivering measurable improvements in his projects." },
  { question: "what is nevin's experience with communication", answer: "Nevin has strong communication skills, evidenced by his technical writing on Medium, collaborative work with domain experts, and content creation on his YouTube channel." },
  { question: "does nevin have experience with teaching or mentoring", answer: "Nevin has shared his knowledge through technical articles on Medium and YouTube videos, demonstrating his ability to teach and mentor others." },
  { question: "what is nevin's experience with public speaking", answer: "Nevin has experience with public speaking through his YouTube channel, where he shares insights about data science and his personal experiences." },
  { question: "does nevin have experience with writing", answer: "Yes, Nevin writes technical articles on Medium, covering topics like machine learning, data science, and AI advancements." },
  { question: "what is nevin's experience with content creation", answer: "Nevin runs a YouTube channel where he creates vlogs and shares insights about data science, AI, and his personal experiences." },
  { question: "does nevin have experience with photography", answer: "Yes, Nevin enjoys photography as a hobby and often incorporates it into his YouTube vlogs and personal projects." },
  { question: "what is nevin's experience with traveling", answer: "Nevin enjoys traveling and often documents his adventures on his YouTube channel, sharing insights about different cultures and experiences." },
  { question: "does nevin have experience with creative projects", answer: "Yes, Nevin combines his technical skills with creativity in projects like his YouTube channel and technical writing on Medium." },
  { question: "what is nevin's experience with problem-solving", answer: "Nevin has a methodical approach to problem-solving, demonstrated by his ability to deliver measurable improvements in his projects and research." },
  { question: "does nevin have experience with innovation", answer: "Yes, Nevin has innovated solutions like automated active learning pipelines and ML automation tools, showcasing his ability to think creatively and solve complex problems." },
  { question: "what is nevin's experience with research", answer: "Nevin has conducted research in AI, active learning, and NLP, publishing findings and benchmarking against state-of-the-art methods." },
  { question: "does nevin have experience with academic writing", answer: "Yes, Nevin has written technical articles on Medium and contributed to research papers during his academic projects." },
  { question: "what is nevin's experience with teamwork", answer: "Nevin values collaboration and has worked with teams in academic research, industry internships, and personal projects to achieve shared goals." },
  { question: "does nevin have experience with cross-functional teams", answer: "Yes, Nevin has collaborated with domain experts, researchers, and engineers in cross-functional teams to deliver impactful solutions." },
  { question: "what is nevin's experience with project management", answer: "Nevin has managed projects from ideation to deployment, ensuring timely delivery and measurable outcomes in his work." },
  { question: "does nevin have experience with time management", answer: "Yes, Nevin has demonstrated strong time management skills by balancing academic studies, internships, and personal projects effectively." },
  { question: "what is nevin's experience with adaptability", answer: "Nevin is highly adaptable, having worked on diverse projects across machine learning, computer vision, NLP, and MLOps, and quickly learning new technologies." },
  { question: "does nevin have experience with continuous learning", answer: "Yes, Nevin is committed to continuous learning, as evidenced by his certifications, online courses, and staying updated with the latest advancements in AI and data science." },
  { question: "what is nevin's experience with open-source contributions", answer: "Nevin has contributed to open-source projects and shares his work on GitHub, demonstrating his commitment to the tech community." },
  { question: "does nevin have experience with hackathons", answer: "Yes, Nevin has participated in hackathons, where he collaborated with teams to build innovative solutions under tight deadlines." },
  { question: "what is nevin's experience with startups", answer: "Nevin has worked on projects that required a startup mindset, including rapid prototyping, iterative development, and delivering scalable solutions." },
  { question: "does nevin have experience with entrepreneurship", answer: "While Nevin has not founded a startup, he has demonstrated entrepreneurial skills through his innovative projects and content creation on YouTube and Medium." },
  { question: "what is nevin's experience with data privacy", answer: "Nevin is aware of data privacy concerns and follows best practices for handling sensitive data in his projects." },
  { question: "does nevin have experience with ethical AI", answer: "Yes, Nevin is mindful of ethical considerations in AI and ensures his projects adhere to responsible AI practices." },
  { question: "what is nevin's experience with scalability", answer: "Nevin has built scalable AI systems using cloud platforms like AWS and tools like Docker and Kubernetes for deployment." },
  { question: "does nevin have experience with performance optimization", answer: "Yes, Nevin has optimized model performance, reduced API costs, and improved efficiency in his projects." },
  { question: "what is nevin's experience with cost optimization", answer: "Nevin has implemented cost optimization strategies, such as reducing GPT API costs by 25% in his projects." },
  { question: "does nevin have experience with real-time systems", answer: "Yes, Nevin has worked on real-time systems like weather forecasting and active learning pipelines that require low-latency processing." },
  { question: "what is nevin's experience with edge computing", answer: "While Nevin's primary focus is on cloud-based solutions, he is familiar with edge computing concepts and their applications in AI." },
  { question: "does nevin have experience with IoT", answer: "Nevin has worked on projects involving IoT data, such as analyzing sensor data for cranberry growth patterns." },
  { question: "what is nevin's experience with robotics", answer: "Nevin's experience with robotics is limited, but he has worked on computer vision tasks that could be applied to robotics applications." },
 
  // Fun Questions
  { question: "does nevin like ai", answer: "Absolutely! Nevin is passionate about AI and enjoys researching machine learning advancements." },
  { question: "what programming languages does nevin know", answer: "Python, SQL, C++, and JavaScript." },
  { question: "what databases does nevin use", answer: "He has experience with PostgreSQL, Snowflake, and MySQL." },
  { question: "does nevin enjoy ai", answer: "Absolutely! Nevin is passionate about AI and enjoys researching machine learning advancements." },
  { question: "what programming languages does nevin know", answer: "Python, SQL, C++, and JavaScript." },
  { question: "what databases has nevin worked with", answer: "He has experience with PostgreSQL, Snowflake, and MySQL." },
  { question: "what are nevins strongest skills", answer: "Nevin excels in machine learning, NLP, MLOps, cloud computing, and deep learning." },
  { question: "why should we hire nevin?", answer: "Nevin brings strong expertise in AI and ML, hands-on experience with real-world projects, and a passion for innovation." }
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