export function ajax(props){
  let {url, cbSuccess} = props
  fetch(url)
  .then(res => res.ok ? res.json() : Promise.reject())
  .then(json => cbSuccess(json))
  .catch(err=> {
    let message = err.statusText || 'An error has ocurred'
    document.getElementById('root').innerHTML = `
    <div class='error'>
      <p> ERROR ${err.status}: ${message}</p>
    </div>  
    `
    console.log(err)
  })
}