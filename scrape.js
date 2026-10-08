const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
  const urls = [
    'https://gemfort-int.lovable.app/journal/china-fort-the-heart-of-ceylon-gem-trading',
    'https://gemfort-int.lovable.app/journal/ceylon-sapphire-and-the-worlds-great-jewels',
    'https://gemfort-int.lovable.app/journal/the-pathe-gem-market',
    'https://gemfort-int.lovable.app/journal/heat-treatment-explained',
    'https://gemfort-int.lovable.app/journal/sri-lankan-gem-heritage',
    'https://gemfort-int.lovable.app/journal/reading-rough-sapphire'
  ];
  
  const results = {};
  for(let i=0; i<urls.length; i++){
    try {
      const res = await fetch(urls[i]);
      const html = await res.text();
      const ch = cheerio.load(html);
      
      let htmlContent = ch('article').html() || '';
      
      const art = cheerio.load(htmlContent);
      art('header').remove();
      art('nav').remove();
      art('script').remove();
      art('svg').remove();
      art('img').remove();
      
      let textLines = [];
      art('h2, h3, p, li').each((idx, el) => {
          let text = art(el).text().trim();
          if(text) textLines.push(text);
      });
      
      results[urls[i].split('/').pop()] = textLines.join('\n\n');
      console.log('Scraped ' + urls[i]);
    } catch(e) {
      console.log('Error scraping ' + urls[i] + ' - ' + e);
    }
  }
  
  fs.writeFileSync('C:\\Users\\Dell\\Desktop\\Gemfort\\scraped_articles.json', JSON.stringify(results, null, 2));
}

scrape();
