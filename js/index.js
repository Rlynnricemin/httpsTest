window.addEventListener('load', event => {
  navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(e => {
    console.log('Register successful')
  }).catch(e => {
    console.log('Register unsuccessful')
  })
})

// let container = document.querySelector('#app')

// fetch('./getnews.php')
//   .then(response => response.json())
//   .then(data => {
//     data = JSON.parse(data);
//     let newsItems = data.articles.map(item => {
//       return `
//         <div class="news-item" onClick="window.location.href='${item.url}'">
//           <h1>${item.title}</h1>
//           ${item.publishedAt ? `<span>${item.publishedAt}</span>` : ``}
//           ${item.description ? `<p>${item.description}</p>`: ``}
//           ${item.urlToImage ? `<img src="${item.urlToImage}">` : ``}
//         </div>
//       `
//     }).join('')
//     container.innerHTML = `
//       <div class="news-container">
//         ${newsItems}
//       </div>
//     `
//   })