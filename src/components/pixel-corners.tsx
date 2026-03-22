import { pixelCornerClasses } from "@/game-helpers";

export default function PixelCorners() {
  return (
    <>
      {pixelCornerClasses.map((className) => (
        <div className={className} key={className} />
      ))}
    </>
  );
}
