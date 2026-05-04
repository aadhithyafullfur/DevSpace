import { useState, useEffect } from "react";

interface TypingAnimationProps {
  lines: string[];
  speed?: number;
  startDelay?: number;
  className?: string;
}

export const TypingAnimation = ({
  lines,
  speed = 30,
  startDelay = 500,
  className = "",
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLineIndex < lines.length) {
        const currentLine = lines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          setDisplayedText((prev) => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          // Move to next line
          if (currentLineIndex < lines.length - 1) {
            setDisplayedText((prev) => prev + "\n");
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          } else {
            setIsComplete(true);
          }
        }
      }
    }, currentLineIndex === 0 && currentCharIndex === 0 ? startDelay : speed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, lines, speed, startDelay]);

  return (
    <div className={className}>
      <pre className="whitespace-pre-wrap">
        {displayedText}
        {!isComplete && (
          <span className="inline-block w-[2px] h-[1em] bg-current ml-[1px] animate-pulse" />
        )}
      </pre>
    </div>
  );
};
