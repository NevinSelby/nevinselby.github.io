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

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

// Conversation state and memory
let conversationContext = {
  previousTopics: [],
  userInterests: [],
  conversationStage: 'greeting',
  lastQuestionCategory: null,
  userName: null,
  mood: 'neutral'
};

// Response variations for more natural conversation
const responseVariations = {
  greeting: [
    "Hello! I'm NevBot, Nevin's portfolio assistant. How can I help you today?",
    "Hi there! I can tell you all about Nevin's skills, projects, and experience. What would you like to know?",
    "Hey! Welcome to Nevin's portfolio. I'm here to answer any questions about his background and work. What interests you?",
    "Hello! Nice to meet you! I'm here to share information about Nevin's journey in AI and data science. What would you like to explore?"
  ],
  followUp: [
    "Is there anything else you'd like to know about that?",
    "Would you like me to go deeper into any specific aspect?",
    "Any other questions about this topic?",
    "Shall I tell you more about related projects or skills?",
    "What else would you like to explore?"
  ],
  encouragement: [
    "Great question!",
    "That's an interesting topic!",
    "I'm glad you asked about that!",
    "Excellent question!",
    "That's a really good point!"
  ],
  clarification: [
    "Could you be more specific about what you'd like to know?",
    "I'd be happy to help! Could you clarify what aspect interests you most?",
    "Let me help you with that. Could you tell me more about what you're looking for?",
    "I want to give you the best answer. Could you elaborate on your question?"
  ]
};

