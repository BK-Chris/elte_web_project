Set-StrictMode -Version Latest
$className = "color_palettes"
$file = './scripts/color_palettes.csv'

function ConvertHexToRgb($hexValue) {
    $hexValue = $hexValue.Replace("#", "")
    $r = [Convert]::ToInt32($hexValue.Substring(0, 2),16)
    $g = [Convert]::ToInt32($hexValue.Substring(2, 2),16)
    $b = [Convert]::ToInt32($hexValue.Substring(4, 2),16)
    return "rgb($r, $g, $b)"
}

function CreateHtmlTable($csvFile, $className){
    $html = ""
    foreach($line in Get-Content $csvFile){
        $hexValues = $line.Split(",")
        $html += "<table class='$className'><thead><tr><th>HEX</th><th>RGB</th></tr></thead><tbody>"
        foreach($hexValue in $hexValues){
            $rgbValue = ConvertHexToRgb($hexValue)
            $html += "<tr style='background-color: $hexValue;'><td>$hexValue</td><td>$rgbValue</td></tr>"
        }
        $html += "</tbody></table>"
    }
   
    return $html
}

$html = CreateHtmlTable $file $className

New-Item -Path . -Name "./scripts/generated_tables.html" -ItemType "file" -Value $html