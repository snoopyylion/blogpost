"use client";

// import { useEffect, useState } from "react";
import useSWR from "swr";
import Ping from "./Ping";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ViewCount = ({ id }: { id: string }) => {

  const { data, error } = useSWR(`/api/get-views?id=${id}`, fetcher, { refreshInterval: 1000 });
  
  if (error) return <p className="text-red-500">Failed to load views</p>;
  
  // const [views, setViews] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchViews = async () => {
  //     try {
  //       const res = await fetch(`/api/get-views?id=${id}`);
  //       const data = await res.json();
  //       setViews(data.views);
  //     } catch (err) {
  //       console.error("Failed to fetch views:", err);
  //     }
  //   };

  //   fetchViews();
  // }, [id]);

  return <div className="view-container">
    <div className="absolute -top-2 -right-2">
        <Ping/>
    </div>
    <p className="view-text">
    <span className="font-black">Views: {data?.views}</span>
    </p>
    </div>;
};

export default ViewCount;
