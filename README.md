# 🍌+📞
Bananaphone is a DIY paging system for your small business or organization, intended to run on a Raspberry Pi.

## Features
* Lightweight (runs easily on a Rasperry Pi Zero W)!
* Node w/ [Express.js](https://github.com/expressjs/express) server
* Handlebar templates
* [GUN](https://github.com/amark/gun) pub/sub
* User-friendly
* Easy to setup
* Basic authentication to prevent hooligans

## Getting Started
This setup can be installed on any old computer you have lying around.
You'll want to have `node` and `npm` installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

Once installed, you'll want to [download this repository](https://github.com/colbyhub/bananaphone/archive/master.zip), or open your terminal and use git:
```bash
$ git clone https://github.com/colbyhub/bananaphone.git
```

After downloading, you'll want to navigate into the folder using your terminal and run:
```bash
$ npm i
```

Next, you **must** add a `config.json` file to the root of your project. You may use `config.default.json` as a point of reference, otherwise you may simply save the file containing: `{}`

Now, you may run `npm start` from your terminal inside of the directory, and navigate to `http://localhost:3000`! The username and password are both `admin` by default.

There are two pages available:
* `/` - homepage with the input box
* `/display` - page that displays the code entered

---

## Roadmap
* Replace GUN with websockets
* Use a better template engine like Nunjucks
* Possibly adopt a frontend framework like Elm
* Write a comprehensive guide on how to install and run on a Pi
* Easier configuration
