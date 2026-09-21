# 个人作品集网站 · Display Cards

以 **Display Cards**（堆叠卡片组，作者 user_Codehagen / Prism UI）为视觉核心构建的现代个人网站，基于 React + TypeScript + Vite + Tailwind CSS + shadcn/ui 设计令牌。

## 快速开始

```bash
npm install
npm run dev        # 开发服务器 → http://localhost:5173
npm run build      # 类型检查 + 生产构建
npm run preview    # 预览构建产物
npm run typecheck  # 仅类型检查
```

## 组件安装锚点

原组件可通过 shadcn CLI 安装（需 21st.dev 账号与 API Key）：

```bash
npx shadcn@latest add https://21st.dev/r/user_Codehagen/display-cards
```

本仓库中的实现位于 `src/components/ui/display-cards.tsx`，在保留原组件「堆叠 + hover 扇形展开 + 灰度点亮」设计语言的基础上做了工程化增强（见下）。

## Display Cards 组件

### 用法

```tsx
import DisplayCards from "@/components/ui/display-cards";
import { Sparkles } from "lucide-react";

const cards = [
  {
    icon: <Sparkles className="size-4" />,
    title: "Featured",
    description: "Discover amazing content",
    date: "Just now",
  },
  // ...更多卡片，数组越靠后层级越高
];

<DisplayCards cards={cards} spread={1} offsetY={0} grayscaleEffect />;
```

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cards` | `DisplayCardItem[]` | `[]` | 卡片数据，后者覆盖在前者之上；为空时不渲染 |
| `spread` | `number` | `1` | 层叠偏移系数，调大更松散、调小更紧凑 |
| `offsetY` | `number` | `0` | 整堆卡片在 Y 轴的额外偏移（px） |
| `grayscaleEffect` | `boolean` | `true` | 是否启用「灰度 → 彩色」点亮效果 |
| `accentColors` | `string[]` | 蓝/紫/青 | 强调色循环池，作用于图标光晕与底部装饰条 |
| `className` | `string` | — | 容器附加类名，其余属性透传到根节点 |

`DisplayCardItem` 字段：`icon` / `title` / `description` / `date`，以及 `className`、`iconClassName`、`titleClassName`、`descriptionClassName`、`dateClassName` / `dateClassName` 等逐元素样式覆盖。

### 相对原版的三点增强

1. **可访问性**：原版依赖 `hover`，键盘与触屏用户无法触达被遮挡的卡片。本实现给卡片加上 `tabIndex`、`focus-visible` 环和 `aria-label`，Tab 聚焦即可展开同层卡片。
2. **参数化**：原版把 `translate-x-12 / translate-y-10` 等偏移硬编码在每张卡片的 `className` 里，卡片数量一变就要手改。本实现用 `spread` + `offsetY` 由索引推导偏移，任意数量自适应。
3. **减少动效偏好**：在 `index.css` 中统一响应 `prefers-reduced-motion`，动效敏感用户自动降级为静态布局。

## 目录结构

```
src/
├─ App.tsx                        # 页面组装
├─ main.tsx                       # 入口
├─ index.css                      # Tailwind 层 + shadcn/ui 主题变量（亮/暗）
├─ data/
│  └─ site.tsx                    # 站点全部内容数据（改这里即可换文案）
├─ hooks/
│  ├─ use-theme.ts                # 明暗主题（同步 <html class="dark"> + localStorage）
│  └─ use-in-view.ts              # 滚动进入视口检测
├─ components/
│  ├─ reveal.tsx                  # 滚动淡入包装
│  ├─ section-heading.tsx         # 统一区块标题
│  ├─ sections/
│  │  ├─ navbar.tsx               # 顶栏 + 主题切换 + 移动端菜单
│  │  ├─ hero.tsx                 # 首屏（Display Cards 核心演示位）
│  │  ├─ work.tsx                 # 作品网格
│  │  ├─ skills.tsx               # 技能分组
│  │  ├─ experience.tsx           # 时间线 + 原则
│  │  └─ about-contact.tsx        # 关于 / 联系 / 页脚
│  └─ ui/
│     ├─ display-cards.tsx        # ★ 核心组件
│     ├─ badge.tsx
│     └─ button.tsx
```

## 设计说明

- **设计令牌**：全部颜色走 `hsl(var(--token))`，与 shadcn/ui 一致，改 `index.css` 里的 CSS 变量即可整体换肤。
- **主题**：`darkMode: ["class"]`。首屏渲染前用内联脚本读取 `localStorage` 消除闪白。
- **响应式**：`sm / md / lg` 三档断点；卡片堆在窄屏收紧内边距并改为居中，Grid 布局在移动端降为单列。
- **图标**：统一使用 `lucide-react`，尺寸通过 `[&_svg]:size-4` 与显式 `size-*` 控制。

## 兼容性说明（v0 / Lovable / Bolt / Cursor）

- **v0**：所有组件为独立 TSX 文件，无外部样式表依赖，单文件可直接粘贴 `display-cards.tsx` + `lib/utils.ts`。
- **Lovable / Bolt**：纯 Vite + React 结构，运行 `npm run dev` 即可；令牌定义在 `index.css`，与 Tailwind 配置一一对应。
- **Cursor**：全量 TypeScript 类型（`DisplayCardsProps`、`DisplayCardItem`、`Project` 等），严格模式通过，无 `any`。
- 唯一硬依赖是 `lucide-react` 与 `tailwind-merge` / `clsx`，均为 shadcn/ui 生态标配。

## 替换成你自己的内容

只需改 `src/data/site.tsx`：`profile`、`socials`、`heroCards`、`projects`、`timeline`、`skillGroups`。
头像位置当前用姓名首字母色块占位，替换 `profile.initials` 或直接换成 `<img>` 即可。

## 许可

组件设计参考 Display Cards by [user_Codehagen](https://21st.dev/@Codehagen) / Prism UI，MIT License。
