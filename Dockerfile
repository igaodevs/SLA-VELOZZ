FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml ./
# Allow install even if lockfile is out of date in build environments
# Long-term: regenerate `pnpm-lock.yaml` locally and commit to keep CI reproducible
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

# Copy sources and build
COPY . .
RUN pnpm build

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "pnpm start -- -p ${PORT:-3000}"]
