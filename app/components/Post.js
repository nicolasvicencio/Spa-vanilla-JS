export function Post(props) {

let {title, date, content} = props

const dateTransform = new Date(date).toLocaleDateString()

return `
<section class='post-page'>
  <aside>
    <h2>${title.rendered}</h2>
    <time datetime='${date}'>${dateTransform}</time>
  </aside>
  <hr>
  <article>${content.rendered}</article>
</section>
`
}