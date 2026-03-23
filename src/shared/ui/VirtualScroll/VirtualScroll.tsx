import { useState } from "react";

type VirtualScroll<T> = {
  data: T[];
  heightOfItem: number;
  heightOfContainer: number;
  marginBottom: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export function VirtualScroll<T>({
  data,
  heightOfItem,
  heightOfContainer,
  marginBottom,
  renderItem,
}: VirtualScroll<T>) {
  // ===Виртуальный скролл ===
  const [scrollTop, setScrollTop] = useState(0);

  // ===Введение констант=== (берутся из стилей)
  const itemHeight = heightOfItem + marginBottom; // Высота конкретного контейнер + gap между ними
  const containerHeight = heightOfContainer; // Высота всего блока транзакций
  // =========================

  // Расчёты частей необходимых для вирутального скролла
  const totalHeight = data.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  const start = Math.floor(scrollTop / itemHeight);
  const end = start + visibleCount;

  const visibleTransactions = data.slice(start, end);

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div style={{ height: totalHeight }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: `translateY(${start * itemHeight}px)`,
          }}
        >
          {visibleTransactions.map((item, index) => renderItem(item, start + index))}
        </div>
      </div>
    </div>
  );
}
