# Single-cell R environment check -------------------------------------------
# Run from this folder:
# Rscript code/r-single-cell-env-check.R

dir.create("data", showWarnings = FALSE)
dir.create("results", showWarnings = FALSE)

cran_packages <- c("Seurat", "SeuratObject", "patchwork", "ggplot2", "dplyr", "remotes")
optional_cran <- c("Signac")
github_packages <- c("satijalab/seurat-data", "satijalab/azimuth", "satijalab/seurat-wrappers")
bioc_packages <- c(
  "SingleCellExperiment",
  "scater",
  "scran",
  "scuttle",
  "SingleR",
  "celldex",
  "glmGamPoi"
)

install_plan <- data.frame(
  source = c(
    rep("CRAN", length(cran_packages)),
    rep("Optional CRAN", length(optional_cran)),
    rep("GitHub", length(github_packages)),
    rep("Bioconductor", length(bioc_packages))
  ),
  package = c(cran_packages, optional_cran, github_packages, bioc_packages),
  command = c(
    paste0('install.packages("', cran_packages, '")'),
    paste0('install.packages("', optional_cran, '")'),
    paste0('remotes::install_github("', github_packages, '")'),
    paste0('BiocManager::install("', bioc_packages, '")')
  )
)

write.csv(install_plan, "data/single_cell_install_plan.csv", row.names = FALSE)

packages_to_check <- c(
  "BiocManager",
  cran_packages,
  optional_cran,
  bioc_packages
)

package_status <- data.frame(
  package = packages_to_check,
  installed = vapply(packages_to_check, requireNamespace, logical(1), quietly = TRUE)
)
package_status$version <- vapply(
  packages_to_check,
  function(pkg) {
    if (requireNamespace(pkg, quietly = TRUE)) {
      as.character(utils::packageVersion(pkg))
    } else {
      NA_character_
    }
  },
  character(1)
)

write.csv(package_status, "results/single_cell_package_status.csv", row.names = FALSE)

bioc_version <- if (requireNamespace("BiocManager", quietly = TRUE)) {
  as.character(BiocManager::version())
} else {
  NA_character_
}

env_info <- data.frame(
  item = c("R.version.string", "R.home", "R_LIBS_USER", "repos_CRAN", "pkgType", "Bioconductor_version"),
  value = c(
    R.version.string,
    R.home(),
    Sys.getenv("R_LIBS_USER"),
    getOption("repos")[["CRAN"]],
    getOption("pkgType"),
    bioc_version
  )
)

write.csv(env_info, "results/single_cell_env_info.csv", row.names = FALSE)

cat("\n--- Single-cell package install plan ---\n")
print(install_plan)

cat("\n--- Package status ---\n")
print(package_status)

cat("\n--- Environment info ---\n")
print(env_info)

cat("\nFiles written:\n")
cat("- data/single_cell_install_plan.csv\n")
cat("- results/single_cell_package_status.csv\n")
cat("- results/single_cell_env_info.csv\n")

cat("\n--- sessionInfo() ---\n")
print(sessionInfo())
