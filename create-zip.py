"""
Stat6 Platform — ZIP Creator
Run this script once to create stat6-platform.zip in the same folder.
Usage: python create-zip.py
"""

import zipfile
import os
import sys

# Folders and files to exclude
EXCLUDE_DIRS = {
    "node_modules", ".next", ".git", "__pycache__",
    ".vercel", "dist", "build", ".turbo",
}
EXCLUDE_FILES = {
    ".env", ".env.local", ".env.development.local",
    ".env.production.local", "create-zip.py",
    "stat6-platform.zip",
}
EXCLUDE_EXTENSIONS = {".pyc", ".pyo", ".log"}

def should_exclude(path: str) -> bool:
    parts = path.replace("\\", "/").split("/")
    # Skip excluded directories anywhere in the path
    for part in parts:
        if part in EXCLUDE_DIRS:
            return True
    filename = os.path.basename(path)
    if filename in EXCLUDE_FILES:
        return True
    _, ext = os.path.splitext(filename)
    if ext in EXCLUDE_EXTENSIONS:
        return True
    return False

def create_zip():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_zip = os.path.join(script_dir, "stat6-platform.zip")

    print(f"📦 Creating ZIP: stat6-platform.zip")
    print(f"📂 Source: {script_dir}\n")

    file_count = 0
    skipped_count = 0

    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for root, dirs, files in os.walk(script_dir):
            # Prune excluded directories in-place so os.walk skips them
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            for filename in files:
                filepath = os.path.join(root, filename)
                rel_path = os.path.relpath(filepath, script_dir)

                if should_exclude(rel_path):
                    skipped_count += 1
                    continue

                arcname = os.path.join("stat6-platform", rel_path)
                zf.write(filepath, arcname)
                file_count += 1

                if file_count % 10 == 0:
                    print(f"  ✓ {file_count} files added...", end="\r")

    size_mb = os.path.getsize(output_zip) / (1024 * 1024)

    print(f"\n✅ Done!")
    print(f"   Files included : {file_count}")
    print(f"   Files skipped  : {skipped_count} (node_modules, .next, env files)")
    print(f"   ZIP size       : {size_mb:.2f} MB")
    print(f"   Saved to       : {output_zip}")

if __name__ == "__main__":
    create_zip()
