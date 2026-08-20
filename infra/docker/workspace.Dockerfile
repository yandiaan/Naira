FROM node:22.22.3-bookworm-slim AS builder

WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/workspace/package.json apps/workspace/package.json
COPY packages/design-tokens/package.json packages/design-tokens/package.json
COPY packages/api-contracts/package.json packages/api-contracts/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/ui-svelte/package.json packages/ui-svelte/package.json
COPY packages/tsconfig/package.json packages/tsconfig/package.json
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter workspace build

FROM node:22.22.3-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/workspace/build ./build
USER node
EXPOSE 3000
CMD ["node", "build"]
