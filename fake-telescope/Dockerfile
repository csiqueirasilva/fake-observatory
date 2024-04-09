# Use an official Node runtime as a parent image
FROM node:21

RUN apt-get update && apt-get install -y \
    xvfb \
    x11vnc \
    fluxbox \
    wget \
    gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget ca-certificates \
    vim \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY instance/package.json ./
COPY instance/main.js ./

RUN npm install

COPY app/build build

EXPOSE 5900

# Command to run VNC server and your app
CMD Xvfb ${DISPLAY} -screen 0 1024x768x16 & \
    fluxbox & \
    x11vnc -ncache 0 -display ${DISPLAY} -nopw -xkb -forever & \
    node main.js