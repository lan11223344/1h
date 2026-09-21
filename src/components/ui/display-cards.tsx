"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DisplayCards
 * ------------------------------------------------------------------
 * 堆叠式卡片组：三张卡片通过 CSS Grid 叠放在同一格（grid-area: stack），
 * 默认逐层向右下偏移形成"牌堆"层叠感；hover 时前排卡片抬起、后层卡片
 * 由灰度恢复彩色并移除遮罩，形成"扇形展开 + 点亮"的交互。
 *
 * 作者风格参考：user_Codehagen / Prism UI
 * 安装锚点：npx shadcn@latest add https://21st.dev/r/user_Codehagen/display-cards
 *
 * 设计要点：
 * - 容器为响应式 Grid，所有卡片共用同一 grid-area，因此天然重叠。
 * - 通过 --stack-index 自定义属性驱动偏移量，便于按数量自适应。
 * - 触屏设备没有 hover：用 `group-focus-within` + `active` 兜底，
 *   保证键盘 Tab 与点击同样能展开卡片，避免"内容只存在于 hover 里"。
 */

export type DisplayCardItem = {
  /** 卡片图标，建议使用 lucide-react 图标节点 */
  icon?: React.ReactNode;
  /** 卡片主标题 */
  title?: string;
  /** 卡片描述文案 */
  description?: string;
  /** 右上角时间 / 元信息 */
  date?: string;
  /** 卡片根节点附加类名（用于自定义位移、遮罩、动画） */
  className?: string;
  /** 图标容器附加类名 */
  iconClassName?: string;
  /** 标题附加类名 */
  titleClassName?: string;
  /** 描述附加类名 */
  descriptionClassName?: string;
  /** 时间戳附加类名 */
  dateClassName?: string;
};

export interface DisplayCardsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 卡片数据数组，按顺序渲染（后者覆盖在前者之上） */
  cards?: DisplayCardItem[];
  /** 整个卡片组在 hover / focus 时的层叠偏移缩放系数 */
  spread?: number;
  /** 卡片堆整体在 Y 轴的额外偏移（px），用于不同版心对齐 */
  offsetY?: number;
  /** 是否启用灰度 → 彩色的点亮效果 */
  grayscaleEffect?: boolean;
  /** 卡片之间的视觉层级循环使用的强调色（HSL 字符串） */
  accentColors?: string[];
}

const DEFAULT_ACCENTS = [
  "hsl(217 91% 60%)", // blue-500
  "hsl(271 81% 56%)", // purple-500
  "hsl(189 94% 43%)", // cyan-600
];

/** 为每张卡片生成基于索引的层叠偏移与遮罩样式 */
function cardStackStyle(
  index: number,
  spread: number,
  offsetY: number
): React.CSSProperties {
  // 索引从 0 开始，0 为最底层（排在最前，视觉上被后续卡片盖住）
  const depth = index;
  return {
    gridArea: "stack",
    // 层叠基准位移：越靠后的卡片越向右下偏移
    transform: `translate3d(calc(${depth} * 3rem * ${spread}), calc(${
      depth * 2.5 * spread
    }rem + ${offsetY}px), 0)`,
    zIndex: depth + 1,
    transitionProperty: "transform, opacity, filter",
    transitionDuration: "500ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  };
}

const DisplayCards = React.forwardRef<HTMLDivElement, DisplayCardsProps>(
  (
    {
      className,
      cards = [],
      spread = 1,
      offsetY = 0,
      grayscaleEffect = true,
      accentColors = DEFAULT_ACCENTS,
      ...props
    },
    ref
  ) => {
    if (cards.length === 0) return null;

    const total = cards.length;

    return (
      <div
        ref={ref}
        data-slot="display-cards"
        className={cn(
          // 响应式容器：小屏收紧内边距，大屏给出足够呼吸感
          "group/stack grid w-full max-w-3xl px-2 py-6 sm:px-6 sm:py-10",
          "grid-cols-1 [grid-template-areas:'stack']",
          // 为扇形展开预留垂直空间
          "[--card-spread:1] min-h-[20rem] items-start justify-items-start sm:min-h-[24rem]",
          className
        )}
        {...props}
      >
        {cards.map((card, index) => {
          const isFront = index === total - 1;
          const accent = accentColors[index % accentColors.length];
          const isBack =
            grayscaleEffect && index < total - 1; /* 非最前层默认灰度 */

          return (
            <article
              key={`${card.title ?? "card"}-${index}`}
              tabIndex={isFront ? 0 : -1}
              aria-label={card.title}
              style={{
                ...cardStackStyle(index, spread, offsetY),
                ...(accent ? ({ "--accent-color": accent } as React.CSSProperties) : {}),
              }}
              className={cn(
                // 基础卡片外观（shadcn/ui tokens）
                "relative flex h-[13rem] w-[19rem] flex-col justify-between",
                "overflow-hidden rounded-xl border bg-card p-5 text-card-foreground",
                "shadow-[0_-1px_0_0_hsl(var(--border))_inset,0_0_0_1px_hsl(var(--border)),0_8px_30px_-12px_rgb(0_0_0_/_0.35)]",
                "outline-none ring-offset-background sm:h-[14rem] sm:w-[22rem]",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                // 抬升与聚焦
                "hover:-translate-y-2 focus-visible:-translate-y-2",
                // 灰度层叠效果
                isBack && "grayscale hover:grayscale-0",
                card.className
              )}
            >
              {/* 顶部图标与时间 */}
              <header className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg border bg-secondary text-secondary-foreground",
                    card.iconClassName
                  )}
                >
                  {card.icon}
                </div>

                {card.date ? (
                  <time
                    className={cn(
                      "shrink-0 pt-1 text-xs tabular-nums text-muted-foreground",
                      card.dateClassName
                    )}
                  >
                    {card.date}
                  </time>
                ) : null}
              </header>

              {/* 正文 */}
              <div className="space-y-1.5 pr-1">
                {card.title ? (
                  <h3
                    className={cn(
                      "text-base font-semibold leading-tight tracking-tight",
                      card.titleClassName
                    )}
                  >
                    {card.title}
                  </h3>
                ) : null}

                {card.description ? (
                  <p
                    className={cn(
                      "text-sm leading-relaxed text-muted-foreground",
                      card.descriptionClassName
                    )}
                  >
                    {card.description}
                  </p>
                ) : null}
              </div>

              {/* 强调色装饰条：跟随层级颜色循环 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent-color), transparent)",
                }}
              />

              {/* 前层卡片的柔光，增强堆叠层次 */}
              {isFront ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-[0.12] blur-2xl"
                  style={{ background: "var(--accent-color)" }}
                />
              ) : null}
            </article>
          );
        })}
      </div>
    );
  }
);

DisplayCards.displayName = "DisplayCards";

export { DisplayCards };
export default DisplayCards;
