import Image from "next/image";

export type CardProps = {
  handleClick: () => void;
  isFlipped: boolean;
  isMatched: boolean;
  content: string;
  contentSrc: string;
};

export default function Card({
  isFlipped,
  isMatched,
  content,
  contentSrc,
  handleClick,
}: CardProps) {
  // Card Aspect Ratio? https://www.reddit.com/r/midjourney/comments/10vbtri/aspect_ratio_of_standard_playing_cards/
  return (
    <button
      className="max-w-40 aspect-square relative group rounded outline-none"
      onClick={handleClick}
      disabled={isFlipped || isMatched}
    >
      {/* Front */}
      <div
        className={`w-full h-full bg-slate-200 absolute cursor-pointer -mt-1 -ml-1 group-hover:m-0 group-focus:m-0 transition-all ${
          isFlipped || isMatched ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      {/* Back */}
      <div className="w-full h-full bg-slate-400 grid place-items-center select-none">
        <Image
          src={contentSrc}
          alt={content}
          width={100}
          height={100}
          className="w-1/2 h-1/2"
        />
      </div>
    </button>
  );
}
