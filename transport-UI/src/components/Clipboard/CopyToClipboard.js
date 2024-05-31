import React, { useState } from "react";
import { CopyIcon } from "@chakra-ui/icons";

const CopyToClipboard = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3500); // Reset copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div>
      {copied && (
        <span style={{ marginRight: "5px", color: "#5e5e5e" }}>Copied!</span>
      )}
      <CopyIcon onClick={handleCopy} style={{ cursor: "pointer" }} />
    </div>
  );
};

export default CopyToClipboard;
