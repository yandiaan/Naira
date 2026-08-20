package buildinfo

type BuildInfo struct {
	Service   string `json:"service"`
	Version   string `json:"version"`
	GitSHA    string `json:"gitSha"`
	BuildTime string `json:"buildTime"`
}

var (
	Version   = "0.1.0-dev"
	GitSHA    = "unknown"
	BuildTime = "unknown"
)

func Default() BuildInfo {
	return BuildInfo{
		Service:   "naira-api",
		Version:   Version,
		GitSHA:    GitSHA,
		BuildTime: BuildTime,
	}
}
