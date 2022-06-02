yarn build
Copy-Item .htaccess dist/
Set-Location dist
Compress-Archive * dist.zip
Set-Location ..
