"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DisplayCards
 * ------------------------------------------------------------------
 * 堆叠式卡片组：卡片通过 CSS Grid 叠放在同一格（grid-area: stack），
 * 沿右下方向逐层偏移形成"牌堆"层叠感。
 *
 * 交互（点击换位）：
 * - 点击最前面的卡片 → 它沉到牌堆最底，下一张浮到最前（整摞循环轮换）
 * - 点击后排露出的卡片 → 直接把它抽到最前
 * - 键盘：卡片可 Tab 聚焦，Enter / Space 执行同样的动作
 *
 * 为什么不做 hover 展开：
 * :hover / :focus-visible 在触屏与国产浏览器内核上的行为并不一致
 * （点按后 hover 残留、focus-visible 不触发等），而"点一下换一张"
 * 是完全由 JS 状态驱动的显式动作，在任何设备上表现都相同。
 * 偏移量一律用 JS 算好后写进 inline transform，不依赖任何 CSS 计算技巧。
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
  /** 卡片数据数组，按顺序渲染（默认最后一张在最前面） */
  cards?: DisplayCardItem[];
  /** 层叠偏移的整体缩放系数 */
  spread?: number;
  /** 卡片堆整体在 Y 轴的额外偏移（px），用于不同版心对齐 */
  offsetY?: number;
  /** 是否启用「后排灰度 → 前排彩色」的点亮效果 */
  grayscaleEffect?: boolean;
  /** 卡片之间的视觉层级循环使用的强调色（HSL 字符串） */
  accentColors?: string[];
}

const DEFAULT_ACCENTS = [
  "hsl(217 91% 60%)", // blue-500
  "hsl(271 81% 56%)", // purple-500
  "hsl(189 94% 43%)", // cyan-600
];

