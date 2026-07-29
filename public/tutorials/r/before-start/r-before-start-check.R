# R 语言入门前须知：环境与基本操作检查脚本
# 这份脚本只使用 base R，不依赖额外安装包，适合零基础读者先跑通。

# 1. 查看当前 R 版本
# 作用：确认自己当前运行的是哪一个 R，而不是只凭桌面图标判断。
R.version.string

# 2. 查看当前工作目录
# 作用：确认 R 现在默认从哪里读文件、往哪里写结果。
getwd()

# 3. 创建推荐的项目目录结构
# 作用：从第一天开始把代码、数据和结果分开放，后续分析更容易复现。
dir.create("data", showWarnings = FALSE)
dir.create("results", showWarnings = FALSE)

# 4. 创建一个最小示例数据框
# 作用：理解 data.frame 是 R 中最常见的表格数据结构之一。
sample_qc <- data.frame(
  sample = c("ctrl_1", "ctrl_2", "treat_1", "treat_2"),
  group = c("control", "control", "treatment", "treatment"),
  cells = c(3200, 2950, 4100, 4380),
  median_genes = c(1500, 1420, 1760, 1820)
)

# 5. 检查对象结构
# 作用：不要只看对象名存在，还要确认列名、类型和行数是否符合预期。
str(sample_qc)
head(sample_qc)
dim(sample_qc)

# 6. 写出 CSV 文件
# 作用：把 R 里的对象保存成表格文件，方便复查或分享。
write.csv(sample_qc, "data/sample_qc.csv", row.names = FALSE)

# 7. 重新读入 CSV 文件
# 作用：验证文件路径和数据读取流程是否正常。
sample_qc_from_file <- read.csv("data/sample_qc.csv")
head(sample_qc_from_file)

# 8. 做一个非常简单的分组汇总
# 作用：先理解“对象 -> 函数 -> 新结果对象”的基本工作方式。
mean_cells_by_group <- aggregate(
  cells ~ group,
  data = sample_qc_from_file,
  FUN = mean
)
mean_cells_by_group

# 9. 保存汇总结果
# 作用：每一步关键结果都建议落盘，避免只存在临时内存里。
write.csv(mean_cells_by_group, "results/mean_cells_by_group.csv", row.names = FALSE)

# 10. 查看包库路径和会话信息
# 作用：以后安装包失败、包版本不一致时，这两个输出非常有用。
.libPaths()
sessionInfo()
