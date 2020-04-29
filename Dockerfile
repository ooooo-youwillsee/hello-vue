# 预渲染 Dockerfile
FROM node:10

RUN sed -i 's/deb.debian.org/mirrors.163.com/g' /etc/apt/sources.list && sed -i 's|security.debian.org/debian-security|mirrors.ustc.edu.cn/debian-security|g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
      libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
      libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
      libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget nginx && \
    rm -rf /var/lib/apt/lists/*

# Add user so we don't need --no-sandbox.
#RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#    && mkdir -p /home/pptruser/Downloads \
#    && chown -R pptruser:pptruser /home/pptruser \

# Run everything after as non-privileged user.
#USER pptruser
USER root

WORKDIR /app

COPY . /app/

RUN npm install cnpm -g --registry=https://registry.npm.taobao.org --unsafe-perm && \
    cnpm install && \
    npm run build && \
    cp -r dist/* /var/www/html && \
    rm -rf /app

CMD ["nginx","-g","daemon off;"]
