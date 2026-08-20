$ErrorActionPreference = 'Stop'
task release:validate
task release:version
task build
task docker:build
task security
task sbom
