const searchbar = document.querySelector('#search-bar')
const searchbtn = document.querySelector('#search-btn')

searchbtn.addEventListener('click', () => {
   
})


const ALGOLIA_ID = 'EAMWDIF8TK';
const ALGOLIA_ADMIN_KEY = 'eecc42ae3e21d4ae1ac09afdf6c6fc18';
const ALGOLIA_SEARCH_KEY = '4b21e99ac8be646067f7bcc38d944296';

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
var index = client.initIndex('notes');