package buildinfo

type BuildInfo struct {
	Service   string `json:"service"`
	Version   string `json:"version"`
	GitSHA    string `json:"gitSha"`
	BuildTime string `json:"buildTime"`
}

func Default() BuildInfo {
	return BuildInfo{
		Service:   "naira-api",
		Version:   "0.1.0-dev",
		GitSHA:    "unknown",
		BuildTime: "unknown",
	}
}
