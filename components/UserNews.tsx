import { client } from '@/sanity/lib/client'
import { NEWS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { NewsTypeCard } from './StartupCard'

const UserNews = async ({ id }: { id: string }) => {
    const news = await client.fetch(NEWS_BY_AUTHOR_QUERY, { id });

    return (
        <>
            {news.length > 0 ? (
                news.map((newsItem: NewsTypeCard) => (
                    <StartupCard key={newsItem._id} post={newsItem} />
                ))
            ) : (
                <p className="no-result">No news found</p>
            )}
        </>
    );
}

export default UserNews;
