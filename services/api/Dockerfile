FROM node:20-alpine
WORKDIR /usr/src/app

# Install production dependencies
COPY services/api/package.json services/api/package-lock.json* ./
RUN npm ci --production

# Copy source
COPY services/api ./

# Generate Prisma client and build
RUN npx prisma generate && npm run build

EXPOSE 3001
CMD ["node", "dist/index.js"]
