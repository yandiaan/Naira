$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
$version = if ($env:APP_VERSION) { $env:APP_VERSION } else { '0.1.0-dev' }
$sha = if ($env:GIT_SHA) { $env:GIT_SHA } else { (git rev-parse --short HEAD).Trim() }
$buildTime = if ($env:BUILD_TIME) { $env:BUILD_TIME } else { (Get-Date).ToUniversalTime().ToString('o') }

docker build --build-arg APP_VERSION=$version --build-arg GIT_SHA=$sha --build-arg BUILD_TIME=$buildTime -f infra/docker/api.Dockerfile -t naira-api:$version .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
docker build -f infra/docker/site.Dockerfile -t naira-site:$version .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
docker build -f infra/docker/workspace.Dockerfile -t naira-workspace:$version .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
