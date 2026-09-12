# =========================
# Build stage
# =========================
FROM multi-service-web-base:1.0 AS builder

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies inside the Linux container
RUN npm install

# Copy application source
COPY . .

# Build React/Vite application
RUN npm run build


# =========================
# Production stage
# =========================
FROM nginx:1.29-alpine AS production

# Copy compiled React application
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]Get-Content ..\base-images\web-base\Dockerfile