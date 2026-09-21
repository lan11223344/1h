# 部署与维护指南

本文档回答两件事：**怎么让别人访问到这个网站**，以及**之后怎么长期维护它**。

---

## 一、先理解现状

现在网站的样子是：

```
你的电脑  →  npm run dev  →  http://127.0.0.1:5173   ← 只有你自己能打开
```

`127.0.0.1` 是「本机回环地址」，它只在你这台电脑内部有效。别人在浏览器里输这个地址，访问的是**他自己**的电脑，不是你的。

要让他人访问，本质只有一件事：**把构建产物放到一台 24 小时联网的服务器上，并拿到一个公网域名**。有两种做法：

| 做法 | 别人能看到吗 | 适合场景 |
| --- | --- | --- |
| A. 本机当服务器（临时分享） | 能，但仅限同一 WiFi，且你关机就断 | 给同事/朋友临时看一眼 |
| B. 部署到公网托管平台 | 能，任何人随时可访问 | **推荐**，做正式个人主页 |

---

## 二、做法 A：临时分享（5 分钟，仅同一网络）

```bash
npm run build                      # 先构建出 dist/
npm run preview -- --host 0.0.0.0  # 暴露到局域网
```

然后查你的局域网 IP：

```powershell
ipconfig | Select-String "IPv4"
```

把 `http://192.168.x.x:4173` 发给对方，**必须在同一个 WiFi/路由器下**，且 Windows 防火墙可能弹窗要你允许。

> 缺点：你关电脑就断、换个网络地址就变、无法自定义域名。只适合临时演示。

---

## 三、做法 B：公网部署（推荐）

项目已经预置好三个平台的配置文件，**开箱即可部署**：

- `vercel.json` —— Vercel（已配 SPA 回退 + 静态资源长缓存）
- `netlify.toml` —— Netlify（同上）
- `.github/workflows/deploy.yml` —— GitHub Pages（含自动类型检查 + 子路径处理）

### 方案对比

| 平台 | 免费额度 | 自定义域名 | 国内访问速度 | 上手难度 |
| --- | --- | --- | --- | --- |
| **Vercel** | 个人项目免费 | 支持，免 HTTPS | 一般，偶有波动 | ⭐ 最简单 |
| **Netlify** | 100GB/月带宽 | 支持，免 HTTPS | 一般 | ⭐ 简单 |
| **Cloudflare Pages** | 无限请求 | 支持 | 相对较好 | ⭐⭐ 稍复杂 |
| **GitHub Pages** | 免费 | 支持 | 一般 | ⭐⭐ 需配 Actions |

**如果你主要给国内的人看**，还有一个选择：腾讯云 EdgeOne Pages / 阿里云 OSS + CDN。国内节点访问快很多，但**自定义域名需要备案**（约 2–3 周）。不备案的话用平台自带的默认域名也能访问，只是不够好看。

### 步骤 1：把代码推到 GitHub

```bash
git init
git add .
git commit -m "feat: 个人作品集网站"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

> `package.json` 里已经配了 `build` 脚本，`.gitignore` 会排除 `node_modules` 和 `dist`，不用手动清理。

### 步骤 2A：部署到 Vercel（最省事）

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点 **Add New → Project**，选中刚推的仓库
3. 配置会被自动识别（Vite 框架），**直接点 Deploy**
4. 约 1 分钟后拿到 `https://<项目名>.vercel.app` —— 这个链接就可以发给任何人了

以后每次 `git push`，Vercel 会自动重新构建并上线。不同分支还会生成独立的预览链接。

### 步骤 2B：部署到 Netlify

