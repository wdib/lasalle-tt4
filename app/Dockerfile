# Stage: base
FROM node:22.13.0 AS base
WORKDIR /app

# Stage: frontend-base
# Objective: Build the frontend
# Steps:
#   - Copy package.json (and package-lock.json)
#   - Install dependencies
#   - Copy frontend source files
#   - npm run build
#
FROM base AS frontend-base
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install --omit-dev
COPY frontend/vite.config.js frontend/index.html frontend/eslint.config.js .
COPY frontend/src ./src

FROM frontend-base AS frontend-build
RUN npm run build

# Stage: final
# Put it all together and start the container
FROM base AS final
ENV NODE_ENV=production
COPY backend/package.json .
COPY backend/package-lock.json .
RUN npm install --omit-dev
COPY backend/httpServer.js ./src/
COPY --from=frontend-build /app/dist ./src/static
EXPOSE 3000

CMD [ "node", "src/httpServer.js" ]