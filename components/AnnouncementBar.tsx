export default function AnnouncementBar() {
  const text =
    "🚚 Free delivery on orders over $50  ·  Use code WELCOME10 for 10% off your first order";
  return (
    <div className="bg-ink text-white text-xs md:text-[13px] overflow-hidden">
      <div className="hidden md:flex justify-center py-2 px-4">
        <span>{text}</span>
      </div>
      <div className="md:hidden flex whitespace-nowrap py-2">
        <div className="flex animate-marquee gap-12 pl-4">
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
