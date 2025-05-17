export const commonReplacements = (text: string) =>
  text
    .replace(/capgoapp/g, 'capgo.app')
    .replace(/([^.\s])png/g, '$1.png')
    .replace(/([^.\s])jpg/g, '$1.jpg')
    .replace(/([^.\s])gif/g, '$1.gif')
    .replace(/([^.\s])webp/g, '$1.webp')
    .replace(/update\/\)を/g, 'update/) を')
    .replace(/capacitorjscom/g, 'capacitorjs.com')
    .replace(/wwwrevenuecatcom/g, 'www.revenuecat.com')
    .replace(/assetsseobotaicom/g, 'assets.seobotai.com')
