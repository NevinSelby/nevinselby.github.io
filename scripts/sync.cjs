const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const parser = new Parser();

// Config
const YOUTUBE_CHANNEL_ID = 'UC1M2l9Yl8UPm3jTjVx4cLUQ'; // Nevin Selby
const BEEHIIV_URL = 'https://iterai.beehiiv.com/';
const SCHOLAR_USER_ID = 'h7tbBssAAAAJ'; // Nevin Selby updated
const OUTPUT_FILE = path.join(__dirname, '../src/content/dynamic.json');

// Tagging Heuristics
const TAG_RULES = {
    'AI': ['ai', 'gpt', 'llm', 'agent', 'machine learning', 'neural', 'prompt', 'robot', 'automation'],
    'Finance': ['finance', 'investing', 'stock', 'market', 'money', 'roth', '401k', 'tax', 'wealth', 'portfolio'],
    'Cloud': ['cloud', 'aws', 'gcp', 'azure', 'serverless', 'docker', 'kubernetes', 'devops'],
    'Psychology': ['mind', 'brain', 'learn', 'habit', 'psychology', 'emotion', 'fear'],
    'Life': ['travel', 'journal', 'life', 'story', 'adventure']
};

function generateTags(text) {
    const lower = text.toLowerCase();
    const tags = new Set();

    for (const [tag, keywords] of Object.entries(TAG_RULES)) {
        if (keywords.some(k => lower.includes(k))) {
            tags.add(tag);
        }
    }

    if (tags.size === 0) tags.add('General');
    return Array.from(tags).slice(0, 3); // Max 3 tags
}

async function fetchYouTube() {
    try {
        console.log('Fetching YouTube...');
        const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`);
        return feed.items.map(item => ({
            title: item.title,
            link: item.link,
            date: new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            thumbnail: `https://i.ytimg.com/vi/${item.id.split(':')[2]}/hqdefault.jpg`,
            views: 'Watch on YouTube'
        }));
    } catch (e) {
        console.error('YouTube Fetch Failed:', e.message);
        return [];
    }
}

