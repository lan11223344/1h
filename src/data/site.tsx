import {
  Aperture,
  BookOpen,
  Boxes,
  Compass,
  Cpu,
  Database,
  Gamepad2,
  Gauge,
  Layers,
  LayoutDashboard,
  Music4,
  PenTool,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Type,
  Workflow,
} from "lucide-react";
import type { DisplayCardItem } from "@/components/ui/display-cards";
import * as React from "react";

/* ------------------------------------------------------------------ */
/* 基本信息                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "兰浩",
  initials: "LH",
  /** 面试时最有说服力的身份是真实身份，不是头衔 */
  role: "前端 / 全栈方向",
  /** 一句话说清现在在哪、在做什么 */
  headline: "杭州电子科技大学 · 大一在读",
  location: "中国 · 杭州",
  email: "2467505172@qq.com",
  tagline: "先把东西做出来，再谈做得好不好。",
  summary:
    "杭电大一新生，从高一开始自学 Web 开发。喜欢把想法真的跑起来 —— 这个网站就是我独立完成的第一个公开项目：从设计、写代码，到买域名、配 HTTPS、部署上线，整条链路自己走了一遍。",
  /** 真实数字：不吹履历，只摆可验证的事实 */
  stats: [
    { label: "在校年级", value: "大一" },
    { label: "自学时长", value: "3 年" },
    { label: "公开上线项目", value: "2" },
    { label: "技术栈", value: "TS" },
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/lan11223344" },
  { label: "邮箱", href: "mailto:2467505172@qq.com" },
];

/* ------------------------------------------------------------------ */
/* Hero 卡片堆（Display Cards 核心演示）                                */
/* ------------------------------------------------------------------ */

export const heroCards: DisplayCardItem[] = [
  {
    icon: <Sparkles className="size-4" />,
    title: "你正在看的",
    description:
      "lanhao.site —— 独立完成设计、编码与部署的个人站点。React + TypeScript + Tailwind，手写的卡片堆叠交互。",
    date: "2026",
    iconClassName:
      "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    titleClassName: "text-foreground",
  },
  {
    icon: <Gamepad2 className="size-4" />,
    title: "刚做出来的",
    description:
      "《看见雾》—— 情绪主题互动叙事网页游戏。6 种结局、雾与视野随选择实时变化，手绘 SVG 剪影立绘。在下方「作品」里可以直接开玩。",
    date: "新作",
    iconClassName:
      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: <Boxes className="size-4" />,
    title: "正在学",
    description:
      "把 C 语言和数据结构补扎实，同时在啃 React 生态与前端工程化，目标是把「会写页面」变成「会做系统」。",
    date: "本学期",
    iconClassName:
      "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: <Compass className="size-4" />,
    title: "想做的事",
    description:
      "加入一个真正做产品的团队，参与从需求到上线的完整流程，而不是只写被切好的静态页面。",
    date: "进行中",
    iconClassName:
      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
];

/* ------------------------------------------------------------------ */
/* 技能 —— 按真实熟练度分层，而不是堆关键词                              */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    icon: Terminal,
    title: "能独立上手",
    note: "写过完整项目，遇到问题能自己查明白",
    items: ["HTML / CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: PenTool,
    title: "能看懂会用",
    note: "跟着文档能跑起来，还没到独立造轮子",
    items: ["Vite", "Git", "shadcn/ui", "Figma", "Vercel / EdgeOne"],
  },
  {
    icon: BookOpen,
    title: "正在学",
    note: "课程或自学中，能写但不够熟练",
    items: ["C 语言", "数据结构", "Node.js", "Vue 3", "Python"],
  },
  {
    icon: Gauge,
    title: "想深入的方向",
    note: "还没系统学，但明确想往这边走",
    items: ["前端工程化", "性能优化", "交互动效", "可访问性", "全栈开发"],
  },
];

/* ------------------------------------------------------------------ */
/* 作品集 —— 只放真实做过的东西                                         */
/* ------------------------------------------------------------------ */

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  icon: React.ElementType;
  accent: string;
  metric: { value: string; label: string };
  href: string;
};

