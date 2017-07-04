#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
COVERAGE_DIR="$REPO_ROOT"/coverage

rm -rf "$COVERAGE_DIR"

mkdir "$COVERAGE_DIR"

find "$REPO_ROOT"/packages -name "lcov.info" -exec cat {} > "$COVERAGE_DIR"/lcov.info \;