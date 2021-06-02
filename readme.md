## System requirements
### Operating System
Cypress is a desktop application that is installed on your computer. The desktop application supports these operating systems:

- macOS 10.9 and above (64-bit only)
- Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
- Windows 7 and above


### Node.js
If you're using npm to install Cypress, we support:

Node.js 12 or 14 and above. See `.nvmrc` file.

### Linux
If you're using Linux, you'll want to have the required dependencies installed on your system.

```
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

CentOS
```
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
```

## Installing
Clone this project, and install all deps using
```
yarn 
```
or

```
npm install 
```

## Running
```
yarn start
```
or
```
npm start
```

## Tests
You can find all the tests into `cypress/integration` folder. 

### Important
You also needs the front-end server running the same time with this project! (https://github.com/caiodesign/easynvest-front-end-challenge)


## Cypress
Documentation: https://docs.cypress.io/guides/getting-started/