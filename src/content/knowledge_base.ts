export interface QA {
    question: string;
    answer: string;
    topic: string;
    path?: string;
}

export const knowledgeBase: QA[] = [
    // --- Personal / Bio ---
    {
        question: "Who is Nevin?",
        answer: "Nevin John Selby is an AI & Cloud Engineer specializing in ML infrastructure, runtime optimization, and large-scale model deployment across AWS and GCP.",
        topic: "Bio",
        path: "/about"
    },
    {
        question: "Where is Nevin located?",
        answer: "Nevin is based in the United States.",
        topic: "Bio",
        path: "/contact"
    },
    {
        question: "What does Nevin do?",
        answer: "He builds system-level software that accelerates AI. His work bridges the gap between experimental data science and production engineering, focusing on making LLMs and ML pipelines fast, reliable, and cost-effective.",
        topic: "Bio",
        path: "/projects"
    },
    {
        question: "What are his hobbies?",
        answer: "Beyond coding, Nevin is an adventurer and storyteller. He runs a YouTube travel channel, enjoys photography, and writes a newsletter about the convergence of Finance and AI.",
        topic: "Bio",
        path: "/media"
    },

    // --- Experience: Zion Cloud Solutions ---
    {
        question: "What did Nevin do at Zion Cloud Solutions?",
        answer: "At Zion Cloud Solutions, Nevin led the development of scalable AI infrastructure. He focused on optimizing LLM runtimes and ML pipelines on Google Cloud Platform.",
        topic: "Experience",
        path: "/experience/zion-cloud-solutions"
    },
    {
        question: "Tell me about his work with Vertex AI.",
        answer: "He engineered robust deployment systems using Vertex AI pipelines, which reduced deployment latency by 35% and increased team velocity by 40%.",
        topic: "Experience",
        path: "/experience/zion-cloud-solutions"
    },
    {
        question: "How did he optimize costs at Zion?",
        answer: "He refactored the runtime architecture for Gemini-based apps using Cloud Functions and optimized container images, cutting compute costs by 20% while maintaining 99.8% uptime.",
        topic: "Experience",
        path: "/experience/zion-cloud-solutions"
    },
    {
        question: "Did he work with Agents?",
        answer: "Yes, he built RAG-powered agents to automate internal operations, reducing manual workload by 40%. This involved a multi-agent orchestration layer for context-aware routing.",
        topic: "Experience",
        path: "/experience/zion-cloud-solutions"
    },

    // --- Experience: Wisconsin School of Business ---
    {
        question: "What was his role at Wisconsin School of Business?",
        answer: "He was a Data Scientist applying NLP techniques to analyze large-scale social data for academic research.",
        topic: "Experience",
        path: "/experience/wisconsin-school-of-business"
    },
    {
        question: "What models did he use there?",
        answer: "He used GPT-3.5 for sentiment analysis on millions of tweets and fine-tuned BERT models for domain-specific classification.",
        topic: "Experience",
        path: "/experience/wisconsin-school-of-business"
    },
    {
        question: "Did he use CLIP?",
        answer: "Yes, he utilized CLIP for multimodal price prediction, correlating image aesthetics with product pricing to improve accuracy by 23%.",
        topic: "Experience",
        path: "/experience/wisconsin-school-of-business"
    },

    // --- Experience: UW CALS ---
    {
        question: "What did he do at UW CALS?",
        answer: "He worked as an AI Research Assistant building computer vision systems for agriculture, specifically monitoring crop health and yield.",
        topic: "Experience",
        path: "/experience/uw-cals"
    },
    {
        question: "What computer vision models does he know?",
        answer: "He has experience with ResNet50 for feature extraction and YOLOv8 for object detection. He also used CLIP for semi-supervised auto-labeling.",
        topic: "Experience",
        path: "/experience/uw-cals"
    },

    // --- Skills & Tech Stack ---
    {
        question: "What programming languages does he know?",
        answer: "Nevin is proficient in Python, C++, SQL, and Bash.",
        topic: "Skills",
        path: "/about"
    },
    {
        question: "What cloud platforms does he use?",
        answer: "He is an expert in both GCP (Vertex AI, Cloud Functions, Pub/Sub) and AWS (SageMaker, Lambda, S3, EC2).",
        topic: "Skills",
        path: "/about"
    },
    {
        question: "Does he know Kubernetes?",
        answer: "Yes, he works with Kubernetes and Docker for container orchestration and runtime optimization.",
        topic: "Skills",
        path: "/about"
    },
    {
        question: "What ML frameworks does he use?",
        answer: "He uses TensorFlow, PyTorch, Scikit-learn, XGBoost, and works with LLMs like GPT and Gemini.",
        topic: "Skills",
        path: "/about"
    },

    // --- Projects ---
    {
        question: "What is AutoML-ify?",
        answer: "AutoML-ify is a comprehensive no-code tool Nevin built to streamline ML pipeline creation. It supports 10+ algorithms and reduces setup time from hours to minutes.",
        topic: "Projects",
        path: "/projects/automl-ify"
    },
    {
        question: "Tell me about the Weather Prediction project.",
        answer: "He built a scalable MLOps microservice for real-time weather prediction using XGBoost and MLflow. It handles high throughput and includes concept drift monitoring.",
        topic: "Projects",
        path: "/projects/mlops-weather-prediction"
    },

    // --- Newsletter / Writing ---
    {
        question: "What does he write about?",
        answer: "He writes about the intersection of Finance and AI. Topics include investment basics, the psychology of money, and how AI agents are changing the financial landscape.",
        topic: "Newsletter",
        path: "/newsletter"
    },
    {
        question: "Does he have a newsletter?",
        answer: "Yes, you can read his latest articles on his 'Iterative AI' newsletter page.",
        topic: "Newsletter",
        path: "/newsletter"
    }
];
