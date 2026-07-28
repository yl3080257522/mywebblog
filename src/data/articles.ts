export type Category = "文献解读" | "项目实战" | "系统教程" | "技术随笔";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  tags: string[];
  cover: string;
  featured?: boolean;
  content: string;
}

export const categories: { name: Category; description: string; icon: string }[] = [
  { name: "文献解读", description: "深入解读前沿学术论文，提炼核心方法与思路", icon: "BookOpen" },
  { name: "项目实战", description: "R、Python、全栈开发的项目制实战教程", icon: "Code" },
  { name: "系统教程", description: "体系化课程与配套资料，边看边练", icon: "PlayCircle" },
  { name: "技术随笔", description: "开发心得、工具技巧与行业思考", icon: "PenLine" },
];

export const articles: Article[] = [
  {
    slug: "r-language-install-2026",
    title: "2026全网最新R语言安装教程 | 零基础小白完美配置R分析环境",
    excerpt:
      "Windows 零基础小白R语言安装全教程：从 CRAN 下载 R、规范英文路径、安装 RStudio 与匹配版 Rtools，完成绑定验证配置完美R分析环境。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "22 分钟",
    tags: ["R", "RStudio", "Rtools", "环境配置", "Windows", "零基础"],
    cover: "/tutorials/r/install-2026/card-r-base.png",
    featured: true,
    content: `## 一、前言

不知道小伙伴们是因为什么原因接触到 R 语言：个人兴趣、老师布置的统计分析 / 临床建模，还是科研 SCI 需要用 R 做分析。不管出于什么原因，只要有下面这些问题，就请跟着这篇 **2026 全网最新 R 语言安装教程** 看下去——看完你就能在自己电脑上装好 R，正式开启学习之旅。

- 不知道怎么安装 R，找不到官网，乱下安装包，装完打不开；
- 路径里有中文或空格，后面装包、读文件莫名其妙报错；
- 只知道 R，不知道 Rtools 或 RStudio；或装了 RStudio、没装 R，版本对不上；
- 装完不知道怎么验证「到底成没成」，不知道如何检查自身的 R 环境。

这篇教程会带你从零把 **R 环境配置**好，并做完最基本的验证。关键下载入口一律以 [CRAN 官方](https://cran.r-project.org/) 为准。配好后可继续：[R 语言入门导览](/blog/r-language-introduction)。

## 二、什么是 R，R 语言到底都有些什么？

很多新手在网上找教程，装完桌面出现一个图标就以为「装好了 R」——从某种意义上说也没错，但那往往只是 **R base**，还不是完整的 R 分析环境。

**R** 是一门开源的统计计算与数据可视化语言，也是真正负责「算」的软件引擎。统计分析、临床建模，以及生信里的转录组、单细胞（如 Seurat）、Bioconductor 工具，凡是要跑 R 代码，就需要 R base——就像汽车引擎，缺少它代码不可能运行成功。

完整的 R 分析环境是三件套：

<div class="rt-cards">
  <div class="rt-card">
    <div class="rt-card-top">
      <a class="rt-card-logo" href="https://cran.r-project.org/" target="_blank" rel="noopener noreferrer"><img src="/tutorials/r/install-2026/logo-r.png" alt="R logo"></a>
      <h4><a href="https://cran.r-project.org/" target="_blank" rel="noopener noreferrer">R（R base）</a></h4>
    </div>
    <p class="rt-card-desc">类似汽车引擎：运行所有代码。没有它，后面一切都转不起来。</p>
  </div>
  <div class="rt-card">
    <div class="rt-card-top">
      <a class="rt-card-logo" href="https://posit.co/download/rstudio-desktop/" target="_blank" rel="noopener noreferrer"><img src="/tutorials/r/install-2026/card-rstudio.png" alt="RStudio logo"></a>
      <h4><a href="https://posit.co/download/rstudio-desktop/" target="_blank" rel="noopener noreferrer">RStudio</a></h4>
    </div>
    <p class="rt-card-desc">R 的可视化界面，类似方向盘：看脚本、看图、编辑代码都会更舒服。</p>
  </div>
  <div class="rt-card">
    <div class="rt-card-top">
      <a class="rt-card-logo" href="https://cran.r-project.org/bin/windows/Rtools/" target="_blank" rel="noopener noreferrer"><img src="/tutorials/r/install-2026/card-rtools.png" alt="Rtools logo"></a>
      <h4><a href="https://cran.r-project.org/bin/windows/Rtools/" target="_blank" rel="noopener noreferrer">Rtools</a></h4>
    </div>
    <p class="rt-card-desc">类似后台补给（油）：帮你装好编译依赖，让额外的 R 包更容易装成功。</p>
  </div>
</div>

另外还有 **R 包**（如 \`ggplot2\`、\`dplyr\`，生信里的 \`DESeq2\` / \`Seurat\`）以及 Bioconductor 等，按任务再装，类似修电脑时额外拿的螺丝刀。

Rtools 帮 R 更容易拿到工具；RStudio 把写代码、运行、装包串在一起。

<div class="rt-callout"><strong>安装原则与顺序：先装 R，再装 RStudio，然后再安装 Rtools</strong></div>

## 三、前置条件

- 系统：建议 **Windows 10 或 Windows 11**（64 位）。当前 Windows 版 R 依赖 UCRT，Win10 / Server 2016 起通常自带（见 [CRAN Windows 下载页](https://cran.r-project.org/bin/windows/base/)）。
- 磁盘：预留至少 **2–5 GB**（后面装包还会涨）。
- 权限：若提示无法写入，对安装程序 **右键 → 以管理员身份运行**。
- 路径习惯：用英文路径，例如 \`D:\\\\R\` 或 \`C:\\\\R\`，**尽量不要出现中文、空格、奇怪符号**。

## 四、R 下载入口

**官网下载：**

1. 打开 [R 官网](https://cran.r-project.org/)
2. 点击 **Download R for Windows**；Mac 则点 [mac 版本](https://cran.r-project.org/bin/macosx/)
3. 选择下载 **R base**。推荐 [R-4.4.1](https://cran.r-project.org/bin/windows/base/old/4.4.1/R-4.4.1-win.exe)（也可用 [Previous releases](https://cran.r-project.org/bin/windows/base/old/)）。R 更新很快，此版本对常见分析任务较稳定。

另见 [R for Windows FAQ](https://cran.r-project.org/bin/windows/base/rw-FAQ.html)。

**国内镜像（国内用户推荐）：**

- 清华 TUNA：[https://mirrors.tuna.tsinghua.edu.cn/CRAN/](https://mirrors.tuna.tsinghua.edu.cn/CRAN/)
- 中科大 USTC：[https://mirrors.ustc.edu.cn/CRAN/](https://mirrors.ustc.edu.cn/CRAN/)

![R镜像下载](/tutorials/r/install-2026/ustc-mirror.gif)

## 五、首先安装 R（R base）

**注意：安装前必做！！！**

安装前请检查磁盘空间（建议至少 2–5 GB），在合适盘符下 **新建英文目录** 用来放 R，尽量选非 C 盘。目录名不要出现中文、空格或奇怪符号。例如 C 盘快满时，可放到 D 盘并新建 \`D:\\\\Rworkspace\`。

![安装前磁盘检查](/tutorials/r/install-2026/install-mkdir.gif)

**正式开始安装 R：**

1. 下载 [R base](https://cran.r-project.org/)。推荐 [R-4.4.1](https://cran.r-project.org/bin/windows/base/old/4.4.1/R-4.4.1-win.exe)。
2. 安装时选择刚刚新建的目录：\`D:\\\\Rworkspace\`。
3. 双击安装包，语言选 **中文**，安装位置仍选 \`D:\\\\Rworkspace\`，一路「下一步」直到成功。
4. 安装完成后桌面出现 **RGui**（蓝色 R 图标）。到这里，**R 就已经装好了——理论上所有代码都能在这里运行。**

不过界面偏灰色，不是我们平时习惯的图形化分析环境，因此还需要安装 [RStudio](https://posit.co/download/rstudio-desktop/)。

![Rbase正式安装](/tutorials/r/install-2026/install-rgui.gif)

## 六、安装 RStudio

日常写分析脚本几乎都用 **RStudio Desktop（免费版）**。

1. 官方下载：[posit.co/download/rstudio-desktop](https://posit.co/download/rstudio-desktop/)
2. 选 Windows 版本；路径同样放在 \`D:\\\\Rworkspace\` 下
3. **安装目录也改成 \`D:\\\\Rworkspace\`**

![RStudio安装](/tutorials/r/install-2026/install-rstudio.gif)

## 七、最后安装 Rtools

**注意：Rtools 版本必须与 R base 匹配**

Rtools 不是随便下一个就行，必须和 R 的**版本**一一对应：装了 R-4.4.x，就要装 **Rtools44**；装了 R-4.5.x，就要装 **Rtools45**。版本对不上时，编译源码包、找 \`make\` 很容易出问题。官方对照表见 [CRAN Rtools](https://cran.r-project.org/bin/windows/Rtools/)。本教程推荐 **R-4.4.1**，因此请选 **Rtools 4.4**。

<div class="rt-fig-pair">
  <figure><img src="/tutorials/r/install-2026/r-previous-releases.png" alt="R 旧版本列表（Previous Releases）"></figure>
  <figure><img src="/tutorials/r/install-2026/rtools-version-table.png" alt="CRAN 官网：Rtools 与 R 版本对应关系"></figure>
</div>

1. 打开 [CRAN Rtools](https://cran.r-project.org/bin/windows/Rtools/)，按上表选择与自己 R 版本匹配的一项（本教程选 [Rtools 4.4](https://cran.r-project.org/bin/windows/Rtools/rtools44/rtools.html)）。
2. 下载对应安装包，建议装到默认路径（同样放到 **D:\\\\Rworkspace**）。
3. 安装完成后可以将三个安装包删除，节省空间。

![Rtools安装](/tutorials/r/install-2026/install-rtools.gif)

## 八、在 RStudio 里面将 R base 和 Rtools 进行绑定

打开 RStudio，若提示找不到 R，到 \`Tools → Global Options → General → R version\` 手动指定刚装的 R base。**这一步就是在绑定 R base。**

接着在 RStudio Console 里先执行：

\`\`\`r
Sys.which("make")
\`\`\`

因为此时还没绑定 Rtools，这里一般会是**空的**。然后输入下面这条绑定命令并回车：

\`\`\`r
writeLines('PATH="\${RTOOLS40_HOME}\\usr\\bin;\${PATH}"', con = "~/.Renviron")
\`\`\`

写完后建议 **重启一下 R / RStudio**，再重新执行：

\`\`\`r
Sys.which("make")
\`\`\`

如果顺利返回类似 \`C:/rtools44/usr/bin/make.exe\`（或你本机 Rtools 目录下的 \`make.exe\`）路径，就说明已经成功和 Rtools 绑定了。

![在 RStudio 中绑定 R base 与 Rtools ](/tutorials/r/install-2026/install-bind.gif)

## 九、注意事项与常见报错

1. **路径含中文/空格** — 安装、项目、数据路径尽量英文。
2. **只装了 RStudio** — 必须先有 R base 引擎。
3. **权限不足** — 以管理员身份运行，或换有写权限的盘符。
4. **官网慢** — 换清华 / 中科大镜像。
5. **杀毒拦截** — 确认来自 CRAN/镜像后再放行。
6. **版本焦虑** — 课程指定就装指定版；生信包有时滞后新版 R。
7. **多版本 R** — RStudio 里明确选中要用的那个。
8. **Rtools 找不到 make** — 核对 Rtools 与 R 大版本是否匹配，并重启 RStudio。

**macOS 补充（简版）：** 打开 [R for macOS](https://cran.r-project.org/bin/macosx/)；Apple 芯片选 \`arm64\`，Intel 选 \`x86_64\`；按向导安装；需要 X11/\`tcltk\` 时装 [XQuartz](https://www.xquartz.org/)；再装 RStudio，用 \`sessionInfo()\` 验证。

## 十、小结

- 知道 R base 是引擎、RStudio 是驾驶舱、Rtools 是编译补给，**顺序不能反**；
- 会从 CRAN 或国内镜像下载并安装 Windows 版 R；
- 会进一步安装 RStudio 与 Rtools，并完成绑定验证。

下一篇：[R 语言入门导览：对象、函数与工作流](/blog/r-language-introduction)。

## 十一、参考与官方来源

- [CRAN 首页](https://cran.r-project.org/)
- [Download R for Windows（base）](https://cran.r-project.org/bin/windows/base/)
- [R for Windows FAQ](https://cran.r-project.org/bin/windows/base/rw-FAQ.html)
- [R for macOS](https://cran.r-project.org/bin/macosx/)
- [Rtools](https://cran.r-project.org/bin/windows/Rtools/)
- [RStudio Desktop（Posit）](https://posit.co/download/rstudio-desktop/)
- [清华 TUNA CRAN 镜像](https://mirrors.tuna.tsinghua.edu.cn/CRAN/)
- [中科大 USTC CRAN 镜像](https://mirrors.ustc.edu.cn/CRAN/)`,
  },

  {
    slug: "r-rstudio-setup-guide",
    title: "R 与 RStudio 安装配置全流程（Windows）",
    excerpt: "精简版安装备忘：若你需要图文动效逐步演示，请优先阅读 2026 最新零基础安装教程。",
    category: "系统教程",
    date: "2026-07-26",
    readTime: "8 分钟",
    tags: ["R", "RStudio", "环境配置", "Windows"],
    cover: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    content: `## 说明

本篇为较早的精简备忘。**推荐零基础读者直接阅读：** [2026全网最新R语言安装教程 | 零基础小白完美配置R分析环境](/blog/r-language-install-2026)（含 GIF 演示与 Rtools 版本对照）。

装好后可继续：[R 语言入门导览](/blog/r-language-introduction)。`,
  },
  {
    slug: "r-language-introduction",
    title: "R 语言入门导览：对象、函数与工作流",
    excerpt: "在配好 RStudio 之后，用最短路径认识向量、数据框、函数与一次完整的读数—分析—出图流程。",
    category: "系统教程",
    date: "2026-07-26",
    readTime: "16 分钟",
    tags: ["R", "基础语法", "tidyverse", "入门"],
    cover: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    content: `## 这篇解决什么问题

上一篇我们完成了 [R 语言安装与环境配置](/blog/r-language-install-2026)。本篇不再纠结安装，而是建立心智模型：R 里数据怎么存、代码怎么写、一次分析怎么跑通。

![R 的三大核心：向量、数据框、函数](/tutorials/r/r-concepts.svg)

## 一、R 的基本世界观

- **赋值**：用 \`<-\`（或 \`=\`）把结果存进对象名
- **向量**：同类型元素排成一列，是多数计算的基础
- **数据框 data.frame / tibble**：像表格，列是变量，行是观测
- **函数**：\`函数名(参数)\`；包用 \`library()\` 加载

\`\`\`r
x <- c(10, 20, 30, 40)  # 数值向量
mean(x)  # 对向量做汇总
df <- data.frame(name = c("A", "B"), score = c(88, 92))  # 迷你数据框
print(df)
\`\`\`

## 二、认识 RStudio 四个窗格

![四窗格：脚本 / 环境 / 控制台 / 图](/tutorials/r/rstudio-panes-demo.svg)

操作建议：

- 在 **Source** 写脚本，\`Ctrl+Enter\` 发送当前行到 Console
- 在 **Environment** 看有哪些对象
- **Plots** 查看图形；**Help** 查函数说明（如 \`?mean\`）

## 三、一次最小工作流

读入 → 查看 → 汇总 → 出图（示例用内置数据，无需外网文件）：

\`\`\`r
data(mtcars)
head(mtcars)  # 看前几行
summary(mtcars$mpg)  # 对 mpg 做描述统计
plot(mtcars$wt, mtcars$mpg, main = "Weight vs MPG")  # 基础散点图
\`\`\`

更现代的写法（需已安装 ggplot2）：

\`\`\`r
library(ggplot2)
ggplot(mtcars, aes(wt, mpg)) +
  geom_point(color = "#276749") +  # 散点
  labs(title = "Weight vs MPG", x = "Weight", y = "Miles per gallon")
\`\`\`

## 四、包与帮助系统

\`\`\`r
install.packages("dplyr")  # 安装（只需一次）
library(dplyr)  # 每个会话加载一次
?filter  # 打开帮助页
vignette(package = "dplyr")  # 查看长文教程列表
\`\`\`

常用入门包：\`dplyr\`（整理）、\`ggplot2\`（作图）、\`readr\`（读 csv）、\`tidyr\`（长短表转换）。

## 五、脚本与可复现

把分析写成 \`.R\` 脚本或 Quarto/R Markdown，避免只在控制台临时敲：

\`\`\`r
# analysis.R
library(ggplot2)
p <- ggplot(mtcars, aes(factor(cyl), mpg)) + geom_boxplot()
ggsave("mpg_by_cyl.png", p, width = 6, height = 4)  # 导出图片
\`\`\`

## 系列导航

- 上一篇：[R 与 RStudio 安装配置](/blog/r-rstudio-setup-guide)
- 下一篇：[如何系统学习 R 语言](/blog/how-to-learn-r)`,
  },
  {
    slug: "how-to-learn-r",
    title: "如何系统学习 R 语言：路径、资源与练习法",
    excerpt: "从 Base R 到 tidyverse、可视化与统计建模，给出可执行的学习顺序、每周练习模板和避坑建议。",
    category: "系统教程",
    date: "2026-07-26",
    readTime: "14 分钟",
    tags: ["R", "学习方法", "tidyverse", "数据科学"],
    cover: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 先说结论

学 R 最有效的方式不是把语法手册背完，而是：**短路径学语法 → 立刻做小项目 → 用包解决真实数据问题**。下面给出一条对科研 / 数据分析向都友好的路线。

![R 学习路径示意：Base R → tidyverse → ggplot2 → 统计建模 → 项目练习](/tutorials/r/learning-path.svg)

## 一、推荐学习顺序

1. **Base R**：赋值、向量、因子、数据框、读写、\`for\`/\`if\`、写小函数
2. **tidyverse**：\`dplyr\` + \`tidyr\` + \`readr\`，掌握 \`filter/select/mutate/summarise/join\`
3. **ggplot2**：一层一层加几何对象与主题，能复现论文主图风格
4. **统计与建模**：t 检验、线性回归、\`broom\` 整理模型输出
5. **项目化**：一个文件夹 = 数据 + 脚本 + 图 + README

## 二、每周练习模板（可直接抄）

目标：每周完成 1 个「能截图发群」的小分析。

\`\`\`r
library(readr)
library(dplyr)
library(ggplot2)
# 1) 读入（换成你的文件）
# dat <- read_csv("data/raw.csv")
dat <- mtcars %>% tibble::rownames_to_column("model")
# 2) 清洗与汇总
tab <- dat %>%
  group_by(cyl) %>%
  summarise(mean_mpg = mean(mpg), n = n(), .groups = "drop")  # 按缸数汇总
# 3) 出图
p <- ggplot(dat, aes(factor(cyl), mpg)) +
  geom_boxplot() +
  labs(title = "MPG by cylinders", x = "cyl", y = "mpg")
print(tab)
print(p)
\`\`\`

把脚本存进 \`project/R/01_explore.R\`，图存进 \`project/figures/\`。

## 三、资源怎么选（少而精）

- 书：《R for Data Science》（免费在线）—— tidyverse 主线
- 官方手册：\`?函数名\`、包 vignette
- 练习站：RStudio Primers、TidyTuesday（每周真实数据集）
- 中文社区：互帮问答时附上 \`sessionInfo()\` 与最小可复现例子

## 四、常见坑

- **只看不敲**：第二天就会忘；务必改参数再跑一遍
- **环境混乱**：一个分析一个 Project（RStudio → New Project）
- **路径写死在 C 盘用户名**：用相对路径 + 项目根目录
- **版本飘了**：重要项目记录 R 版本与 \`sessionInfo()\`

\`\`\`r
sessionInfo()  # 写报告或提问前先跑
\`\`\`

## 五、30 天里程碑（自检）

- Day 7：能独立安装包、画 \`ggplot\` 散点/箱线
- Day 14：能用 \`dplyr\` 完成分组汇总与两表合并
- Day 21：能把分析写成可重复脚本并导出图
- Day 30：完成一个完整小项目（数据说明 + 代码 + 结论）

## 系列导航

- [R 与 RStudio 安装配置](/blog/r-rstudio-setup-guide)
- [R 语言入门导览](/blog/r-language-introduction)

配好环境、建立概念后，按本篇路径推进即可；遇到具体分析场景（如单细胞），再进入专题实战帖。`,
  },
  {
    slug: "scRNAseq-clustering-guide",
    title: "单细胞RNA测序聚类分析全流程详解",
    excerpt: "从数据预处理到UMAP可视化，手把手带你完成单细胞转录组数据的聚类分析，涵盖Seurat核心流程与参数调优策略。",
    category: "项目实战",
    date: "2025-06-18",
    readTime: "15 分钟",
    tags: ["R", "Seurat", "单细胞", "生物信息"],
    cover: "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    content: `## 前言

单细胞RNA测序（scRNA-seq）是近年来生物信息学最火热的技术之一。本文将带你从零开始，用 R 和 Seurat 完成一次完整的聚类分析流程。

## 环境准备

首先安装并加载必要的 R 包：

\`\`\`r
# 安装 Seurat
install.packages("Seurat")
library(Seurat)
library(dplyr)
library(ggplot2)
\`\`\`

## 数据加载

我们使用 10X Genomics 的公开数据集作为示例：

\`\`\`r
pbmc_data <- Read10X(data.dir = "data/pbmc/")
pbmc <- CreateSeuratObject(counts = pbmc_data, project = "pbmc", min.cells = 3, min.features = 200)
\`\`\`

## 质量控制

过滤低质量细胞和双细胞：

\`\`\`r
pbmc[["percent.mt"]] <- PercentageFeatureSet(pbmc, pattern = "^MT-")
pbmc <- subset(pbmc, subset = nFeature_RNA > 200 & nFeature_RNA < 2500 & percent.mt < 5)
\`\`\`

## 归一化与降维

\`\`\`r
pbmc <- NormalizeData(pbmc)
pbmc <- FindVariableFeatures(pbmc, selection.method = "vst", nfeatures = 2000)
pbmc <- ScaleData(pbmc)
pbmc <- RunPCA(pbmc, features = VariableFeatures(object = pbmc))
\`\`\`

## 聚类与可视化

\`\`\`r
pbmc <- FindNeighbors(pbmc, dims = 1:10)
pbmc <- FindClusters(pbmc, resolution = 0.5)
pbmc <- RunUMAP(pbmc, dims = 1:10)
DimPlot(pbmc, reduction = "umap")
\`\`\`

## 总结

通过以上步骤，我们完成了从原始矩阵到聚类可视化的全流程。后续可以结合 marker 基因进行细胞类型注释。`,
  },
  {
    slug: "transformer-paper-interpretation",
    title: "Transformer架构原理解读：从Attention到并行计算",
    excerpt: "逐层拆解Transformer论文的核心设计，理解自注意力机制、位置编码与多头注意力的工程直觉。",
    category: "文献解读",
    date: "2025-06-10",
    readTime: "20 分钟",
    tags: ["深度学习", "Transformer", "NLP", "论文精读"],
    cover: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    content: `## 论文背景

2017年，Google 团队发表的《Attention Is All You Need》提出了 Transformer 架构，彻底改变了自然语言处理领域的范式。

## 核心创新：自注意力机制

传统的 RNN/LSTM 依赖序列顺序计算，难以并行化。Transformer 通过自注意力机制直接建模序列中任意两个位置之间的依赖关系：

\`\`\`python
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V)
\`\`\`

## 多头注意力

多头机制让模型能同时关注不同子空间的信息：

\`\`\`python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
\`\`\`

## 位置编码

由于自注意力本身不含位置信息，需要通过位置编码注入序列顺序：

$$PE_{(pos, 2i)} = \\sin(pos / 10000^{2i/d_{model}})$$

## 总结

Transformer 的核心贡献在于用纯注意力机制替代了循环结构，实现了完全并行化的序列建模。`,
  },
  {
    slug: "python-data-viz-streamlit",
    title: "用Streamlit 30分钟搭建交互式数据看板",
    excerpt: "从数据加载到交互组件，快速构建可分享的数据可视化Web应用，附完整代码与部署方案。",
    category: "项目实战",
    date: "2025-05-28",
    readTime: "12 分钟",
    tags: ["Python", "Streamlit", "数据可视化", "Web应用"],
    cover: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 为什么选择 Streamlit

Streamlit 是目前最快的 Python 数据应用搭建工具，无需前端知识即可创建交互式看板。

## 快速开始

\`\`\`python
import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="数据看板", layout="wide")

df = pd.read_csv("data.csv")

st.sidebar.selectbox("选择图表类型", ["柱状图", "折线图", "散点图"])
\`\`\`

## 添加交互组件

\`\`\`python
category = st.sidebar.multiselect("筛选类别", df["category"].unique())
filtered = df[df["category"].isin(category)]

fig = px.bar(filtered, x="month", y="revenue", color="category")
st.plotly_chart(fig, use_container_width=True)
\`\`\`

## 部署

使用 Streamlit Cloud 一键部署，免费且简单。`,
  },
  {
    slug: "shap-model-interpretability",
    title: "SHAP值：让机器学习模型不再黑箱",
    excerpt: "解读SHAP论文的核心思想，用Python实操如何解释任意模型的预测结果，附可视化代码。",
    category: "文献解读",
    date: "2025-05-15",
    readTime: "18 分钟",
    tags: ["机器学习", "SHAP", "模型可解释性", "Python"],
    cover: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 论文背景

SHAP（SHapley Additive exPlanations）由 Lundberg 和 Lee 于 2017 年提出，为模型解释提供了统一的理论框架。

## Shapley 值的博弈论根源

SHAP 值源自合作博弈论中的 Shapley 值概念，衡量每个特征对预测结果的边际贡献。

\`\`\`python
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test)
\`\`\`

## 可视化解读

SHAP 提供多种可视化工具：summary plot、dependence plot、force plot 等，帮助你从全局和局部两个层面理解模型行为。`,
  },
  {
    slug: "react-fullstack-tutorial",
    title: "React + Supabase 全栈项目实战：待办应用",
    excerpt: "从数据库设计到前端交互，完整构建一个支持用户认证和数据持久化的全栈应用。",
    category: "项目实战",
    date: "2025-05-02",
    readTime: "25 分钟",
    tags: ["React", "Supabase", "全栈开发", "TypeScript"],
    cover: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 项目概述

本教程将带你用 React + Supabase 构建一个功能完整的待办应用，涵盖认证、CRUD 和实时同步。

## 数据库设计

\`\`\`sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

## 前端实现

\`\`\`tsx
const { data } = await supabase.from("todos").select("*").eq("user_id", user.id);
\`\`\`

## 部署上线

使用 Vercel 一键部署前端，Supabase 托管后端。`,
  },
  {
    slug: "ggplot2-beautiful-charts",
    title: "ggplot2科研级图表绘制指南",
    excerpt: "从主题定制到配色方案，让你的R数据可视化达到论文发表级别的美观度。",
    category: "系统教程",
    date: "2025-04-20",
    readTime: "10 分钟",
    tags: ["R", "ggplot2", "数据可视化", "科研绘图"],
    cover: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 为什么 ggplot2

ggplot2 基于"图形语法"理念，是 R 生态中最强大的可视化工具。

## 主题定制

\`\`\`r
library(ggplot2)
library(ggthemes)

p <- ggplot(data, aes(x, y, color = group)) +
  geom_point(size = 3) +
  theme_pubr() +
  scale_color_npg()
\`\`\`

## 配色方案

使用 ggsci 包调用学术期刊配色，如 Nature、Science、Lancet 等。`,
  },
  {
    slug: "docker-for-researchers",
    title: "给科研人员的Docker入门：一键复现实验环境",
    excerpt: "用Docker封装你的分析环境，让合作者一键复现你的实验结果，告别「在我电脑上能跑」。",
    category: "技术随笔",
    date: "2025-04-08",
    readTime: "8 分钟",
    tags: ["Docker", "环境管理", "科研工具", "DevOps"],
    cover: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 科研复现的痛点

"在我电脑上能跑"是科研合作中最常见的困境。Docker 提供了一种优雅的解决方案。

## Dockerfile 示例

\`\`\`dockerfile
FROM rocker/r-ver:4.3.0
RUN apt-get update && apt-get install -y libxml2-dev
RUN R -e "install.packages(c('tidyverse', 'Seurat'))"
COPY . /project
WORKDIR /project
CMD ["Rscript", "analysis.R"]
\`\`\`

## 构建与分享

\`\`\`bash
docker build -t my-analysis .
docker save my-analysis | gzip > my-analysis.tar.gz
\`\`\``,
  },
  {
    slug: "pytorch-training-tips",
    title: "PyTorch训练加速10个实用技巧",
    excerpt: "从数据加载到混合精度训练，总结提升深度学习训练效率的实战经验。",
    category: "技术随笔",
    date: "2025-03-25",
    readTime: "10 分钟",
    tags: ["PyTorch", "深度学习", "性能优化", "Python"],
    cover: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 1. 使用 DataLoader 的多进程加载

\`\`\`python
DataLoader(dataset, batch_size=64, num_workers=4, pin_memory=True)
\`\`\`

## 2. 混合精度训练

\`\`\`python
from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()
with autocast():
    output = model(input)
    loss = criterion(output, target)
scaler.scale(loss).backward()
\`\`\`

## 3. 梯度累积

当显存不够时，可以通过梯度累积模拟更大的 batch size。`,
  },
  {
    slug: "video-course-bioinformatics",
    title: "生物信息学入门视频课程：从零到独立分析",
    excerpt: "12节系统课程，涵盖Linux基础、R编程、生信工具链与实战项目，配套代码全部开源。",
    category: "系统教程",
    date: "2025-03-10",
    readTime: "系列课程",
    tags: ["生物信息学", "视频课程", "R", "Linux"],
    cover: "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `## 课程介绍

这是一套为零基础学员设计的生物信息学入门课程，共12节，从Linux命令行到独立完成分析项目。

## 课程大纲

1. Linux 基础与命令行操作
2. R 语言编程入门
3. Bioconductor 生态介绍
4. RNA-seq 数据分析实战
5. 单细胞分析入门
6. 通路富集分析

## 配套资源

所有代码开源在 GitHub，配套数据集可免费下载。`,
  },
];
