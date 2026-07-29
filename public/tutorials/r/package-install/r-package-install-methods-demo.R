# R package installation methods demo ---------------------------------------
# Run from this folder:
# Rscript code/r-package-install-methods-demo.R

dir.create("data", showWarnings = FALSE)
dir.create("results", showWarnings = FALSE)

install_methods <- data.frame(
  source = c(
    "CRAN",
    "Bioconductor",
    "GitHub",
    "pak",
    "local_source",
    "local_binary_zip"
  ),
  command = c(
    'install.packages("ggplot2")',
    'BiocManager::install("DESeq2")',
    'remotes::install_github("satijalab/seurat")',
    'pak::pkg_install("tidyverse/ggplot2")',
    'install.packages("pkg_1.0.0.tar.gz", repos = NULL, type = "source")',
    'install.packages("pkg_1.0.0.zip", repos = NULL, type = "win.binary")'
  ),
  when_to_use = c(
    "Most general R packages from CRAN",
    "Bioconductor packages for genomics and bioinformatics",
    "Development version or package only hosted on GitHub",
    "Fast dependency solving across CRAN, Bioconductor, GitHub and local sources",
    "Local source archive, usually needs build tools if compiled code exists",
    "Local Windows binary package, usually no source compilation needed"
  )
)

write.csv(install_methods, "data/package_install_methods.csv", row.names = FALSE)

env_info <- data.frame(
  item = c("R.version.string", "R.home", "R_LIBS_USER", "default_repo", "pkgType"),
  value = c(
    R.version.string,
    R.home(),
    Sys.getenv("R_LIBS_USER"),
    getOption("repos")[["CRAN"]],
    getOption("pkgType")
  )
)

write.csv(env_info, "results/r_package_install_env.csv", row.names = FALSE)

packages_to_check <- c("BiocManager", "remotes", "pak", "readr", "ggplot2")

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

write.csv(package_status, "results/package_status.csv", row.names = FALSE)

cat("\n--- Installation methods ---\n")
print(install_methods)

cat("\n--- Environment info ---\n")
print(env_info)

cat("\n--- Package status ---\n")
print(package_status)

cat("\n--- Library paths ---\n")
print(.libPaths())

cat("\nFiles written:\n")
cat("- data/package_install_methods.csv\n")
cat("- results/r_package_install_env.csv\n")
cat("- results/package_status.csv\n")

cat("\n--- sessionInfo() ---\n")
print(sessionInfo())
