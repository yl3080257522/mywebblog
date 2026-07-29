# R zero-basics demo ---------------------------------------------------------
# Run from this folder:
# Rscript code/r-zero-basics-demo.R

dir.create("data", showWarnings = FALSE)
dir.create("results", showWarnings = FALSE)

# 1. Create vectors ----------------------------------------------------------

sample_id <- c("ctrl_1", "ctrl_2", "ctrl_3", "treat_1", "treat_2", "treat_3")
group <- c("control", "control", "control", "treatment", "treatment", "treatment")
cells <- c(3200, 2950, 3360, 4100, 4380, 4020)
median_genes <- c(1450, 1390, 1510, 1780, 1850, 1710)

# 2. Combine vectors into a data frame --------------------------------------

qc <- data.frame(
  sample_id = sample_id,
  group = group,
  cells = cells,
  median_genes = median_genes
)

# 3. Inspect the object ------------------------------------------------------

cat("\n--- head(qc) ---\n")
print(head(qc))

cat("\n--- str(qc) ---\n")
str(qc)

cat("\n--- summary(qc) ---\n")
print(summary(qc))

# 4. Index and filter --------------------------------------------------------

first_two_rows <- qc[1:2, ]
selected_columns <- qc[, c("sample_id", "cells")]
treatment_qc <- qc[qc$group == "treatment", ]

cat("\n--- first_two_rows ---\n")
print(first_two_rows)

cat("\n--- selected_columns ---\n")
print(selected_columns)

cat("\n--- treatment_qc ---\n")
print(treatment_qc)

# 5. Summarise by group ------------------------------------------------------

group_summary <- aggregate(
  cbind(cells, median_genes) ~ group,
  data = qc,
  FUN = mean
)

cat("\n--- group_summary ---\n")
print(group_summary)

# 6. Save data and results ---------------------------------------------------

write.csv(qc, "data/sample_qc_zero_basics.csv", row.names = FALSE)
write.csv(group_summary, "results/group_summary_zero_basics.csv", row.names = FALSE)

# 7. Draw and save the first result figure ----------------------------------

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
text(
  x = seq_along(group_summary$cells) * 1.2 - 0.5,
  y = group_summary$cells,
  labels = round(group_summary$cells, 0),
  pos = 3,
  cex = 0.9
)
dev.off()

cat("\nFiles written:\n")
cat("- data/sample_qc_zero_basics.csv\n")
cat("- results/group_summary_zero_basics.csv\n")
cat("- results/r-zero-basics-summary.png\n")

cat("\n--- sessionInfo() ---\n")
print(sessionInfo())
