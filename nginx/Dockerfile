FROM nginx:1.29-alpine

LABEL description="Reverse proxy for Multi-Service Application"

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf \
    /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s \
            --timeout=5s \
            --start-period=10s \
            --retries=3 \
    CMD wget --no-verbose \
        --tries=1 \
        --spider \
        http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]