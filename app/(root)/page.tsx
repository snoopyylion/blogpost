import SearchForm from "../../components/SearchForm";
import StartupCard, { NewsTypeCard} from "@/components/StartupCard";
import { newsQuery } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {


  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();


  const { data: posts } = await sanityFetch({ 
    query: newsQuery, 
    params, 
    options: { cache: "no-store" }  // Force fresh fetch
  });
  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: { _id:1, name: 'Snoopy' },
  //   description: "This is a description",
  //   image: "https://i.guim.co.uk/img/media/c9ee78b14adaa835b270b1fd7b3196976c4b9c4e/0_167_5000_3000/master/5000.jpg?width=1900&dpr=1&s=none&crop=none",
  //   category: "Robots",
  //   title: "We Robots",
  //  }];

  return (
    <>
      <section className="pink_container">
        <div className="">
          <h1 className="heading">
            AI-Powered News Verification <br /> for a Truthful World
          </h1>
          <p className="sub-heading !max-w-3xl">
            Cutting through misinformation with AI-driven analysis. <br />
            Get real-time verification on trending news, ensuring credibility and trust.
          </p>
          <SearchForm query={query}/>
        </div>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'General News'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
              posts.map((post: NewsTypeCard) =>(
                <StartupCard key={post?._id} post={post}/>
              ))
            ) : (
              <p className="no-results">No News found</p>
            )
          }

        </ul>

      </section>

      <SanityLive/>
    </>
  );
}
