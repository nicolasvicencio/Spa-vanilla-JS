import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCards } from "./Post-card.js";

export async function Router() {
  const d = document,
    w = window;

  let { hash } = location;

  console.log(hash);

  const $main = d.getElementById('main')


 $main.innerHTML = null

  if (!hash || hash === "#/") {

   await ajax({
      url: api.POSTS,
      cbSuccess: (post) => {
        let html = "";
        post.forEach((el) => (html += PostCards(el)));
        // d.querySelector(".loader").style.display = "none";
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    $main.innerHTML = `<h2> Search Section </h2>`;
  } else if (hash === "#/contact") {
    $main.innerHTML = `<h2> Contact Section </h2>`;
  } else{
    $main.innerHTML = `<h2> Content will be loaded here </h2>`;

  }

  d.querySelector(".loader").style.display = "none";

}
