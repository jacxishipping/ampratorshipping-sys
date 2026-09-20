$ErrorActionPreference = 'Stop'
$root = 'c:\Users\RDP\jacxishipping'

# Repoint accent references from gold to primary token
$replacements = @(
    @('var(--accent-gold-rgb)', 'var(--primary-rgb)'),
    @('var(--accent-gold)', 'var(--primary)')
)

$skipDirs = @('\.git\','\node_modules\','\.next\')
$changed = 0

Get-ChildItem -Path "$root\src" -Recurse -Force -File -Include *.ts,*.tsx,*.css | ForEach-Object {
    $file = $_
    if ($skipDirs | Where-Object { $file.FullName -like "*$_*" }) { return }
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $new = $content
    foreach ($pair in $replacements) {
        $new = $new.Replace($pair[0], $pair[1])
    }
    if ($new -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $new)
        $script:changed++
        Write-Output "CHANGED: $($file.FullName.Substring($root.Length + 1))"
    }
}

Write-Output "Total files changed: $changed"