// Suggested questions that appear when conversation starts
const suggestedQuestions = [
  "What are Nevin's strongest technical skills?",
  "Tell me about his recent projects",
  "What's his educational background?",
  "Where has he worked?",
  "What makes him unique as a candidate?",
  "Can he work in the US?"
];

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
  { question: "tell me about nevin", answer: "Nevin is an AI Software Development Engineer with a Master's in Data Science from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more. He also runs a vlogging YouTube channel and writes technical articles on Medium." },
  { question: "tell me about him", answer: "Nevin is an AI Software Development Engineer with a Master's in Data Science from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more. He also runs a vlogging YouTube channel and writes technical articles on Medium." },
  { question: "who is nevin", answer: "Nevin John Selby is an AI Software Development Engineer with a Master's in Data Science from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "who is he", answer: "Nevin John Selby is an AI Software Development Engineer with a Master's in Data Science from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "brief me about him", answer: "Nevin John Selby is an AI Software Development Engineer with a Master's in Data Science from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "brief me about nevin", answer: "Nevin John Selby is an AI Software Development Engineer with a Master's in Data Science from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "nevin bio", answer: "Nevin John Selby is an AI Software Development Engineer with a Master's in Data Science from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "nevin's background", answer: "Nevin is an AI Software Development Engineer with a Master's in Data Science from UW-Madison. He has experience in machine learning, NLP, computer vision, and data engineering with skills in Python, PyTorch, TensorFlow, AWS, and more." },
  { question: "introduce nevin", answer: "Nevin John Selby is an AI Software Development Engineer with a Master's in Data Science from UW-Madison and a background in Computer Science. He specializes in machine learning, AI, and data analysis with experience across academic research and industry projects." },
  { question: "contact information", answer: "You can reach Nevin at nevinselby2001@gmail.com or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "how can I contact nevin", answer: "You can reach Nevin at nevinselby2001@gmail.com or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "contact details", answer: "You can reach Nevin at nevinselby2001@gmail.com or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "how to reach nevin", answer: "You can reach Nevin at nevinselby2001@gmail.com or +1 (608) 239-6451. You can also check out his LinkedIn profile at linkedin.com/in/nevinselby or GitHub at github.com/nevinselby." },
  { question: "phone number", answer: "Nevin's phone number is +1 (608) 239-6451." },
  { question: "nevin's phone", answer: "Nevin's phone number is +1 (608) 239-6451." },
  { question: "email address", answer: "Nevin's email address is nevinselby2001@gmail.com." },
  { question: "nevin's email", answer: "Nevin's email address is nevinselby2001@gmail.com." },
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
  { question: "education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "what are nevins educational qualifications", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "where did nevin study", answer: "Nevin completed his Master's in Data Science at University of Wisconsin-Madison  and his Bachelor's in Computer Science at Indian Institute of Information Technology." },
  { question: "where did he get his degree", answer: "Nevin completed his Master's in Data Science at University of Wisconsin-Madison  and his Bachelor's in Computer Science at Indian Institute of Information Technology." },
  { question: "list nevins education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "what is nevin currently studying", answer: "Nevin has graduated with a Master of Science in Data Science from the University of Wisconsin-Madison in May 2025." },
  { question: "nevins education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "his education", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "education history", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "academic background", answer: "Nevin has a Master's in Data Science from University of Wisconsin-Madison (Sept 2023 - May 2025) with a 3.70/4.0 GPA  and a Bachelor's in Computer Science from Indian Institute of Information Technology (Aug 2019 - May 2023) with a 9.15/10.0 GPA." },
  { question: "gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison  and a 9.15/10.0 GPA in his Bachelor's program at Indian Institute of Information Technology." },
  { question: "nevin's gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison  and a 9.15/10.0 GPA in his Bachelor's program at Indian Institute of Information Technology." },
  { question: "what's his gpa", answer: "Nevin maintained a 3.70/4.0 GPA in his Master's program at UW-Madison  and a 9.15/10.0 GPA in his Bachelor's program at Indian Institute of Information Technology." },
  { question: "masters gpa", answer: "Nevin's Master's GPA at UW-Madison is 3.70/4.0." },
  { question: "bachelors gpa", answer: "Nevin's Bachelor's GPA at Indian Institute of Information Technology is 9.15/10.0." },
  { question: "coursework", answer: "Nevin's Master's coursework included Advanced ML, Statistical Analysis, Data Visualization, Big-Data Systems, and Optimization. His Bachelor's coursework covered Statistical Learning, Data Structures, Distributed Systems, Cloud Computing, and Algorithms." },
  { question: "what courses did nevin take", answer: "Nevin's Master's coursework included Advanced ML, Statistical Analysis, Data Visualization, Big-Data Systems, and Optimization. His Bachelor's coursework covered Statistical Learning, Data Structures, Distributed Systems, Cloud Computing, and Algorithms." },
  { question: "subjects studied", answer: "Nevin's Master's coursework included Advanced ML, Statistical Analysis, Data Visualization, Big-Data Systems, and Optimization. His Bachelor's coursework covered Statistical Learning, Data Structures, Distributed Systems, Cloud Computing, and Algorithms." },
  { question: "masters coursework", answer: "Nevin's Master's coursework at UW-Madison included Advanced ML, Statistical Analysis, Data Visualization, Big-Data Systems, and Optimization." },
  { question: "bachelors coursework", answer: "Nevin's Bachelor's coursework at Indian Institute of Information Technology included Statistical Learning, Data Structures, Distributed Systems, Cloud Computing, and Algorithms." },
  { question: "masters degree", answer: "Nevin graduated with a Master of Science in Data Science from the University of Wisconsin-Madison in May 2025." },
  { question: "bachelors degree", answer: "Nevin holds a Bachelor of Technology in Computer Science from the Indian Institute of Information Technology, completed in May 2023." },
  { question: "when did nevin start masters", answer: "Nevin started his Master's program at UW-Madison in September 2023." },
  { question: "when does nevin graduate", answer: "Nevin graduated in May 2025. He is currently looking for full-time roles." },
  { question: "when is he graduating", answer: "Nevin graduated in May 2025. He is currently looking for full-time roles." },
  { question: "graduating in?", answer: "Nevin graduated in May 2025. He is currently looking for full-time roles." },
  { question: "when graduating?", answer: "Nevin graduated in May 2025. He is currently looking for full-time roles." },
  { question: "graduation", answer: "Nevin graduated in May 2025. He is currently looking for full-time roles." },
  { question: "masters graduation", answer: "Nevin graduated with his Master's degree in May 2025." },
  { question: "masters degree graduation", answer: "Nevin graduated with his Master's degree in May 2025." },
  { question: "when does nevins masters degree end", answer: "Nevin's Master's degree ended in May 2025, as he graduated that month." },
  { question: "when will nevin finish his studies", answer: "Nevin finished his studies and graduated in May 2025." },
  { question: "what is nevin's graduation date", answer: "Nevin's graduation date for his Master's degree was May 2025." },
  { question: "when does nevin complete his master's program", answer: "Nevin completed his Master's program in May 2025." },
  { question: "when is nevin done with school", answer: "Nevin is done with school, having graduated in May 2025." },
  { question: "when did nevin graduate bachelors", answer: "Nevin graduated with his Bachelor's degree from Indian Institute of Information Technology in May 2023." },
  { question: "when did nevins bachelors end", answer: "Nevin graduated with his Bachelor's degree from Indian Institute of Information Technology in May 2023." },
  { question: "when did nevin come to us", answer: "Nevin came to the United States in September 2023 to pursue his Master's degree at the University of Wisconsin-Madison." },
  { question: "when did nevin come to the US", answer: "Nevin arrived in the US in September 2023 for his Master's in Data Science at UW-Madison." },
  { question: "bachelors final year project", answer: "For his Bachelor's final year project, Nevin developed an advanced machine learning system that focused on computer vision applications. The project demonstrated his early expertise in AI technologies and laid the foundation for his graduate studies in Data Science." },
  { question: "final year project", answer: "Nevin's Bachelor's final year project involved developing a computer vision application using deep learning techniques. He implemented various CNN architectures and demonstrated practical applications of AI in real-world scenarios." },
  { question: "thesis", answer: "Nevin's Master's program at UW-Madison was course-based and did not require a thesis. However, his academic projects demonstrate significant research and practical applications in machine learning and data science." },
  { question: "what is nevin's field of study", answer: "Nevin's field of study is Data Science, with a strong foundation in Machine Learning and Artificial Intelligence." },
  { question: "did nevin take deep learning courses", answer: "Yes, his Master's coursework included Advanced ML and Optimization, which would cover deep learning concepts." },

  // Visa Status and Work Authorization
  { question: "visa status", answer: "Nevin has recently graduated and would be transitioning to Optional Practical Training (OPT) status. He will be eligible for a STEM OPT extension." },
  { question: "nevin's visa", answer: "Nevin has recently graduated and would be transitioning to Optional Practical Training (OPT) status. He will be eligible for a STEM OPT extension." },
  { question: "visa type", answer: "Nevin has recently graduated and would be transitioning to Optional Practical Training (OPT) status. He will be eligible for a STEM OPT extension." },
  { question: "whats his visa type", answer: "Nevin has recently graduated and would be transitioning to Optional Practical Training (OPT) status. He will be eligible for a STEM OPT extension." },
  { question: "what visa does nevin have", answer: "Nevin has recently graduated and would be transitioning to Optional Practical Training (OPT) status. He will be eligible for a STEM OPT extension." },
  { question: "work authorization", answer: "Nevin is authorized to work in the US through his F-1 OPT and is eligible for a 2-year STEM OPT extension (total 3 years). He may require work visa sponsorship for long-term employment in the US. He is also authorized to work in India without restrictions." },
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
  { question: "citizenship", answer: "Nevin is an Indian citizen currently in the US on an F-1 visa transitioning to OPT status." },
  { question: "what citizenship does nevin have", answer: "Nevin is an Indian citizen currently in the US on an F-1 visa transitioning to OPT status." },
  { question: "international student", answer: "Yes, Nevin is an international student from India who recently graduated from the University of Wisconsin-Madison on an F-1 visa." },
  { question: "is nevin an international student", answer: "Yes, Nevin is an international student from India who recently graduated from the University of Wisconsin-Madison on an F-1 visa." },

  // Work Experience
  { question: "work experience", answer: "Nevin's work experience includes: AI Software Development Engineer at App Mastery (June 2025-Present) , Data Science Intern at Wisconsin School of Business (Sept 2024-Jun 2025) , AI Research Assistant at UW College of Agricultural & Life Sciences (Sept 2024-Mar 2025), and Graduate Researcher at Wisconsin Institute for Discovery (Jan 2024-Jun 2024)." },
  { question: "professional experience", answer: "Nevin has worked as an AI Software Development Engineer engineering LLM pipelines , a Data Science Intern analyzing Starbucks unionization impacts using BERT , an AI Research Assistant developing CV models for phenology accuracy, and a Graduate Researcher implementing active learning pipelines with CLIP and Stable Diffusion." },
  { question: "job experience", answer: "Nevin's work experience includes: AI Software Development Engineer at App Mastery (June 2025-Present) , Data Science Intern at Wisconsin School of Business (Sept 2024-Jun 2025) , AI Research Assistant at UW College of Agricultural & Life Sciences (Sept 2024-Mar 2025), and Graduate Researcher at Wisconsin Institute for Discovery (Jan 2024-Jun 2024)." },
  { question: "where has nevin worked", answer: "Nevin has worked at App Mastery , Wisconsin School of Business , UW College of Agricultural & Life Sciences, and the Wisconsin Institute for Discovery." },
  { question: "nevin's work history", answer: "Nevin's work experience includes: AI Software Development Engineer at App Mastery (June 2025-Present) , Data Science Intern at Wisconsin School of Business (Sept 2024-Jun 2025) , AI Research Assistant at UW College of Agricultural & Life Sciences (Sept 2024-Mar 2025), and Graduate Researcher at Wisconsin Institute for Discovery (Jan 2024-Jun 2024)." },
  { question: "employment history", answer: "Nevin's work experience includes: AI Software Development Engineer at App Mastery (June 2025-Present) , Data Science Intern at Wisconsin School of Business (Sept 2024-Jun 2025) , AI Research Assistant at UW College of Agricultural & Life Sciences (Sept 2024-Mar 2025), and Graduate Researcher at Wisconsin Institute for Discovery (Jan 2024-Jun 2024)." },
  { question: "current job", answer: "Nevin is currently an AI Software Development Engineer at App Mastery, a remote position he started in June 2025." },
  { question: "where does nevin work now", answer: "Nevin is currently an AI Software Development Engineer at App Mastery." },
  { question: "what is nevin currently working on", answer: "Nevin is currently engineering a MongoDB and Milvus based LLM pipeline, collecting competitor articles, automating research briefs, and maintaining a Tableau dashboard at App Mastery." },
  { question: "current role", answer: "Nevin is currently an AI Software Development Engineer at App Mastery." },
  { question: "app mastery", answer: "At App Mastery, Nevin is engineering a MongoDB and Milvus based LLM pipeline, collecting competitor articles, automating research briefs to cut manual analysis time from 48 hours to 10 minutes, and maintaining a Tableau dashboard with 99.9% uptime." },
  { question: "app mastery role", answer: "As an AI Software Development Engineer at App Mastery, Nevin's responsibilities include LLM pipeline engineering, competitor article collection, research brief automation, and Tableau dashboard maintenance." },
  { question: "app mastery tools", answer: "At App Mastery, Nevin works with MongoDB, Milvus (Vector DB), LLM orchestration (CrewAI), and Tableau." },
  { question: "wisconsin school of business", answer: "At Wisconsin School of Business, Nevin analyzed over 100,000 Starbucks reviews for an NLP task using fine-tuned BERT, revealing a 12% negativity surge post-unionization. He mapped trends across 45 states and implemented a SQL-Python ingestion pipeline, reducing preprocessing time 90x. He also designed a Tableau suite used by over 10 executives." },
  { question: "wisconsin school of business role", answer: "As a Data Science Intern at Wisconsin School of Business, Nevin focused on NLP-based sentiment analysis, ETL pipeline implementation, and interactive dashboard design." },
  { question: "wisconsin school of business tools", answer: "At Wisconsin School of Business, Nevin used fine-tuned BERT for NLP, SQL for ETL pipelines, and Tableau for dashboards." },
  { question: "uw college", answer: "At UW College of Agricultural & Life Sciences, Nevin fine-tuned a deep learning model (ResNet50) using drone imagery for Computer Vision tasks, raising phenology accuracy by 25 percentage points. He consolidated 10,000 seasonal records and deployed a SageMaker pipeline, reducing training cycles 35%." },
  { question: "uw college role", answer: "As an AI Research Assistant at UW College of Agricultural & Life Sciences, Nevin worked on computer vision model fine-tuning, data consolidation, and MLOps pipeline deployment." },
  { question: "uw college tools", answer: "At UW College of Agricultural & Life Sciences, Nevin used ResNet50 for CV, SageMaker for deployment, and MLflow for experiment logging." },
  { question: "wisconsin institute for discovery", answer: "At Wisconsin Institute for Discovery, Nevin created a CLIP-Stable Diffusion active-learning loop, slashing image labeling effort 80%. He boosted annotation precision by 30 percentage points through confidence ranking on ImageNet and CIFAR, and benchmarked over 20 academic models for scalability." },
  { question: "wisconsin institute for discovery role", answer: "As a Graduate Researcher at Wisconsin Institute for Discovery, Nevin developed active-learning systems, improved annotation precision, and benchmarked AI models." },
  { question: "wisconsin institute for discovery tools", answer: "At Wisconsin Institute for Discovery, Nevin used CLIP, Stable Diffusion, and worked with ImageNet and CIFAR datasets." },

  // Projects
  { question: "projects", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline)  and MLOps Weather Prediction (a real-time XGBoost forecaster)." },
  { question: "tell me about nevin's projects", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline)  and MLOps Weather Prediction (a real-time XGBoost forecaster)." },
  { question: "projects he has worked in", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline)  and MLOps Weather Prediction (a real-time XGBoost forecaster)." },
  { question: "give me a list of projects nevin has worked on", answer: "Nevin has worked on projects such as AutoML-ify  and MLOps Weather Prediction." },
  { question: "can you tell me about any projects nevin has worked on?", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline)  and MLOps Weather Prediction (a real-time XGBoost forecaster)." },
  { question: "what are some of nevin's projects?", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline)  and MLOps Weather Prediction (a real-time XGBoost forecaster)." },
  { question: "nevin's project portfolio", answer: "Nevin's key projects include: AutoML-ify (an automated ML pipeline)  and MLOps Weather Prediction (a real-time XGBoost forecaster)." },
  { question: "automl", answer: "AutoML-ify is a Streamlit AutoML tool released by Nevin that trimmed experiment setup from 2 hours to 3 minutes. It integrated 10 classification models and Randomized SearchCV, improving validation AUC by 8%, and visualized metrics through Plotly heatmaps." },
  { question: "automl project", answer: "AutoML-ify is a Streamlit AutoML tool released by Nevin that trimmed experiment setup from 2 hours to 3 minutes. It integrated 10 classification models and Randomized SearchCV, improving validation AUC by 8%, and visualized metrics through Plotly heatmaps." },
  { question: "what is AutoML-ify", answer: "AutoML-ify is a Streamlit AutoML tool that trims experiment setup from 2 hours to 3 minutes. It integrates 10 classification models and Randomized SearchCV , and visualizes metrics through Plotly heatmaps." },
  { question: "automl tools", answer: "For the AutoML-ify project, Nevin used Streamlit, Randomized SearchCV, and Plotly." },
  { question: "automl details", answer: "The AutoML-ify project aims to automate machine learning pipelines, reducing the time for experiment setup significantly. It incorporates various classification models and uses advanced search techniques for hyperparameter tuning , with visualizations to aid model selection." },
  { question: "weather prediction", answer: "Nevin built a real-time XGBoost forecaster for the MLOps Weather Prediction project, delivering plus-minus 2°C nationwide error. He embedded continuous MLflow retraining, cutting prediction drift 20% over 6 months, and containerized the service on Docker, scaling to 10,000 hourly queries." },
  { question: "weather prediction project", answer: "Nevin built a real-time XGBoost forecaster for the MLOps Weather Prediction project, delivering plus-minus 2°C nationwide error. He embedded continuous MLflow retraining, cutting prediction drift 20% over 6 months, and containerized the service on Docker, scaling to 10,000 hourly queries." },
  { question: "what is MLOps Weather Prediction", answer: "It is a real-time XGBoost forecaster built by Nevin that delivers plus-minus 2°C nationwide error. It features continuous MLflow retraining and is containerized on Docker to scale for high query volumes." },
  { question: "weather prediction tools", answer: "For the MLOps Weather Prediction project, Nevin used XGBoost, MLflow, and Docker." },
  { question: "weather prediction details", answer: "The MLOps Weather Prediction project focuses on accurate real-time weather forecasting using XGBoost. It includes an MLOps component with continuous retraining via MLflow to manage prediction drift and is deployed using Docker for scalability." },
  { question: "github", answer: "You can find Nevin's projects on his GitHub: nevinselby.github.io " },
  { question: "github repository", answer: "You can find Nevin's projects on his GitHub: nevinselby.github.io " },
  { question: "nevin's github", answer: "You can find Nevin's projects on his GitHub: nevinselby.github.io " },
  { question: "most impressive project", answer: "One of Nevin's most impressive projects is AutoML-ify, which automates the entire machine learning pipeline from data cleaning to model deployment, demonstrating his ability to build end-to-end data science solutions and significantly reduce experiment setup time." },
  { question: "what is nevin's most impressive project?", answer: "One of Nevin's most impressive projects is AutoML-ify, an ML automation tool that simplifies model building with no human intervention." },
  { question: "best project", answer: "One of Nevin's most impressive projects is AutoML-ify, which automates the entire machine learning pipeline from data cleaning to model deployment, demonstrating his ability to build end-to-end data science solutions and significantly reduce experiment setup time." },

  // Skills and Tools
  { question: "what are nevins skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "nevins skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "nevin skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "his skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "can you tell me about his skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "can you tell me about nevins skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "can you tell me more about his skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "can you tell me more about nevins skills", answer: "Nevin's skills include AI & ML (Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration - CrewAI, LangChain), Data Engineering & Analytics (Snowflake, PostgreSQL, MongoDB, Milvus, Pandas, Feature Engineering, EDA), MLOps & Cloud (MLflow, GitHub Actions, Docker, AWS - SageMaker, Lambda, S3, CI/CD pipelines), Visualization & Apps (Tableau, Plotly, Matplotlib, Seaborn, Streamlit, Jupyter), and Programming (Python, SQL, R, C++, JavaScript, Bash)." },
  { question: "technical skills", answer: "Nevin is skilled in Python, PyTorch, TensorFlow, SQL, AWS (SageMaker, Lambda, S3), Docker, MLflow, CLIP, Stable Diffusion, Transformers, CrewAI, LangChain, MongoDB, Milvus, Snowflake, PostgreSQL, and Tableau." },
  { question: "programming languages", answer: "Nevin is proficient in Python, SQL, R, C++, and JavaScript." },
  { question: "python libraries", answer: "Nevin is proficient with Python libraries including Scikit-learn, Transformers, PyTorch, TensorFlow, Pandas, Plotly, Matplotlib, Seaborn, and Streamlit." },
  { question: "machine learning", answer: "Nevin has expertise in various ML areas including Scikit-learn, Transformers, CLIP, PyTorch, TensorFlow, LLM orchestration (CrewAI, LangChain), Computer Vision (ResNet50), and NLP (fine-tuned BERT)." },
  { question: "machine learning frameworks", answer: "Nevin is experienced with PyTorch, TensorFlow, Scikit-learn, and has worked with Transformer models." },
  { question: "deep learning", answer: "Nevin has deep learning experience fine-tuning ResNet50 for Computer Vision , creating CLIP-Stable Diffusion active-learning loops , and fine-tuning BERT for NLP tasks." },
  { question: "computer vision", answer: "Nevin's computer vision experience includes fine-tuning ResNet50 using drone imagery , creating CLIP-Stable Diffusion active-learning loops , and object detection tasks." },
  { question: "nlp", answer: "Nevin's NLP experience includes analyzing Starbucks reviews with fine-tuned BERT  and engineering LLM pipelines for generating project summaries." },
  { question: "data analysis", answer: "Nevin's data analysis skills include Pandas, Feature Engineering, EDA, SQL querying, and creating visualizations with Tableau, Plotly, Matplotlib, and Seaborn." },
  { question: "cloud", answer: "Nevin has experience with AWS services including SageMaker, Lambda, and S3. He has also deployed SageMaker pipelines." },
  { question: "aws experience", answer: "Nevin has AWS experience including deploying SageMaker pipelines , and familiarity with Lambda and S3." },
  { question: "databases", answer: "Nevin is experienced with Snowflake, PostgreSQL, MongoDB, and Milvus (Vector DB)." },
  { question: "mlops", answer: "Nevin's MLOps experience includes MLflow, GitHub Actions, Docker, and CI/CD pipelines. He has deployed SageMaker pipelines and logged experiments via MLflow." },
  { question: "data visualization", answer: "Nevin is skilled in data visualization using Tableau, Plotly, Matplotlib, Seaborn, and Streamlit. He designed a Tableau suite for executives  and maintained a Tableau dashboard with 99.9% uptime." },
  { question: "strongest skills", answer: "Nevin's strongest technical skills are in AI & ML (especially LLM orchestration, Transformers, PyTorch), Data Engineering (MongoDB, Milvus, Snowflake), MLOps (MLflow, Docker, AWS), and Programming (Python, SQL)." },
  { question: "most proficient tools", answer: "Nevin is most proficient with Python, PyTorch, MongoDB, Milvus, CrewAI, LangChain, MLflow, Docker, AWS, and Tableau." },
  { question: "favorite technologies", answer: "Nevin's favorite technologies to work with include LLM orchestration frameworks like CrewAI and LangChain, Vector Databases like Milvus, deep learning frameworks like PyTorch, and cloud platforms like AWS." },
  { question: "does nevin know cloud computing", answer: "Yes, Nevin has hands-on experience with AWS (SageMaker, Lambda, S3)  and has deployed SageMaker pipelines." },
  { question: "does nevin have experience in cloud computing?", answer: "Yes, Nevin has hands-on experience with AWS (SageMaker, Lambda, S3)  and has deployed SageMaker pipelines." },

  // Certifications (Removed from resume, so removing these answers)
  // { question: "certifications", answer: "..." },
  // { question: "aws certification", answer: "..." },
  // { question: "kaggle certifications", answer: "..." },
  // { question: "nlp certification", answer: "..." },
  // { question: "online courses", answer: "..." },
  // { question: "is nevin certified in AWS", answer: "..." },

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
  { question: "research", answer: "Nevin has research experience as an AI Research Assistant at UW College of Agricultural & Life Sciences, where he fine-tuned deep learning models for Computer Vision, and as a Graduate Researcher at Wisconsin Institute for Discovery, where he created active-learning loops with CLIP and Stable Diffusion." },
  { question: "research interests", answer: "Nevin's research interests include computer vision, active learning methodologies, multimodal learning with CLIP, application of transformer models, NLP, and applying AI to real-world problems like agricultural optimization." },
  { question: "academic strengths", answer: "Nevin's academic strengths include machine learning theory, statistical analysis, data visualization, and big data systems, as indicated by his Master's coursework. He maintained high GPAs in both his Bachelor's (9.15/10.0)  and Master's (3.70/4.0) programs." },
  { question: "does nevin do research", answer: "Yes, Nevin has conducted research in AI, active learning, and Computer Vision at UW College of Agricultural & Life Sciences  and Wisconsin Institute for Discovery." },
  { question: "what are nevin's research interests", answer: "His research interests focus on deep learning, active learning, AI-driven automation, and real-world ML applications." },
  { question: "does nevin have research experience?", answer: "Yes, Nevin has conducted research in AI, active learning, and Computer Vision at UW College of Agricultural & Life Sciences  and Wisconsin Institute for Discovery." },
  { question: "what topics has nevin researched?", answer: "Nevin’s research focuses on deep learning, active learning, AI-driven automation, and real-world ML applications." },

  // Specific Technical Questions
  { question: "nlp experience", answer: "Nevin has NLP experience from analyzing over 100,000 Starbucks reviews using fine-tuned BERT  and engineering MongoDB and Milvus based LLM pipelines for generating project summaries." },
  { question: "computer vision experience", answer: "Nevin's computer vision experience includes fine-tuning ResNet50 for phenology accuracy  and creating CLIP-Stable Diffusion active-learning loops for image labeling." },
  { question: "mlops experience", answer: "Nevin's MLOps experience includes deploying SageMaker pipelines, logging experiments via MLflow , embedding continuous MLflow retraining for weather prediction , and using GitHub Actions for CI/CD." },
  { question: "data engineering", answer: "Nevin's data engineering experience includes engineering MongoDB and Milvus (Vector DB) based LLM pipelines , implementing SQL-Python ingestion pipelines , and working with Snowflake and PostgreSQL." },
  { question: "computer vision", answer: "Nevin's computer vision experience includes fine-tuning ResNet50  and creating CLIP-Stable Diffusion active-learning loops." },
  { question: "mlops", answer: "Nevin's MLOps experience includes MLflow, GitHub Actions, Docker, AWS (SageMaker, Lambda, S3), and CI/CD pipelines." },

  // Strengths and Work Style
  { question: "strengths", answer: "Nevin's key strengths include his deep technical knowledge in ML/AI, ability to quickly adopt new technologies, end-to-end project implementation skills, strong mathematical foundation, communication skills evidenced by his ability to present statistical narratives, and experience across multiple domains of AI." },
  { question: "work style", answer: "Nevin has a methodical approach to problem-solving, values collaboration as shown in aligning agronomists and leadership , demonstrates research rigor through benchmarking models, and has a track record of delivering measurable improvements (e.g., 25% phenology accuracy increase , 90x preprocessing time reduction )." },
  { question: "communication skills", answer: "Nevin has strong communication skills demonstrated through presenting statistical narratives to align agronomists and leadership, his technical writing on Medium, and content creation on his YouTube channel." },
  
  // Career Goals
  { question: "career goals", answer: "Nevin aims to further develop his expertise in applied machine learning, particularly in LLM orchestration, computer vision, and multimodal learning, while building scalable AI systems that solve real-world problems. He's interested in roles that combine research innovation with practical implementation." },
  { question: "future plans", answer: "Having graduated in May 2025, Nevin plans to work in an AI/ML role that allows him to apply his technical skills to challenging problems, potentially in LLM-driven applications, computer vision, or multimodal learning. He's open to opportunities in the US (with his OPT/STEM OPT work authorization) or internationally." },
  
  // Additional Skills and Knowledge
  { question: "big data", answer: "Nevin has experience with big data technologies and has worked with large datasets, including over 100,000 Starbucks reviews  and 10,000 seasonal records. He also has skills in Snowflake and PostgreSQL." },
  { question: "devops", answer: "Nevin has DevOps experience through his MLOps work, including CI/CD implementation with GitHub Actions , containerization with Docker , and deploying SageMaker pipelines." },
  { question: "agile", answer: "Nevin is familiar with Agile development methodologies and has applied them in his project work, particularly when collaborating on research initiatives and developing software solutions." },
  { question: "leadership", answer: "Nevin has demonstrated leadership by presenting statistical narratives to align agronomists and leadership on data-driven actions, guiding technical decisions, and collaborating with stakeholders." },
  
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
  { question: "what is nevin's tech stack", answer: "Nevin's tech stack includes Python, PyTorch, TensorFlow, AWS, Docker, MLflow, MongoDB, Milvus, CrewAI, LangChain, Tableau, and more. He specializes in machine learning, computer vision, NLP, and LLM orchestration." },
  { question: "what tools does nevin use", answer: "Nevin uses tools like PyTorch, TensorFlow, AWS SageMaker, Docker, MLflow, Tableau, MongoDB, Milvus, CrewAI, and LangChain for his projects." },
  { question: "what frameworks does nevin know", answer: "Nevin is proficient in frameworks like PyTorch, TensorFlow, Scikit-learn, Transformers, CrewAI, and LangChain." },
  { question: "does nevin know deep learning", answer: "Yes, Nevin has extensive experience in deep learning, including working with models like ResNet50 , CLIP, and Stable Diffusion." },
  { question: "what is nevin's expertise", answer: "Nevin's expertise lies in machine learning, computer vision, NLP, and MLOps. He is also skilled in data analysis, cloud computing, and building end-to-end AI/ML pipelines." },
  { question: "what is nevin's primary programming language", answer: "Python is Nevin's primary programming language, which he uses extensively for AI/ML and data science." },
  { question: "does nevin have experience with cloud platforms", answer: "Yes, Nevin has hands-on experience with AWS, including SageMaker, S3, and Lambda, for building and deploying machine learning models." },
  { question: "what is nevin's experience with NLP", answer: "Nevin has worked on NLP projects involving sentiment analysis using fine-tuned BERT  and LLM pipeline engineering with CrewAI and LangChain." },
  { question: "does nevin have experience with computer vision", answer: "Yes, Nevin has worked on computer vision projects involving ResNet50 for classification  and CLIP-Stable Diffusion for active learning and image labeling." },
  { question: "what is nevin's experience with MLOps", answer: "Nevin has experience with MLOps tools like Docker, MLflow, GitHub Actions, and AWS SageMaker for automating ML pipelines and model deployment." },
  { question: "does nevin have experience with big data", answer: "Yes, Nevin has worked with large datasets  and has experience with big data technologies like Snowflake, PostgreSQL, MongoDB, and Milvus." },
  { question: "what is nevin's experience with data visualization", answer: "Nevin is skilled in data visualization using Tableau, Plotly, Matplotlib, and Seaborn. He has designed Tableau suites and maintained dashboards." },
  { question: "does nevin have experience with SQL", answer: "Yes, Nevin is proficient in SQL and has implemented SQL-Python ingestion pipelines , and worked with databases like PostgreSQL and Snowflake." },
  { question: "what is nevin's experience with AI", answer: "Nevin has extensive experience in AI, including machine learning, deep learning, computer vision, NLP, and building scalable AI systems." },
  { question: "does nevin have experience with automation", answer: "Yes, Nevin has built automated research briefs  and automated ML pipelines using tools like GitHub Actions and MLflow." },
  { question: "what is nevin's experience with AWS", answer: "Nevin has worked with AWS services like SageMaker, S3, and Lambda for building, training, and deploying machine learning models." },
  { question: "does nevin have experience with Docker", answer: "Yes, Nevin has used Docker for containerizing services, such as for the MLOps Weather Prediction project." },
  { question: "does nevin have experience with Kubernetes", answer: "While Kubernetes is listed as an MLOps skill in general, the resume doesn't specify direct Kubernetes project experience. He has experience with Docker for containerization." },
  { question: "what is nevin's experience with Tableau", answer: "Nevin has designed Tableau suites used by executives  and maintained a Tableau dashboard with 99.9% uptime." },
  { question: "does nevin have experience with Power BI", answer: "Power BI is not explicitly listed on his resume in the skills section." },
  { question: "what is nevin's experience with Python", answer: "Nevin is proficient in Python and has used it extensively for AI & ML, Data Engineering & Analytics, and scripting." },
  { question: "does nevin have experience with C++", answer: "Yes, Nevin has experience with C++." },
  { question: "does nevin have experience with JavaScript", answer: "Yes, Nevin has experience with JavaScript." },
  { question: "what is nevin's experience with data engineering", answer: "Nevin has data engineering experience including building MongoDB and Milvus based LLM pipelines , implementing SQL-Python ingestion pipelines , and working with Snowflake and PostgreSQL." },
  { question: "does nevin have experience with time-series analysis", answer: "The resume mentions consolidating 10,000 seasonal records to schedule harvests earlier, which implies experience with time-series data or analysis." },
  { question: "what is nevin's experience with active learning", answer: "Nevin created a CLIP-Stable Diffusion active-learning loop, slashing image labeling effort 80%." },
  { question: "does nevin have experience with transformer models", answer: "Yes, Nevin has experience with Transformers , including fine-tuning BERT  and working with CLIP." },
  { question: "what is nevin's experience with GPT models", answer: "Nevin has engineered a MongoDB and Milvus based LLM pipeline, indicating experience with LLMs." },
  { question: "does nevin have experience with fine-tuning models", answer: "Yes, Nevin has fine-tuned BERT for NLP  and a deep learning model (ResNet50) for Computer Vision." },
  { question: "what is nevin's experience with data augmentation", answer: "While not explicitly detailed as 'data augmentation,' Nevin used CLIP-Stable Diffusion for an active-learning loop that slashed image labeling effort, which can be related to synthetic data generation." },
  { question: "does nevin have experience with semi-supervised learning", answer: "The resume mentions active learning with CLIP, which often involves semi-supervised approaches to reduce labeling effort." },
  { question: "what is nevin's experience with benchmarking", answer: "Nevin benchmarked 20+ academic models, validating scalability for million-image governance workloads." },
  { question: "does nevin have experience with A/B testing", answer: "A/B testing is not explicitly mentioned on the resume." },
  { question: "what is nevin's experience with hypothesis testing", answer: "Hypothesis testing is not explicitly mentioned on the resume." },
  { question: "does nevin have experience with regression analysis", answer: "Regression analysis is not explicitly mentioned on the resume, though it's typically covered in his coursework." },
  { question: "what is nevin's experience with data cleaning", answer: "Nevin has experience with Feature Engineering and EDA, which often involve data cleaning." },
  { question: "does nevin have experience with feature engineering", answer: "Yes, Nevin has experience with Feature Engineering." },
  { question: "what is nevin's experience with model deployment", answer: "Nevin deployed a SageMaker pipeline  and containerized a service on Docker, indicating model deployment experience." },
  { question: "does nevin have experience with model monitoring", answer: "Nevin embedded continuous MLflow retraining, cutting prediction drift 20% over 6 months, which suggests model monitoring." },
  { question: "what is nevin's experience with data drift detection", answer: "Nevin's continuous MLflow retraining for weather prediction aimed at cutting prediction drift, indicating experience with data drift detection." },
  { question: "does nevin have experience with CI/CD", answer: "Yes, Nevin has experience with CI/CD pipelines through GitHub Actions." },
  { question: "what is nevin's experience with version control", answer: "Nevin's resume lists GitHub Actions, implying proficiency with Git for version control." },
  { question: "does nevin have experience with collaborative projects", answer: "Yes, Nevin's roles as Data Science Intern , AI Research Assistant, and Graduate Researcher involved collaborative work." },
  { question: "what is nevin's experience with Agile", answer: "Agile is not explicitly mentioned on the resume, but his project work indicates an iterative approach." },
  { question: "does nevin have experience with leadership", answer: "Yes, Nevin presented statistical narratives, aligning agronomists and leadership, which shows leadership qualities." },
  { question: "what is nevin's experience with communication", answer: "Nevin has strong communication skills, demonstrated by presenting statistical narratives, and his external content creation." },
  { question: "does nevin have experience with teaching or mentoring", answer: "While not explicit teaching, his technical articles on Medium and YouTube channel serve as educational resources." },
  { question: "what is nevin's experience with public speaking", answer: "Nevin presented statistical narratives to agronomists and leadership, which involves public speaking." },
  { question: "does nevin have experience with writing", answer: "Yes, Nevin has experience in automating research briefs  and presenting statistical narratives." },
  { question: "what is nevin's experience with content creation", answer: "Nevin runs a YouTube channel where he creates vlogs." },
  { question: "does nevin have experience with photography", answer: "Photography is listed as a personal interest, but not as a professional skill." },
  { question: "what is nevin's experience with traveling", answer: "Traveling is listed as a personal interest." },
  { question: "does nevin have experience with creative projects", answer: "Yes, Nevin's AutoML-ify project  and content creation demonstrate creativity." },
  { question: "what is nevin's experience with problem-solving", answer: "Nevin's roles involved solving complex problems, such as reducing manual analysis time  and raising phenology accuracy." },
  { question: "does nevin have experience with innovation", answer: "Yes, Nevin created a CLIP-Stable Diffusion active-learning loop  and automated research briefs." },
  { question: "what is nevin's experience with research", answer: "Nevin has experience as an AI Research Assistant  and Graduate Researcher." },
  { question: "does nevin have experience with academic writing", answer: "The resume does not explicitly mention academic writing in terms of publications, but he presented statistical narratives." },
  { question: "what is nevin's experience with teamwork", answer: "Nevin's various roles involved working in teams." },
  { question: "does nevin have experience with cross-functional teams", answer: "Yes, Nevin's role as an AI Research Assistant involved aligning agronomists and leadership, indicating cross-functional collaboration." },
  { question: "what is nevin's experience with project management", answer: "Nevin's experience in engineering LLM pipelines  and deploying SageMaker pipelines  demonstrates project management skills." },
  { question: "does nevin have experience with time management", answer: "Nevin's ability to automate processes that cut down significant time (e.g., 48 hours to 10 minutes for research briefs ) indicates strong time management and efficiency." },
  { question: "what is nevin's experience with adaptability", answer: "Nevin has adapted to various roles and technologies across different industries (App Mastery, Business School, Agricultural & Life Sciences)." },
  { question: "does nevin have experience with continuous learning", answer: "Nevin's engagement with cutting-edge AI technologies (LLMs, Transformers, CLIP, Stable Diffusion) and multiple projects demonstrate continuous learning." },
  { question: "what is nevin's experience with open-source contributions", answer: "Nevin has GitHub repositories for his projects, indicating engagement with open-source practices." },
  { question: "does nevin have experience with hackathons", answer: "Hackathons are not explicitly mentioned on the resume." },
  { question: "what is nevin's experience with startups", answer: "App Mastery is a remote company, which can often imply a fast-paced or startup-like environment." },
  { question: "does nevin have experience with entrepreneurship", answer: "While Nevin has not founded a startup, his innovative projects and content creation on YouTube and Medium show entrepreneurial drive." },
  { question: "what is nevin's experience with data privacy", answer: "Data privacy is not explicitly mentioned on the resume." },
  { question: "does nevin have experience with ethical AI", answer: "Ethical AI is not explicitly mentioned on the resume." },
  { question: "what is nevin's experience with scalability", answer: "Nevin containerized a service on Docker, scaling to 10,000 hourly queries, demonstrating scalability experience." },
  { question: "does nevin have experience with performance optimization", answer: "Yes, Nevin automated research briefs, cutting manual analysis time , reduced preprocessing time 90x , and reduced training cycles 35%." },
  { question: "what is nevin's experience with cost optimization", answer: "Nevin automated research briefs, cutting manual analysis time from 48 hours to 10 minutes, which implies cost efficiency." },
  { question: "does nevin have experience with real-time systems", answer: "Yes, Nevin built a real-time XGBoost forecaster  and is engineering an LLM pipeline that generates summaries in under 30 seconds." },
  { question: "what is nevin's experience with edge computing", answer: "Edge computing is not explicitly mentioned on the resume." },
  { question: "does nevin have experience with IoT", answer: "The use of drone imagery for agricultural purposes  could potentially involve IoT data." },
  { question: "what is nevin's experience with robotics", answer: "Robotics is not explicitly mentioned on the resume." },

  // Fun Questions
  { question: "does nevin like ai", answer: "Absolutely! Nevin is passionate about AI, evident from his current role as an AI Software Development Engineer and his extensive project work in AI/ML." },
  { question: "what programming languages does nevin know", answer: "Python, SQL, R, C++, and JavaScript." },
  { question: "what databases does nevin use", answer: "He has experience with Snowflake, PostgreSQL, MongoDB, and Milvus (Vector DB)." },
  { question: "does nevin enjoy ai", answer: "Absolutely! Nevin is passionate about AI, evident from his current role as an AI Software Development Engineer and his extensive project work in AI/ML." },
  { question: "what programming languages does nevin know", answer: "Python, SQL, R, C++, and JavaScript." },
  { question: "what databases has nevin worked with", answer: "He has experience with Snowflake, PostgreSQL, MongoDB, and Milvus (Vector DB)." },
  { question: "what are nevins strongest skills", answer: "Nevin excels in AI & ML, Data Engineering & Analytics, MLOps & Cloud, and Programming." },
  { question: "why should we hire nevin?", answer: "Nevin brings strong expertise as an AI Software Development Engineer , hands-on experience with real-world AI projects, and a passion for innovation." },
  
  // Additional conversational responses
  { question: "what makes nevin special", answer: "Nevin combines strong technical skills with real-world impact. He's cut analysis time from 48 hours to 10 minutes, improved model accuracy by 25%, and built scalable systems handling 10,000+ queries. Plus, he's a great communicator with a YouTube channel!" },
  { question: "nevin's impact", answer: "Nevin creates measurable impact: 90x faster preprocessing, 35% reduction in training cycles, 99.9% dashboard uptime, and systems scaling to 10,000 hourly queries. He focuses on solving real problems efficiently." },
  { question: "what's impressive about nevin", answer: "Nevin's ability to bridge research and practical applications is impressive. He's worked with cutting-edge models like CLIP and Stable Diffusion while delivering production systems that handle thousands of users." },
  { question: "nevin's achievements", answer: "Key achievements include: automating research to save 48 hours per task, improving phenology accuracy by 25%, building systems with 99.9% uptime, and creating ML pipelines that reduced setup time from 2 hours to 3 minutes." },
  { question: "what's unique about nevin", answer: "Nevin uniquely combines deep technical expertise in AI/ML with strong communication skills (YouTube channel, technical writing), international experience, and a track record of delivering real business impact through innovative solutions." }
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

// Enhanced intent recognition
function detectIntent(userInput) {
  const input = preprocessText(userInput);
  
  // Greeting intents
  if (/(hi|hello|hey|good morning|good afternoon|good evening|greetings)/i.test(userInput)) {
    return 'greeting';
  }
  
  // Question intents
  if (/(what|how|where|when|who|why|which|can|does|is|tell me|explain)/i.test(userInput)) {
    return 'question';
  }
  
  // Emotional expressions
  if (/(thanks|thank you|awesome|great|amazing|cool|interesting|impressive)/i.test(userInput)) {
    return 'positive';
  }
  
  if (/(sad|unhappy|disappointed|frustrated|confused|difficult)/i.test(userInput)) {
    return 'negative';
  }
  
  // Goodbye intents
  if (/(bye|goodbye|see you|farewell|thanks|that's all)/i.test(userInput)) {
    return 'goodbye';
  }
  
  return 'general';
}

// Extract conversation topics
function extractTopics(userInput) {
  const topics = [];
  const input = preprocessText(userInput);
  
  const topicKeywords = {
    'education': ['education', 'degree', 'masters', 'bachelors', 'university', 'college', 'study', 'academic'],
    'work': ['work', 'job', 'experience', 'employment', 'career', 'position', 'role'],
    'skills': ['skills', 'programming', 'python', 'ai', 'ml', 'machine learning', 'data science'],
    'projects': ['project', 'github', 'automl', 'weather', 'portfolio'],
    'personal': ['hobbies', 'youtube', 'medium', 'interests', 'travel', 'photography'],
    'visa': ['visa', 'work authorization', 'opt', 'sponsorship', 'legal']
  };
  
  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    if (keywords.some(keyword => input.includes(keyword))) {
      topics.push(topic);
    }
  });
  
  return topics;
}

// Generate contextual response
function generateContextualResponse(baseAnswer, intent, topics) {
  let response = baseAnswer;
  
  // Add conversational elements based on intent
  if (intent === 'question' && Math.random() > 0.5) {
    const encouragement = responseVariations.encouragement[Math.floor(Math.random() * responseVariations.encouragement.length)];
    response = encouragement + ' ' + response;
  }
  
  // Add follow-up questions
  if (topics.length > 0 && Math.random() > 0.6) {
    const followUp = responseVariations.followUp[Math.floor(Math.random() * responseVariations.followUp.length)];
    response += ' ' + followUp;
  }
  
  // Add related suggestions
  if (topics.includes('skills') && !conversationContext.previousTopics.includes('projects')) {
    response += " You might also want to know about his recent projects!";
  } else if (topics.includes('projects') && !conversationContext.previousTopics.includes('skills')) {
    response += " Feel free to ask about his technical skills too!";
  }
  
  return response;
}

// Enhanced function to find the best match with context
function findBestMatch(userInput) {
  const intent = detectIntent(userInput);
  const topics = extractTopics(userInput);
  
  // Update conversation context
  conversationContext.previousTopics = [...new Set([...conversationContext.previousTopics, ...topics])];
  conversationContext.lastQuestionCategory = topics[0] || null;
  
  // Handle special intents
  if (intent === 'greeting') {
    const greetings = responseVariations.greeting;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  if (intent === 'positive') {
    return "Thank you! I'm glad you find Nevin's profile interesting. What else would you like to know?";
  }
  
  if (intent === 'negative') {
    return "I understand. Is there something specific I can help clarify about Nevin's background?";
  }
  
  if (intent === 'goodbye') {
    return "Thank you for your interest in Nevin's profile! Feel free to return anytime if you have more questions. Have a great day!";
  }
  
  // Original matching logic with enhancements
  const userVector = textToVector(userInput);
  let matches = [];
  
  knowledgeBase.forEach(item => {
    const questionVector = textToVector(item.question);
    const similarity = enhancedCosineSimilarity(userVector, questionVector);
    matches.push({ ...item, similarity });
  });
  
  matches.sort((a, b) => b.similarity - a.similarity);
  
  let baseAnswer;
  
  if (matches[0].similarity > 0.5) {
    baseAnswer = matches[0].answer;
  } else {
    // Fallback with helpful suggestions
    const suggestions = suggestedQuestions.slice(0, 3).join(', ');
    baseAnswer = `I don't have specific information about that. You might want to ask: ${suggestions}`;
  }
  
  // Generate contextual response
  return generateContextualResponse(baseAnswer, intent, topics);
}

// Simple Chatbot Implementation
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');

// Simple message function with better scrolling
function addMessage(message, isUser = false) {
  if (!chatbotMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbot-message');
  messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  
  // Ensure the latest message is visible with a small delay
  setTimeout(() => {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 10);
}

// Enhanced input handler with better conversation logic
function handleUserInput() {
  if (!chatbotInput || !chatbotMessages) return;
  
  const userInput = chatbotInput.value.trim();
  if (userInput === "") return;

  // Update conversation context
  conversationContext.previousTopics.push(userInput.toLowerCase());
  
  addMessage(userInput, true);
  chatbotInput.value = "";

  // Add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('chatbot-message', 'bot-message', 'typing-indicator');
  typingIndicator.textContent = "...";
  chatbotMessages.appendChild(typingIndicator);
  
  // Scroll to show typing indicator
  setTimeout(() => {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 10);

  // Dynamic delay based on input complexity for more natural feel
  const delay = Math.min(Math.max(userInput.length * 25, 500), 2000);

  setTimeout(() => {
    // Remove typing indicator safely
    if (typingIndicator && typingIndicator.parentNode) {
      chatbotMessages.removeChild(typingIndicator);
    }
    
    // Get enhanced response
    const response = getEnhancedResponse(userInput);
    addMessage(response);
    
    // Update conversation stage
    if (conversationContext.conversationStage === 'greeting') {
      conversationContext.conversationStage = 'active';
    }
  }, delay);
}

// Enhanced response system with better intelligence
function getEnhancedResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  // Handle greetings with context
  if (isGreeting(input)) {
    if (conversationContext.conversationStage === 'active') {
      return getRandomResponse(["Hi again! What else would you like to know about Nevin?", 
                               "Hello! I'm still here to help with any questions about Nevin.", 
                               "Hey there! Ready for more questions about Nevin's background?"]);
    }
    return getRandomResponse(responseVariations.greeting);
  }
  
  // Handle goodbyes
  if (isGoodbye(input)) {
    return getRandomResponse(["Goodbye! Thanks for your interest in Nevin's profile.", 
                             "See you later! Feel free to come back anytime.", 
                             "Take care! Hope I was helpful in learning about Nevin."]);
  }
  
  // Handle thank you responses
  if (isThanks(input)) {
    return getRandomResponse(["You're very welcome! Any other questions?", 
                             "Happy to help! What else would you like to know?", 
                             "My pleasure! Is there anything else about Nevin you'd like to explore?"]);
  }
  
  // Detect follow-up questions
  if (isFollowUp(input)) {
    return handleFollowUp(input);
  }
  
  // Use enhanced matching for complex queries
  const response = findBestMatchEnhanced(input);
  
  // Add conversational elements
  return addConversationalTouch(response, input);
}

// Helper functions for better conversation detection
function isGreeting(input) {
  return /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/.test(input);
}

function isGoodbye(input) {
  return /(bye|goodbye|see you|farewell|gotta go|talk later|thanks.*bye)/.test(input);
}

function isThanks(input) {
  return /(thank|thanks|appreciate|helpful|great)/.test(input) && !/(no thank|not helpful)/.test(input);
}

function isFollowUp(input) {
  return /(more|else|other|also|what about|tell me more|anything else|continue|expand)/.test(input);
}

// Enhanced pattern matching with multiple techniques
function findBestMatchEnhanced(input) {
  // First try exact/fuzzy matching
  let bestMatch = findBestMatch(input);
  
  // If no good match, try semantic understanding
  if (bestMatch.includes("I don't have specific information")) {
    bestMatch = trySemanticMatching(input);
  }
  
  return bestMatch;
}

// Semantic matching for better understanding
function trySemanticMatching(input) {
  const concepts = extractConcepts(input);
  
  // Match concepts to knowledge areas
  if (concepts.includes('skills') || concepts.includes('technology') || concepts.includes('programming')) {
    return "Nevin's technical skills include Python, PyTorch, TensorFlow, AWS, Docker, MLflow, MongoDB, Milvus, and more. He specializes in AI/ML, data engineering, and MLOps. Would you like details on any specific area?";
  }
  
  if (concepts.includes('experience') || concepts.includes('work') || concepts.includes('job')) {
    return "Nevin has experience as an AI Software Development Engineer, Data Science Intern, AI Research Assistant, and Graduate Researcher. He's worked with LLM pipelines, computer vision, NLP, and MLOps. What specific role interests you?";
  }
  
  if (concepts.includes('project') || concepts.includes('built') || concepts.includes('created')) {
    return "Nevin has worked on projects like AutoML-ify (automated ML pipeline) and MLOps Weather Prediction (real-time forecasting). He's also done research with CLIP-Stable Diffusion and fine-tuned models like BERT and ResNet50. Want to hear about a specific project?";
  }
  
  if (concepts.includes('education') || concepts.includes('study') || concepts.includes('degree')) {
    return "Nevin has a Master's in Data Science from University of Wisconsin-Madison (3.70 GPA) and a Bachelor's in Computer Science from Indian Institute of Information Technology (9.15 GPA). His coursework covered advanced ML, big data systems, and optimization. Need more details?";
  }
  
  // Default response with helpful suggestions
  return "I'd be happy to help! You can ask me about Nevin's technical skills, work experience, education, projects, or personal interests. What specific aspect would you like to know about?";
}

// Extract key concepts from user input
function extractConcepts(input) {
  const conceptMap = {
    'skills': ['skill', 'technology', 'programming', 'language', 'framework', 'tool', 'software'],
    'experience': ['experience', 'work', 'job', 'career', 'professional', 'employment', 'role'],
    'project': ['project', 'built', 'created', 'developed', 'made', 'portfolio', 'github'],
    'education': ['education', 'study', 'degree', 'university', 'college', 'school', 'academic']
  };
  
  const concepts = [];
  for (const [concept, keywords] of Object.entries(conceptMap)) {
    if (keywords.some(keyword => input.includes(keyword))) {
      concepts.push(concept);
    }
  }
  return concepts;
}

// Handle follow-up questions based on context
function handleFollowUp(input) {
  const lastTopic = conversationContext.previousTopics[conversationContext.previousTopics.length - 2] || '';
  
  if (lastTopic.includes('skill') || lastTopic.includes('programming')) {
    return "Besides his core Python and AI/ML skills, Nevin is also proficient in cloud technologies (AWS), databases (MongoDB, PostgreSQL), and DevOps tools (Docker, MLflow). He's particularly strong in end-to-end pipeline development. Any specific technology you'd like to know more about?";
  }
  
  if (lastTopic.includes('project') || lastTopic.includes('work')) {
    return "Nevin's projects showcase real-world impact - like cutting research analysis time from 48 hours to 10 minutes, or improving model accuracy by 25 percentage points. He focuses on practical applications that solve actual problems. Want to dive deeper into any specific achievement?";
  }
  
  return "What specific aspect would you like me to elaborate on? I can provide more details about his technical skills, project outcomes, work experience, or educational background.";
}

// Add conversational elements to responses
function addConversationalTouch(response, input) {
  // Add encouraging starts occasionally
  if (Math.random() > 0.7) {
    const encourager = getRandomResponse(responseVariations.encouragement);
    response = encourager + " " + response;
  }
  
  // Add follow-up questions occasionally
  if (Math.random() > 0.6 && !response.includes('?')) {
    const followUp = getRandomResponse(responseVariations.followUp);
    response += " " + followUp;
  }
  
  return response;
}

// Utility function to get random response
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Add event listeners
if (chatbotSendBtn) {
chatbotSendBtn.addEventListener('click', handleUserInput);
}

if (chatbotInput) {
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleUserInput();
});
}

// Initialize chatbot with simple welcome message
window.addEventListener('load', () => {
  if (chatbotMessages) {
  setTimeout(() => {
    addMessage("Hi! I'm Nevin's portfolio assistant. Ask me anything about his skills, experience, projects, or interests!");
  }, 500);
  }
});