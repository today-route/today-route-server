FROM rust:1.58.1-alpine3.14 as prisma
ENV RUSTFLAGS="-C target-feature=-crt-static"
RUN apk --no-cache add openssl direnv git musl-dev openssl-dev build-base perl protoc
RUN git clone --depth=1 --branch=3.9.0 https://github.com/prisma/prisma-engines.git /prisma
WORKDIR /prisma
RUN ls -a
RUN cargo build --release --jobs 1

FROM node:16.14.2-alpine
WORKDIR /src
ENV PRISMA_QUERY_ENGINE_BINARY=/prisma-engines/query-engine \
  PRISMA_MIGRATION_ENGINE_BINARY=/prisma-engines/migration-engine \
  PRISMA_INTROSPECTION_ENGINE_BINARY=/prisma-engines/introspection-engine \
  PRISMA_FMT_BINARY=/prisma-engines/prisma-fmt \
  PRISMA_CLI_QUERY_ENGINE_TYPE=binary \
  PRISMA_CLIENT_ENGINE_TYPE=binary
COPY --from=prisma /prisma/target/release/query-engine /prisma/target/release/migration-engine /prisma/target/release/introspection-engine /prisma/target/release/prisma-fmt /prisma-engines/
COPY . /src
RUN cd src
RUN npm install
RUN npm install -g pm2

RUN npx prisma generate

RUN npm run build

# ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
# RUN chmod +x /wait-for-it.sh

RUN ls -a

ENTRYPOINT ["pm2-runtime", "./dist/main.js"]