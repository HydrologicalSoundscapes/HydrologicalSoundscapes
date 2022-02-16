import { addMessages, init, getLocaleFromNavigator } from "svelte-i18n";

function fetchJSON(f) {
  return new Promise(async (resolve, reject) => {
    let content = await fetch(f);
    let json = await content.json();
    resolve(json);
  });
}
export async function init_i18n() {
  addMessages("en", await fetchJSON("i18n/en.json"));
  addMessages("fr", await fetchJSON("i18n/fr.json"));

  init({
    fallbackLocale: "en",
    initialLocale: getLocaleFromNavigator(),
  });
}
