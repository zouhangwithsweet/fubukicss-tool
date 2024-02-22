// entrypoints/background.ts
export default defineBackground(() => {
  console.log(`Hello from ${browser.runtime.id}!`);
});