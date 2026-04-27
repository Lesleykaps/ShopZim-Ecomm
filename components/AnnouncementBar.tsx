export default function AnnouncementBar() {
  const text =
    "🚚 Free delivery on orders over $50  ·  Use code WELCOME10 for 10% off your first order";
  // Two copies (one visible, one trailing) is required for a seamless
  // CSS translateX(-50%) loop. The animation hides the seam so it reads
  // as a single continuous strip.
  return (
    <div className="bg-ink text-white text-xs md:text-[13px] overflow-hidden py-2">
      <div className="flex whitespace-nowrap w-max animate-marquee">
        <span className="px-12">{text}</span>
        <span className="px-12" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
