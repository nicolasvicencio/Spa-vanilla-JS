import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCards } from "./Post-card.js";
import { Post } from "./Post.js";
import { SearchCard } from "./Search-card.js";
import { ContactForm } from "./Contact_form.js";

export async function Router() {
  const d = document,
    w = window;

  let { hash } = location;

  console.log(hash);

  const $main = d.getElementById("main");

  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (post) => {
        let html = "";
        console.log(post);
        post.forEach((el) => (html += PostCards(el)));
        // d.querySelector(".loader").style.display = "none";
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");
    if (!query){
      d.querySelector('.loader').style.display = 'none'
      return false
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        console.log(search)
        let html = ''
        if(search.length === 0){
          html = `
          <p class='error'>
          There are no search result for <mark>${query}</mark> 
          </p>
          `
        }else{
          search.forEach(post => html += SearchCard(post))
        }

        $main.innerHTML = html
      },
    });
  } else if (hash === "#/contact") {
    $main.appendChild(ContactForm())
  } else {
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        console.log(post);

        $main.innerHTML = Post(post);
      },
    });
  }
  d.querySelector(".loader").style.display = "none";
}
