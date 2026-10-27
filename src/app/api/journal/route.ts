import { NextResponse } from 'next/server';
import { articles as initialArticles } from '@/data/articles';

// In-memory store for newly added articles during the session
let journalArticles = [...initialArticles];

export async function GET() {
  return NextResponse.json({ success: true, data: journalArticles });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, excerpt, content, img } = body;

    if (!title || !category || !excerpt) {
      return NextResponse.json(
        { success: false, error: 'Title, category and excerpt are required' },
        { status: 400 }
      );
    }

    const newArticle = {
      id: journalArticles.length + 1,
      title: title.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: category.trim(),
      excerpt: excerpt.trim(),
      img: img || '/images/hero-bg-stunning.jpg',
      content: content?.trim() || excerpt.trim(),
    };

    journalArticles = [newArticle, ...journalArticles];

    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding journal article:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to add article' },
      { status: 500 }
    );
  }
}