/** 换位动画的节奏：先"抽出"，再"落位" */
const LIFT_MS = 220;
const SETTLE_MS = 520;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function sameOrder(a: number[], b: number[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/**
 * 单张卡片的位移样式。
 * depth 决定它在牌堆里的层数（0 = 最底层），全部由 JS 算好，
 * 偏移单位用 CSS 变量 --stack-x / --stack-y 承载，
 * 这样断点差异只写在容器的类名上，组件本身不写死任何尺寸。
 */
function cardStackStyle(
  depth: number,
  { offsetY, spread, lifted }: { offsetY: number; spread: number; lifted: boolean }
): React.CSSProperties {
  // 抽出中的卡片多探出一层，视觉上像被"捏"起来
  const d = depth + (lifted ? 1 : 0);
  return {
    gridArea: "stack",
    transform: `translate3d(calc(${d} * var(--stack-x) * ${spread}), calc(${d} * var(--stack-y) * ${spread} + ${offsetY}px + var(--lift, 0px)), 0)`,
    // 抽出中的卡片临时提到最上层，落位后交还给 depth 决定的层级
    zIndex: lifted ? 100 : depth + 1,
    transitionProperty: "transform, filter, opacity",
    transitionDuration: `${SETTLE_MS}ms`,
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
    const total = cards.length;

    /** 牌堆顺序，数组本身是「从最底层到最前面」，元素值是 cards 的原始索引 */
    const [order, setOrder] = React.useState<number[]>(() =>
      cards.map((_, i) => i)
    );
    /** 正在被"抽出"的那张卡片（原始索引），它的位移与层级会临时抬高 */
    const [lifted, setLifted] = React.useState<number | null>(null);
    const timerRef = React.useRef<number | null>(null);

    // 卡片数量变化时重建顺序（防御性处理，正常渲染不会发生）
    React.useEffect(() => {
      setOrder((prev) =>
        prev.length === total && prev.every((v) => v >= 0 && v < total)
          ? prev
          : Array.from({ length: total }, (_, i) => i)
      );
    }, [total]);

    React.useEffect(
      () => () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      },
      []
    );

    const depthOf = React.useCallback(
      (index: number) => {
        const pos = order.indexOf(index);
        return pos === -1 ? index : pos;
      },
      [order]
    );

    /**
     * 执行一次换位：先让 liftIndex 这张"抽出"，动画过半后再真正重排。
     * 两段式是为了让观者看清是哪一张在动——直接瞬移会让轮换显得莫名其妙。
     */
    const reorder = React.useCallback(
      (target: number[], liftIndex: number) => {
        if (total < 2) return;
        if (timerRef.current) return; // 动画进行中，忽略连点，避免序列错乱
        if (sameOrder(target, order)) return;

        if (prefersReducedMotion()) {
          setOrder(target);
          return;
        }

        setLifted(liftIndex);
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null;
          setOrder(target);
          setLifted(null);
        }, LIFT_MS);
      },
      [order, total]
    );

    /** 下一张：最前的一张沉到底，后面一张浮上来 */
    const advance = React.useCallback(() => {
      if (total < 2) return;
      const front = order[order.length - 1];
      reorder([front, ...order.slice(0, -1)], front);
    }, [order, reorder, total]);

    /** 上一张：最底的一张翻到最前 */
    const retreat = React.useCallback(() => {
      if (total < 2) return;
      const back = order[0];
      reorder([...order.slice(1), back], back);
    }, [order, reorder, total]);

    /** 把指定位置（按当前堆叠顺序）的卡片抽到最前，其余保持循环顺序 */
    const promote = React.useCallback(
      (pos: number) => {
        if (total < 2) return;
        const picked = order[pos];
        reorder(
          [...order.slice(pos + 1), ...order.slice(0, pos + 1)],
          picked
        );
      },
      [order, reorder, total]
    );

    if (total === 0) return null;

    return (
      <div
        ref={ref}
        data-slot="display-cards"
        className={cn(
          "card-stack grid w-full max-w-3xl px-1 py-4 sm:px-4 sm:py-8",
          "grid-cols-1 [grid-template-areas:'stack']",
          // 层叠偏移单位：移动端更紧凑，避免后排卡片被推出视口
          "[--stack-x:1rem] [--stack-y:0.8rem] sm:[--stack-x:2.2rem] sm:[--stack-y:1.8rem] lg:[--stack-x:3rem] lg:[--stack-y:2.5rem]",
          // 预留位移所需的空间：卡片高度 + 最大偏移，避免溢出到下一段内容
          "min-h-[15.5rem] items-start justify-items-start sm:min-h-[19rem] lg:min-h-[22rem]",
          className
        )}
        {...props}
      >
        {cards.map((card, index) => {
          const depth = depthOf(index);
          const isFront = depth === total - 1;
          const accent = accentColors[index % accentColors.length];
          const isBack = grayscaleEffect && !isFront;

          return (
            <article
              key={`${card.title ?? "card"}-${index}`}
              role="button"
              tabIndex={0}
              data-depth={depth}
              aria-label={
                isFront
                  ? `${card.title ?? "卡片"}，点击切换到下一张`
                  : `${card.title ?? "卡片"}，点击提到最前`
              }
              onClick={(event) => {
                event.stopPropagation();
                if (isFront) advance();
                else promote(depth);
              }}
              onKeyDown={(event) => {
                const { key } = event;
                if (key === "Enter" || key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  if (isFront) advance();
                  else promote(depth);
                  return;
                }
                // 方向键直接翻牌堆，不必先聚焦到某一张
                if (key === "ArrowRight" || key === "ArrowDown") {
                  event.preventDefault();
                  advance();
                } else if (key === "ArrowLeft" || key === "ArrowUp") {
                  event.preventDefault();
                  retreat();
                }
              }}
              style={{
                ...cardStackStyle(depth, {
                  offsetY,
                  spread,
                  lifted: lifted === index,
                }),
                ...(accent
                  ? ({ "--accent-color": accent } as React.CSSProperties)
                  : {}),
              }}
              className={cn(
                // 基础卡片外观（shadcn/ui tokens）
                // 宽度用 min() 而非固定值：窄屏时自动收缩，永不超过容器
                "relative flex h-[11.5rem] w-[min(100%,18rem)] cursor-pointer flex-col justify-between",
                "overflow-hidden rounded-xl border bg-card p-5 text-card-foreground",
                "shadow-[0_-1px_0_0_hsl(var(--border))_inset,0_0_0_1px_hsl(var(--border)),0_8px_30px_-12px_rgb(0_0_0_/_0.35)]",
                "outline-none ring-offset-background sm:h-[13.5rem] sm:w-[min(100%,22rem)]",
                "card-stack-card",
                isBack && "grayscale hover:grayscale-0",
                // 键盘聚焦时给一圈焦点环：卡片是真正的操作对象
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
                      // 说明文案在小屏上字号略降，避免三行以上把卡片撑爆
                      "text-[13px] leading-relaxed text-muted-foreground sm:text-sm",
                      card.descriptionClassName
                    )}
                  >
                    {card.description}
                  </p>
                ) : null}
              </div>

              {/* 强调色装饰条：跟随卡片自身颜色 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent-color), transparent)",
                }}
              />

              {/* 装饰层：光晕统一收进裁切容器，
                  避免负偏移把卡片撑出 scrollWidth，触发移动端横向滚动 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
              >
                {isFront ? (
                  <span
                    className="absolute -right-16 -top-16 size-40 rounded-full opacity-[0.12] blur-2xl"
                    style={{ background: "var(--accent-color)" }}
                  />
                ) : null}
              </span>
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
