import { PostCards } from "../components/Post-card.js";
import { SearchCard } from "../components/Search-card.js";
import { ajax } from "./ajax.js";
import api from './wp_api.js'

export async function infiniteScroll(){
  const d = document,
  w = window

  let  query = localStorage.getItem('wpSearch'),
  apiURL,
  Component; //HOC High Order Component

  w.addEventListener('scroll', async e => {
    let {scrollTop, clientHeight, scrollHeight} = d.documentElement
    let {hash} = w.location


    if(scrollTop + clientHeight >= scrollHeight){
      api.page++

      if(!hash || hash === '#/'){
        apiURL = `${api.POSTS}&page=${api.page}`
        Component = PostCards

      }else if(hash.includes('#/search')){
        apiURL = `${api.SEARCH}${query}&page=${api.page}`
        Component = SearchCard
      }else{
        return false
      }

      d.querySelector('.loader').style.display = 'block'
      await ajax({
        url: apiURL,
        cbSuccess: res => {
          let html = ''
          res.forEach(el => html += Component(el))
          d.getElementById('main').insertAdjacentHTML('beforeend', html)
      d.querySelector('.loader').style.display = 'none'

        }
      })
     
    }
  })
}