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
    slug: "r-rstudio-setup-guide",
    title: "R 与 RStudio 安装配置全流程（Windows）",
    excerpt: "从 CRAN 下载 R、安装 RStudio、配置 Rtools 与国内镜像，按步骤配好可复现的数据分析环境。",
    category: "系统教程",
    date: "2026-07-26",
    readTime: "18 分钟",
    tags: ["R", "RStudio", "环境配置", "Windows"],
    cover: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    content: `## 写在前面

本篇参考常见安装教程的结构（如[腾讯云社区这篇 R / RStudio 配置文](https://cloud.tencent.com/developer/article/2139514)）：按操作拆步骤，配示意图与动效，方便边看边装。完成后你将拥有：R 本体、RStudio 编辑器、Rtools（编译依赖）、国内 CRAN 镜像。

## 一、安装 R

R 是开源的统计计算与可视化平台。打开官网 [https://cran.r-project.org/](https://cran.r-project.org/)，选择 **Download R for Windows** → **base**，下载当前稳定版安装包。

![点击 Download R for Windows（安装步骤示意）](/tutorials/r/cran-download-demo.svg)

安装时建议：

- 自定义目录（避免纯中文路径）
- 勾选创建桌面快捷方式，方便检查版本

装完后在开始菜单打开 R，能进入控制台即表示本体安装成功。

## 二、安装 RStudio

去 [posit.co/download/rstudio-desktop](https://posit.co/download/rstudio-desktop/) 下载 **RStudio Desktop Free**，安装完成后打开。若看不到脚本编辑区：菜单 **View → Panes → Show All Panes**。

![RStudio 四窗格界面示意（控制台光标闪烁）](/tutorials/r/rstudio-panes-demo.svg)

永久改工作目录（项目默认保存位置）：**Session → Set Working Directory → Choose Directory**，或在控制台执行：

\`\`\`r
setwd("D:/R/projects")  # 改成你的项目目录
getwd()  # 确认当前工作目录
\`\`\`

## 三、配置国内镜像

装包慢时，把 CRAN 换成国内节点：**Tools → Global Options → Packages → Change**，优先选带 **China** 且离你近的镜像 → **Apply**（可能会提示重启）。

![选择 China CRAN 镜像（高亮动效）](/tutorials/r/mirror-setup-demo.svg)

也可在用户目录写入默认镜像（重启后生效）：

\`\`\`r
options(repos = c(CRAN = "https://mirrors.tuna.tsinghua.edu.cn/CRAN/"))  # 清华源示例
\`\`\`

## 四、安装并绑定 Rtools

Windows 上编译部分源码包需要 **Rtools**。仍在 CRAN Windows 页面下载与当前 R 主版本匹配的 Rtools，安装后在 RStudio 控制台执行：

\`\`\`r
writeLines('PATH="\${RTOOLS40_HOME}\\usr\\bin;\${PATH}"', con = "~/.Renviron")  # 写入 Rtools 路径
\`\`\`

重启 RStudio，再检查：

\`\`\`r
Sys.which("make")  # 应指向 Rtools 下的 make
.libPaths()  # 查看包安装目录
\`\`\`

## 五、验证环境

\`\`\`r
install.packages(c("jsonlite", "ggplot2", "dplyr"))  # 试装几个常用包
library(ggplot2)
library(dplyr)
sessionInfo()  # 确认 R / 包版本
\`\`\`

若 C 盘空间紧张，可指定下载缓存目录（先手动建好文件夹）：

\`\`\`r
install.packages("ggplot2", destdir = "D:/R/downloaded_packages/")  # 安装包缓存到 D 盘
\`\`\`

## 六、可选：Jupyter 里跑 R

若已使用 Anaconda / Jupyter，可在 R 中安装并注册内核：

\`\`\`r
install.packages("IRkernel")
IRkernel::installspec()  # 注册 R kernel 到 Jupyter
\`\`\`

重新打开 Jupyter Notebook，新建笔记本时应能看到 **R** 内核。

## 系列下一篇

环境就绪后，建议继续阅读：[R 语言入门导览：对象、函数与工作流](/blog/r-language-introduction)。`,
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

上一篇我们完成了 [R / RStudio 安装配置](/blog/r-rstudio-setup-guide)。本篇不再纠结安装，而是建立心智模型：R 里数据怎么存、代码怎么写、一次分析怎么跑通。

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
