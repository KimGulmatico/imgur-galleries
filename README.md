This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [`Electron`](https://www.electronjs.org/).

## Getting Started

To run the electron app in windows or mac

```bash
npm run electron:start
```
Electron app uses the deployed web app in vercel hosted in https://imgur-galleries.vercel.app/

To run the next app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Packaging

Creating a build, this will create a build for the current operating system you have.

```bash
npm run electron:build
```

The Imgur api restricts app that is not hosted in https so I deployed it on vercel, using the development hosted in http://localhost:3000 will use the fallback data response hardcoded from imgur for development purposes.