async function fetchBeehiiv() {
    console.log('Fetching Newsletter via Axios/Cheerio...');
    try {
        const { data: html } = await axios.get(BEEHIIV_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(html);
        const articles = [];

        // Beehiiv layout: Look for links that start with /p/
        $('a[href^="/p/"]').each((i, el) => {
            const $el = $(el);
            const href = $el.attr('href');
            // Look for title in child headings or nearby
            const title = $el.find('h2, h3, h4').text().trim() || $el.text().trim();
            const summary = $el.find('p, div.summary, .post-preview-summary').text().trim() || "";

            // Basic dedupe and filter
            if (title && href && title.length > 5 && !articles.find(a => a.link.includes(href))) {
                articles.push({
                    title,
                    link: href.startsWith('http') ? href : `https://iterai.beehiiv.com${href}`,
                    summary: summary.slice(0, 300),
                    date: "2026",
                    tags: generateTags(title + " " + summary)
                });
            }
        });

        console.log(`  Found ${articles.length} articles.`);
        return articles.slice(0, 10);
    } catch (e) {
        console.error('Beehiiv Fetch Failed:', e.message);
        return [];
    }
}

async function fetchScholar() {
    try {
        console.log(`Fetching Google Scholar Profile (${SCHOLAR_USER_ID})...`);
        const profileUrl = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en`;
        const { data: profileData } = await axios.get(profileUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0' }
        });
        const $ = cheerio.load(profileData);
        const publications = [];

        $('tr.gsc_a_tr').each((i, el) => {
            const title = $(el).find('a.gsc_a_at').text().trim();
            const link = 'https://scholar.google.com' + $(el).find('a.gsc_a_at').attr('href');
            const summary = $(el).find('.gsc_a_at + .gs_gray').first().text().trim(); // Authors

            if (title) {
                publications.push({
                    title,
                    summary: summary,
                    link
                });
            }
        });
        return publications.slice(0, 5);

    } catch (e) {
        console.error('Scholar Fetch Failed:', e.message);
        return [];
    }
}

async function fetchGithubRepos() {
    try {
        console.log('Fetching GitHub Repos...');
        // Fetch up to 100 public repos, sorted by update time
        const { data } = await axios.get('https://api.github.com/users/NevinSelby/repos?sort=updated&per_page=100type=public', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0' }
        });

        return data.map(repo => ({
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            updated_at: new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        }));
    } catch (e) {
        console.error('GitHub Fetch Failed:', e.message);
        return [];
    }
}

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function fetchResume() {
    const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1_qjyKLFq1ikr0IbLCwDZBr5Z0boTD7e1';
    try {
        console.log('Fetching & Parsing Resume (Deep Extraction)...');
        const response = await axios({
            url: RESUME_URL,
            method: 'GET',
            responseType: 'arraybuffer',
            maxRedirects: 5,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0'
            }
        });

        const pdfBuffer = Buffer.from(response.data);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Act as an expert career assistant. Extract the following information from this resume and return it as a single JSON object.

        CRITICAL RULES:
        - NO HALLUCINATIONS: If a piece of info is missing, use "" or an empty array []. 
        - DO NOT USE PLACEHOLDERS: Never return "https://github.com" or "https://preview.com". If the exact URL is not in the text, leave it as "".
        - URL Extraction: Scan every project and the header for URLs. 
            - "links.github" MUST be the actual full URL found for a repo (e.g., https://github.com/username/repo).
            - "links.live" MUST be the actual full URL found for a demo (e.g., https://project.streamlit.app).

        GUIDELINES FOR PROJECTS:
        - Inference: For each project, analyze the title and bullet points. Infer and summarize:
            - "problem": The core pain point or technical challenge the project addresses.
            - "approach": the specific methodology, architecture, or workflow used to solve it.
            - "results": A JSON array of specific outcomes, metrics, or achievements.
        
        Information required:
        1. experience: Array of objects (role, company, location, period, description (array of sentences), highlights (array of key achievements), slug (kebab-case company name)).
        2. skills: Array of objects (category, skills (array)).
        3. projects: Array of objects (title, subtitle, period, description (string summary), problem, approach, results (array), techStack (array), slug (kebab-case project name), links: { github, live }).
        
        ONLY return the JSON object. Do not include markdown code blocks or any introductory text.`;

        const result = await model.generateContent([
            {
                inlineData: {
                    data: pdfBuffer.toString('base64'),
                    mimeType: "application/pdf"
                }
            },
            prompt
        ]);

        const text = result.response.text();
        console.log(`  Raw AI Response (first 100 chars): ${text.substring(0, 100)}...`);
        try {
            const cleanText = text.replace(/```json|```/g, '').trim();
            const extracted = JSON.parse(cleanText);

            // Post-processing to ensure structural integrity
            const cleanExperience = (extracted.experience || []).map(exp => ({
                ...exp,
                slug: exp.slug || exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                highlights: exp.highlights || []
            }));

            const cleanProjects = (extracted.projects || []).map(p => ({
                ...p,
                slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                links: {
                    github: p.links?.github || "",
                    live: p.links?.live || ""
                },
                description: Array.isArray(p.description) ? p.description.join(' ') : (p.description || ""),
                techStack: p.techStack || []
            }));

            console.log(`  Successfully extracted and cleaned deep data.`);
            return {
                experience: cleanExperience,
                skills: extracted.skills || [],
                projects: cleanProjects
            };
        } catch (parseErr) {
            console.warn('  JSON parse failed, checking for fallback match...');
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const extracted = JSON.parse(jsonMatch[0]);
                // Apply same cleaning for fallback
                return {
                    experience: (extracted.experience || []).map(exp => ({ ...exp, slug: exp.slug || exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-') })),
                    skills: extracted.skills || [],
                    projects: (extracted.projects || []).map(p => ({ ...p, slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), links: { github: "", live: "" } }))
                };
            }
        }
        return { experience: [], skills: [], projects: [] };
    } catch (e) {
        console.error('Resume Deep Extraction Failed:', e.message);
        return { experience: [], skills: [], projects: [] };
    }
}

async function main() {
    try {
        const videos = await fetchYouTube();
        const articles = await fetchBeehiiv();
        const publications = await fetchScholar();
        const githubRepos = await fetchGithubRepos();
        const resumeData = await fetchResume();

        const output = {
            lastUpdated: new Date().toISOString(),
            videos,
            articles,
            publications,
            githubRepos,
            experience: resumeData.experience || [],
            skills: resumeData.skills || [],
            projects: resumeData.projects || []
        };

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
        console.log(`Dynamic content updated at ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('FATAL: Sync process failed partially but continuing with partial data:', error.message);
    }
}

main();
