const fs = require('fs');
const scraped = JSON.parse(fs.readFileSync('scraped_articles.json', 'utf-8'));

if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}

const articles = [
  { 
    id: 1, 
    title: 'Chinafort "Pathe" Gem Market: the heart of Sri Lanka\'s gem trade', 
    date: '4 August 2026', 
    category: 'China Fort', 
    excerpt: 'Nestled in Beruwala, just 55 km south of Colombo, the Chinafort "Pathe" Gem Market is a living ecosystem where generations of expertise, immense trust and precious stones change hands in a uniquely vibrant open-air market.',
    img: '/images/journal/1.png',
    content: scraped['china-fort-the-heart-of-ceylon-gem-trading']
  },
  { 
    id: 2, 
    title: 'Reading rough sapphire: what a buyer looks for before cutting', 
    date: '18 July 2026', 
    category: 'Gem Trading', 
    excerpt: 'Most of a sapphire\'s value is decided before it is faceted. A look at how rough is evaluated in the Sri Lankan trade.',
    img: '/images/journal/2.jpg',
    content: scraped['reading-rough-sapphire']
  },
  { 
    id: 3, 
    title: 'Famous Sri Lankan gemstones: the island\'s most celebrated stones', 
    date: '27 June 2026', 
    category: 'Famous Gemstones', 
    excerpt: 'Ceylon gemstones are internationally celebrated, particularly for their exceptional blue sapphires and remarkable star corundum. Many of the world\'s largest and most famous sapphires of Sri Lankan origin now sit in royal collections and museums.',
    img: '/images/journal/3.png',
    content: scraped['ceylon-sapphire-and-the-worlds-great-jewels']
  },
  { 
    id: 4, 
    title: 'Inside the Pathe gem market', 
    date: '6 June 2026', 
    category: 'Pathe Market', 
    excerpt: 'Located in the heart of China Fort, Pathe Gem Market is one of Sri Lanka\'s best-known destinations for gemstone trading — where generations of merchants, miners and international buyers meet.',
    img: '/images/journal/4.png',
    content: scraped['the-pathe-gem-market']
  },
  { 
    id: 5, 
    title: 'Heat treatment explained, without the mythology', 
    date: '19 May 2026', 
    category: 'Gemstone Origins', 
    excerpt: 'What heating actually does to a sapphire, which treatments the trade accepts, and which it does not.',
    img: '/images/journal/5.jpg',
    content: scraped['heat-treatment-explained']
  },
  { 
    id: 6, 
    title: 'Two thousand years of Sri Lankan gem heritage', 
    date: '30 April 2026', 
    category: 'Gem Heritage', 
    excerpt: 'Sri Lanka, known internationally as Ceylon until 1972, has earned worldwide recognition for its remarkable wealth of gemstones and its exceptional variety of precious and semi-precious stones.',
    img: '/images/journal/6.png',
    content: scraped['sri-lankan-gem-heritage']
  }
];

fs.writeFileSync('src/data/articles.ts', 'export const articles = ' + JSON.stringify(articles, null, 2) + ';\n');
