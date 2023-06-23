import { Skeleton } from "@mui/material";

import React from "react";

export default function Skeletons({ times }) {
  const content = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className="mb-12 bg-gray-50" key={i}>
          <Skeleton variant="text" width={580} height={70} />
          <Skeleton variant="text" width={580} height={40} />
          <Skeleton variant="text" width={300} height={25} />
          <Skeleton variant="text" width={60} height={25} />
          <Skeleton variant="text" width={500} height={25} />
        </div>
      );
    });

  return content;
}
