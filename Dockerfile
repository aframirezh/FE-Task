# ---- Base dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app

# Install deps (use package-lock for reproducibility)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# ---- Test stage (unit + integration) ----
FROM deps AS test
ENV CI=true
# Ensure Vite env is available for integration tests (MSW + react-query)
# Provide via build/run env in CI ideally; default here is safe fallback for tests.
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run test

# ---- Build stage ----
FROM deps AS build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# ---- Production stage (Nginx serving static dist) ----
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html

# Copy build artifacts
COPY --from=build /app/dist .

# SPA fallback (Vite + React Router not used now, but safe)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
