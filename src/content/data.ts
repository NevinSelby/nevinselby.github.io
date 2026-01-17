
import type { ContentData } from './types';
// @ts-ignore
import dynamicData from './dynamic.json';

const { videos, articles, publications, githubRepos } = dynamicData as any || {};

// Static data definition (merged from previous file state)
const staticData = {
    profile: {
        name: "Nevin John Selby",
        title: "AI & Cloud Engineer",
        oneLiner: "Specializing in ML infrastructure, runtime optimization, and large-scale model deployment across AWS and GCP.",
        bio: [
            "AI & Cloud Engineer with expertise in building scalable ML systems, runtime optimization, and cloud-native deployments across GCP (Vertex AI) and AWS (SageMaker, Lambda). Proficient in Python, C++, and distributed systems, with hands-on experience in LLM integration, model serving, and MLOps pipelines.",
            "My passion lies in building system-level software that accelerates AI and ensures reliability.",
            "Beyond code, I'm an adventurer and storyteller, running a YouTube travel channel, capturing moments through photography, and writing a newsletter that simplifies finance and AI."
        ],
        personalJourney: [
            "My path hasn't been a straight line. It started with a curiosity about how things work—taking apart radios, building simple circuits—and evolved into a fascination with the systems that govern our world, both digital and financial.",
            "I believe that technology shouldn't just be about efficiency; it should be about empowerment. That's why I started my YouTube channel and newsletter. I wanted to bridge the gap between complex technical concepts and everyday understanding.",
            "Traveling has been my greatest teacher. Navigating foreign cities, attempting to speak new languages, and seeing how different cultures solve problems has profoundly shaped my engineering philosophy. It taught me that there is rarely one 'correct' way to build something—context is everything.",
            "Today, I treat my career not just as a series of jobs, but as a continuous project of learning. Whether I'm optimizing a Kubernetes cluster or explaining the nuances of an IRA, the goal is the same: to build clarity and reliability in a chaotic world."
        ],
        location: "United States",
        email: "nevinselby2001@gmail.com",
        phone: "+1 (608) 239-6451",
        linkedin: "https://linkedin.com/in/nevinselby",
        website: "https://nevinselby.github.io",
        social: {
            youtube: "https://youtube.com/@placeholder",
            instagram: "https://instagram.com/placeholder",
            newsletter: "https://newsletter.placeholder.com",
            calendly: "https://calendly.com/nevinselby2001/30min"
        }
    },
    skills: [
        {
            category: "Languages",
            skills: ["Python", "C++", "SQL", "Bash"]
        },
        {
            category: "Machine Learning",
            skills: ["TensorFlow", "PyTorch", "Scikit-learn", "BERT", "CLIP", "GPT", "XGBoost"]
        },
        {
            category: "Cloud",
            skills: ["GCP (Vertex AI, Cloud Functions, Pub/Sub)", "AWS (SageMaker, Lambda, S3, EC2)"]
        },
        {
            category: "DevOps & Infra",
            skills: ["Docker", "Kubernetes", "MLflow", "Airflow", "Git", "CI/CD"]
        },
        {
            category: "Competencies",
            skills: ["Systems programming", "Runtime optimization", "MLOps", "Model deployment", "Data engineering"]
        }
    ],
    experience: [
        {
            role: "AI Engineer",
            company: "Zion Cloud Solutions",
            location: "Greater Chicago Area, IL",
            period: "Aug 2025 – Present",
            slug: "zion-cloud-solutions",
            description: [
                "At Zion Cloud Solutions, I lead the development of scalable AI infrastructure, bridging the gap between experimental data science and production-grade engineering. My work focuses on optimizing how Large Language Models (LLMs) and complex ML pipelines run in cloud environments.",
                "I engineered a robust deployment system using Vertex AI pipelines that reduced deployment latency by 35% while increasing team velocity by 40%. This involved rewriting legacy bash scripts into modular Python-based Airflow DAGs.",
                "A significant part of my role involves system optimization. I refactored the runtime architecture for Gemini-based applications, utilizing Cloud Functions and highly optimized container images to cut compute costs by 20% while maintaining 99.8% uptime.",
                "I also built RAG-powered agents that automated internal operations, reducing manual workload by 40%. This required designing a multi-agent orchestration layer that could contextually route queries to the correct knowledge base.",
                "Designed client workflows using Pub/Sub and Cloud Run, increasing API throughput by 25% overall."
            ],
            highlights: [
                "Vertex AI pipelines: deployment speed +40%, latency -35%",
                "Cloud Functions as runtime tools for Gemini LLM: 99.8% uptime",
                "Pub/Sub + Cloud Run workflows: throughput +25%",
                "RAG-powered agents: automation accuracy +30%, manual ops -40%",
                "Container runtime optimization: compute cost -20%"
            ]
        },
        {
            role: "Data Scientist",
            company: "Wisconsin School of Business & Tuck School of Business",
            location: "Madison, WI",
            period: "Sept 2024 – Aug 2025",
            slug: "wisconsin-school-of-business",
            description: [
                "As a Data Scientist for academic research, I applied NLP techniques to analyze large-scale social data, uncovering trends in labor markets and consumer behavior. The challenge was processing messy, unstructured text data into clean, analytical signals.",
                "I developed sentiment analysis models using GPT-3.5 to track public perception of unionization events, processing millions of tweets to detect a 12% shift in negative sentiment. This provided critical empirical evidence for the research team.",
                "To improve classification accuracy, I fine-tuned a BERT model on a domain-specific corpus, boosting precision by 18% over off-the-shelf models. I also optimized the inference pipeline, reducing cloud costs by 25% through batch processing.",
                "I also utilized CLIP for multimodal price prediction, correlating image aesthetics with product pricing, which improved prediction accuracy by 23%.",
                "Automated Python-SQL ETL workflows workflows reducing preprocessing time by 40% and increasing data reliability significantly."
            ],
            highlights: [
                "GPT-3.5 sentiment models: detected 12% negative sentiment increase after unionization events",
                "Fine-tuned BERT: precision +18%, inference cost -25%",
                "CLIP multimodal price prediction: accuracy +23%",
                "Python-SQL ETL automation: preprocessing time -40%"
            ]
        },
        {
            role: "AI Research Assistant",
            company: "UW College of Agricultural & Life Sciences",
            location: "Madison, WI",
            period: "Sept 2024 – Mar 2025",
            slug: "uw-cals",
            description: [
                "Working at the intersection of AI and agriculture, I built computer vision systems to help growers monitor crop health and yield. The environment required models that were robust to varying lighting and weather conditions.",
                "I deployed a hybrid detection system combining ResNet50 for feature extraction and YOLOv8 for object detection, achieving a 25% increase in accuracy for pest detection.",
                "To handle the scarcity of labeled agricultural data, I implemented a semi-supervised learning pipeline using CLIP to auto-label images, reducing the manual labeling effort by 80%.",
                "I orchestrated these training pipelines on AWS SageMaker, optimizing instance usage to reduce compute overhead by 30%.",
                "Collaborated with growers translating model outputs into actionable insights improving agricultural efficiency."
            ],
            highlights: [
                "ResNet50 + YOLOv8: detection accuracy +25%, precision +15%",
                "CLIP semi-supervised auto-labeling: labeling effort -80%",
                "AWS SageMaker pipelines: compute overhead -30%, storage inefficiencies -20%",
                "Collaborated with growers for actionable insights"
            ]
        }
    ],
    education: [
        {
            school: "University of Wisconsin - Madison",
            degree: "M.S. Data Science",
            period: "Sept 2023 – May 2025",
            gpa: "3.70/4.0"
        },
        {
            school: "Indian Institute of Information Technology",
            degree: "B.Tech. Computer Science",
            period: "Aug 2019 – May 2023",
            gpa: "9.15/10.0"
        }
    ],
    certifications: [
        {
            name: "Google Cloud 3x Certified",
            issuer: "Professional Machine Learning Engineer, Professional Data Engineer, Associate Cloud Engineer"
        }
    ],
    projects: [
        {
            slug: "automl-ify",
            title: "AutoML-ify",
            subtitle: "Automate Your Machine Learning Pipeline Effortlessly",
            period: "Jun 2024 – Feb 2025",
            description: "A comprehensive no-code tool to streamline ML pipeline creation.",
            problem: "Setting up ML pipelines manually is time-consuming (taking hours) and prone to configuration errors.",
            approach: "Built a platform supporting 10+ algorithms with RandomizedSearchCV for hyperparameter tuning and Plotly for visualization.",
            results: [
                "No-code AutoML: setup time from 4h → 30m",
                "Baseline validation AUC +8% avg"
            ],
            techStack: ["Python", "Scikit-learn", "Plotly", "RandomizedSearchCV"],
            links: {
                github: "https://github.com/NevinSelby/AutoML-ify",
                live: "https://automlops.streamlit.app/"
            }
        },
        {
            slug: "mlops-weather-prediction",
            title: "MLOps Weather Prediction",
            subtitle: "Scalable Weather Forecasting Microservice",
            period: "Dec 2023 – Jun 2024",
            description: "An end-to-end MLOps implementation for real-time weather prediction.",
            problem: "Deploying ML models with drift detection and automatic retraining capability is complex.",
            approach: "Developed an XGBoost microservice handling 1,000 req/hour, integrated with MLflow for concept drift monitoring.",
            results: [
                "XGBoost microservice; MAE ~2°C; 1,000 req/hour",
                "MLflow retraining workflow w/ concept drift; error drift -20% over 6 months"
            ],
            techStack: ["XGBoost", "MLflow", "Docker", "Python"],
            links: {
                github: "https://github.com/NevinSelby/MLOps-WeatherApp",
                live: "https://mlops-weatherapp.streamlit.app/"
            }
        }
    ],
    publications: [
        {
            title: "An Efficient Stock Price Prediction Mechanism Using Multivariate Sequential LSTM Autoencoder",
            summary: "Explored novel architectures for stock market forecasting using deep learning, achieving significant improvements in predictive accuracy over baseline models.",
            link: "#"
        },
        {
            title: "Advantage Actor-Critic Reinforcement Learning with Technical Indicators for Stock Trading Decisions",
            summary: "Applied reinforcement learning techniques combined with traditional technical analysis to optimize algorithmic trading strategies.",
            link: "#"
        }
    ],
    articles: [
        {
            title: "Understanding 401(k), IRA, Roth IRA, Regular Investing, and HSA in Plain Language",
            date: "Jan 14, 2026",
            summary: "This guide walks through five common buckets in simple terms: 401(k), traditional IRA, Roth IRA, regular taxable investing, and HSA.",
            tags: ["Finance"],
            link: "https://iterai.beehiiv.com/p/understanding-401-k-ira-roth-ira-regular-investing-and-hsa-in-plain-language"
        },
        {
            title: "“Sleep at Night” Investing: Designing a Plan You Can Emotionally Handle",
            date: "Jan 7, 2026",
            summary: "Designing a plan you can emotionally handle so you don't panic sell when the market drops.",
            tags: ["Finance", "Psychology"],
            link: "https://iterai.beehiiv.com/p/sleep-at-night-investing-designing-a-plan-you-can-emotionally-handle"
        },
        {
            title: "Before You Use AI to Invest, Learn the Basics of Investing",
            date: "Dec 31, 2025",
            summary: "Why fundamental knowledge is crucial even when using advanced AI tools for financial decisions.",
            tags: ["Finance", "AI"],
            link: "https://iterai.beehiiv.com/p/before-you-use-ai-to-invest-learn-the-basics-of-investing"
        },
        {
            title: "Agents vs Traditional Automation in Finance",
            date: "Dec 24, 2025",
            summary: "It is about understanding where simple rules are enough and where real context and judgment start to matter.",
            tags: ["AI", "Finance"],
            link: "https://iterai.beehiiv.com/p/agents-vs-traditional-automation-in-finance"
        },
        {
            title: "Crafting Clear Prompts",
            date: "Dec 17, 2025",
            summary: "A Practical Guide to Getting Better Answers from AI.",
            tags: ["AI"],
            link: "https://iterai.beehiiv.com/p/crafting-clear-prompts"
        },
        {
            title: "Designing Guardrails for AI Financial Advice",
            date: "Dec 10, 2025",
            summary: "How to Let Agents Help With Money Without Letting Them Run Wild.",
            tags: ["AI", "Finance"],
            link: "https://iterai.beehiiv.com/p/designing-guardrails-for-ai-financial-advice"
        },
        {
            title: "Practical Financial Planning",
            date: "Dec 3, 2025",
            summary: "Detailed Steps You Can Actually Follow. The goal is to show you exactly what to do, how to do it, and why each step matters.",
            tags: ["Finance"],
            link: "https://iterai.beehiiv.com/p/practical-financial-planning"
        }
    ]
};



export const data: ContentData = {
    ...staticData,
    videos: videos || [],
    articles: articles || [],
    publications: publications || staticData.publications,
    githubRepos: githubRepos || []
};
