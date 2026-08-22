$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
node scripts/release-components.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
task release:validate
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
task release:version
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
task build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
task docker:build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
task security
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
task sbom
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
