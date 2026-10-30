#!/usr/bin/env python3
"""
NeuroLingo Deck Validator
Author: Fouad (@foverse) - growthmaker.fr
Validates 5-field TSV decks for Anki and NeuroLingo.
"""

import sys
import csv
from pathlib import Path

def validate_deck(file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"Error: File not found at {path}")
        return False

    with open(path, "r", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        rows = list(reader)

    print(f"Validating {path.name}...")
    print(f"Total cards loaded: {len(rows)}")

    errors = []
    categories = {}
    types = {}

    for idx, row in enumerate(rows, start=1):
        if len(row) < 4:
            errors.append(f"Row {idx}: expected at least 4 fields, found {len(row)}")
            continue

        front, back, cat, card_type = row[0].strip(), row[1].strip(), row[2].strip(), row[3].strip()

        if not front:
            errors.append(f"Row {idx}: empty front field")
        if not back:
            errors.append(f"Row {idx}: empty back field")

        if card_type == "Cloze" and "{{c1::" not in front:
            errors.append(f"Row {idx}: Cloze card without {{{{c1::...}}}} markup")

        categories[cat] = categories.get(cat, 0) + 1
        types[card_type] = types.get(card_type, 0) + 1

    if errors:
        print(f"Found {len(errors)} validation errors:")
        for err in errors[:10]:
            print(f"  - {err}")
        return False

    print("\nValidation PASSED: All cards structured properly.")
    print("\nCategories breakdown:")
    for cat, count in sorted(categories.items()):
        print(f"  - {cat}: {count} cards")

    print("\nCard types breakdown:")
    for ct, count in sorted(types.items()):
        print(f"  - {ct}: {count} cards")

    return True

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "../data/french_expert_1000_cards.tsv"
    success = validate_deck(target)
    sys.exit(0 if success else 1)
