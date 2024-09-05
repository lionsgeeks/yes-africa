export function getImageUrl(name, dir) {
  return new URL(`../assets/images/${dir}/${name}`, import.meta.url).href;
}
