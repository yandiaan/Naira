FROM node:22.22.3-bookworm-slim AS builder

WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/site/package.json apps/site/package.json
COPY packages/design-tokens/package.json packages/design-tokens/package.json
COPY packages/api-contracts/package.json packages/api-contracts/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/tsconfig/package.json packages/tsconfig/package.json
COPY packages/ui-svelte/package.json packages/ui-svelte/package.json
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter site build

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY infra/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/site/dist /usr/share/nginx/html
EXPOSE 8080
