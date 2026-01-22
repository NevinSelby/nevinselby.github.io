export interface GithubRepo {
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    updated_at: string;
}

export interface Profile {
    name: string;
    title: string;
    oneLiner: string;
    bio: string[];
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    resume: string;
    website: string;
    social: {
        youtube: string;
        instagram: string;
        newsletter: string;
        calendly?: string;
    };
    personalJourney?: string[];
}

export interface Article {
    title: string;
    date: string;
    summary: string;
    tags: string[];
    link: string;
    content?: string; // Full text for chatbot
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface Experience {
    role: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
    slug: string;
    description: string[];
}

export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    period: string;
    description: string;
    problem: string;
    approach: string;
    results: string[];
    techStack: string[];
    links: {
        github: string;
        live: string;
    };
}

export interface Publication {
    title: string;
    summary: string;
    link: string;
}

export interface Education {
    school: string;
    degree: string;
    period: string;
    location: string;
    highlights?: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    link?: string;
}

export interface ContentData {
    profile: Profile;
    skills: SkillCategory[];
    experience: Experience[];
    projects: Project[];
    publications: Publication[];
    education: Education[];
    certifications?: Certification[];
    articles?: Article[];
    videos?: Video[];
    githubRepos?: GithubRepo[];
}

export interface Video {
    title: string;
    date: string;
    link: string;
    thumbnail: string;
    views?: string;
}
