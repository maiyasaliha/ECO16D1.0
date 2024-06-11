import React from "react";

const LinkRenderer = (params) => {
  let hostname = '';

  try {
    const url = new URL(params.value);
    hostname = url.hostname;
  } catch (error) {
    console.error('Invalid URL:', params.value);
  }

  return (
    <a href={params.value} target="_blank">
      {hostname}
    </a>
  );
};

export default LinkRenderer;
