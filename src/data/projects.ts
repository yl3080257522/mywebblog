export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  cover: string;
  href: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "scrna-pipeline",
    title: "单细胞分析流水线",
    subtitle: "Bioinformatics",
    description: "基于 Seurat / Scanpy 的可复现 scRNA-seq 聚类与注释流程，支持一键生成报告。",
    tags: ["R", "Seurat", "Docker"],
    cover: "https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "/blog/scRNAseq-clustering-guide",
    year: "2025",
  },
  {
    id: "streamlit-dashboard",
    title: "交互式数据看板",
    subtitle: "Data Viz",
    description: "用 Streamlit + Plotly 30 分钟搭好可分享的科研数据可视化应用。",
    tags: ["Python", "Streamlit", "Plotly"],
    cover: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "/blog/python-data-viz-streamlit",
    year: "2025",
  },
  {
    id: "fullstack-todo",
    title: "全栈待办应用",
    subtitle: "Full Stack",
    description: "React + Supabase 实现认证、CRUD 与实时同步，完整演示现代全栈链路。",
    tags: ["React", "Supabase", "TypeScript"],
    cover: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "/blog/react-fullstack-tutorial",
    year: "2025",
  },
  {
    id: "bioinfo-course",
    title: "生信入门视频课",
    subtitle: "Education",
    description: "12 节系统课：Linux、R、RNA-seq 到独立分析，配套代码全部开源。",
    tags: ["课程", "R", "Linux"],
    cover: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "/blog/video-course-bioinformatics",
    year: "2025",
  },
  {
    id: "docker-lab",
    title: "科研 Docker 环境包",
    subtitle: "DevOps",
    description: "封装分析依赖与脚本，让合作者一键复现实验，告别「在我电脑上能跑」。",
    tags: ["Docker", "R", "复现"],
    cover: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "/blog/docker-for-researchers",
    year: "2025",
  },
];
