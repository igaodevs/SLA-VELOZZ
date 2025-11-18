FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy sources and build
COPY . .
RUN pnpm build

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "pnpm start -- -p ${PORT:-3000}"]
