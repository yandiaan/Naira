$ErrorActionPreference = 'Stop'

$checks = @(
  @{ Url = 'http://127.0.0.1:8080/health/live'; Name = 'API liveness' },
  @{ Url = 'http://127.0.0.1:8080/health/ready'; Name = 'API readiness' },
  @{ Url = 'http://127.0.0.1:8080/version'; Name = 'API version' },
  @{ Url = 'http://127.0.0.1:4322/'; Name = 'Public site' },
  @{ Url = 'http://127.0.0.1:5174/app'; Name = 'Workspace app' },
  @{ Url = 'http://127.0.0.1:5174/admin'; Name = 'Workspace admin' }
)

foreach ($check in $checks) {
  $response = Invoke-WebRequest -Uri $check.Url -UseBasicParsing
  if ($response.StatusCode -ne 200) {
    throw "$($check.Name) returned $($response.StatusCode)"
  }
}
