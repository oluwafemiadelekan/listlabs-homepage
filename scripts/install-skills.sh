#!/usr/bin/env sh
# Installs the project's design skills into this repo (not globally), from their own sources.
# Run from the repo root:  sh scripts/install-skills.sh
set -e

add() {
  echo "Installing $2 from $1"
  npx --yes skills add "$1" --skill "$2" -y
}

add pbakaus/impeccable impeccable
add emilkowalski/skill emil-design-eng
add emilkowalski/skill review-animations
add emilkowalski/skills prototype
add emilkowalski/skills animation-vocabulary
add emilkowalski/skills apple-design
add jakubkrehel/make-interfaces-feel-better make-interfaces-feel-better
add jakubkrehel/oklch-skill oklch-skill
add ibelick/ui-skills baseline-ui
add ibelick/ui-skills fixing-accessibility
add ibelick/ui-skills fixing-motion-performance

echo "Done. frontend-design is already in .claude/skills."
