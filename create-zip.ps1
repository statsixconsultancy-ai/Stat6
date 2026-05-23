# Stat6 Platform — ZIP Creator (PowerShell)
# Right-click this file → "Run with PowerShell"
# OR run in terminal: .\create-zip.ps1

$source = Split-Path -Parent $MyInvocation.MyCommand.Path
$output = Join-Path $source "stat6-platform.zip"

$exclude = @("node_modules", ".next", ".git", "__pycache__", ".vercel", "dist", "build")
$excludeFiles = @(".env", ".env.local", "stat6-platform.zip", "create-zip.ps1", "create-zip.py")

Write-Host "Packaging Stat6 Platform..." -ForegroundColor Green

if (Test-Path $output) { Remove-Item $output }

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($output, 'Create')

$count = 0
Get-ChildItem -Path $source -Recurse -File | ForEach-Object {
    $rel = $_.FullName.Substring($source.Length + 1)
    $skip = $false

    foreach ($ex in $exclude) {
        if ($rel -match "^$ex[\\/]" -or $rel -match "[\\/]$ex[\\/]") {
            $skip = $true; break
        }
    }
    if ($_.Name -in $excludeFiles) { $skip = $true }

    if (-not $skip) {
        $entryName = "stat6-platform\" + $rel
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entryName, 'Optimal') | Out-Null
        $count++
    }
}

$zip.Dispose()
$sizeMB = [math]::Round((Get-Item $output).Length / 1MB, 2)

Write-Host "Done! $count files zipped ($sizeMB MB)" -ForegroundColor Green
Write-Host "Saved: $output" -ForegroundColor Cyan
Read-Host "Press Enter to close"
