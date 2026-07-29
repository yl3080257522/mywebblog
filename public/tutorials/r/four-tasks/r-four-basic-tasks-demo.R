# R beginner four basic tasks ------------------------------------------------
# Run from this folder:
# Rscript code/r-four-basic-tasks-demo.R

dir.create("data", showWarnings = FALSE)
dir.create("results", showWarnings = FALSE)

# Task 1: load packages ------------------------------------------------------
# In daily work, install a package once, then load it in every new R session.
# install.packages("readr")
# library(readr)

library(utils)
library(stats)

has_readr <- requireNamespace("readr", quietly = TRUE)
cat("readr installed:", has_readr, "\n")

# Task 2: create and import data --------------------------------------------

sample_qc <- data.frame(
  sample_id = c("ctrl_1", "ctrl_2", "ctrl_3", "treat_1", "treat_2", "treat_3"),
  group = c("control", "control", "control", "treatment", "treatment", "treatment"),
  cells = c(3200, 2950, 3360, 4100, 4380, 4020),
  median_genes = c(1450, 1390, 1510, 1780, 1850, 1710),
  percent_mito = c(4.8, 5.1, 4.3, 6.2, 5.7, 6.5)
)

write.csv(sample_qc, "data/sample_qc_four_tasks.csv", row.names = FALSE)

qc <- read.csv("data/sample_qc_four_tasks.csv", stringsAsFactors = FALSE)

cat("\n--- imported data ---\n")
print(head(qc))
str(qc)

# Task 3: debug and troubleshoot --------------------------------------------

debug_log <- character()

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

required_columns <- c("sample_id", "group", "cells", "median_genes", "percent_mito")
missing_columns <- setdiff(required_columns, names(qc))

if (length(missing_columns) > 0) {
  stop("Missing required columns: ", paste(missing_columns, collapse = ", "))
}

qc$cells_per_gene <- qc$cells / qc$median_genes

high_mito <- qc[qc$percent_mito > 6, ]
debug_log <- c(
  debug_log,
  paste("Rows:", nrow(qc)),
  paste("Columns:", ncol(qc)),
  paste("High mitochondrial samples:", paste(high_mito$sample_id, collapse = ", "))
)

cat("\n--- high mitochondrial samples ---\n")
print(high_mito)

# Task 4: summarise and export results --------------------------------------

group_summary <- aggregate(
  cbind(cells, median_genes, percent_mito, cells_per_gene) ~ group,
  data = qc,
  FUN = mean
)

write.csv(group_summary, "results/group_summary_four_tasks.csv", row.names = FALSE)
writeLines(debug_log, "results/debug_log_four_tasks.txt")

png("results/r-four-tasks-summary.png", width = 1200, height = 720, res = 150, type = "cairo")
plot(
  qc$median_genes,
  qc$cells,
  pch = 19,
  col = ifelse(qc$group == "control", "#2F6F73", "#D88C3D"),
  xlim = c(min(qc$median_genes) - 45, max(qc$median_genes) + 65),
  ylim = c(min(qc$cells) - 120, max(qc$cells) + 220),
  xlab = "Median genes",
  ylab = "Detected cells",
  main = "Basic QC check after data import"
)
legend(
  "topleft",
  legend = c("control", "treatment"),
  col = c("#2F6F73", "#D88C3D"),
  pch = 19,
  bty = "n"
)
text(qc$median_genes, qc$cells, labels = qc$sample_id, pos = 3, cex = 0.72)
dev.off()

cat("\n--- group summary ---\n")
print(group_summary)

cat("\nFiles written:\n")
cat("- data/sample_qc_four_tasks.csv\n")
cat("- results/group_summary_four_tasks.csv\n")
cat("- results/debug_log_four_tasks.txt\n")
cat("- results/r-four-tasks-summary.png\n")

cat("\n--- sessionInfo() ---\n")
print(sessionInfo())
