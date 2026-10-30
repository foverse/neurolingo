#!/usr/bin/env python3
"""
NeuroLingo Deck Exporter
Author: Fouad (@foverse) - growthmaker.fr
Exports curated cards into Anki-ready 5-field TSV format.
"""

import sys
import csv
import json
from pathlib import Path

def export_to_tsv(input_file, output_file):
    in_path = Path(input_file)
    out_path = Path(output_file)

    if not in_path.exists():
        print(f"Error: {in_path} does not exist")
        return

    cards = []
    if in_path.suffix == '.json':
        with open(in_path, 'r', encoding='utf-8') as f:
            cards = json.load(f)
    elif in_path.suffix == '.tsv':
        with open(in_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f, delimiter='\t')
            for r in reader:
                if len(r) >= 4:
                    cards.append({
                        'front': r[0],
                        'back': r[1],
                        'category': r[2],
                        'type': r[3],
                        'audio': r[4] if len(r) > 4 else '-'
                    })

    with open(out_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter='\t')
        for c in cards:
            writer.writerow([
                c.get('front', ''),
                c.get('back', ''),
                c.get('category', ''),
                c.get('type', ''),
                c.get('audio', '-')
            ])

    print(f"Successfully exported {len(cards)} cards to {out_path}")

if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else '../data/french_expert_1000_cards.tsv'
    dst = sys.argv[2] if len(sys.argv) > 2 else '../data/exported_deck.tsv'
    export_to_tsv(src, dst)
