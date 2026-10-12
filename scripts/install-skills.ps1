# Installs the project's design skills into this repo (not globally), from their own sources.
# Run from the repo root:  powershell -ExecutionPolicy Bypass -File scripts/install-skills.ps1
$ErrorActionPreference = "Stop"

$skills = @(
  @("pbakaus/impeccable", "impeccable"),
  @("emilkowalski/skill", "emil-design-eng"),
  @("emilkowalski/skill", "review-animations"),
  @("emilkowalski/skills", "prototype"),
  @("emilkowalski/skills", "animation-vocabulary"),
  @("emilkowalski/skills", "apple-design"),
  @("jakubkrehel/make-interfaces-feel-better", "make-interfaces-feel-better"),
  @("jakubkrehel/oklch-skill", "oklch-skill"),
  @("ibelick/ui-skills", "baseline-ui"),
  @("ibelick/ui-skills", "fixing-accessibility"),
  @("ibelick/ui-skills", "fixing-motion-performance")
)

foreach ($s in $skills) {
  Write-Host "Installing $($s[1]) from $($s[0])"
  npx --yes skills add $s[0] --skill $s[1] -y
}

Write-Host "Done. frontend-design is already in .claude/skills."
