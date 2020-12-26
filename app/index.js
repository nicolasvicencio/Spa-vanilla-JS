import {App} from './App.js'


const d = document

d.addEventListener('DOMContentLoaded', e => {
  App()
})

window.addEventListener('hashchange', App )