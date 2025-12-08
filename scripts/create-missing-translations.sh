#!/usr/bin/env bash

# Script to find and create missing translated pages compared to English
# This script copies English files to language folders where they don't exist

DOCS_BASE="/Users/martindonadieu/Projects/capgo_all/website/src/content/docs"
EN_DOCS="$DOCS_BASE/docs"

# Language folders to check (excluding 'docs' which is English)
LANGUAGES="de fr es it id ja ko zh"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Mode: "check" (default) or "create"
MODE="${1:-check}"

echo "========================================"
echo "Missing Translations Finder"
echo "========================================"
echo ""
echo "Mode: $MODE"
echo "English docs: $EN_DOCS"
echo ""

# Function to get relative path
get_relative_path() {
    local full_path="$1"
    local base_path="$2"
    echo "${full_path#$base_path/}"
}

# Find all English files
echo "Scanning English documentation..."
EN_FILES=$(find "$EN_DOCS" -type f \( -name "*.md" -o -name "*.mdx" \) | sort)
EN_COUNT=$(echo "$EN_FILES" | wc -l | tr -d ' ')
echo "Found $EN_COUNT English files"
echo ""

# Initialize summary file
SUMMARY_FILE=$(mktemp)

# Process each language
for LANG in $LANGUAGES; do
    LANG_DOCS="$DOCS_BASE/$LANG/docs"
    MISSING_COUNT=0
    CREATED_COUNT=0

    echo "----------------------------------------"
    echo -e "${BLUE}Processing: $LANG${NC}"
    echo "----------------------------------------"

    # Create language docs folder if it doesn't exist
    if [ ! -d "$LANG_DOCS" ]; then
        echo -e "${YELLOW}Creating language folder: $LANG_DOCS${NC}"
        if [ "$MODE" = "create" ]; then
            mkdir -p "$LANG_DOCS"
        fi
    fi

    # Check each English file
    while IFS= read -r en_file; do
        [ -z "$en_file" ] && continue

        # Get relative path from English docs
        rel_path=$(get_relative_path "$en_file" "$EN_DOCS")

        # Construct expected path in language folder
        lang_file="$LANG_DOCS/$rel_path"

        # Check if file exists in language folder
        if [ ! -f "$lang_file" ]; then
            MISSING_COUNT=$((MISSING_COUNT + 1))

            if [ "$MODE" = "check" ]; then
                echo -e "${RED}Missing:${NC} $rel_path"
            elif [ "$MODE" = "create" ]; then
                # Create directory if needed
                lang_dir=$(dirname "$lang_file")
                if [ ! -d "$lang_dir" ]; then
                    mkdir -p "$lang_dir"
                fi

                # Copy English file to language folder
                cp "$en_file" "$lang_file"
                CREATED_COUNT=$((CREATED_COUNT + 1))
                echo -e "${GREEN}Created:${NC} $lang_file"
            fi
        fi
    done <<< "$EN_FILES"

    EXISTING=$((EN_COUNT - MISSING_COUNT))
    if [ "$EN_COUNT" -gt 0 ]; then
        PERCENTAGE=$((EXISTING * 100 / EN_COUNT))
    else
        PERCENTAGE=0
    fi

    echo ""
    echo -e "Missing files for $LANG: ${YELLOW}${MISSING_COUNT}${NC}"
    if [ "$MODE" = "create" ]; then
        echo -e "Created files for $LANG: ${GREEN}${CREATED_COUNT}${NC}"
    fi
    echo ""

    # Save to summary
    echo "$LANG $MISSING_COUNT $CREATED_COUNT $PERCENTAGE" >> "$SUMMARY_FILE"
done

# Summary
echo "========================================"
echo "SUMMARY"
echo "========================================"
echo ""
echo "English files: $EN_COUNT"
echo ""
echo "Missing files per language:"
while read -r line; do
    LANG=$(echo "$line" | cut -d' ' -f1)
    MISSING=$(echo "$line" | cut -d' ' -f2)
    CREATED=$(echo "$line" | cut -d' ' -f3)
    PCT=$(echo "$line" | cut -d' ' -f4)
    echo -e "  $LANG: ${YELLOW}${MISSING}${NC} missing (${PCT}% translated)"
done < "$SUMMARY_FILE"

if [ "$MODE" = "create" ]; then
    echo ""
    echo "Created files per language:"
    while read -r line; do
        LANG=$(echo "$line" | cut -d' ' -f1)
        CREATED=$(echo "$line" | cut -d' ' -f3)
        echo -e "  $LANG: ${GREEN}${CREATED}${NC} files created"
    done < "$SUMMARY_FILE"
fi

# Cleanup
rm -f "$SUMMARY_FILE"

echo ""
echo "========================================"
if [ "$MODE" = "check" ]; then
    echo "Run with 'create' argument to create missing files:"
    echo "  ./create-missing-translations.sh create"
fi
echo "========================================"
