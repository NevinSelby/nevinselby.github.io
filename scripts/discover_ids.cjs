
const axios = require('axios');
const cheerio = require('cheerio');

async function discoverYouTubeId(handle) {
    try {
        const url = `https://www.youtube.com/${handle}`;
        console.log(`Fetching YouTube: ${url}`);
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });

        // Method 1: RSS Link
        const $ = cheerio.load(data);
        const rssLink = $('link[type="application/rss+xml"]').attr('href');
        if (rssLink) {
            const id = rssLink.split('channel_id=')[1];
            console.log(`Found YouTube Channel ID via RSS: ${id}`);
            return id;
        }

        // Method 2: Regex
        const match = data.match(/"channelId":"(UC[\w-]{22})"/);
        if (match) {
            console.log(`Found YouTube Channel ID via Regex: ${match[1]}`);
            return match[1];
        }
    } catch (e) {
        console.error('YouTube Discovery Failed:', e.message);
    }
}

async function discoverScholarId(query) {
    try {
        const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
        console.log(`Fetching Scholar Search: ${url}`);
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });

        const $ = cheerio.load(data);
        // Look for profile links
        const profileLink = $('.gs_rt2 a').attr('href');
        if (profileLink) {
            // format: /citations?user=ID&...
            const match = profileLink.match(/user=([\w-]+)/);
            if (match) {
                console.log(`Found Scholar ID: ${match[1]}`);
                return match[1];
            }
        }
    } catch (e) {
        console.error('Scholar Discovery Failed:', e.message);
    }
}

(async () => {
    await discoverYouTubeId('@nevinselby');
    await discoverScholarId('Nevin Selby Wisconsin');
})();
