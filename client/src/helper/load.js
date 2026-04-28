export function waitforElement(selector) {
  return new Promise((resolve, reject) => {
    const imgElement = document.querySelector(selector);
    imgElement.onload = () => resolve(true);
    imgElement.onerror = () => reject(new Error("Image failed to load"));
  });
}
