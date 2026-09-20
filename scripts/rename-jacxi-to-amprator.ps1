$ErrorActionPreference = 'Stop'
$root = 'c:\Users\RDP\ampratorshipping'

# Ordered replacements (most specific first) — array of pairs since PS hash keys are case-insensitive
$replacements = @(
    @('Amprator_Shipping', 'Amprator_Shipping'),
    @('amprator-shipping', 'amprator-shipping'),
    @('ampratorshipping',  'ampratorshipping'),
    @('Amprator Shipping', 'Amprator Shipping'),
    @('Amprator Shipping', 'Amprator Shipping'),
    @('Amprator',          'Amprator'),
    @('Amprator',          'Amprator'),
    @('amprator',          'amprator')
)

# Extensions considered text
$textExts = @('.ts','.tsx','.js','.mjs','.cjs','.jsx','.json','.md','.txt','.css','.scss','.yml','.yaml','.sh','.ps1','.psm1','.html','.htm','.prisma','.env','.example','.svg','.xml','.toml','.lock','.sql','.log','.gitignore','.dockerignore','.babel','.config')
# Skip folders entirely
$skipDirs = @('\.git\','\node_modules\','\.next\','\.turbo\','\dist\','\build\','\.vercel\','\test-results\','\backups\','\playwright-report\')
# Binary extensions to skip
$skipExts = @('.png','.jpg','.jpeg','.gif','.webp','.ico','.woff','.woff2','.ttf','.eot','.otf','.mp4','.pdf','.zip','.dylib','.node')

$changedFiles = 0
$changedCount = 0

Get-ChildItem -Path $root -Recurse -Force -File | Where-Object {
    $full = $_.FullName
    -not ($skipDirs | Where-Object { $full -like "*$_*" }) -and
    -not ($skipExts | Where-Object { $_.Extension -eq $_ })
} | ForEach-Object {
    $file = $_
    $isText = ($textExts | Where-Object { $file.Extension -eq $_ -or $file.Name -eq $_ -or $file.Name.EndsWith($_) }).Count -gt 0
    if (-not $isText) { return }
    if ($file.FullName -like "*\.git\*") { return }
    if ($file.Length -gt 5MB) { return }

    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
    } catch { return }

    $new = $content
    foreach ($pair in $replacements) {
        $new = $new.Replace($pair[0], $pair[1])
    }
    if ($new -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $new)
        $script:changedFiles++
        $script:changedCount++
        Write-Output "CHANGED: $($file.FullName.Substring($root.Length + 1))"
    }
}

Write-Output "`nTotal files changed: $changedFiles"
