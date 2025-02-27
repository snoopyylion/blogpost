"use client";

import { useEffect, useState } from "react";
import Ping from "./Ping";

const ViewCount = ({ id }: { id: string }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/get-views?id=${id}`);
        const data = await res.json();
        setViews(data.views || 0);
      } catch (err) {
        console.error("Failed to fetch views:", err);
      }
    };

    fetchViews();
  }, [id]);

  return <div className="view-container">
    <div className="absolute -top-2 -right-2">
        <Ping/>
    </div>
    <p className="view-text">
        <span className="font-black">Views:   { views}</span>
    </p>
    </div>;
};

export default ViewCount;
