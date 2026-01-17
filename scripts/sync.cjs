const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
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
    console.log('Fetching Newsletter via Puppeteer (Full Content)...');
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // for safety in some envs
        });
        const page = await browser.newPage();

        // Go to homepage to find links
        await page.goto(BEEHIIV_URL, { waitUntil: 'domcontentloaded' });

        // Extract links
        const articleMetadata = await page.evaluate(() => {
            const items = [];
            // Look for links that start with /p/
            const links = Array.from(document.querySelectorAll('a[href^="/p/"]'));

            links.forEach(link => {
                const titleElement = link.querySelector('h2, h3, h4, div.title');
                const title = titleElement ? titleElement.innerText.trim() : link.innerText.trim();
                const href = link.getAttribute('href');

                if (title && href && title.length > 5) { // Filter out empty or icon links
                    items.push({
                        title,
                        link: `https://iterai.beehiiv.com${href}`,
                        // Try to find nearby date or summary if possible, simplified for now
                        summary: '',
                        date: '2026'
                    });
                }
            });
            // Dedupe
            return items.filter((v, i, a) => a.findIndex(t => (t.link === v.link)) === i);
        });

        console.log(`  Found ${articleMetadata.length} article links.`);

        const articles = [];
        const topArticles = articleMetadata.slice(0, 5); // Fetch top 5 full content

        for (const meta of topArticles) {
            console.log(`  - Scything content for: ${meta.title}`);
            try {
                await page.goto(meta.link, { waitUntil: 'networkidle2', timeout: 30000 });

                // Get content
                const pageData = await page.evaluate(() => {
                    // Try generic selectors for main content
                    const contentEl = document.querySelector('.prose') ||
                        document.querySelector('.post-content') ||
                        document.querySelector('article') ||
                        document.body;

                    const timeEl = document.querySelector('time');
                    const date = timeEl ? timeEl.innerText.trim() : '2026';

                    // Get text content but preserve some spacing
                    return {
                        content: contentEl.innerText.trim(),
                        date
                    };
                });

                const cleanContent = pageData.content.replace(/\s+/g, ' ').substring(0, 15000);
                const summary = cleanContent.substring(0, 200) + '...';
                const tags = generateTags(meta.title + ' ' + summary + ' ' + cleanContent);

                articles.push({
                    ...meta,
                    date: pageData.date,
                    summary: summary,
                    content: cleanContent,
                    tags
                });

            } catch (err) {
                console.error(`    Failed to scrape pages content for ${meta.link}: ${err.message}`);
                // Fallback basic
                articles.push({ ...meta, tags: ['General'], content: meta.title });
            }
        }

        return articles;

    } catch (e) {
        console.error('Newsletter Puppeteer Fetch Failed:', e.message);
        return [];
    } finally {
        if (browser) await browser.close();
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

async function main() {
    const videos = await fetchYouTube();
    const articles = await fetchBeehiiv();
    const publications = await fetchScholar();
    const githubRepos = await fetchGithubRepos();

    const output = {
        lastUpdated: new Date().toISOString(),
        videos,
        articles,
        publications,
        githubRepos
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    console.log(`Dynamic content updated at ${OUTPUT_FILE}`);
    console.log(`- Videos: ${videos.length}`);
    console.log(`- Articles: ${articles.length}`);
    console.log(`- Publications: ${publications.length}`);
    console.log(`- GitHub Repos: ${githubRepos.length}`);
}

main();