export const projects: Project[] = [
  {
    title: "《看见雾》互动叙事游戏",
    subtitle: "情绪主题 · 2D 叙事网页游戏",
    description:
      "一款关于情绪、视野与选择的互动叙事游戏：玩家在雾中做出选择，希望、信任等状态实时驱动视野收窄与雾的浓淡，共 6 种结局，含跨局结局收集系统。纯 Vanilla JS 状态机 + 手绘 SVG 剪影立绘，标题页与结局页与这个站点互相关联。",
    tags: ["Vanilla JS", "SVG", "叙事设计", "状态机"],
    year: "2026",
    icon: Gamepad2,
    accent: "hsl(200 74% 52%)",
    metric: { value: "6", label: "种结局" },
    href: "https://kanjianwu-d8gpq1gna68cd9ed7-1493314182.tcloudbaseapp.com/kanjianwu/",
  },
  {
    title: "lanhao.site 个人站点",
    subtitle: "你正在浏览的这个网站",
    description:
      "从零开始的第一个公开项目：自己排版设计、用 React + TypeScript 写实现、手写卡片堆叠动效，再走完域名、HTTPS、双平台部署的完整上线流程。",
    tags: ["React", "TypeScript", "Tailwind", "动效"],
    year: "2026",
    icon: LayoutDashboard,
    accent: "hsl(217 91% 60%)",
    metric: { value: "100%", label: "独立完成" },
    href: "https://lanhao.site",
  },
  {
    title: "课程作业合集",
    subtitle: "大一上学期的编程练习",
    description:
      "C 语言的基础练习与小项目：从控制台程序到简单的数据处理，包括把同学的 C++ 程序排查出编码错乱问题的过程。",
    tags: ["C 语言", "C++", "调试"],
    year: "2026",
    icon: Terminal,
    accent: "hsl(271 81% 56%)",
    metric: { value: "1 学期", label: "持续练习" },
    href: "#",
  },
  {
    title: "组件练习册",
    subtitle: "复刻常见交互组件",
    description:
      "按 UI 稿复刻导航栏、卡片列表、标签页等常见组件，重点抠键盘可访问性、focus 状态与响应式断点这些容易被跳过的细节。",
    tags: ["CSS", "响应式", "可访问性"],
    year: "2025",
    icon: Layers,
    accent: "hsl(189 94% 43%)",
    metric: { value: "10+", label: "组件" },
    href: "#",
  },
];

/* ------------------------------------------------------------------ */
/* 经历 —— 大一新生的真实时间线                                         */
/* ------------------------------------------------------------------ */

export const timeline = [
  {
    period: "2026 — 至今",
    title: "杭州电子科技大学 · 本科在读",
    description:
      "计算机相关专业大一。一边补数学与 C 语言这些基本功，一边把自学的 Web 开发往系统化方向推 —— 目标是不只会写页面，也懂底层怎么跑。",
    icon: BookOpen,
  },
  {
    period: "2023 — 2026",
    title: "高中阶段 · 自学 Web 开发",
    description:
      "从 HTML/CSS 起步，一路学到 React 与 TypeScript。没有系统课程，靠文档、开源项目和反复重写自己的练习项目往前走。",
    icon: Rocket,
  },
  {
    period: "2025",
    title: "第一次独立把东西做上线",
    description:
      "为了搞清楚「一个网站到底怎么才能被别人访问」，自己走完了从本地开发到域名解析、HTTPS 证书、多平台部署的全流程，也就是现在这个站点。",
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------ */
/* 关于我 —— 兴趣与状态                                                 */
/* ------------------------------------------------------------------ */

export const interests = [
  { icon: Gamepad2, label: "单机游戏", note: "偏爱叙事与沉浸感" },
  { icon: Music4, label: "电子音乐", note: "写代码时的背景音" },
  { icon: Cpu, label: "硬件折腾", note: "装机与性能调优" },
  { icon: Aperture, label: "折腾新工具", note: "什么火就试什么" },
];

export const values = [
  "先把东西做出来，再谈优化 —— 空想不如一次能跑的提交。",
  "界面是产品的一部分，不是最后贴上去的皮。",
  "不懂的技术先看文档和源码，不照抄结论。",
  "做完了不算完，能讲清楚为什么这么做才算。",
];

export const nav = [
  { label: "首页", href: "#home" },
  { label: "作品", href: "#work" },
  { label: "技能", href: "#skills" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

/* 保留导出，避免其他模块引用时报错 */
export { Compass, Database, Type, Workflow };
