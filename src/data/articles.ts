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
