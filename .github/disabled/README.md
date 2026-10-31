# Parked GitHub automation

These files are off. GitHub only runs `.github/workflows/*.yml` and reads `.github/dependabot.yml`.
The project tests on localhost only until deployment work starts.

## Turn back on

```bash
mv .github/disabled/workflows .github/workflows
mv .github/disabled/dependabot.yml .github/dependabot.yml
```

| File | What it does |
|---|---|
| `workflows/ci.yml` | Lint, typecheck, unit and integration tests, build on each PR |
| `workflows/playwright.yml` | e2e and a11y tests against Postgres |
| `workflows/security.yml` | Trivy, CodeQL and ZAP scans |
| `dependabot.yml` | Weekly dependency update PRs |
