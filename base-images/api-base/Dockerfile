FROM node:22-alpine

LABEL maintainer="DevOps Engineer"
LABEL description="Custom Node.js base image for Multi-Service Application"

ENV NODE_ENV=production

RUN apk add --no-cache \
    curl \
    tini

WORKDIR /app

RUN addgroup -S nodeapp && \
    adduser -S nodeapp -G nodeapp

RUN chown -R nodeapp:nodeapp /app

USER nodeapp

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "--version"]