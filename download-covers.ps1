$books = @(
    @{
        title = "great-gatsby"
        url = "https://covers.openlibrary.org/b/id/4266961-L.jpg"
    },
    @{
        title = "to-kill-a-mockingbird"
        url = "https://covers.openlibrary.org/b/id/8416146-L.jpg"
    },
    @{
        title = "1984"
        url = "https://covers.openlibrary.org/b/id/7282922-L.jpg"
    }
)

$outputPath = ".\public\images\books"

foreach ($book in $books) {
    $outputFile = Join-Path $outputPath "$($book.title).jpg"
    Write-Host "Downloading $($book.title)..."
    
    try {
        Invoke-WebRequest -Uri $book.url -OutFile $outputFile
        Write-Host "Successfully downloaded to $outputFile"
    } catch {
        Write-Host "Failed to download $($book.title): $_"
    }
}