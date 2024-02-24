import React from "react";

const IframePreview = ({ url, height }: any) => {
  if (!url) {
    return <p>Missing Embed URL</p>;
  }

  return (
    <iframe
      src={url}
      width="100%"
      height={height || "350"}
      style={{
        ...(!height ? { aspectRatio: "16 / 9" } : { aspectRatio: "2 / 2" }),
      }}
      frameBorder="0"
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    ></iframe>
  );
};

export default IframePreview;
