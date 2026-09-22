"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DisplayCards
 * ------------------------------------------------------------------
 * 堆叠式卡片组：三张卡片通过 CSS Grid 叠放在同一格（grid-area: stack），
 * 默认逐层向右下偏移形成"牌堆"层叠感；展开时当前卡片抬起、后层卡片
 * 由灰度恢复彩色，形成"扇形展开 + 点亮"的效果。
 *
 * 作者风格参考：user_Codehagen / Prism UI
 * 安装锚点：npx shadcn@latest add https://21st.dev/r/user_Codehagen/display-cards
 *
 * 设计要点：
 * - 容器为响应式 Grid，所有卡片共用同一 grid-area，因此天然重叠。
 * - 偏移量全部走 CSS 变量（--stack-x / --stack-y / --lift），
 *   断点差异在类名里声明，组件本身不写死任何尺寸。
 * - 展开系数走 CSS 变量 --spread，而不是 JS 常量：
 *   这样 hover / focus-visible（纯 CSS）与点击（JS 状态）能共用同一条通路，
 *   三种输入方式都能真正拉开卡片间距——只改灰度不改变位移是不成立的。
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
  /** 整个卡片组在展开时的层叠偏移缩放系数 */
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

/**
 * 层叠偏移量：完全由 CSS 变量承载，随视口宽度自适应。
 * 移动端卡片本就接近满宽，若沿用桌面端的 3rem 偏移，后排卡片会被推出屏幕外，
 * 所以小屏用更小的单位（1rem / 0.8rem），断点切换写在容器的类名上。
 *
 * 展开系数同样用变量 --spread 承载（默认 1），
 * 由容器的 hover / focus-visible / data-expanded 三条规则统一覆写，
 * 因此鼠标悬停、Tab 聚焦、点击展开都会得到相同的扇形位移。
 */
const STACK_UNIT_X = "var(--stack-x)";
const STACK_UNIT_Y = "var(--stack-y)";

/** 为每张卡片生成基于索引的层叠偏移样式 */
function cardStackStyle(index: number, offsetY: number): React.CSSProperties {
  // 索引从 0 开始，0 为最底层（视觉上被后续卡片盖住）
  const depth = index;
  return {
    gridArea: "stack",
    // 用 CSS 变量承载偏移；--spread 决定展开程度，--lift 实现"抬起"
    transform: `translate3d(calc(${depth} * ${STACK_UNIT_X} * var(--spread, 1)), calc(${depth} * ${STACK_UNIT_Y} * var(--spread, 1) + ${offsetY}px + var(--lift, 0px)), 0)`,
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
    /*
      交互三条通路，最终都作用于同一个 --spread 变量：
      1) 鼠标：容器 :hover → --spread 放大
      2) 键盘：容器 :focus-within（Tab 进入）→ --spread 放大
      3) 触屏：点击切换 expanded 状态 → data-expanded 属性驱动 --spread 放大
      只改灰度、不改变位移的话，后排卡片仍然被前排完全盖住，
      所以"展开"必须是真实的几何位移，而不是只去掉滤镜。
    */
    const [expanded, setExpanded] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // 合并外部 ref 与内部 ref：容器既可能要转发给父级，也要能自己读焦点
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const toggleExpanded = () => setExpanded((v) => !v);

    /*
      点击 / 触屏收起后必须主动失焦：
      容器带 tabIndex=0，浏览器点击时会把焦点给它，
      于是 :focus-within 继续命中，--spread 一直被撑开，看起来就是"收不回去"。
      键盘操作不走这里——焦点要保留，用户才能继续按 Enter/Space。
    */
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const next = !expanded;
      setExpanded(next);
      if (!next && event.detail > 0) {
        // detail > 0 表示真实指针点击（键盘触发的 click 其 detail 为 0）
        containerRef.current?.blur();
      }
    };

    // 展开系数：展开后比收起时明显拉开，形成扇形
    const expandedSpread = spread * 2.1;

    if (cards.length === 0) return null;

    const total = cards.length;

    return (
      <div
        ref={setRefs}
        data-slot="display-cards"
        data-expanded={expanded || undefined}
        role="button"
        tabIndex={0}
        aria-pressed={expanded}
        aria-label={expanded ? "收起卡片堆" : "展开卡片堆"}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        style={
          {
            // 这两个是"配置值"，只声明一次，永远不被状态覆盖；
            // 真正参与展开/收起切换的是 --spread，规则写在 index.css 的 .card-stack 段。
            "--spread-closed": spread,
            "--spread-open": expandedSpread,
          } as React.CSSProperties
        }
        className={cn(
          // 响应式容器：移动端收紧内边距，避免卡片贴边；宽屏给出呼吸感
          "card-stack group/stack grid w-full max-w-3xl cursor-pointer px-1 py-4 sm:px-4 sm:py-8",
          "grid-cols-1 [grid-template-areas:'stack']",
          // 层叠偏移单位：移动端更紧凑，避免后排卡片被推出视口
          "[--stack-x:1rem] [--stack-y:0.8rem] sm:[--stack-x:2.2rem] sm:[--stack-y:1.8rem] lg:[--stack-x:3rem] lg:[--stack-y:2.5rem]",
          // 预留展开所需的垂直空间：卡片高度 + 最大 Y 向偏移
          "min-h-[15.5rem] items-start justify-items-start sm:min-h-[19rem] lg:min-h-[22rem]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl",
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
              aria-label={card.title}
              style={{
                ...cardStackStyle(index, offsetY),
                ...(accent ? ({ "--accent-color": accent } as React.CSSProperties) : {}),
              }}
              className={cn(
                // 基础卡片外观（shadcn/ui tokens）
                // 宽度用 min() 而非固定值：窄屏时自动收缩，永不超过容器
                "relative flex h-[11.5rem] w-[min(100%,18rem)] flex-col justify-between",
                "overflow-hidden rounded-xl border bg-card p-5 text-card-foreground",
                "shadow-[0_-1px_0_0_hsl(var(--border))_inset,0_0_0_1px_hsl(var(--border)),0_8px_30px_-12px_rgb(0_0_0_/_0.35)]",
                "outline-none ring-offset-background sm:h-[13.5rem] sm:w-[min(100%,22rem)]",
                // 抬起：改 --lift 而不是 translate 工具类，避免覆盖 inline transform
                "transition-[filter,box-shadow]",
                // 灰度：收起时靠后的卡片去色；容器 hover / 聚焦 / 展开时统一恢复彩色。
                // 这里用容器级状态（而非卡片自身 hover），才能一次点亮整摞卡片。
                isBack && "grayscale",
                isBack &&
                  "group-hover/stack:grayscale-0 group-focus-within/stack:grayscale-0",
                isBack && "group-data-[expanded]/stack:grayscale-0",
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

              {/* 强调色装饰条：跟随层级颜色循环 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent-color), transparent)",
                }}
              />

              {/* 装饰层：统一收进裁切容器。
                  光晕原本用负偏移顶出卡片外，虽然 overflow-hidden 能把它裁掉、
                  不产生滚动条，但会让卡片 scrollWidth 大于 clientWidth，
                  在移动端容易触发误判的横向滚动。改为由父级精确裁切。 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
              >
                {/* 前层卡片的柔光，增强堆叠层次 */}
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
