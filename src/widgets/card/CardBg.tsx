import DottedMap from "@setkernel/dotted-map-next";

export const CardBg = () => {
  const map = new DottedMap({ height: 60, grid: "diagonal" });

  const svgString = map.getSVG({
    shape: "circle",
    radius: 0.16,
    backgroundColor: "transparent",
    color: "rgba(200, 200, 205, 0.35)",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.6,
        pointerEvents: "none",
      }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};
