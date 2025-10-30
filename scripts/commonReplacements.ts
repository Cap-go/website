export const commonReplacements = (text: string) => {
  return text
    .replace(/capgoapp/g, 'capgo.app')
    .replace(/([^.\s])png/g, '$1.png')
    .replace(/([^.\s])jpg/g, '$1.jpg')
    .replace(/([^.\s])webp/g, '$1.webp')
    .replace(/([^.\s])gif(?!y)/g, '$1.gif')
    .replace(/update\/\)を/g, 'update/) を')
    .replace(/osxdailycom/g, 'osxdaily.com')
    .replace(/webcapgo.app/g, 'console.capgo.app')
    .replace(/playgooglecom/g, 'play.google.com')
    .replace(/capacitorjscom/g, 'capacitorjs.com')
    .replace(/imagesimgixnet/g, 'images.imgix.net')
    .replace(/plugincapgo.app/g, 'plugin.capgo.app')
    .replace(/wwwrevenuecatcom/g, 'www.revenuecat.com')
    .replace(/assetsseobotaicom/g, 'assets.seobotai.com')
    .replace(/developerapplecom/g, 'developer.apple.com')
    .replaceAll(
      `<div className={styles.container}>
  <Head>
<title>`,
      `<div class="mx-auto" style="width: 50%;">\n<img src="/next-capacitor-share.webp" alt="next-capacitor-share">\n</div>`,
    )
}
