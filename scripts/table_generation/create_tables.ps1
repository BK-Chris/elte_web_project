Set-StrictMode -Version Latest
$tableClassName = "cp_table"
$trClassName = "color_shade"
$file = "./scripts/table_generation/color_schemes_with_description.csv"

function ConvertHexToRgb($hexValue) {
    $hexValue = $hexValue.Replace("#", "")
    $r = [Convert]::ToInt32($hexValue.Substring(0, 2), 16)
    $g = [Convert]::ToInt32($hexValue.Substring(2, 2), 16)
    $b = [Convert]::ToInt32($hexValue.Substring(4, 2), 16)
    return "rgb($r, $g, $b)"
}

function CreateHtmlTable($csvFile) {
    $html = ""

    foreach ($line in Get-Content $csvFile | Select-Object -Skip 1) {
        $parts = $line.Split(",")
        
        $hexValues = $parts[0..3]

        $fantasyName = $parts[4]
        $description = $parts[5]

        $html += "<table class=`"$tableClassName`"><caption><details><summary>$fantasyName</summary>$description</details></caption><thead><tr><th>HEX</th><th>RGB</th></tr></thead><tbody>"
        foreach ($hexValue in $hexValues) {
            $rgbValue = ConvertHexToRgb($hexValue)
            $html += "<tr class=`"$trClassName`" style=`"background-color: $hexValue;`"><td>$hexValue</td><td>$rgbValue</td></tr>"
        }
        $html += "</tbody></table>"
    }
   
    return $html
}

$html = CreateHtmlTable $file
# Write-Output $html
New-Item -Path . -Name "./scripts/table_generation/cp_tables.html" -ItemType "file" -Value $html -Force