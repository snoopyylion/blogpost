"use client";

import { useEffect, useState } from "react";

const View = ({ id }: { id: string }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateViews = async () => {
      try {
        const res = await fetch("/api/update-views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) throw new Error("Failed to update views");
      } catch (err) {
        setError(err.message);
        console.error("Failed to update views:", err);
      }
    };

    updateViews();
  }, [id]);

  return error ? <p className="text-red-500">Error updating views.</p> : null;
};

export default View;
