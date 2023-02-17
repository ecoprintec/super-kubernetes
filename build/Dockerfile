# Copyright 2021 The Super Kubenetes Authors. All rights reserved.
# Use of this source code is governed by an Apache license
# that can be found in the LICENSE file.

# Prepare the build environment
FROM node:12-alpine3.14 as builder

ARG YARN_VERSION=1.22.4

WORKDIR /kubesphere
ADD . /super-kubenetes/

RUN apk add --no-cache --virtual .build-deps ca-certificates python2 python3 py3-pip make openssl g++ bash
RUN npm install yarn@${YARN_VERSION}

# If you have trouble downloading the yarn binary, try the following:
# RUN yarn config set registry https://registry.npmmirror.com

RUN yarn && yarn build

# Copy compiled files
RUN mkdir -p /out/server
RUN mv /super-kubenetes/dist/ /out/
RUN mv /super-kubenetes/server/locales \
       /super-kubenetes/server/public \
       /super-kubenetes/server/views \
       /super-kubenetes/server/sample \
       /super-kubenetes/server/config.yaml /out/server/
#RUN ["/bin/bash", "-c", "mv /super-kubenetes/server/{locales,public,sample,views,config.yaml} /out/server/"]
RUN mv /super-kubenetes/package.json /out/

##############
# Final Image
##############
FROM node:12-alpine3.14 as base_os_context

RUN adduser -D -g kubesphere -u 1002 kubesphere && \
    mkdir -p /opt/super-kubenetes/console && \
    chown -R kubesphere:kubesphere /opt/super-kubenetes/console

WORKDIR /opt/super-kubenetes/console
COPY --from=builder /out/ /opt/super-kubenetes/console/

RUN mv dist/server.js server/server.js
USER kubesphere

EXPOSE 8080

CMD ["npm", "run", "serve"]

