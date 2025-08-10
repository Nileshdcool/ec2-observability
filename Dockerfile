# Use official Node.js LTS image

FROM node:20 AS builder
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy all files and build
COPY . .
RUN npm run build

FROM node:20 AS runner
WORKDIR /app

# Only copy necessary files for running the app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/components ./components
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/lib ./lib

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
