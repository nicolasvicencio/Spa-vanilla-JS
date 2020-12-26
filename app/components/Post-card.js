export function PostCards(props) {
  let { title, date, slug, _embedded } = props;
  let dateFormat = new Date(date).toLocaleDateString(),
    ulrPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "app/assets/phoca-favicon-r.svg";

  return `
<article class='post-card'>
  <img src=${ulrPoster} alt='${title.rendered}' >
  <h2>${title.rendered}</h2>
  <p>
    <time datetime='${date}'>${dateFormat}</time>
    <a href='#/${slug}' >See Post</a>
  </p>
</article>

`;
}