1. 打开 [netlify.com](https://netlify.com)，GitHub 登录
2. **Add new site → Import an existing project**，选仓库
3. 构建命令 `npm run build`、发布目录 `dist`（`netlify.toml` 里已写好，通常自动填充）
4. 点 Deploy

### 步骤 2C：部署到 GitHub Pages

1. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**
2. 推送到 `main` 分支后，Actions 自动跑构建并部署
3. 地址是 `https://<用户名>.github.io/<仓库名>/`

> ⚠️ 这个子路径场景必须给构建注入 `BASE_PATH=/<仓库名>/`。
> 工作流里已经用表达式自动处理了；如果你改成用户主页仓库（`<用户名>.github.io`）或绑自定义域名，表达式会自动留空，无需手动改。

### 步骤 3：绑自定义域名（可选但建议）

1. 买域名：Namecheap / Cloudflare Registrar / 腾讯云（`.com` 约 ¥60–80/年，`.dev` 稍贵）
2. 在部署平台的 Domains 设置里添加该域名
3. 按提示到域名商后台加 DNS 记录（通常是一条 `A` 记录或 `CNAME`）
4. 等 5 分钟到几小时生效，平台会自动签发 HTTPS 证书

**域名要放在国内服务器上才需要备案**；放在 Vercel / Netlify / Cloudflare 的海外节点则不需要，代价是国内访问速度一般。

---

## 四、日常维护

### 项目结构：只改一个文件就能换内容

```
src/data/site.tsx        ← 所有文案数据都在这里（改了立刻生效）
src/index.css            ← 主题色变量，换肤改这里
src/components/ui/       ← 组件本体
public/                  ← 放 favicon、简历 PDF、图片等静态文件
```

`site.tsx` 里导出这几组数据，改它们就行：

| 变量 | 控制什么 |
| --- | --- |
| `profile` | 姓名、职位、简介、邮箱、统计数据 |
| `socials` | 社交链接 |
| `heroCards` | 首屏卡片堆的三张卡 |
| `projects` | 作品集网格 |
| `skillGroups` | 技能分组 |
| `timeline` | 经历时间线 |
| `values` / `interests` | 工作原则与兴趣爱好 |

### 常见修改任务

**换成真实信息**
编辑 `src/data/site.tsx`，把示例的姓名、邮箱、作品的链接（现在是 `href: "#"`）都换成真的。

**加一张作品卡片**
在 `projects` 数组里复制一项，改 `title` / `description` / `tags` / `metric` 即可，网格会自动排布。

**改主题色**
`src/index.css` 里搜 `--primary`，换成你想要的 HSL 值。配套的说明可以看 [shadcn/ui 主题文档](https://ui.shadcn.com/docs/theming)。

**加 favicon**
把 `.ico` 或 `.png` 放到 `public/favicon.ico`，然后在 `index.html` 的 `<head>` 里加
`<link rel="icon" href="/favicon.ico" />`。

**加简历下载**
把 PDF 放进 `public/resume.pdf`，然后加个链接 `<a href="/resume.pdf">下载简历</a>`。

### 本地开发循环

```bash
npm run dev        # 启动开发服务器，改代码自动热更新
npm run typecheck  # 只做类型检查，不构建
npm run build      # 完整检查 + 构建，部署前建议本地跑一次
npm run preview    # 本地预览构建产物，验证和线上一致
```

> 习惯建议：**推送前先跑 `npm run build`**。它包含 `tsc -b`，能提前挡住类型错误，避免线上构建失败。

### 更新依赖

```bash
npm outdated          # 看哪些包有新版本
npm update            # 按 semver 范围更新
npm audit             # 检查安全漏洞
npm audit fix         # 自动修复可修复的漏洞
```

大版本升级（比如 Tailwind 3 → 4）建议单独开一个分支做，改完跑通 `npm run build` 再合并。

### 如果用了自动化部署

- **Vercel / Netlify**：推送即上线，无需任何额外操作。平台后台能看到每次构建的日志。
- **GitHub Pages**：在仓库 **Actions** 标签页看构建状态，红叉点进去看日志。

想回滚线上版本：Vercel / Netlify 后台都有 **Instant Rollback**，选一个历史部署点一下即可，秒级生效。

---

## 五、上线前检查清单

- [ ] `src/data/site.tsx` 里所有占位内容都换成了真实信息
- [ ] `profile.email` 是真实邮箱（`href={`mailto:...`}` 会用它）
- [ ] `projects` 里的 `href: "#"` 换成了真实链接或项目页
- [ ] `index.html` 里的 `<title>` 和 `description` 是你要的（影响搜索引擎和分享卡片）
- [ ] 加了 favicon，浏览器标签页不再显示默认图标
- [ ] `npm run build` 本地通过，无报错
- [ ] 部署后在手机上也打开看一遍（响应式布局）
- [ ] 自己点一遍所有导航锚点和外链

---

## 六、几个容易踩的坑

**子路径部署后白屏**
GitHub Pages 部署到 `/<仓库名>/` 时，如果没设 `BASE_PATH`，构建产物里的资源路径会是 `/assets/...` 而实际在 `/<仓库名>/assets/...`，导致全部 404 白屏。本项目的工作流已自动处理。

**刷新子页面 404**
纯前端 SPA 的路由由浏览器接管，服务器不知道 `/work` 是什么。`vercel.json` 和 `netlify.toml` 里的 rewrites/redirects 就是做这件事的——**别删**。

**改完代码线上没变**
先确认推送成功了（`git status` 干净、`git log` 有你的提交），再去平台后台看构建日志。90% 的情况是构建失败了，而平台默认不会给你发通知。

**中文路径问题**
本项目工作区路径含中文（`C:\Users\兰浩\`），本地开发构建都正常。但如果你用某些 CI 或脚本工具遇到编码报错，把项目挪到纯英文路径（如 `D:\projects\`）即可绕开。

**不要把密钥提交到仓库**
`.gitignore` 已排除 `.env*`。将来若接入第三方 API（邮件服务、统计工具等），密钥一律放环境变量，在部署平台后台配置，不要写进代码。
