# RStudio basic environment configuration check -----------------------------
# Run from this folder:
# Rscript code/rstudio-basic-config-check.R

dir.create("data", showWarnings = FALSE)
dir.create("results", showWarnings = FALSE)

project_dirs <- c("code", "data", "results", "figures", "objects", "docs")
dir_status <- data.frame(
  directory = project_dirs,
  exists = file.exists(project_dirs)
)

for (d in project_dirs) {
  dir.create(d, showWarnings = FALSE)
}

env_info <- data.frame(
  item = c(
    "working_directory",
    "R.version.string",
    "R.home",
    "RStudio_detected",
    "R_LIBS_USER",
    "library_paths",
    "CRAN_repo",
    "pkgType",
    "user_home",
    "project_Rprofile_path",
    "user_Rprofile_path",
    "user_Renviron_path"
  ),
  value = c(
    getwd(),
    R.version.string,
    R.home(),
    Sys.getenv("RSTUDIO") == "1",
    Sys.getenv("R_LIBS_USER"),
    paste(.libPaths(), collapse = " | "),
    unname(getOption("repos")[["CRAN"]]),
    getOption("pkgType"),
    path.expand("~"),
    normalizePath(".Rprofile", mustWork = FALSE),
    normalizePath("~/.Rprofile", mustWork = FALSE),
    normalizePath("~/.Renviron", mustWork = FALSE)
  )
)

write.csv(env_info, "results/rstudio_basic_config_env.csv", row.names = FALSE)
write.csv(dir_status, "results/project_directory_status_before.csv", row.names = FALSE)

recommended_repos <- data.frame(
  name = c("Global cloud CRAN", "Tsinghua CRAN mirror", "USTC CRAN mirror"),
  url = c(
    "https://cloud.r-project.org",
    "https://mirrors.tuna.tsinghua.edu.cn/CRAN/",
    "https://mirrors.ustc.edu.cn/CRAN/"
  ),
  use_case = c(
    "Default global CDN mirror, good general choice",
    "Common mirror for users in mainland China",
    "Common mirror for users in mainland China"
  )
)

write.csv(recommended_repos, "data/recommended_cran_mirrors.csv", row.names = FALSE)

rprofile_template <- c(
  "# Project-level .Rprofile example",
  "# Put this file in a project root only when you understand the startup behavior.",
  "# Changes take effect after restarting R.",
  "",
  "options(repos = c(CRAN = \"https://cloud.r-project.org\"))",
  "options(stringsAsFactors = FALSE)",
  "options(width = 100)",
  "",
  "message(\"Project .Rprofile loaded: \", getwd())"
)

writeLines(rprofile_template, "data/Rprofile.example")

config_check <- data.frame(
  check = c(
    "Use an RStudio Project",
    "Avoid Chinese or special characters in project path",
    "Keep code/data/results separated",
    "Set a stable CRAN mirror",
    "Keep package library writable",
    "Avoid saving .RData automatically",
    "Restart R after editing .Rprofile"
  ),
  command_or_place = c(
    "File -> New Project",
    "getwd()",
    "code/ data/ results/",
    "Tools -> Global Options -> Packages or options(repos=...)",
    ".libPaths()",
    "Tools -> Global Options -> General",
    "Session -> Restart R"
  )
)

write.csv(config_check, "results/rstudio_basic_config_checklist.csv", row.names = FALSE)

cat("\n--- Environment info ---\n")
print(env_info)

cat("\n--- Recommended CRAN mirrors ---\n")
print(recommended_repos)

cat("\n--- Checklist ---\n")
print(config_check)

cat("\nFiles written:\n")
cat("- data/recommended_cran_mirrors.csv\n")
cat("- data/Rprofile.example\n")
cat("- results/rstudio_basic_config_env.csv\n")
cat("- results/project_directory_status_before.csv\n")
cat("- results/rstudio_basic_config_checklist.csv\n")

cat("\n--- sessionInfo() ---\n")
print(sessionInfo())
