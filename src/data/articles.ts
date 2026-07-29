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
    slug: "rstudio-interface-beginner-guide",
    title: "RStudio环境初识",
    excerpt:
      "让我们一起来认识一下Rstudio的四个基础区域：Source脚本区、Console控制台、Environment环境区和Output输出区。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "14 分钟",
    tags: ["RStudio", "R", "零基础", "界面教程", "Source", "Console", "Environment", "Output"],
    cover: "/tutorials/r/rstudio-interface/annotated-four-panes.png",
    featured: true,
    content: `## 一、为什么我建议先认识 RStudio 界面

上一篇我们已经完成了 [2026全网最新R语言安装教程](/blog/r-language-install-2026)，知道 R 是真正执行代码的引擎，RStudio 是更适合写分析脚本的工作台。接下来你是不是也迫不及待想进入具体的R分析之旅成为一个强大的分析师了。**我知道你很急，但是你先别急**，开始之前我还是建议大家先和我一起认识一下RStudio的页面，这样你才能更好的驾驶这个环境。

刚开始学R的时候，很多小伙伴估计就迫不及待的开始写R代码了，最先写的可能就是：

\`\`\`r
print("hello")
\`\`\`

哈哈，我也是这么过来的。以前没人带，于是闹过不少笑话，比如在 rbase 里面敲代码，不知道哪里看数据，图片在哪里等等。因此让我们来好好认识一下。**RStudio**其实是一个**集成开发环境**，它把代码编辑、Console、绘图、历史记录、调试、工作空间管理等功能放在同一个界面里。更多说明可以查看 [Posit RStudio IDE User Guide](https://docs.posit.co/ide/user/)。

如果界面没看懂，后面很容易出现这些问题：

- 把长代码全部粘到 Console，跑完后找不到脚本；
- 不知道如何保存脚本，一关闭就找不到了；
- 运行代码后不知道结果应该看 Console 还是 Plots；
- 明明创建了对象，却不知道 Environment 里能检查；
- 画图成功了，但不知道怎么导出图片；
- 报错了，只看到红字，却不知道先从哪一句错误信息看起。

因此，认识Rstudio,认识这四个核心窗格，有利于你真正的开始R分析之旅。

## 二、RStudio四框架

Posit 官方 [Get Started](https://docs.posit.co/ide/user/ide/get-started/) 和 [Pane Layout](https://docs.posit.co/ide/user/ide/guide/ui/ui-panes.html) 文档都把 RStudio 的核心界面概括为四个主要窗格：**Source**、**Console**、**Environment**、**Output**。

![RStudio 四个窗格标注图](/tutorials/r/rstudio-interface/annotated-four-panes.png)

<div class="rt-table-wrap">
  <table class="rt-table">
    <thead>
      <tr>
        <th>位置</th>
        <th>英文名称</th>
        <th>中文理解</th>
        <th>主要用途</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>左上</td>
        <td>Source</td>
        <td>脚本区</td>
        <td>写长代码、保存脚本、编辑 R / Python / Quarto / R Markdown 文件</td>
      </tr>
      <tr>
        <td>左下</td>
        <td>Console</td>
        <td>控制台</td>
        <td>临时运行命令、查看输出、查看报错</td>
      </tr>
      <tr>
        <td>右上</td>
        <td>Environment</td>
        <td>环境区</td>
        <td>查看当前 R 会话里已经创建的对象</td>
      </tr>
      <tr>
        <td>右下</td>
        <td>Output</td>
        <td>输出区</td>
        <td>查看文件、图片、包、帮助文档、网页结果</td>
      </tr>
    </tbody>
  </table>
</div>

可以先记住一句话：**Source 写代码，Console 执行和显示输出，Environment记录对象，数据结果，数据矩阵等，Output 展示图、文件、帮助和网页结果。**

## 三、Source 脚本区：真正写分析流程的地方

Source 一般在左上角，也就是写脚本的地方。它最适合放需要保存、需要反复运行、需要发给别人复现的代码。

比如以后做 **生信分析** 时，我们不会只运行一两行代码，而是会有完整流程：

- 读取表达矩阵；
- 构建 Seurat 对象；
- 做质量控制；
- 标准化；
- 降维和聚类；
- 找 marker gene；
- 保存结果图和结果表。

做 **临床统计** 时同样如此，常见也会是一整套流程：

- 读入病例随访表或基线数据；
- 清洗缺失值与分组变量；
- 描述性统计与组间比较；
- 生存分析或回归建模；
- 绘制 Kaplan-Meier / 森林图；
- 导出表格与结果图。

这些代码如果全部粘到 Console，跑完就散了，后面很难复现。因此我建议从第一天开始就养成习惯：**正式分析写在 Source，临时测试才放 Console**。

在 RStudio 里可以点击：**File -> New File -> R Script**，然后就可以编辑你的代码了。

![在 RStudio 中新建 R Script](/tutorials/r/rstudio-interface/annotated-new-r-script.png)

\`\`\`r
# 创建一个基因名向量
genes <- c("MS4A1", "CD3D", "LYZ")

# 查看这个向量有几个元素
length(genes)
\`\`\`

把上面几行写进 Source 后，可以对照下面演示：**写好代码 → 运行 → Environment / Console 跟着变化**。

![Source 中逐步运行代码演示](/tutorials/r/rstudio-interface/source-run-demo.gif)

运行 Source 当前行，Windows 常用 <code>Ctrl + Enter</code>，macOS 常用 <code>Command + Enter</code>。Posit 官方 [Executing code](https://docs.posit.co/ide/user/ide/guide/code/execution.html) 文档也说明，Source 中执行的代码会进入 Console，并在那里显示输出。

## 四、Console 控制台：马上运行和看报错的地方

Console 一般在左下角。看到 <code>&gt;</code>，就说明 R 正在等待我们输入命令。

![Console 控制台批注：输入命令与查看输出](/tutorials/r/rstudio-interface/console-annotated.png)

\`\`\`r
1 + 1
\`\`\`

输出通常是：

\`\`\`text
[1] 2
\`\`\`

这里的 <code>[1]</code> 暂时不用紧张，它表示这一行输出从第 1 个结果开始显示。真正的计算结果是后面的 <code>2</code>。

Console 适合做这些事情：

- 快速试一行代码；
- 查看函数输出；
- 读报错信息；
- 临时检查对象；
- 清空控制台后重新运行。

例如：

\`\`\`r
mean(c(10, 20, 30))
\`\`\`

输出是：

\`\`\`text
[1] 20
\`\`\`

常用小技巧可以参考 [R Console](https://docs.posit.co/ide/user/ide/guide/code/console.html) 和 [Keyboard Shortcuts](https://docs.posit.co/ide/user/ide/reference/shortcuts.html)：

- <code>Ctrl + L</code>：清空 Console；
- 上方向键：找回上一条运行过的命令；
- <code>Ctrl + F</code>：在 Console 输出中搜索；
- <code>Esc</code>：尝试中断正在运行的代码；
- <code>Ctrl + Shift + F10</code>：重启 R 会话。

## 五、Environment 环境区：查看对象有没有创建成功

Environment 一般在右上角。它显示的是当前 R 会话里已经创建出来的对象。

![Environment 环境区批注：Console 运行后对象出现在这里](/tutorials/r/rstudio-interface/environment-annotated.png)

比如运行：

\`\`\`r
genes <- c("MS4A1", "CD3D", "LYZ", "PPBP", "NKG7")
\`\`\`

运行后，Environment 里应该出现一个叫 <code>genes</code> 的对象。

再运行：

\`\`\`r
qc_table <- data.frame(
  sample = c("sample_1", "sample_2", "sample_3"),
  cells = c(3200, 4100, 2850),
  median_genes = c(1500, 1760, 1320)
)
\`\`\`

Environment 里应该出现 <code>qc_table</code>，并且能看到它是一个 data frame。官方 [Data Viewer](https://docs.posit.co/ide/user/ide/guide/data/data-viewer.html) 文档也说明，RStudio 可以用 <code>View(data)</code> 或 Environment 中的数据表图标打开矩形数据。

对生信分析来说，Environment 很重要，因为我们经常需要确认：

- Seurat 对象是否创建成功；
- 表达矩阵是否读进来了；
- 差异分析结果表是否存在；
- 富集分析结果是不是空的；
- 某一步是否把旧对象覆盖了。

新手常犯的一个错误是：代码运行后只看 Console 有没有红字，却不看 Environment。实际上，很多时候代码没有报错，但对象内容不对，后面也会出问题。

## 六、Output 输出区：文件、图片、包和帮助都在这里

Output 一般在右下角。它不是一个单独功能，而是一组标签页。按照 [Pane Layout](https://docs.posit.co/ide/user/ide/guide/ui/ui-panes.html) 的说明，Output pane 常见包含 Files、Plots、Packages、Help、Viewer、Presentation 等标签页。

常见用途：

- Files：浏览当前工作目录里的文件；
- Plots：显示 R 画出来的图；
- Packages：查看和加载已经安装的 R 包；
- Help：查看函数帮助文档；
- Viewer：显示 HTML、小网页、Shiny、htmlwidgets 等结果。

比如运行：

\`\`\`r
plot(1:5)
\`\`\`

图一般会出现在 Plots 标签页。

如果运行：

\`\`\`r
?mean
help(mean)
\`\`\`

帮助文档会出现在 Help 标签页。

如果保存了一张图：

\`\`\`r
dir.create("results", showWarnings = FALSE)
png("results/demo.png")
plot(1:5)
dev.off()
\`\`\`

然后可以在 Files 标签页里找到 <code>results/demo.png</code>。RStudio 官方 [Managing Files](https://docs.posit.co/ide/user/ide/guide/ui/files.html) 文档也强调，Files 标签页可以在当前文件夹中创建、删除、重命名、打开文件，并能辅助管理工作目录。

## 七、用一段代码把四个窗格串起来

下面这段代码已经放在本帖配套目录：

\`\`\`text
rawtie/02-初步认识RStudio界面/code/rstudio-interface-demo.R
\`\`\`

建议大家把它复制到 RStudio 的 Source 窗格里，逐行运行，并观察四个窗格分别发生了什么变化。

\`\`\`r
# 1. 在 Console 中会看到这行代码的输出结果
print("Hello RStudio")

# 2. 创建一个向量。运行后，Environment 窗格会出现 genes 这个对象
genes <- c("MS4A1", "CD3D", "LYZ", "PPBP", "NKG7")

# 3. 查看向量长度。结果会显示在 Console
length(genes)

# 4. 创建一个小型质控表。运行后，Environment 会出现 qc_table
qc_table <- data.frame(
  sample = c("sample_1", "sample_2", "sample_3"),
  cells = c(3200, 4100, 2850),
  median_genes = c(1500, 1760, 1320)
)

# 5. 在 RStudio 中打开数据表。这个结果会出现在 Source 区旁边的数据查看标签页
if (interactive()) {
  View(qc_table)
}

# 6. 画一张简单图。图会显示在 Output 区的 Plots 标签页
if (interactive()) {
  plot(
    qc_table$cells,
    qc_table$median_genes,
    pch = 19,
    col = "#2563eb",
    xlab = "Number of cells",
    ylab = "Median detected genes",
    main = "Demo QC overview"
  )
}

# 7. 保存图片到 results 目录。Files 标签页中可以看到生成的文件
dir.create("results", showWarnings = FALSE)
png("results/rstudio-demo-qc.png", width = 900, height = 650, res = 120, type = "cairo")
plot(
  qc_table$cells,
  qc_table$median_genes,
  pch = 19,
  col = "#2563eb",
  xlab = "Number of cells",
  ylab = "Median detected genes",
  main = "Demo QC overview"
)
dev.off()

# 8. 查看当前 R 会话信息。写教程和排查问题时经常需要提供这个结果
sessionInfo()
\`\`\`

这段代码的观察重点：

- 运行 <code>print()</code> 后，Console 会显示文字输出；
- 运行 <code>genes &lt;- ...</code> 后，Environment 会多一个 genes；
- 运行 <code>qc_table &lt;- ...</code> 后，Environment 会多一个表格对象；
- 在 RStudio 交互环境中运行 <code>View(qc_table)</code>，会打开数据查看页；
- 运行 <code>plot()</code> 后，Output 区的 Plots 会出现散点图；
- 运行 <code>png()</code> 到 <code>dev.off()</code> 后，Files 里能看到保存出来的图片；
- 运行 <code>sessionInfo()</code> 后，Console 会输出当前 R 版本、系统、已加载包等信息。

## 八、运行结果怎么看

我在本地用 <code>Rscript</code> 跑过这段代码，确认脚本可以生成结果图：

![RStudio 示例代码生成的 QC 图](/tutorials/r/rstudio-interface/rstudio-demo-qc.png)

这张图只是一个演示图，不代表真实生物学结论。它的作用是让大家理解：R 运行代码后，图可以出现在 Plots，也可以被保存成文件。

在真实单细胞分析中，类似图可能会换成：

- 每个样本的细胞数；
- 每个细胞检测到的基因数；
- 线粒体基因比例；
- UMI 数；
- 过滤前后的细胞数量变化。

但无论图复杂还是简单，RStudio 的逻辑都是一样的：**代码在 Source，执行在 Console，对象看 Environment，图和文件看 Output**。

另外，<code>sessionInfo()</code> 是非常重要的排查命令。以后如果安装包失败、Seurat 版本不一致、Bioconductor 报错，经常需要把 <code>sessionInfo()</code> 的输出贴出来，方便判断 R 版本、系统环境和包版本。

## 九、新手最容易混淆的几个点

1. **不要把 RStudio 当成 R 本身**：R 是真正执行代码的语言和运行环境，RStudio 是帮助我们写代码、运行代码和管理结果的界面。
2. **不要把 Source 和 Console 混成一个东西**：Source 适合保存正式脚本，Console 适合临时运行和查看输出。
3. **不要只看有没有红色报错**：没有报错不等于对象内容正确，还要用 Environment、<code>str()</code>、<code>head()</code>、<code>dim()</code> 检查。
4. **不要忽略工作目录**：Files 标签页显示的是当前工作目录附近的文件。保存图片或表格前，先确认自己在哪个项目目录下工作。
5. **不要害怕 Help**：遇到不认识的函数，可以运行 <code>?plot</code> 或 <code>help(plot)</code>。

后续做真实项目时，建议使用 [RStudio Projects](https://docs.posit.co/ide/user/ide/guide/code/projects.html) 把输入数据、脚本、分析结果和图放在同一个项目上下文里。这样比到处散放文件更容易复现，也更适合科研分析。

## 十、小结与官方来源

这篇我们不追求写复杂代码，只解决一个入门问题：打开 RStudio 后到底该看哪里。

你现在需要记住四句话：

- Source：写正式脚本；
- Console：运行命令和看输出；
- Environment：检查对象是否创建成功；
- Output：看文件、图、包、帮助和网页结果。

后面进入 [R 语言入门导览](/blog/r-language-introduction)、ggplot2 作图、转录组差异分析、单细胞 Seurat 流程时，这四个窗格会一直出现。先把界面逻辑看懂，再去学分析流程，会少很多无效报错和重复试错。

参考与官方来源：

- [RStudio IDE User Guide（Posit）](https://docs.posit.co/ide/user/)
- [Get Started - RStudio Panes（Posit）](https://docs.posit.co/ide/user/ide/get-started/)
- [Pane Layout（Posit）](https://docs.posit.co/ide/user/ide/guide/ui/ui-panes.html)
- [R Console（Posit）](https://docs.posit.co/ide/user/ide/guide/code/console.html)
- [Text Editor（Posit）](https://docs.posit.co/ide/user/ide/guide/productivity/text-editor.html)
- [Executing code（Posit）](https://docs.posit.co/ide/user/ide/guide/code/execution.html)
- [Data Viewer（Posit）](https://docs.posit.co/ide/user/ide/guide/data/data-viewer.html)
- [Keyboard Shortcuts（Posit）](https://docs.posit.co/ide/user/ide/reference/shortcuts.html)
- [Managing Files（Posit）](https://docs.posit.co/ide/user/ide/guide/ui/files.html)
- [RStudio Projects（Posit）](https://docs.posit.co/ide/user/ide/guide/code/projects.html)`,
  },
  {
    slug: "r-before-start-guide",
    title: "R语言入门前须知 | 开始写代码前先搞懂对象、函数、路径和包",
    excerpt:
      "零基础学习R语言前必须知道的10件事：理解对象、赋值符号、函数参数、工作目录、R包和库、帮助文档、脚本规范和最小可复现练习。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "16 分钟",
    tags: ["R", "RStudio", "零基础", "入门须知", "工作目录", "R包", "生信入门"],
    cover: "/tutorials/r/before-start/r-before-start-map.png",
    featured: true,
    content: `## 一、先知道 R 学习不是背命令

上一篇我们认识了 [RStudio 界面](/blog/rstudio-interface-beginner-guide)，知道代码写在 Source，结果看 Console，对象看 Environment，图片和文件看 Output。现在很多同学会想马上开始学语法，但我建议在正式写 R 代码前，先把几个基础观念理清楚。

很多人刚开始学 R，会把重点放在“我要记住多少函数”。其实这不是最有效的方式。

R 是一门用于统计计算和数据可视化的语言。[The R Language Definition](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-lang.html) 里讲得很清楚：R 处理的是对象，表达式会被解析和求值，函数调用会返回结果或产生副作用。说得简单一点，R 的日常工作方式就是：

\`\`\`text
对象 -> 函数处理 -> 新对象或结果
\`\`\`

![R语言入门前须知知识地图](/tutorials/r/before-start/r-before-start-map.png)

例如：

\`\`\`r
genes <- c("MS4A1", "CD3D", "LYZ")
length(genes)
\`\`\`

这里不需要先背很多概念，只要先理解：

- \`genes\` 是一个对象；
- \`<-\` 是赋值；
- \`c()\` 创建向量；
- \`length()\` 是函数；
- 函数运行后会给出结果。

真正入门 R，不是把所有函数背下来，而是知道“数据放在哪里、用什么函数处理、结果保存到哪里、出了问题怎么查”。

## 二、先分清 R、RStudio、脚本和项目

在前两篇里我们已经反复强调：R 和 RStudio 不是一个东西。还没有配好环境的同学，可以先回到 [2026全网最新R语言安装教程](/blog/r-language-install-2026)。

- **R**：真正执行代码的语言和运行环境；
- **RStudio**：更方便写代码、运行代码和管理结果的 IDE；
- **脚本 \`.R\`**：保存分析流程的文本文件；
- **项目 Project**：把代码、数据、结果和说明放在同一个工作目录里。

刚开始学习时，建议按下面的方式组织：

\`\`\`text
my_r_project/
  code/
    01-before-start-check.R
  data/
    sample_qc.csv
  results/
    mean_cells_by_group.csv
  README.md
\`\`\`

不要把数据放桌面、代码放下载目录、结果放微信文件夹。这样短期看起来省事，后面复现时很麻烦。

RStudio 官方 [RStudio Projects](https://docs.posit.co/ide/user/ide/guide/code/projects.html) 文档也建议使用项目来组织输入数据、脚本、分析结果和图。对生信分析尤其重要，因为单细胞、转录组、多组学项目通常会产生很多中间文件和结果图。

## 三、先理解对象：R 里一切都要先放进对象

R 学习中最重要的词之一就是“对象”。对象可以是一个数字、一串基因名、一张表、一个模型结果，也可以是一个函数。

\`\`\`r
x <- 10
gene <- "MS4A1"
genes <- c("MS4A1", "CD3D", "LYZ")
\`\`\`

这三行代码分别创建了三个对象：

- \`x\`：一个数字；
- \`gene\`：一个字符；
- \`genes\`：一个字符向量。

在 R 中，创建对象后要学会检查它：

\`\`\`r
class(genes)
length(genes)
str(genes)
\`\`\`

对生信分析来说，这个习惯非常关键。比如读入表达矩阵后，不能只看有没有报错，还要检查矩阵维度、行名列名、分组信息和样本数量是否符合预期。

## 四、先接受赋值符号 \`<-\`，不要纠结太久

R 里最常见的赋值符号是 \`<-\`。

\`\`\`r
cells <- c(3200, 2950, 4100, 4380)
\`\`\`

意思是：把右边的结果保存到左边的对象 \`cells\` 里。

很多新手会问：为什么不用 \`=\`？从语法上说，很多时候 \`=\` 也能工作。但 R 社区长期习惯使用 \`<-\` 做赋值，tidyverse 官方 [Syntax style guide](https://style.tidyverse.org/syntax.html) 也建议赋值使用 \`<-\`。

初学阶段我建议统一写：

\`\`\`r
sample_qc <- data.frame(
  sample = c("ctrl_1", "ctrl_2"),
  cells = c(3200, 2950)
)
\`\`\`

不要一会儿用 \`<-\`，一会儿用 \`=\`。代码风格一致，比争论符号本身更重要。

## 五、先学会函数怎么看：函数名、参数、返回值

R 代码大部分都是函数调用。函数的基本结构是：

\`\`\`text
函数名(参数1, 参数2, 参数名 = 参数值)
\`\`\`

例如：

\`\`\`r
mean(cells)
mean(cells, na.rm = TRUE)
\`\`\`

这里：

- \`mean\` 是函数名；
- \`cells\` 是输入对象；
- \`na.rm = TRUE\` 是具名参数；
- 函数返回均值。

[The R Language Definition](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-lang.html) 对函数调用的说明也强调，函数通过名称调用，参数放在括号中，多个参数用逗号分隔。初学者不需要马上理解所有底层机制，但必须养成一个习惯：**看到一个函数，先看它需要什么输入，会返回什么输出。**

以后看 Seurat 或 DESeq2 代码也一样：

\`\`\`r
FindMarkers(object, ident.1 = "B_cell", ident.2 = "T_cell")
\`\`\`

先别急着复制，先问三个问题：\`object\` 是什么对象，\`ident.1\` 和 \`ident.2\` 是什么分组，返回结果是什么表。

## 六、先搞懂工作目录：读文件和保存结果都靠它

R 读文件时，如果你写的是相对路径，就会从当前工作目录开始找。

\`\`\`r
getwd()
\`\`\`

R 官方 [getwd/setwd 文档](https://search.r-project.org/R/refmans/base/html/getwd.html) 说明，\`getwd()\` 返回当前 R 进程的绝对路径，\`setwd(dir)\` 可以切换工作目录。

比如：

\`\`\`r
read.csv("data/sample_qc.csv")
\`\`\`

这句话的意思不是“从电脑任意位置找 data 文件夹”，而是“从当前工作目录下面找 \`data/sample_qc.csv\`”。

所以我建议一开始就固定目录结构：

\`\`\`text
project/
  data/
  code/
  results/
\`\`\`

路径习惯也要注意：尽量使用英文路径；文件名不要有空格和奇怪符号；脚本、数据、结果分开放；不要频繁手动 \`setwd()\` 到一堆不同位置；一个项目尽量一个 RStudio Project。

## 七、先知道包和库不是一回事

R 里经常说“安装包”“加载包”“包库路径”。这几个词容易混。

[R Installation and Administration](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-admin.html) 里说明：R 包安装到 library 中，library 是文件系统里的目录；\`.libPaths()\` 可以查看当前 R 会话会去哪些库目录找包。

简单理解：

- **package 包**：工具本身，比如 \`ggplot2\`、\`dplyr\`、\`Seurat\`；
- **library 库目录**：电脑上存放已安装包的文件夹；
- **install.packages()**：把包安装到库目录；
- **library()**：把已安装的包加载进当前 R 会话。

常用检查命令：

\`\`\`r
.libPaths()
install.packages("ggplot2")
library(ggplot2)
\`\`\`

官方 [\`install.packages()\` 文档](https://search.r-project.org/R/refmans/utils/html/install.packages.html) 说明，它会从仓库下载包并安装到目标库目录；如果没有指定库，通常安装到 \`.libPaths()\` 的第一个目录。

生信分析中包更复杂，因为很多包来自 Bioconductor，而不是 CRAN。后面进入转录组和单细胞时，我们会单独讲 \`BiocManager::install()\`。

## 八、先学会自己查帮助，不要只等别人发答案

R 自带帮助系统。R 官方 [Getting Help with R](https://www.r-project.org/help.html) 和 [An Introduction to R](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-intro.html) 都说明，可以用 \`help()\` 或 \`?\` 查看函数文档。

常用方式：

\`\`\`r
?mean
help(mean)
??read.csv
example(mean)
\`\`\`

看帮助文档时，先看四个位置：

- Description：这个函数做什么；
- Usage：函数怎么写；
- Arguments：每个参数什么意思；
- Value：返回什么结果。

这比在网上复制碎片答案更稳定。尤其是生信分析里，同一个函数不同版本参数可能变化，先看本机帮助文档非常重要。

## 九、先养成脚本规范：以后才能复现

R 脚本不是随便堆代码。一个好的入门脚本应该让未来的自己也看得懂。

tidyverse 官方 [Files style guide](https://style.tidyverse.org/files.html) 建议文件名机器可读、人可读、适合排序，比如：

\`\`\`text
01-load-data.R
02-qc-summary.R
03-plot-results.R
\`\`\`

推荐脚本结构：

\`\`\`r
# Load packages ---------------------------

# Load data -------------------------------

# Check data ------------------------------

# Analysis --------------------------------

# Save results ----------------------------
\`\`\`

注释也要有节制。对数据分析代码来说，注释最应该记录：这一步为什么做，参数为什么这样设，结果如何判断，有没有保留或删除某个样本。

## 十、先跑一遍入门前检查脚本

本帖目录里准备了一份不依赖额外包的检查脚本：

\`\`\`text
rawtie/03-R语言入门前须知/code/r-before-start-check.R
\`\`\`

你可以在 RStudio 里打开它，逐行运行，也可以在当前帖子目录下用命令行运行：

\`\`\`bash
Rscript code/r-before-start-check.R
\`\`\`

脚本会做这些事情：

- 查看当前 R 版本；
- 查看当前工作目录；
- 创建 \`data/\` 和 \`results/\`；
- 创建一个小型 \`sample_qc\` 数据框；
- 用 \`str()\`、\`head()\`、\`dim()\` 检查对象；
- 写出 \`data/sample_qc.csv\`；
- 重新读入 CSV；
- 按分组计算平均细胞数；
- 保存 \`results/mean_cells_by_group.csv\`；
- 输出 \`.libPaths()\` 和 \`sessionInfo()\`。

运行成功后，应该能看到类似结果：

\`\`\`text
      group cells
1   control  3075
2 treatment  4240
\`\`\`

这只是演示数据，不代表真实生物学结论。它的意义是让大家先跑通“对象创建 -> 数据检查 -> 文件读写 -> 简单汇总 -> 结果保存”的最小流程。

下一篇可以继续进入：[R 语言入门导览：对象、函数与工作流](/blog/r-language-introduction)。

参考与官方来源：

- [CRAN Manuals](https://stat.ethz.ch/CRAN/manuals.html)
- [An Introduction to R](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-intro.html)
- [The R Language Definition](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-lang.html)
- [R Installation and Administration](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-admin.html)
- [R Data Import/Export](https://stat.ethz.ch/CRAN/doc/manuals/r-release/R-data.html)
- [getwd / setwd 文档](https://search.r-project.org/R/refmans/base/html/getwd.html)
- [read.table / read.csv 文档](https://search.r-project.org/R/refmans/utils/html/read.table.html)
- [install.packages 文档](https://search.r-project.org/R/refmans/utils/html/install.packages.html)
- [Getting Help with R](https://www.r-project.org/help.html)
- [tidyverse style guide](https://style.tidyverse.org/)`,
  },

  {
    slug: "r-zero-basics-guide",
    title: "R语言零基础入门 | 从对象、向量、数据框到第一张结果图",
    excerpt:
      "面向零基础读者的R语言入门教程：用一个可运行示例讲清对象、向量、数据框、检查、筛选、汇总、作图和导出。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "18 分钟",
    tags: ["R", "R语言入门", "零基础", "数据框", "数据分析", "生信入门"],
    cover: "/tutorials/r/zero-basics/r-zero-basics-flow.png",
    featured: true,
    content: `上一篇我们已经讲过 [R语言入门前须知](/blog/r-before-start-guide)，重点是先建立对象、函数、路径和脚本规范这些概念。现在这篇开始真正写 R 代码。

这篇不追求一次讲完整个 R 语言，而是带大家跑通一个最小闭环：**创建对象 -> 组成数据框 -> 检查对象 -> 筛选数据 -> 分组汇总 -> 保存图和表**。后面学转录组、单细胞或多组学分析，本质上也会反复出现这个流程。

![R语言零基础入门流程图](/tutorials/r/zero-basics/r-zero-basics-flow.png)

本篇配套脚本在：

\`\`\`text
rawtie/04-R语言零基础入门/code/r-zero-basics-demo.R
\`\`\`

也可以在博客静态资源中查看：

- [示例 R 脚本](/tutorials/r/zero-basics/r-zero-basics-demo.R)
- [示例输入 CSV](/tutorials/r/zero-basics/sample_qc_zero_basics.csv)
- [示例汇总 CSV](/tutorials/r/zero-basics/group_summary_zero_basics.csv)

## 一、这篇真正开始写 R 代码

如果说前几篇是在搭工作台，那么这一篇就是第一次把数据放上工作台。

我建议零基础学习 R 时先不要急着安装很多包，也不要一上来就写 Seurat、DESeq2 或复杂统计模型。最稳的方式是先用 base R 跑通一个小例子，因为 base R 随 R 一起安装，不需要额外依赖。

这篇会使用一个小型“样本质控表”：

\`\`\`text
sample_id  group      cells  median_genes
ctrl_1     control    3200   1450
ctrl_2     control    2950   1390
ctrl_3     control    3360   1510
treat_1    treatment  4100   1780
treat_2    treatment  4380   1850
treat_3    treatment  4020   1710
\`\`\`

这不是实际生物学数据，只是教学数据。它的作用是让大家先理解：R 怎么创建数据、怎么看数据、怎么筛选、怎么汇总、怎么保存结果。

## 二、第一行代码：把结果交给对象

R 代码最常见的动作是“把右边的结果保存到左边的名字里”：

\`\`\`r
x <- 10
\`\`\`

这里：

- \`x\` 是对象名；
- \`<-\` 是赋值符号；
- \`10\` 是保存进去的值。

运行后，R 的环境里会出现一个叫 \`x\` 的对象。以后只要写 \`x\`，R 就会去找这个对象当前保存的值。

\`\`\`r
x
x + 5
\`\`\`

在真实分析里，\`x\` 可以换成表达矩阵、样本分组表、差异分析结果、富集分析结果等对象。初学时先记住一句话：**R 不是把结果自动存在某个神秘地方，而是需要我们把重要结果明确保存到对象里。**

对象名建议使用英文、数字和下划线，且不要用数字开头。例如：

\`\`\`r
sample_qc <- 100
mean_cells <- 3668
\`\`\`

不要写成：

\`\`\`r
1sample <- 100
sample-qc <- 100
\`\`\`

第一种以数字开头，第二种会被 R 理解成 \`sample - qc\`，都不适合作为对象名。

## 三、向量：R 里最常见的基础数据

R 里很多基础数据都是向量。可以先把向量理解成“一列同类型的数据”。

官方 [\`c()\` 文档](https://search.r-project.org/R/refmans/base/html/c.html) 说明，\`c()\` 会把多个参数组合起来，默认形成一个向量。

\`\`\`r
sample_id <- c("ctrl_1", "ctrl_2", "ctrl_3", "treat_1", "treat_2", "treat_3")
group <- c("control", "control", "control", "treatment", "treatment", "treatment")
cells <- c(3200, 2950, 3360, 4100, 4380, 4020)
median_genes <- c(1450, 1390, 1510, 1780, 1850, 1710)
\`\`\`

这四行分别创建了四个向量：

- \`sample_id\`：样本名；
- \`group\`：分组；
- \`cells\`：每个样本检测到的细胞数；
- \`median_genes\`：每个样本的中位基因数。

可以用这些命令做基础检查：

\`\`\`r
length(sample_id)
class(cells)
mean(cells)
\`\`\`

对生信数据来说，向量很常见。比如一列基因名、一列样本名、一列 p 值、一列 logFC，本质上都可以先按向量理解。

## 四、数据框：把样本信息整理成表

单独的向量还不够方便，因为真实分析通常是一张表。R 里最常见的表格结构是 \`data.frame\`。

官方 [\`data.frame()\` 文档](https://search.r-project.org/R/refmans/base/html/data.frame.html) 说明，数据框是多个变量的集合，是 R 建模软件常用的基础数据结构。可以先把它理解成：**列是变量，行是样本或观测。**

\`\`\`r
qc <- data.frame(
  sample_id = sample_id,
  group = group,
  cells = cells,
  median_genes = median_genes
)
\`\`\`

运行后，\`qc\` 就是一张 6 行 4 列的表。

\`\`\`r
qc
\`\`\`

输出类似：

\`\`\`text
  sample_id     group cells median_genes
1    ctrl_1   control  3200         1450
2    ctrl_2   control  2950         1390
3    ctrl_3   control  3360         1510
4   treat_1 treatment  4100         1780
5   treat_2 treatment  4380         1850
6   treat_3 treatment  4020         1710
\`\`\`

这里要注意：每一列长度必须一致。不能 \`sample_id\` 有 6 个，\`cells\` 只有 5 个。否则这张表的行就对不齐。

## 五、检查对象：head、str 和 summary

很多新手会在读入数据后直接分析，这是一个容易出错的习惯。每次创建或读入对象后，都应该先检查。

常用三件套：

\`\`\`r
head(qc)
str(qc)
summary(qc)
\`\`\`

官方 [\`head()\` 文档](https://search.r-project.org/R/refmans/utils/html/head.html) 说明，它返回对象的前几部分；[\`str()\` 文档](https://search.r-project.org/R/refmans/utils/html/str.html) 说明，它会紧凑显示对象内部结构；[\`summary()\` 文档](https://search.r-project.org/R/refmans/base/html/summary.html) 用来生成对象摘要。

它们各自适合回答不同问题：

- \`head(qc)\`：这张表前几行长什么样；
- \`str(qc)\`：每一列是什么类型；
- \`summary(qc)\`：数值列的大致范围和分布。

例如 \`str(qc)\` 会输出：

\`\`\`text
'data.frame': 6 obs. of  4 variables:
 $ sample_id   : chr  "ctrl_1" "ctrl_2" "ctrl_3" "treat_1" ...
 $ group       : chr  "control" "control" "control" "treatment" ...
 $ cells       : num  3200 2950 3360 4100 4380
 $ median_genes: num  1450 1390 1510 1780 1850
\`\`\`

这一步在生信分析里非常关键。比如样本分组列本来应该是字符或因子，结果被读成了数字；表达矩阵本来应该有几万个基因，结果只剩几十行。这些问题都应该在正式分析前发现。

## 六、索引和筛选：取出想看的行列

R 的方括号 \`[]\` 用来从对象中取出一部分。官方 [\`Extract\` 文档](https://search.r-project.org/R/refmans/base/html/Extract.html) 介绍了用 \`[\`, \`[[\`, \`$\` 提取或替换对象部分的方式。

对数据框来说，最常见的写法是：

\`\`\`text
数据框[行, 列]
\`\`\`

取前两行：

\`\`\`r
first_two_rows <- qc[1:2, ]
\`\`\`

取指定列：

\`\`\`r
selected_columns <- qc[, c("sample_id", "cells")]
\`\`\`

用 \`$\` 取某一列：

\`\`\`r
qc$group
qc$cells
\`\`\`

按条件筛选 treatment 组：

\`\`\`r
treatment_qc <- qc[qc$group == "treatment", ]
\`\`\`

这里 \`qc$group == "treatment"\` 会得到一组 TRUE/FALSE。官方 [Relational Operators 文档](https://search.r-project.org/R/refmans/base/html/Comparison.html) 说明，\`==\` 这类比较运算符会逐元素比较并返回逻辑结果。

可以先单独运行：

\`\`\`r
qc$group == "treatment"
\`\`\`

结果类似：

\`\`\`text
FALSE FALSE FALSE TRUE TRUE TRUE
\`\`\`

再把它放进行位置，R 就会保留 TRUE 对应的行。

## 七、简单汇总：按分组计算平均值

筛选只是取数据，汇总才开始回答问题。比如我们想知道 control 组和 treatment 组平均细胞数是多少，可以用 \`aggregate()\`。

官方 [\`aggregate()\` 文档](https://search.r-project.org/R/refmans/stats/html/aggregate.html) 说明，它可以对数据子集计算汇总统计量。

\`\`\`r
group_summary <- aggregate(
  cbind(cells, median_genes) ~ group,
  data = qc,
  FUN = mean
)
\`\`\`

这段代码拆开看：

- \`cbind(cells, median_genes)\`：把两列数值作为要汇总的对象；
- \`~ group\`：按照 \`group\` 分组；
- \`data = qc\`：数据来自 \`qc\`；
- \`FUN = mean\`：每组计算平均值。

输出结果：

\`\`\`text
      group    cells median_genes
1   control 3170.000         1450
2 treatment 4166.667         1780
\`\`\`

这个结果的含义是：在这份教学数据里，treatment 组平均细胞数和中位基因数更高。但必须强调，这只是模拟教学数据，不能推出真实生物学结论。

真实项目里，汇总结果常用于质控检查。例如单细胞分析中，不同样本的细胞数、检测基因数、线粒体比例是否明显异常，都会影响后面的过滤策略。

## 八、画第一张图并保存

有了汇总表，就可以把结果画出来。零基础阶段先用 base R 的 \`barplot()\` 或 \`plot()\` 就够。

官方 [\`plot()\` 文档](https://search.r-project.org/R/refmans/base/help/plot.html) 说明，\`plot()\` 是 R 的通用绘图函数，可以根据对象类型调用不同绘图方法。这里我们用更适合柱状图的 \`barplot()\`：

\`\`\`r
png("results/r-zero-basics-summary.png", width = 1200, height = 720, res = 150, type = "cairo")
barplot(
  group_summary$cells,
  names.arg = group_summary$group,
  col = c("#2F6F73", "#D88C3D"),
  border = NA,
  ylim = c(0, max(group_summary$cells) * 1.25),
  main = "Mean detected cells by group",
  xlab = "Group",
  ylab = "Mean cells"
)
dev.off()
\`\`\`

![R语言零基础入门第一张结果图](/tutorials/r/zero-basics/r-zero-basics-summary.png)

这段代码的关键点：

- \`png()\`：打开一个 PNG 图形设备，告诉 R 接下来把图画到文件里；
- \`barplot()\`：画柱状图；
- \`group_summary$cells\`：柱子的高度；
- \`names.arg = group_summary$group\`：每个柱子的名字；
- \`dev.off()\`：关闭图形设备，文件才会完整写出。

在 RStudio 里，如果不写 \`png()\`，图会出现在 Plots 面板；如果写了 \`png()\`，图会保存到指定路径。

## 九、把结果写成 CSV

分析结果不能只停留在 Console。真正做项目时，关键中间结果和最终结果都应该保存成文件。

官方 [\`write.table()\` / \`write.csv()\` 文档](https://search.r-project.org/R/refmans/utils/html/write.table.html) 说明，这类函数用于把 R 对象写成文件。

\`\`\`r
write.csv(qc, "data/sample_qc_zero_basics.csv", row.names = FALSE)
write.csv(group_summary, "results/group_summary_zero_basics.csv", row.names = FALSE)
\`\`\`

这里：

- 第一行保存原始教学表；
- 第二行保存分组汇总表；
- \`row.names = FALSE\` 表示不要把 R 自动生成的行号写入 CSV。

运行完成后，目录里应该出现：

\`\`\`text
data/sample_qc_zero_basics.csv
results/group_summary_zero_basics.csv
results/r-zero-basics-summary.png
\`\`\`

这就是一个最小可复现分析闭环：代码能从头运行，数据能保存，结果图能打开，下一次也能复查。

## 十、小结、练习与官方来源

这篇真正开始了 R 语言零基础入门。现在大家至少应该理解：

- 对象是 R 保存结果的地方；
- 向量是一列同类型数据；
- 数据框是最常用的表格结构；
- \`head()\`、\`str()\`、\`summary()\` 用来检查对象；
- \`[]\`、\`$\` 和 \`==\` 可以完成基础提取和筛选；
- \`aggregate()\` 可以按分组汇总；
- 图和表要写入 \`results/\`，方便复现。

建议练习：

1. 把 \`cells\` 改成你自己设定的 6 个数字，再重新运行脚本。
2. 新增一列 \`percent_mito\`，表示线粒体比例。
3. 筛选出 \`cells > 3500\` 的样本。
4. 用 \`aggregate()\` 计算每组 \`percent_mito\` 的平均值。
5. 再保存一张新的柱状图。

如果你还没有熟悉 RStudio 四个窗格，可以先回到 [初步认识 RStudio 界面](/blog/rstudio-interface-beginner-guide)。如果环境还没有配置好，先看 [2026全网最新R语言安装教程](/blog/r-language-install-2026)。

参考与官方来源：

- [c(): Combine Values into a Vector or List](https://search.r-project.org/R/refmans/base/html/c.html)
- [data.frame(): Data Frames](https://search.r-project.org/R/refmans/base/html/data.frame.html)
- [head(): Return the First or Last Parts of an Object](https://search.r-project.org/R/refmans/utils/html/head.html)
- [str(): Compactly Display the Structure of an Arbitrary R Object](https://search.r-project.org/R/refmans/utils/html/str.html)
- [summary(): Object Summaries](https://search.r-project.org/R/refmans/base/html/summary.html)
- [Extract: Extract or Replace Parts of an Object](https://search.r-project.org/R/refmans/base/html/Extract.html)
- [Comparison: Relational Operators](https://search.r-project.org/R/refmans/base/html/Comparison.html)
- [aggregate(): Compute Summary Statistics of Data Subsets](https://search.r-project.org/R/refmans/stats/html/aggregate.html)
- [plot(): Generic X-Y Plotting](https://search.r-project.org/R/refmans/base/help/plot.html)
- [write.table()/write.csv(): Data Output](https://search.r-project.org/R/refmans/utils/html/write.table.html)`,
  },

  {
    slug: "r-beginner-four-basic-tasks",
    title: "R小白必须会做的四件事情 | 导入包、导入数据、排查Bug、导出结果",
    excerpt:
      "面向R语言零基础小白的实用教程：用一个可运行脚本讲清安装和加载包、导入CSV数据、排查路径和列名错误、使用tryCatch记录问题、导出CSV表格和PNG图片。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "20 分钟",
    tags: ["R", "R语言入门", "R包", "数据导入", "调试", "结果导出", "生信入门"],
    cover: "/tutorials/r/four-tasks/r-four-tasks-flow.png",
    featured: true,
    content: `前面我们已经完成了 [R语言零基础入门](/blog/r-zero-basics-guide)，知道对象、向量、数据框和结果图是怎么串起来的。接下来我想把学习 R 的重点拉回到更实际的问题：**R 小白必须会做哪几件事情，才能真的开始独立跑分析？**

我认为最基础、最常用、也最容易反复踩坑的就是四件事：

\`\`\`text
导入包 -> 导入数据 -> 排查 Bug 或调试 -> 导出结果
\`\`\`

![R小白必须会做的四件事情流程图](/tutorials/r/four-tasks/r-four-tasks-flow.png)

这四件事听起来很普通，但真实项目里每天都会出现。转录组差异分析、单细胞 Seurat 分析、临床表格整理、多组学结果汇总，基本都离不开它们。

本篇配套脚本：

\`\`\`text
rawtie/05-R小白必须会做的四件事情/code/r-four-basic-tasks-demo.R
\`\`\`

博客静态资源：

- [示例 R 脚本](/tutorials/r/four-tasks/r-four-basic-tasks-demo.R)
- [演示输入 CSV](/tutorials/r/four-tasks/sample_qc_four_tasks.csv)
- [演示汇总 CSV](/tutorials/r/four-tasks/group_summary_four_tasks.csv)
- [调试日志 TXT](/tutorials/r/four-tasks/debug_log_four_tasks.txt)

## 一、为什么先学这四件事

很多同学刚开始学 R，会马上问：“Seurat 怎么跑？”“差异分析代码能不能直接给我？”但如果连包怎么加载、数据怎么读、报错怎么看、结果怎么保存都不熟，后面拿到再完整的流程也很难独立跑通。

R 官方 [R Data Import/Export](https://cran.r-project.cn/doc/manuals/r-release/R-data.html) 手册开头就提到，把数据导入统计系统并把结果导出到其他系统，往往会比统计分析本身更让人头疼。这个判断非常真实。

所以这篇不讲复杂模型，只解决四个日常动作：

- **导入包**：让当前 R 会话能使用某个工具；
- **导入数据**：把 CSV、TXT 或 Excel 表读进 R；
- **排查 Bug**：看懂路径、列名、对象不存在、包未安装这些常见错误；
- **导出结果**：把表格、图片和日志保存到 \`results/\`。

本篇示例仍然使用一个小型样本质控表，模拟生信分析里常见的样本信息和 QC 指标。

## 二、第一件事：安装包和加载包不是一回事

很多 R 小白会把“安装包”和“导入包”混在一起。严格说，R 里更常见的说法是：

\`\`\`text
install packages -> 安装包
load / attach packages -> 加载或附加包
\`\`\`

官方 [\`install.packages()\` 文档](https://search.r-project.org/R/refmans/utils/html/install.packages.html) 说明，它会从仓库下载包并安装到库目录。安装通常只需要做一次：

\`\`\`r
install.packages("readr")
\`\`\`

但每次重新打开 R，会话都是新的。想使用包里的函数，还需要加载：

\`\`\`r
library(readr)
\`\`\`

官方 [\`library()\` 文档](https://search.r-project.org/R/refmans/base/html/library.html) 说明，\`library()\` 和 \`require()\` 会加载并附加扩展包。

一句话区分：

- \`install.packages("包名")\`：把包安装到电脑上；
- \`library(包名)\`：把已安装的包加载到当前 R 会话；
- \`requireNamespace("包名", quietly = TRUE)\`：检查包是否可用，但不一定附加到搜索路径。

在脚本里我常这样写：

\`\`\`r
has_readr <- requireNamespace("readr", quietly = TRUE)
cat("readr installed:", has_readr, "\n")
\`\`\`

这段代码的好处是：如果 \`readr\` 没装，脚本不会立刻崩掉，而是返回 \`FALSE\`。在教学脚本或可复现流程里，这种检查很实用。

## 三、包加载失败时先看这三件事

加载包失败时，新手最常见的反应是把报错整段复制到搜索引擎。搜索当然有用，Hadley Wickham 在 [Advanced R Debugging](https://adv-r.hadley.nz/debugging.html) 里也建议错误信息可以先搜索，但在搜索前，最好先自己检查三件事。

第一，看包到底有没有安装：

\`\`\`r
requireNamespace("readr", quietly = TRUE)
\`\`\`

第二，看库目录在哪里：

\`\`\`r
.libPaths()
\`\`\`

第三，看当前 R 版本：

\`\`\`r
R.version.string
\`\`\`

社区教程里也经常强调这一点。比如 CSDN 的 R 入门文章会把 \`install.packages()\` 和 \`library()\` 分开讲，提醒安装时包名要加引号，加载时通常不加引号。这个细节很基础，但确实是新手高频错误。

建议新手先形成一个固定判断：

\`\`\`r
install.packages("readr")  # 没装时才需要
library(readr)             # 每次新会话都需要
\`\`\`

如果以后进入 Bioconductor 包，比如 \`DESeq2\`、\`clusterProfiler\`、\`SingleR\`，安装方式会不一样。这个我会在下一篇 **R里面包的安装方式** 里单独讲。

## 四、第二件事：导入数据前先确认路径

导入数据之前，先不要急着写 \`read.csv()\`。我建议先确认三个问题：

\`\`\`r
getwd()
list.files()
file.exists("data/sample_qc_four_tasks.csv")
\`\`\`

这三行分别回答：

- 当前工作目录在哪里；
- 当前目录下有什么文件；
- 目标文件是否真的存在。

RStudio 里也可以通过 Environment 面板或 File 菜单导入数据。Posit/RStudio 相关教程和中文社区文章都提到，RStudio 的 Import Dataset 功能适合新手第一次观察导入代码，但正式分析时，还是建议把导入过程写进脚本。

本篇脚本先创建一个演示 CSV：

\`\`\`r
sample_qc <- data.frame(
  sample_id = c("ctrl_1", "ctrl_2", "ctrl_3", "treat_1", "treat_2", "treat_3"),
  group = c("control", "control", "control", "treatment", "treatment", "treatment"),
  cells = c(3200, 2950, 3360, 4100, 4380, 4020),
  median_genes = c(1450, 1390, 1510, 1780, 1850, 1710),
  percent_mito = c(4.8, 5.1, 4.3, 6.2, 5.7, 6.5)
)

write.csv(sample_qc, "data/sample_qc_four_tasks.csv", row.names = FALSE)
\`\`\`

这样读者可以不依赖外部下载文件，先跑通导入和导出流程。

## 五、用 read.csv 或 readr::read_csv 导入表格

CSV 是最常见的入门数据格式。base R 可以直接用：

\`\`\`r
qc <- read.csv("data/sample_qc_four_tasks.csv", stringsAsFactors = FALSE)
\`\`\`

R 官方 [R Data Import/Export](https://cran.r-project.cn/doc/manuals/r-release/R-data.html) 手册介绍了 \`read.table()\`、\`read.csv()\` 这类函数。它们适合读入普通文本表格。

如果已经安装 tidyverse 或 readr，也可以用：

\`\`\`r
library(readr)
qc <- read_csv("data/sample_qc_four_tasks.csv", show_col_types = FALSE)
\`\`\`

readr 官方文档说明，\`read_csv()\`、\`read_tsv()\` 等函数用于把矩形文本文件读成 tibble，并且会给出列类型信息。对大表格和 tidyverse 工作流来说，\`readr::read_csv()\` 很常见。

导入后不要马上分析，先检查：

\`\`\`r
head(qc)
str(qc)
summary(qc)
\`\`\`

这一步可以提前发现很多问题：列名读错、分隔符不对、数字列被读成字符、缺失值没有识别、文件路径读错。

## 六、导入数据后先做三类检查

导入数据后，我通常先检查三类东西。

第一，检查行列数：

\`\`\`r
dim(qc)
nrow(qc)
ncol(qc)
\`\`\`

第二，检查列名：

\`\`\`r
names(qc)
\`\`\`

第三，检查关键列是否存在：

\`\`\`r
required_columns <- c("sample_id", "group", "cells", "median_genes", "percent_mito")
missing_columns <- setdiff(required_columns, names(qc))

if (length(missing_columns) > 0) {
  stop("Missing required columns: ", paste(missing_columns, collapse = ", "))
}
\`\`\`

这段代码非常值得 R 小白学会。它解决的是一个真实痛点：很多分析流程后面报错，不是统计方法错了，而是一开始列名就不对。

比如代码里写的是 \`group\`，表格里实际叫 \`Group\`、\`condition\` 或 \`分组\`，后面再怎么复制代码都会报错。先检查列名，比盲目改后面的分析函数更有效。

## 七、第三件事：报错时先定位是哪一步错了

R 报错时，不要只看最后一句，也不要立刻重启 RStudio。先判断错误发生在哪一步。

常见错误可以先分成四类：

- **路径错误**：文件不存在，通常是工作目录或文件名错；
- **对象错误**：\`object not found\`，通常是对象没创建或名字拼错；
- **列名错误**：\`undefined columns selected\`，通常是数据框没有这列；
- **包错误**：\`there is no package called\`，通常是包没安装或库路径不对。

本篇脚本故意写了一个不存在的路径：

\`\`\`r
safe_read_csv <- function(path) {
  tryCatch(
    read.csv(path, stringsAsFactors = FALSE),
    error = function(e) {
      msg <- paste("Import failed:", conditionMessage(e))
      message(msg)
      debug_log <<- c(debug_log, msg)
      NULL
    }
  )
}

missing_data <- safe_read_csv("data/not_exist.csv")
\`\`\`

运行后会记录类似信息：

\`\`\`text
Import failed: 无法打开链结
\`\`\`

这不是让大家在正式分析里忽略错误，而是演示如何把错误捕获下来，方便后面统一写入日志。

## 八、调试时用 traceback、browser 和断点

简单报错可以靠读错误信息解决；复杂报错就需要调试。

RStudio 官方 [Debugging with the RStudio IDE](https://support.posit.co/hc/en-us/articles/205612627-Debugging-with-the-RStudio-IDE) 介绍了断点、逐行执行、查看环境和调用栈等调试工具。对新手来说，先掌握三个动作就够。

第一，出错后运行：

\`\`\`r
traceback()
\`\`\`

它会显示函数调用路径。Advanced R 的调试章节也强调，\`traceback()\` 能帮助定位错误来自哪里。

第二，在怀疑出错的位置插入：

\`\`\`r
browser()
\`\`\`

代码运行到这里会暂停，Console 会进入 \`Browse[1]>\` 状态。此时可以输入对象名查看当前值。

第三，在 RStudio 里点击行号左侧设置断点。RStudio 官方文档说明，断点可以让代码运行到某一行暂停，然后逐步向下执行。

常用调试原则：

- 先让错误可重复出现；
- 再缩小到最小代码片段；
- 每一步都检查对象是否符合预期；
- 不要一口气运行几百行再猜哪里错。

## 九、第四件事：导出表格、图片和日志

分析结果必须保存。只在 Console 里看到结果，不算真正完成分析。

官方 [\`write.table()\` / \`write.csv()\` 文档](https://search.r-project.org/R/refmans/utils/html/write.table.html) 说明，这类函数用于把数据写出到文件。本篇脚本导出分组汇总表：

\`\`\`r
group_summary <- aggregate(
  cbind(cells, median_genes, percent_mito, cells_per_gene) ~ group,
  data = qc,
  FUN = mean
)

write.csv(group_summary, "results/group_summary_four_tasks.csv", row.names = FALSE)
\`\`\`

同时保存 debug 日志：

\`\`\`r
writeLines(debug_log, "results/debug_log_four_tasks.txt")
\`\`\`

保存图片：

\`\`\`r
png("results/r-four-tasks-summary.png", width = 1200, height = 720, res = 150, type = "cairo")
plot(
  qc$median_genes,
  qc$cells,
  pch = 19,
  col = ifelse(qc$group == "control", "#2F6F73", "#D88C3D"),
  xlab = "Median genes",
  ylab = "Detected cells",
  main = "Basic QC check after data import"
)
dev.off()
\`\`\`

![R小白导入数据后保存的第一张质控图](/tutorials/r/four-tasks/r-four-tasks-summary.png)

这张图的意义是：导入数据后快速检查 \`median_genes\` 和 \`cells\` 的关系。它不是正式质控标准，只是教学示例。

## 十、小结、练习和下一篇

这篇只讲四件事，但这四件事是后续所有 R 分析的基础。

现在你应该会：

- 用 \`install.packages()\` 安装包；
- 用 \`library()\` 加载包；
- 用 \`read.csv()\` 或 \`readr::read_csv()\` 导入数据；
- 用 \`head()\`、\`str()\`、\`names()\` 检查数据；
- 用 \`tryCatch()\` 捕获可预期错误；
- 用 \`traceback()\`、\`browser()\` 和 RStudio 断点定位问题；
- 用 \`write.csv()\`、\`writeLines()\` 和 \`png()\` 导出结果。

建议练习：

1. 把 \`data/sample_qc_four_tasks.csv\` 复制一份，故意改错一个列名，再观察脚本如何报错。
2. 把 \`percent_mito > 6\` 改成 \`percent_mito > 5.5\`，看看筛选出的样本如何变化。
3. 在图里把颜色换成自己喜欢的配色。
4. 新增一列 \`batch\`，再尝试按 \`group\` 和 \`batch\` 做汇总。

下一篇建议继续进入：**R里面包的安装方式**。那一篇会专门讲 CRAN、Bioconductor、GitHub、本地包、镜像、Rtools、版本依赖和安装报错。

参考与来源：

- [R Data Import/Export](https://cran.r-project.cn/doc/manuals/r-release/R-data.html)
- [install.packages(): Install Packages from Repositories or Local Files](https://search.r-project.org/R/refmans/utils/html/install.packages.html)
- [library(): Loading/Attaching and Listing of Packages](https://search.r-project.org/R/refmans/base/html/library.html)
- [write.table()/write.csv(): Data Output](https://search.r-project.org/R/refmans/utils/html/write.table.html)
- [readr package index](https://readr.tidyverse.org/reference/index.html)
- [readr::read_csv(): Read a delimited file](https://readr.tidyverse.org/reference/read_delim.html)
- [R for Data Science: Data import](https://r4ds.had.co.nz/data-import.html)
- [Debugging with the RStudio IDE](https://support.posit.co/hc/en-us/articles/205612627-Debugging-with-the-RStudio-IDE)
- [Advanced R: Debugging](https://adv-r.hadley.nz/debugging.html)
- [CSDN：R语言基础操作与文件读取](https://blog.csdn.net/weixin_72965820/article/details/136436194)`,
  },

  {
    slug: "r-package-install-methods",
    title: "R里面包的安装方式 | CRAN、Bioconductor、GitHub、本地包和常见报错",
    excerpt:
      "面向R语言新手的R包安装教程：讲清install.packages、BiocManager::install、remotes::install_github、pak、本地源码包、二进制包、镜像、Rtools和常见安装失败排查。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "22 分钟",
    tags: ["R", "R包", "CRAN", "Bioconductor", "GitHub", "Rtools", "生信环境"],
    cover: "/tutorials/r/package-install/r-package-install-flow.png",
    featured: true,
    content: `上一篇我们讲了 [R小白必须会做的四件事情](/blog/r-beginner-four-basic-tasks)，其中第一件事就是“导入包”。但真正开始学习 R 后，大家很快会发现：**R 包不是只有一种安装方式**。

有的包来自 CRAN，有的包来自 Bioconductor，有的包只在 GitHub 上，有的教程让你用 \`remotes::install_github()\`，有的又让你装 \`pak\`，还有人发给你一个 \`.tar.gz\` 或 \`.zip\` 本地包。新手最容易卡在这里。

这篇我就把 R 里面常见的包安装方式系统梳理一遍。

![R包安装方式总览图](/tutorials/r/package-install/r-package-install-flow.png)

本篇配套脚本：

\`\`\`text
rawtie/06-R里面包的安装方式/code/r-package-install-methods-demo.R
\`\`\`

博客静态资源：

- [示例 R 脚本](/tutorials/r/package-install/r-package-install-methods-demo.R)
- [包安装方式命令表](/tutorials/r/package-install/package_install_methods.csv)
- [本机包状态检查表](/tutorials/r/package-install/package_status.csv)
- [本机 R 环境信息表](/tutorials/r/package-install/r_package_install_env.csv)

## 一、先搞懂 R 包到底是什么

R 包可以先理解成“别人已经写好的工具箱”。比如：

- \`ggplot2\`：画图；
- \`dplyr\`：整理表格；
- \`readr\`：读取文本表格；
- \`DESeq2\`：转录组差异分析；
- \`Seurat\`：单细胞分析。

R 官方 [R Installation and Administration](https://cran.r-project.org/doc/manuals/r-release/R-admin.html) 手册里有专门章节讲包的安装和管理。简单说，安装包就是把包文件下载、解压、编译或复制到某个 R library 目录里；加载包则是让当前 R 会话能使用这个包。

先检查自己的库目录：

\`\`\`r
.libPaths()
\`\`\`

再看当前仓库设置：

\`\`\`r
getOption("repos")
\`\`\`

再看默认包类型：

\`\`\`r
getOption("pkgType")
\`\`\`

这几个信息很关键。包安装失败时，经常不是代码错，而是库目录、仓库、网络、R 版本或编译工具的问题。

## 二、第一种：从 CRAN 安装普通 R 包

最常见的安装方式是从 CRAN 安装：

\`\`\`r
install.packages("ggplot2")
\`\`\`

官方 [\`install.packages()\` 文档](https://search.r-project.org/R/refmans/utils/html/install.packages.html) 说明，它可以从仓库或本地文件安装包，并处理依赖、库路径和包类型。

安装成功后，每次新开 R 会话都需要加载：

\`\`\`r
library(ggplot2)
\`\`\`

如果要一次安装多个包：

\`\`\`r
install.packages(c("ggplot2", "dplyr", "readr"))
\`\`\`

国内网络不稳定时，可以指定镜像：

\`\`\`r
options(repos = c(CRAN = "https://mirrors.tuna.tsinghua.edu.cn/CRAN/"))
install.packages("ggplot2")
\`\`\`

清华 TUNA 的 [CRAN 镜像页面](https://mirrors.tuna.tsinghua.edu.cn/CRAN/) 和 USTC 的 [CRAN 镜像页面](https://mirrors.ustc.edu.cn/CRAN/) 都是国内常用入口。

我的建议是：**普通数据分析包优先从 CRAN 安装**。比如 \`ggplot2\`、\`dplyr\`、\`readr\`、\`tidyr\` 这类，除非教程明确要求开发版，否则不要一上来就从 GitHub 装。

## 三、第二种：从 Bioconductor 安装生信包

生信分析里很多核心包不在 CRAN，而在 Bioconductor。比如：

- \`DESeq2\`
- \`edgeR\`
- \`limma\`
- \`clusterProfiler\`
- \`SingleR\`
- \`ComplexHeatmap\`

Bioconductor 官方 [Install 页面](https://www.bioconductor.org/install/) 推荐使用 \`BiocManager\`：

\`\`\`r
install.packages("BiocManager")
BiocManager::install("DESeq2")
\`\`\`

也可以一次安装多个：

\`\`\`r
BiocManager::install(c("DESeq2", "clusterProfiler", "org.Hs.eg.db"))
\`\`\`

Bioconductor 比 CRAN 更强调版本匹配。比如 R 的大版本、Bioconductor 版本、包版本之间要对应。官方页面会显示当前推荐的 Bioconductor 版本。写这篇时是 2026-07-28，实际安装前仍然建议先看 Bioconductor 官方页面，因为版本会随 R 版本更新。

检查当前 Bioconductor 版本：

\`\`\`r
BiocManager::version()
\`\`\`

检查包是否过期：

\`\`\`r
BiocManager::valid()
\`\`\`

对后面的转录组和单细胞环境配置来说，这一步非常重要。很多 “DESeq2 装不上”“Seurat 依赖报错”“AnnotationDbi 版本冲突”，本质都是版本和依赖的问题。

## 四、第三种：从 GitHub 安装开发版或非 CRAN 包

有些包还没提交到 CRAN/Bioconductor，或者教程要求使用开发版，这时会用 GitHub。

常见方式是 \`remotes\`：

\`\`\`r
install.packages("remotes")
remotes::install_github("satijalab/seurat")
\`\`\`

\`remotes\` 的 [GitHub 仓库](https://github.com/r-lib/remotes) 介绍了从 GitHub、GitLab、Bitbucket、本地文件等来源安装 R 包的能力。

GitHub 安装适合这些情况：

- 教程明确要求开发版；
- 目标包还没有发布到 CRAN 或 Bioconductor；
- GitHub README 明确写了安装命令；
- 需要某个修复了 bug 的最新版。

但新手要注意：GitHub 版本通常变化更快，稳定性不一定比正式发布版好。尤其是分析流程用于论文或长期项目时，不建议随便追最新开发版。

安装 GitHub 包前，最好先读包的 README，确认作者推荐的安装命令。比如 Seurat 官方 GitHub 页面会给出开发版相关说明，而正式使用时更建议优先看其官方安装页面。

## 五、第四种：用 pak 安装并解析依赖

\`pak\` 是近年来很常见的 R 包安装工具。它的目标是更快、更清楚地解析依赖，并支持 CRAN、Bioconductor、GitHub、本地包等多种来源。

pak 官方网站 [pak.r-lib.org](https://pak.r-lib.org/) 介绍，\`pak\` 可以安装 CRAN、Bioconductor、GitHub、本地目录和包文件，也会给出更清楚的依赖解析信息。

安装 \`pak\`：

\`\`\`r
install.packages("pak")
\`\`\`

使用：

\`\`\`r
pak::pkg_install("ggplot2")
pak::pkg_install("Bioconductor/DESeq2")
pak::pkg_install("satijalab/seurat")
\`\`\`

对新手来说，\`pak\` 的优势是错误信息通常更清楚，依赖解析也更现代。但它本身也是一个包，所以第一次仍然需要先安装 \`pak\`。

我的建议：

- 新手先掌握 \`install.packages()\` 和 \`BiocManager::install()\`；
- 需要 GitHub 或复杂依赖时，再学 \`remotes\` 或 \`pak\`；
- 看到别人教程里写 \`pak::pkg_install()\` 不要慌，它本质上还是在帮你安装包。

## 六、第五种：安装本地包文件

有时别人会发你一个包文件，比如：

\`\`\`text
pkg_1.0.0.tar.gz
pkg_1.0.0.zip
\`\`\`

这时可以从本地安装。

源码包：

\`\`\`r
install.packages("pkg_1.0.0.tar.gz", repos = NULL, type = "source")
\`\`\`

Windows 二进制包：

\`\`\`r
install.packages("pkg_1.0.0.zip", repos = NULL, type = "win.binary")
\`\`\`

这里最重要的是 \`repos = NULL\`，意思是不要去 CRAN 仓库找，而是安装本地文件。

如果是源码包，而且包里包含 C/C++/Fortran 代码，Windows 上通常需要 Rtools。CRAN 官方 [Rtools for Windows](https://cran.r-project.org/bin/windows/Rtools/) 页面会给出不同 R 版本对应的 Rtools。后面写转录组和单细胞环境安装时，Rtools 会再次出现。

## 七、什么时候需要 Rtools

Rtools 不是每次安装包都需要。新手最容易误解成“装 R 必须装 Rtools 才能装包”。更准确的说法是：

\`\`\`text
安装二进制包：通常不需要 Rtools
安装源码包且需要编译：Windows 通常需要 Rtools
\`\`\`

CRAN Windows 的 [Rtools 页面](https://cran.r-project.org/bin/windows/Rtools/) 说明，Rtools 用于在 Windows 上从源代码构建 R 和 R 包。

举例：

\`\`\`r
install.packages("ggplot2")
\`\`\`

如果 CRAN 有适合你 R 版本和系统的 Windows 二进制包，通常不需要 Rtools。

但如果出现类似：

\`\`\`text
package is only available in source form
\`\`\`

或者安装中出现 C++、Fortran、\`make\`、\`gcc\` 相关报错，就要考虑 Rtools 或系统编译工具是否配置好。

在 Linux/macOS 上，类似问题会变成系统依赖问题，比如缺少 \`libcurl\`、\`openssl\`、\`xml2\`、\`gfortran\` 等。

## 八、安装失败时按这个顺序排查

包安装失败不要乱改。先按顺序排查。

第一，看包名有没有拼错：

\`\`\`r
install.packages("ggplot2")
\`\`\`

注意包名要加引号。

第二，看仓库是否可访问：

\`\`\`r
getOption("repos")
\`\`\`

必要时换镜像：

\`\`\`r
options(repos = c(CRAN = "https://mirrors.ustc.edu.cn/CRAN/"))
\`\`\`

第三，看库目录有没有权限：

\`\`\`r
.libPaths()
\`\`\`

如果提示没有写权限，可以换用户库目录或以管理员权限运行 RStudio。

第四，看 R 版本是否太旧：

\`\`\`r
R.version.string
\`\`\`

很多新包会要求较新的 R 版本。R 官方和 CRAN 页面都会标明包依赖版本。

第五，看是不是生信包装错来源：

\`\`\`r
install.packages("DESeq2")       # 很可能不对
BiocManager::install("DESeq2")   # 正确方向
\`\`\`

第六，看是不是源码编译失败。Windows 查 Rtools，Linux/macOS 查系统依赖。

CSDN、知乎、GitHub issue 这类社区资料的价值就在这里：官方文档告诉你原理，社区帖子往往能补充中文系统环境、国内镜像、权限和编译报错的具体处理经验。

## 九、写进脚本：检查环境和包状态

正式项目里，我建议把环境检查写进脚本，而不是靠记忆。

本篇配套脚本会生成一张安装方式表：

\`\`\`r
install_methods <- data.frame(
  source = c("CRAN", "Bioconductor", "GitHub", "pak", "local_source", "local_binary_zip"),
  command = c(
    'install.packages("ggplot2")',
    'BiocManager::install("DESeq2")',
    'remotes::install_github("satijalab/seurat")',
    'pak::pkg_install("tidyverse/ggplot2")',
    'install.packages("pkg_1.0.0.tar.gz", repos = NULL, type = "source")',
    'install.packages("pkg_1.0.0.zip", repos = NULL, type = "win.binary")'
  )
)
\`\`\`

也会检查常见工具包是否安装：

\`\`\`r
packages_to_check <- c("BiocManager", "remotes", "pak", "readr", "ggplot2")

package_status <- data.frame(
  package = packages_to_check,
  installed = vapply(packages_to_check, requireNamespace, logical(1), quietly = TRUE)
)
\`\`\`

运行后得到：

\`\`\`text
data/package_install_methods.csv
results/r_package_install_env.csv
results/package_status.csv
\`\`\`

这类检查在生信课程或团队项目里很有用。别人说“我装不上”，你至少可以先让他发 \`R.version.string\`、\`.libPaths()\`、\`getOption("repos")\` 和包状态表。

## 十、小结和下一篇

这篇把 R 包安装方式系统过了一遍。

新手可以先记住这张表：

| 来源 | 常用命令 | 什么时候用 |
|---|---|---|
| CRAN | \`install.packages("pkg")\` | 普通 R 包 |
| Bioconductor | \`BiocManager::install("pkg")\` | 生信包、注释包 |
| GitHub | \`remotes::install_github("owner/repo")\` | 开发版或未发布包 |
| pak | \`pak::pkg_install("pkg")\` | 更现代的依赖解析 |
| 本地源码包 | \`install.packages("pkg.tar.gz", repos = NULL, type = "source")\` | 本地源码包 |
| 本地二进制包 | \`install.packages("pkg.zip", repos = NULL, type = "win.binary")\` | Windows 本地二进制包 |

学习顺序建议：

1. 先学会 CRAN：\`install.packages()\`。
2. 再学会 Bioconductor：\`BiocManager::install()\`。
3. 再看 GitHub：\`remotes::install_github()\`。
4. 最后学 \`pak\` 和本地包安装。

下一篇我会继续写：**转录组 R 环境安装篇**，重点会放在 \`DESeq2\`、\`edgeR\`、\`limma\`、\`clusterProfiler\`、注释包、Rtools 和 Bioconductor 版本匹配。

参考与来源：

- [R Installation and Administration](https://cran.r-project.org/doc/manuals/r-release/R-admin.html)
- [install.packages(): Install Packages from Repositories or Local Files](https://search.r-project.org/R/refmans/utils/html/install.packages.html)
- [library(): Loading/Attaching and Listing of Packages](https://search.r-project.org/R/refmans/base/html/library.html)
- [Bioconductor Install](https://www.bioconductor.org/install/)
- [BiocManager package](https://cran.r-project.org/package=BiocManager)
- [remotes GitHub repository](https://github.com/r-lib/remotes)
- [pak documentation](https://pak.r-lib.org/)
- [Rtools for Windows](https://cran.r-project.org/bin/windows/Rtools/)
- [R Packages: Package installation](https://r-pkgs.org/setup.html)
- [CSDN：R语言包的安装、加载与卸载](https://blog.csdn.net/weixin_43840509/article/details/105106703)`,
  },

  {
    slug: "r-transcriptome-env-install",
    title: "转录组R环境安装篇 | DESeq2、edgeR、limma、clusterProfiler一次配齐",
    excerpt:
      "面向转录组分析新手的R环境安装教程：从R、RStudio、Rtools、CRAN镜像到Bioconductor，安装DESeq2、edgeR、limma、tximport、clusterProfiler和注释包，并完成环境验证。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "24 分钟",
    tags: ["R", "转录组", "RNA-seq", "DESeq2", "edgeR", "limma", "clusterProfiler", "Bioconductor"],
    cover: "/tutorials/r/transcriptome-env/r-transcriptome-env-flow.png",
    featured: true,
    content: `上一篇我们讲了 [R里面包的安装方式](/blog/r-package-install-methods)，知道普通 R 包、生信包、GitHub 包和本地包的安装来源不一样。现在开始进入更具体的生信环境：**转录组 R 环境安装**。

转录组分析看起来是“跑差异分析”，但真正开始前，最容易卡住的往往不是统计模型，而是环境：R 版本不对、Bioconductor 版本不对、\`DESeq2\` 装不上、\`clusterProfiler\` 缺注释包、火山图包依赖编译失败。

这篇的目标是帮你搭出一套能继续学习转录组分析的 R 环境。

![转录组R环境安装流程图](/tutorials/r/transcriptome-env/r-transcriptome-env-flow.png)

本篇配套脚本：

\`\`\`text
rawtie/07-转录组R环境安装篇/code/r-transcriptome-env-check.R
\`\`\`

博客静态资源：

- [环境检查脚本](/tutorials/r/transcriptome-env/r-transcriptome-env-check.R)
- [转录组安装计划表](/tutorials/r/transcriptome-env/transcriptome_install_plan.csv)
- [转录组包状态表](/tutorials/r/transcriptome-env/transcriptome_package_status.csv)
- [R 环境信息表](/tutorials/r/transcriptome-env/transcriptome_env_info.csv)

## 一、转录组 R 环境到底要装什么

一个入门级转录组 R 环境，至少要覆盖四类工具。

第一类是基础整理和作图：

\`\`\`r
install.packages(c("tidyverse", "pheatmap", "ggrepel", "RColorBrewer", "openxlsx"))
\`\`\`

第二类是差异分析：

\`\`\`r
BiocManager::install(c("DESeq2", "edgeR", "limma"))
\`\`\`

第三类是定量结果导入：

\`\`\`r
BiocManager::install("tximport")
\`\`\`

第四类是富集和注释：

\`\`\`r
BiocManager::install(c("clusterProfiler", "org.Hs.eg.db", "AnnotationDbi"))
\`\`\`

如果还要画更方便的火山图：

\`\`\`r
BiocManager::install("EnhancedVolcano")
\`\`\`

这些包里，\`DESeq2\`、\`edgeR\`、\`limma\`、\`tximport\`、\`clusterProfiler\`、\`org.Hs.eg.db\` 都走 Bioconductor，不建议用 \`install.packages()\` 乱试。

## 二、先确认 R、RStudio 和 Rtools

如果你还没有装好基础环境，先回到 [2026全网最新R语言安装教程](/blog/r-language-install-2026)。转录组环境不是从装 \`DESeq2\` 开始，而是从确认 R 本身开始。

先在 RStudio Console 里运行：

\`\`\`r
R.version.string
.libPaths()
getOption("repos")
getOption("pkgType")
\`\`\`

Windows 用户还要确认 Rtools。Rtools 不是每个包都需要，但 Bioconductor 包一旦需要源码编译，Windows 没有 Rtools 就很容易失败。CRAN 官方 [Rtools for Windows](https://cran.r-project.org/bin/windows/Rtools/) 页面说明，Rtools 用于在 Windows 上从源代码构建 R 和 R 包。

简单判断：

- 普通二进制包：通常不需要 Rtools；
- 源码包且需要编译：Windows 通常需要 Rtools；
- Linux/macOS：通常检查系统编译器和系统库。

## 三、安装 BiocManager 并确认 Bioconductor 版本

Bioconductor 官方 [Install 页面](https://www.bioconductor.org/install/) 推荐先安装 \`BiocManager\`：

\`\`\`r
if (!require("BiocManager", quietly = TRUE)) {
  install.packages("BiocManager")
}
\`\`\`

然后确认 Bioconductor 版本：

\`\`\`r
BiocManager::version()
\`\`\`

当前日期是 2026-07-28。Bioconductor 官方页面显示当前 release 是 3.23，并与 R 4.6.0 对应。这个信息会变，所以实际安装前应该以官方页面为准。

如果你使用的是旧 R，比如 R 4.3.x，对应的 Bioconductor 版本也会更旧。不要硬把最新 Bioconductor 套到旧 R 上。最稳的策略是：

\`\`\`r
BiocManager::valid()
\`\`\`

它会检查当前安装的 Bioconductor 包是否和当前 Bioconductor 版本一致。

## 四、安装差异分析核心包

转录组差异分析最常见的三个包是 \`DESeq2\`、\`edgeR\` 和 \`limma\`。

安装命令：

\`\`\`r
BiocManager::install(c("DESeq2", "edgeR", "limma"))
\`\`\`

Bioconductor 的 [DESeq2 页面](https://bioconductor.org/packages/DESeq2/) 说明，DESeq2 用负二项分布模型估计 count 数据的均值-方差关系并进行差异检验。\`edgeR\` 和 \`limma\` 也是 RNA-seq 差异分析里非常常见的工具。

入门阶段建议三个都装。原因不是每次都要三个一起跑，而是你后面看教程、复现论文、读别人代码时很容易遇到它们。

安装后检查：

\`\`\`r
library(DESeq2)
library(edgeR)
library(limma)
\`\`\`

如果 \`library(DESeq2)\` 失败，先不要急着改分析代码。优先看：

\`\`\`r
BiocManager::valid()
.libPaths()
R.version.string
\`\`\`

## 五、安装数据导入和注释相关包

如果上游使用 Salmon、kallisto 或 RSEM 得到转录本层面的定量结果，经常会用 \`tximport\` 导入：

\`\`\`r
BiocManager::install("tximport")
\`\`\`

富集分析和基因 ID 转换常用：

\`\`\`r
BiocManager::install(c("clusterProfiler", "org.Hs.eg.db", "AnnotationDbi"))
\`\`\`

Bioconductor 的 [\`org.Hs.eg.db\`](https://bioconductor.org/packages/org.Hs.eg.db/) 页面说明，它是人类基因组范围注释包，主要基于 Entrez Gene ID 映射。小鼠则常用：

\`\`\`r
BiocManager::install("org.Mm.eg.db")
\`\`\`

\`clusterProfiler\` 官方页面说明，它用于基因簇的功能分析和可视化，常见任务包括 GO、KEGG、GSEA 等。

这里最容易踩坑的是物种注释包。不要做人类数据时装 \`org.Mm.eg.db\`，也不要小鼠数据装 \`org.Hs.eg.db\`。注释包必须和物种一致。

## 六、安装作图和结果整理包

转录组分析不是只得到一张差异基因表，还要画 PCA、热图、火山图、富集图。

常见 CRAN 包：

\`\`\`r
install.packages(c("tidyverse", "pheatmap", "ggrepel", "RColorBrewer", "openxlsx"))
\`\`\`

常见 Bioconductor 作图包：

\`\`\`r
BiocManager::install("EnhancedVolcano")
\`\`\`

\`tidyverse\` 用于数据整理，\`pheatmap\` 用于热图，\`ggrepel\` 用于标签避让，\`RColorBrewer\` 用于配色，\`openxlsx\` 用于读写 Excel，\`EnhancedVolcano\` 用于快速画火山图。

社区教程里常见问题是：差异分析跑完了，但保存结果或画图时报错。原因往往不是 DESeq2 失败，而是后处理包没装好。

## 七、推荐一键安装脚本

正式配置时，可以把安装命令写成一个脚本，例如：

\`\`\`r
if (!require("BiocManager", quietly = TRUE)) {
  install.packages("BiocManager")
}

install.packages(c("tidyverse", "pheatmap", "ggrepel", "RColorBrewer", "openxlsx"))

BiocManager::install(c(
  "DESeq2",
  "edgeR",
  "limma",
  "tximport",
  "clusterProfiler",
  "org.Hs.eg.db",
  "AnnotationDbi",
  "EnhancedVolcano"
))
\`\`\`

如果网络不稳定，可以先设置 CRAN 镜像：

\`\`\`r
options(repos = c(CRAN = "https://mirrors.tuna.tsinghua.edu.cn/CRAN/"))
\`\`\`

Bioconductor 镜像也可以配置，但我建议新手优先使用官方默认；如果确实慢，再查看清华或中科大镜像说明。

## 八、安装后必须做环境验证

安装完成不等于环境可用。必须加载检查：

\`\`\`r
library(DESeq2)
library(edgeR)
library(limma)
library(clusterProfiler)
library(org.Hs.eg.db)
library(EnhancedVolcano)
\`\`\`

再保存会话信息：

\`\`\`r
sessionInfo()
\`\`\`

本篇配套脚本不会联网安装包，而是生成安装计划和本机状态表：

\`\`\`r
Rscript code/r-transcriptome-env-check.R
\`\`\`

它会输出：

\`\`\`text
data/transcriptome_install_plan.csv
results/transcriptome_package_status.csv
results/transcriptome_env_info.csv
\`\`\`

这比截图报错更适合排查问题，因为表里能看到包是否安装、版本是多少、R/Bioconductor 版本是什么。

## 九、常见安装失败怎么处理

转录组环境常见失败可以按下面顺序处理。

第一，\`DESeq2\` 显示 unavailable：

\`\`\`r
install.packages("DESeq2")
\`\`\`

这条命令方向就不对。应该使用：

\`\`\`r
BiocManager::install("DESeq2")
\`\`\`

第二，Bioconductor 版本不匹配：

\`\`\`r
BiocManager::valid()
\`\`\`

如果提示 R 太旧，优先升级 R，而不是硬装新包。

第三，Windows 编译失败：

检查 Rtools 是否和 R 版本匹配。

第四，注释包装错：

- 人类：\`org.Hs.eg.db\`
- 小鼠：\`org.Mm.eg.db\`

第五，安装中断后反复失败：

重启 RStudio，确认没有多个 R 进程占用包目录，再重新安装。Bioconductor Support 上很多安装问题都和锁文件、残缺安装、包正在被占用有关。

## 十、小结和下一篇

这篇完成的是转录组 R 环境的基础安装思路。

建议最终至少确认：

- \`R.version.string\` 正常；
- \`BiocManager::version()\` 正常；
- \`BiocManager::valid()\` 没有严重版本问题；
- \`DESeq2\`、\`edgeR\`、\`limma\` 能加载；
- \`clusterProfiler\` 和对应物种注释包能加载；
- \`sessionInfo()\` 已保存。

下一篇继续做：**单细胞 R 环境安装篇**。单细胞环境会更重，除了 Seurat，还会涉及 \`SingleCellExperiment\`、\`scater\`、\`scran\`、\`SingleR\`、\`celldex\`、\`glmGamPoi\`、可选的 \`Signac\`、\`Azimuth\` 和 \`SeuratWrappers\`。

参考与来源：

- [Bioconductor Install](https://www.bioconductor.org/install/)
- [DESeq2 Bioconductor package](https://bioconductor.org/packages/DESeq2/)
- [edgeR Bioconductor package](https://bioconductor.org/packages/edgeR/)
- [limma Bioconductor package](https://bioconductor.org/packages/limma/)
- [tximport Bioconductor package](https://bioconductor.org/packages/tximport/)
- [clusterProfiler Bioconductor package](https://bioconductor.org/packages/clusterProfiler/)
- [org.Hs.eg.db Bioconductor package](https://bioconductor.org/packages/org.Hs.eg.db/)
- [EnhancedVolcano Bioconductor package](https://bioconductor.org/packages/EnhancedVolcano/)
- [Rtools for Windows](https://cran.r-project.org/bin/windows/Rtools/)
- [Bioconductor Support：DESeq2 installation discussion](https://support.bioconductor.org/p/107062/)`,
  },

  {
    slug: "r-single-cell-env-install",
    title: "单细胞R环境安装篇 | Seurat、SingleCellExperiment、scater、scran一次配齐",
    excerpt:
      "面向单细胞RNA-seq新手的R环境安装教程：安装Seurat v5、SeuratObject、Bioconductor单细胞生态、SingleCellExperiment、scater、scran、SingleR、celldex、glmGamPoi，并完成环境验证。",
    category: "系统教程",
    date: "2026-07-28",
    readTime: "25 分钟",
    tags: ["R", "单细胞", "scRNA-seq", "Seurat", "SingleCellExperiment", "scater", "scran", "SingleR"],
    cover: "/tutorials/r/single-cell-env/r-single-cell-env-flow.png",
    featured: true,
    content: `上一篇完成了 [转录组 R 环境安装篇](/blog/r-transcriptome-env-install)，这一篇继续做更重一点的环境：**单细胞 R 环境安装**。

单细胞分析环境比转录组更容易卡住。原因很直接：包更多、依赖更深、对象体系更多、内存消耗更高。只装一个 \`Seurat\` 有时候能跑入门教程，但如果后面要做质控、标准化、细胞注释、批次整合、轨迹分析或多组学，就会继续遇到 Bioconductor 和 GitHub 包。

这篇先搭一套适合入门到进阶的 R 环境。

![单细胞R环境安装流程图](/tutorials/r/single-cell-env/r-single-cell-env-flow.png)

本篇配套脚本：

\`\`\`text
rawtie/08-单细胞R环境安装篇/code/r-single-cell-env-check.R
\`\`\`

博客静态资源：

- [环境检查脚本](/tutorials/r/single-cell-env/r-single-cell-env-check.R)
- [单细胞安装计划表](/tutorials/r/single-cell-env/single_cell_install_plan.csv)
- [单细胞包状态表](/tutorials/r/single-cell-env/single_cell_package_status.csv)
- [R 环境信息表](/tutorials/r/single-cell-env/single_cell_env_info.csv)

## 一、单细胞 R 环境为什么更容易装崩

转录组分析通常是一张基因乘样本的 count 矩阵，样本数量相对少。单细胞分析面对的是基因乘细胞矩阵，细胞数可能从几千到几十万，依赖包也明显更多。

一个常见单细胞 R 环境至少会包含：

- Seurat 生态：\`Seurat\`、\`SeuratObject\`、\`patchwork\`；
- 基础整理作图：\`ggplot2\`、\`dplyr\`；
- Bioconductor 单细胞生态：\`SingleCellExperiment\`、\`scater\`、\`scran\`、\`scuttle\`；
- 自动注释：\`SingleR\`、\`celldex\`；
- 加速或模型扩展：\`glmGamPoi\`；
- 可选扩展：\`Signac\`、\`SeuratData\`、\`Azimuth\`、\`SeuratWrappers\`。

Seurat 官方 [安装页](https://satijalab.org/seurat/articles/install_v5.html) 说明，Seurat 可从 CRAN 安装，R 版本要求 4.0 或更高，并推荐使用 RStudio。当前日期是 2026-07-28，实际安装前仍然建议以官方页面为准。

## 二、先确认基础环境和内存

单细胞环境安装前，先确认基础环境。

\`\`\`r
R.version.string
.libPaths()
getOption("repos")
getOption("pkgType")
\`\`\`

Windows 用户还要确认 Rtools。虽然 Seurat 从 CRAN 安装时通常优先使用二进制包，但某些依赖或开发版安装仍可能触发源码编译。

硬件上，新手至少要知道：

- 小型 PBMC 教程数据：普通电脑通常可以；
- 几万细胞：建议 16 GB 以上内存；
- 十万级以上细胞：建议更高内存，或考虑 BPCells、HDF5/on-disk 矩阵、服务器环境；
- 不要在微信文件夹、下载目录、中文路径里长期跑项目。

目录建议：

\`\`\`text
single_cell_project/
  data/
  code/
  results/
  objects/
\`\`\`

\`objects/\` 用来保存 Seurat 对象或 SingleCellExperiment 对象，避免和结果图混在一起。

## 三、安装 Seurat v5 主环境

Seurat 官方安装页给出的 CRAN 安装方式是：

\`\`\`r
install.packages("Seurat")
library(Seurat)
\`\`\`

建议同时安装：

\`\`\`r
install.packages(c("Seurat", "SeuratObject", "patchwork", "ggplot2", "dplyr"))
\`\`\`

其中：

- \`Seurat\`：核心分析包；
- \`SeuratObject\`：Seurat 对象基础结构；
- \`patchwork\`：拼图；
- \`ggplot2\`：作图；
- \`dplyr\`：表格整理。

Seurat 官方 [News 页面](https://satijalab.org/seurat/articles/announcements) 说明，Seurat v5 是当前 CRAN 默认新安装版本，并尽量保持对 v4 的向后兼容，但对象和 assay 层面有变化。后面复现旧教程时要注意版本差异。

检查安装：

\`\`\`r
library(Seurat)
packageVersion("Seurat")
packageVersion("SeuratObject")
\`\`\`

## 四、安装 Bioconductor 单细胞基础栈

单细胞分析不只有 Seurat。Bioconductor 里有非常成熟的单细胞生态，核心对象是 \`SingleCellExperiment\`。

Bioconductor OSCA 书的 [SingleCellExperiment 章节](https://bioconductor.org/books/release/OSCA.intro/the-singlecellexperiment-class.html) 说明，\`SingleCellExperiment\` 是 Bioconductor 单细胞包之间交换数据的通用基础结构，能够保存表达矩阵、细胞元数据、基因注释和降维结果。

安装：

\`\`\`r
if (!require("BiocManager", quietly = TRUE)) {
  install.packages("BiocManager")
}

BiocManager::install(c(
  "SingleCellExperiment",
  "scater",
  "scran",
  "scuttle"
))
\`\`\`

其中：

- \`SingleCellExperiment\`：单细胞对象基础结构；
- \`scater\`：质控、可视化；
- \`scran\`：归一化、特征选择等；
- \`scuttle\`：低层工具函数。

如果以后你要在 Seurat 和 Bioconductor 工作流之间切换，这组包非常重要。

## 五、安装细胞类型注释工具

自动细胞注释常见组合：

\`\`\`r
BiocManager::install(c("SingleR", "celldex"))
\`\`\`

\`SingleR\` 常用于基于参考表达谱给细胞或 cluster 打标签，\`celldex\` 提供一些常用参考数据集。它们适合入门阶段做初步注释，但不能代替人工 marker 检查。

加载检查：

\`\`\`r
library(SingleR)
library(celldex)
\`\`\`

后面正式分析时，常见流程是：

\`\`\`text
聚类结果 -> 每群 marker -> SingleR 辅助注释 -> 经典 marker 人工复核
\`\`\`

不要只凭自动注释结果直接写生物学结论。

## 六、安装可选加速和扩展包

Seurat 官方安装页提到，Seurat 不强制依赖但可使用一些其他团队开发的包来增强速度和性能，例如 \`BPCells\`、\`presto\`、\`glmGamPoi\`。

官方示例里会使用 r-universe 仓库：

\`\`\`r
setRepositories(
  ind = 1:3,
  addURLs = c("https://satijalab.r-universe.dev", "https://bnprks.r-universe.dev/")
)
install.packages(c("BPCells", "presto", "glmGamPoi"))
\`\`\`

如果只做入门教程，可以先不装所有扩展。建议先装相对常用的：

\`\`\`r
BiocManager::install("glmGamPoi")
\`\`\`

如果做单细胞 ATAC 或多组学，再考虑：

\`\`\`r
install.packages("Signac")
\`\`\`

如果做参考映射和自动注释，可以再看：

\`\`\`r
remotes::install_github("satijalab/azimuth")
\`\`\`

## 七、SeuratData、Azimuth 和 SeuratWrappers 怎么看

Seurat 官方安装页还提到几个扩展：

\`\`\`r
install.packages("Signac")
remotes::install_github("satijalab/seurat-data", quiet = TRUE)
remotes::install_github("satijalab/azimuth", quiet = TRUE)
remotes::install_github("satijalab/seurat-wrappers", quiet = TRUE)
\`\`\`

我的建议是：

- \`SeuratData\`：适合学习官方教程和加载示例数据；
- \`Azimuth\`：适合参考映射和细胞类型注释；
- \`SeuratWrappers\`：适合接入更多整合、降维或轨迹方法；
- \`Signac\`：适合单细胞 ATAC 和多组学。

这些不是第一天必须全部安装。新手先把 \`Seurat\`、\`SingleCellExperiment\`、\`scater\`、\`scran\`、\`SingleR\` 装好，后面按项目需求补。

## 八、推荐一键安装脚本

基础版：

\`\`\`r
install.packages(c("Seurat", "SeuratObject", "patchwork", "ggplot2", "dplyr", "remotes"))

if (!require("BiocManager", quietly = TRUE)) {
  install.packages("BiocManager")
}

BiocManager::install(c(
  "SingleCellExperiment",
  "scater",
  "scran",
  "scuttle",
  "SingleR",
  "celldex",
  "glmGamPoi"
))
\`\`\`

扩展版：

\`\`\`r
install.packages("Signac")
remotes::install_github("satijalab/seurat-data", quiet = TRUE)
remotes::install_github("satijalab/azimuth", quiet = TRUE)
remotes::install_github("satijalab/seurat-wrappers", quiet = TRUE)
\`\`\`

安装过程中建议不要一边运行旧 R 会话，一边覆盖正在加载的包。遇到包目录锁定或无法覆盖，先重启 RStudio。

## 九、安装后必须做环境验证

安装完成后，至少检查：

\`\`\`r
library(Seurat)
library(SeuratObject)
library(SingleCellExperiment)
library(scater)
library(scran)
library(SingleR)
library(celldex)
library(glmGamPoi)

sessionInfo()
\`\`\`

本篇配套脚本用于生成检查表：

\`\`\`r
Rscript code/r-single-cell-env-check.R
\`\`\`

它会输出：

\`\`\`text
data/single_cell_install_plan.csv
results/single_cell_package_status.csv
results/single_cell_env_info.csv
\`\`\`

如果别人问你“我的 Seurat 装不上”，不要只发一张报错截图。更好的方式是同时提供：

- R 版本；
- Bioconductor 版本；
- \`.libPaths()\`；
- \`packageVersion("Seurat")\`；
- \`sessionInfo()\`；
- 包状态表。

## 十、小结和后续单细胞分析路线

这篇完成的是单细胞 R 环境安装路线。

入门版建议先装：

- \`Seurat\`
- \`SeuratObject\`
- \`patchwork\`
- \`ggplot2\`
- \`dplyr\`
- \`SingleCellExperiment\`
- \`scater\`
- \`scran\`
- \`SingleR\`
- \`celldex\`
- \`glmGamPoi\`

真正开始分析前，建议先跑 Seurat 官方 PBMC 入门教程。Seurat 官方 [Getting Started 页面](https://satijalab.org/seurat/articles/get_started_v5_new) 说明，PBMC 2700 教程覆盖标准无监督聚类工作流，包括质控、过滤、高变基因、降维、聚类和 marker 识别，非常适合作为环境验证后的第一套练习。

后续单细胞系列可以继续写：

1. 10X 数据导入；
2. 创建 Seurat 对象；
3. 单细胞质控指标；
4. 标准化和高变基因；
5. PCA、UMAP 和聚类；
6. marker 基因和细胞注释；
7. 多样本整合；
8. 结果图导出和复现。

参考与来源：

- [Seurat v5 Installation Instructions](https://satijalab.org/seurat/articles/install_v5.html)
- [Seurat GitHub repository](https://github.com/satijalab/seurat)
- [Seurat News](https://satijalab.org/seurat/articles/announcements)
- [Seurat Getting Started](https://satijalab.org/seurat/articles/get_started_v5_new)
- [Bioconductor Install](https://www.bioconductor.org/install/)
- [OSCA: SingleCellExperiment class](https://bioconductor.org/books/release/OSCA.intro/the-singlecellexperiment-class.html)
- [scater Bioconductor package](https://bioconductor.org/packages/scater/)
- [SingleR Bioconductor package](https://bioconductor.org/packages/SingleR/)
- [celldex Bioconductor package](https://bioconductor.org/packages/celldex/)
- [CSDN：Seurat单细胞分析环境安装教程](https://blog.csdn.net/weixin_42034599/article/details/130248636)`,
  },

  {
    slug: "rstudio-basic-environment-config",
    title: "RStudio基础环境配置 | 工作目录、项目、CRAN镜像和包库路径一次讲清",
    excerpt:
      "面向R语言新手的RStudio基础环境配置教程：讲清RStudio Project、工作目录、文件管理、CRAN镜像、包库路径、.Rprofile、.Renviron、Global Options和配置检查脚本。",
    category: "系统教程",
    date: "2026-07-29",
    readTime: "22 分钟",
    tags: ["RStudio", "R", "工作目录", "CRAN镜像", "R包", ".Rprofile", "环境配置"],
    cover: "/tutorials/r/rstudio-basic-config/rstudio-basic-config-flow.png",
    featured: true,
    content: `前面我们已经讲过 [R里面包的安装方式](/blog/r-package-install-methods)、[转录组 R 环境安装](/blog/r-transcriptome-env-install) 和 [单细胞 R 环境安装](/blog/r-single-cell-env-install)。这些内容都绕不开一个基础问题：**RStudio 的基础环境有没有配好。**

很多 R 小白的报错不是分析方法错了，而是工作目录不对、项目没建好、CRAN 镜像没设、包库路径没权限、\`.Rprofile\` 写错。今天这篇就专门解决这些基础配置。

![RStudio基础环境配置流程图](/tutorials/r/rstudio-basic-config/rstudio-basic-config-flow.png)

本篇配套脚本：

\`\`\`text
rawtie/09-RStudio基础环境配置/code/rstudio-basic-config-check.R
\`\`\`

博客静态资源：

- [环境配置检查脚本](/tutorials/r/rstudio-basic-config/rstudio-basic-config-check.R)
- [推荐 CRAN 镜像表](/tutorials/r/rstudio-basic-config/recommended_cran_mirrors.csv)
- [Rprofile 示例模板](/tutorials/r/rstudio-basic-config/Rprofile.example)
- [环境信息检查表](/tutorials/r/rstudio-basic-config/rstudio_basic_config_env.csv)
- [配置检查清单](/tutorials/r/rstudio-basic-config/rstudio_basic_config_checklist.csv)

## 一、为什么 RStudio 基础配置必须先做

RStudio 官方 [IDE User Guide](https://docs.posit.co/ide/user/) 说明，RStudio 是支持 R 和 Python 的集成开发环境，包含 Console、代码编辑器、绘图、历史记录、调试和工作空间管理等能力。对新手来说，RStudio 不只是“写代码的界面”，它还管理了很多和项目复现有关的环境状态。

最常见的基础配置问题有这些：

- \`read.csv("data/a.csv")\` 找不到文件；
- \`install.packages()\` 一直提示选择镜像；
- 包安装到系统库失败，提示没有权限；
- 每次打开 RStudio 都自动加载旧对象，结果越跑越乱；
- \`.Rprofile\` 里设置了错误镜像，导致装包一直失败；
- 不同项目混用同一个工作目录，结果文件到处都是。

所以这篇不是讲高深技巧，而是把 RStudio 每天都会用到的基础环境稳定下来。

## 二、优先使用 RStudio Project，而不是到处 setwd

Posit 官方 [Using RStudio Projects](https://support.posit.co/hc/en-us/articles/200526207-Using-RStudio-Projects) 文档说明，RStudio Project 会把每个工作分成独立上下文，每个项目都有自己的工作目录、workspace、history 和 source documents。打开项目时，RStudio 会把当前工作目录设置为项目目录。

我建议新手从第一天开始用 Project。

操作路径：

\`\`\`text
File -> New Project -> New Directory -> New Project
\`\`\`

推荐结构：

\`\`\`text
my_r_project/
  my_r_project.Rproj
  code/
  data/
  results/
  figures/
  objects/
  docs/
\`\`\`

以后打开项目时，双击 \`.Rproj\` 文件，而不是先打开 RStudio 再手动找脚本。这样 \`getwd()\` 通常就是项目根目录。

不要把项目散落在桌面、下载目录、微信文件夹里。路径里尽量不要有中文、空格和特殊符号。虽然现代 R 对中文路径支持已经比以前好很多，但很多包、外部工具、压缩文件和系统命令仍然可能因为路径问题出错。

## 三、工作目录：getwd、setwd 和 Files 面板

R 官方 [\`getwd()\` / \`setwd()\` 文档](https://search.r-project.org/R/refmans/base/html/getwd.html) 说明，\`getwd()\` 返回当前工作目录，\`setwd(dir)\` 设置当前工作目录。

检查工作目录：

\`\`\`r
getwd()
\`\`\`

查看当前目录文件：

\`\`\`r
list.files()
\`\`\`

检查文件是否存在：

\`\`\`r
file.exists("data/sample.csv")
\`\`\`

我不建议在脚本里频繁写：

\`\`\`r
setwd("D:/some/random/path")
\`\`\`

原因是：这条路径只在你电脑上成立，别人复现时很容易失败。更好的做法是使用 RStudio Project，把脚本路径写成相对路径：

\`\`\`r
read.csv("data/sample.csv")
write.csv(result, "results/result.csv", row.names = FALSE)
\`\`\`

RStudio 官方 [Managing Files](https://docs.posit.co/ide/user/ide/guide/ui/files.html) 文档也说明，Files 面板可以管理当前文件夹里的文件，并可以从显示的文件夹打开终端或修改工作目录。新手可以用 Files 面板确认当前文件夹和脚本所在位置是否一致。

## 四、固定项目目录结构：code、data、results

环境配置不是只点几个菜单，更重要的是文件结构稳定。

我建议所有入门项目都用：

\`\`\`text
project/
  code/
    01-load-data.R
    02-analysis.R
    03-plot.R
  data/
    raw_counts.csv
    sample_info.csv
  results/
    deg_results.csv
  figures/
    volcano.png
  objects/
    seurat_object.rds
\`\`\`

这样做的好处是：

- 数据在哪里，一眼能看到；
- 脚本按顺序运行；
- 结果表和结果图分开；
- RDS 对象不会和 CSV 混在一起；
- 后续写教程、录屏、截图都清楚。

本篇脚本会自动检查并创建演示目录：

\`\`\`r
project_dirs <- c("code", "data", "results", "figures", "objects", "docs")

for (d in project_dirs) {
  dir.create(d, showWarnings = FALSE)
}
\`\`\`

这不代表每个项目必须完全一样，但建议先有固定习惯，再根据项目调整。

## 五、CRAN 镜像：为什么 install.packages 会卡住

R 安装 CRAN 包时，会从 \`getOption("repos")\` 指定的仓库下载包。官方 [\`install.packages()\` 文档](https://search.r-project.org/R/refmans/utils/html/install.packages.html) 说明，\`repos\` 参数默认使用 \`getOption("repos")\`，可以是 CRAN 镜像 URL。

查看当前镜像：

\`\`\`r
getOption("repos")
\`\`\`

临时设置镜像：

\`\`\`r
options(repos = c(CRAN = "https://cloud.r-project.org"))
\`\`\`

国内网络可以考虑：

\`\`\`r
options(repos = c(CRAN = "https://mirrors.tuna.tsinghua.edu.cn/CRAN/"))
\`\`\`

或：

\`\`\`r
options(repos = c(CRAN = "https://mirrors.ustc.edu.cn/CRAN/"))
\`\`\`

清华 TUNA 和中科大 USTC 都提供 CRAN 镜像。CRAN 镜像 FAQ 也说明，镜像本质是同步 CRAN 主站内容，镜像需要定期同步。

RStudio 图形界面也可以设置：

\`\`\`text
Tools -> Global Options -> Packages -> CRAN repository
\`\`\`

如果 \`install.packages()\` 每次都提示选镜像，通常就是默认 \`repos\` 没设好。

## 六、包库路径：.libPaths 和权限问题

包安装到哪里，由 \`.libPaths()\` 决定。

\`\`\`r
.libPaths()
\`\`\`

官方 \`install.packages()\` 文档说明，如果 \`lib\` 参数没有指定，默认安装到 \`.libPaths()\` 的第一个目录；如果目录不可写，交互式安装时可能会尝试创建个人库。

常见问题：

- 系统库目录没权限；
- 多个 R 版本共用混乱的库；
- R 升级后旧版本包不能直接用；
- Windows 上包正在被加载，导致 DLL 文件被锁定。

新手排查时先运行：

\`\`\`r
.libPaths()
Sys.getenv("R_LIBS_USER")
\`\`\`

如果安装时提示没有权限，优先考虑安装到用户库，而不是把所有东西装到系统目录。Windows 上也可以尝试以管理员身份运行 RStudio，但这不是长期最优习惯。

## 七、.Rprofile 和 .Renviron：能用，但别乱改

R 官方 [Startup 文档](https://search.r-project.org/R/refmans/base/help/.Rprofile.html) 说明，R 启动时会读取 \`.Renviron\` 和 \`.Rprofile\` 等启动文件。简单理解：

- \`.Renviron\`：更适合放环境变量；
- \`.Rprofile\`：更适合放 R 代码，例如 \`options(repos = ...)\`。

例如项目级 \`.Rprofile\` 可以写：

\`\`\`r
options(repos = c(CRAN = "https://cloud.r-project.org"))
options(width = 100)
message("Project .Rprofile loaded: ", getwd())
\`\`\`

但我建议新手不要一开始就大量修改全局 \`.Rprofile\`。因为它会影响所有 R 会话，一旦写错，所有项目都会受影响。

本篇脚本只生成示例文件：

\`\`\`text
data/Rprofile.example
\`\`\`

它不会自动覆盖你的真实 \`.Rprofile\`。你需要理解启动机制后，再决定是否复制里面的设置。

GitHub 上也有不少 \`.Rprofile\` 示例和相关 issue。比如 r-lib/devtools 的一个 issue 中，维护者建议用：

\`\`\`r
options(repos = c(CRAN = "https://cloud.r-project.org"))
\`\`\`

来解决没有设置 CRAN 镜像导致的安装问题。这类资料说明：\`.Rprofile\` 很实用，但也需要谨慎。

## 八、RStudio Global Options 推荐设置

RStudio 里建议先检查这些位置：

\`\`\`text
Tools -> Global Options -> General
Tools -> Global Options -> Packages
Tools -> Global Options -> Code
\`\`\`

我推荐：

- 不要自动恢复 \`.RData\`；
- 不要自动保存 workspace 到 \`.RData\`；
- 设置稳定 CRAN repository；
- 使用 UTF-8 编码；
- 确认 R 版本和 RStudio 绑定正确；
- 新项目优先用 \`.Rproj\` 管理。

RStudio Project 官方文档提到，项目打开时可能加载 \`.RData\`、\`.Rhistory\`，并设置工作目录。对新手来说，我更建议把分析过程写进脚本，而不是依赖自动恢复的对象。

如果每次打开 RStudio 都看到 Environment 里有一堆旧对象，建议清理并关闭自动恢复。否则你很难判断某个对象到底是脚本创建的，还是上一次会话残留的。

## 九、用检查脚本确认配置

本篇配套脚本可以运行：

\`\`\`r
Rscript code/rstudio-basic-config-check.R
\`\`\`

它会生成：

\`\`\`text
data/recommended_cran_mirrors.csv
data/Rprofile.example
results/rstudio_basic_config_env.csv
results/project_directory_status_before.csv
results/rstudio_basic_config_checklist.csv
\`\`\`

其中环境信息表会记录：

\`\`\`r
getwd()
R.version.string
R.home()
Sys.getenv("RSTUDIO")
Sys.getenv("R_LIBS_USER")
.libPaths()
getOption("repos")
getOption("pkgType")
\`\`\`

如果在命令行里运行，\`RStudio_detected\` 可能是 \`FALSE\`，这是正常的；如果在 RStudio Console 里运行，通常会检测到 RStudio 会话。

这类检查表很适合用于排查：“为什么我能装包，别人不能装”“为什么我读不到文件”“为什么同一个脚本在不同电脑结果路径不一样”。

## 十、小结和下一步

这篇讲的不是复杂分析，而是 RStudio 基础环境的底座。

建议最终确认：

- 每个分析都有自己的 \`.Rproj\`；
- \`getwd()\` 指向项目根目录；
- 文件路径使用 \`data/\`、\`results/\` 这类相对路径；
- CRAN 镜像稳定；
- \`.libPaths()\` 第一个目录可写；
- 不依赖自动加载 \`.RData\`；
- \`.Rprofile\` 只写自己理解的设置；
- 修改启动文件后重启 R。

后面无论继续做转录组、单细胞还是多组学分析，这些基础配置都会反复用到。

参考与来源：

- [RStudio IDE User Guide](https://docs.posit.co/ide/user/)
- [Using RStudio Projects](https://support.posit.co/hc/en-us/articles/200526207-Using-RStudio-Projects)
- [Managing Files - RStudio User Guide](https://docs.posit.co/ide/user/ide/guide/ui/files.html)
- [getwd/setwd R Documentation](https://search.r-project.org/R/refmans/base/html/getwd.html)
- [install.packages R Documentation](https://search.r-project.org/R/refmans/utils/html/install.packages.html)
- [setRepositories R Documentation](https://search.r-project.org/R/refmans/utils/html/setRepositories.html)
- [R Startup: .Rprofile and .Renviron](https://search.r-project.org/R/refmans/base/help/.Rprofile.html)
- [CRAN 镜像 HOWTO/FAQ](https://cran.r-project.cn/mirror-howto.html)
- [r-lib/devtools issue: setting CRAN mirror](https://github.com/r-lib/devtools/issues/2275)
- [CSDN：RStudio设置工作目录和镜像相关教程](https://blog.csdn.net/weixin_43840509/article/details/105106703)`,
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
