const api = {
    url: 'http://localhost/orjwan-archive/api/content',
    key: 'USR-ff72e1316b3bc94d317db1f2405c3e90cbd954c8',
    all_items: 'items', // it Shows the All items in the Module
    item: 'item', // it Shows a Specific Item by id
    all_news: "allNews?sort={_created:'-1'}&", // the 'All News' Module
    assetsUrl : 'http://localhost/orjwan-archive/storage/uploads',
    arabic: '&locale=ar',
    filter: (newsType) => {return `filter={type:"${newsType}"}`},
    pagination: (limit, skip) => {return `limit=${limit}&skip=${skip}`}, // For Example if you want just a 5 posts limit = 5, skip = 0, 'skip' for skipping the first post\s

}
// Changing the Page Title Depending On the Page Name
document.title = document.querySelector(".page-title .container h1").textContent

 // the Container Of All News
let newsContainer = document.querySelector('section .container .newsContainer')


// Fetching All News From Database
let res = fetch(`${api.url}/${api.all_items}/${api.all_news}${api.pagination(4,0)}${api.arabic}`, {headers: {"api-key": api.key}})
        .then((res) => res.json())
        .then((res) => getNews(res.data))
    console.log(`${api.url}/${api.all_items}/${api.all_news}${api.pagination(4,0)}${api.arabic}`)
// Show Data
function getNews(allNews) {
    allNews.map((news) => {
        // the First div
        let newsItem = document.createElement('div')
        
        newsItem.className = 'col-lg-6'
        newsItem.setAttribute('dataous', 'fade-up')
        newsItem.setAttribute('data-aos-delay', '100')

        // The Second div (the Father)
        let newsHolder = document.createElement('div')
        
        newsHolder.className = 'team-member d-flex align-items-start'

        // the Image Container
        let newsImageContainer = document.createElement('div')
        newsImageContainer.className = 'pic'

        // the Image
        let newsImage = document.createElement('img')
        newsImage.className = 'img-fluid'
        newsImage.src = `${api.assetsUrl}${news.newsImg[0].path}`

        newsImageContainer.appendChild(newsImage) // Adding the Image to the Image Container

        newsHolder.appendChild(newsImageContainer)  // Adding the Image Container to the News Father div

        newsItem.appendChild(newsHolder) // Adding the News Father div to the First div
        
        // The News Info div
        let newsInfo = document.createElement('div')

        newsInfo.className = 'member-info news-info'

        let newsTitle = document.createElement('h4') // News Title
        newsTitle.textContent = news.newsTitle

        let newsType = document.createElement('span') // News Type
        newsType.textContent = news.type[0]

        let newsScript = document.createElement('p') // News Script
        newsScript.textContent = news.newsScript
        
        let showMore = document.createElement('div') // Show More Button Container
        showMore.className = 'hero'

        let showMoreButton = document.createElement('a') // Show More Button
        showMoreButton.className = 'btn-get-started'
        showMoreButton.setAttribute("href", `/orjwan-archive/nbs_api/ar/news.php#${news._id}`)
        showMoreButton.textContent = 'المزيد'

        showMore.appendChild(showMoreButton) // Adding the Show More Button to the Show More Button Container
        // Adding To News Info 
        newsInfo.appendChild(newsTitle)
        newsInfo.appendChild(newsType)
        newsInfo.appendChild(newsScript)
        newsInfo.appendChild(showMore)
        // Adding News Info to Father
        newsHolder.appendChild(newsInfo)
        // Adding The News Item To The News Container
        newsContainer.appendChild(newsItem)

        showMoreButton.onclick = () => {
            console.log(`${api.url}/${api.item}/${api.all_news}/${news._id}${api.arabic}`)
            // Fetching The News Item
            fetch(`${api.url}/${api.item}/allNews/${news._id}?locale=ar`, {headers: {"api-key": api.key}})
            .then((res) => res.json())
            .then((res) => showSpecificNews(res))
        }

        function showSpecificNews(data) {
            document.title = data.newsTitle
            let header1 = document.querySelector('.container .breadcrumbs .current')
            header1.textContent = data.newsTitle
            let header2 = document.querySelector('.page-title .container h1')
            header2.textContent = data.newsTitle
            newsContainer.innerHTML = ''
            
            let newsContent = document.querySelector('div')
            newsContent.className = 'team-member d-flex align-items-start'

            
            let newsImage = document.createElement('img') // the Image
            newsImage.className = 'img-fluid'
            newsImage.src = `${api.assetsUrl}${data.newsImg[0].path}`

            let newsTitle = document.createElement('h4') // News Title
            newsTitle.textContent = data.newsTitle
    
            let newsType = document.createElement('span') // News Type
            newsType.textContent = data.type[0]
    
            let newsScript = document.createElement('p') // News Script
            newsScript.textContent = data.newsScript
                    // the Image Container
            let newsImageContainer = document.createElement('div')
            newsImageContainer.className = 'pic'
            newsImageContainer.appendChild(newsImage)
            newsContent.appendChild(newsImageContainer)
            newsContent.appendChild(newsTitle)
            newsContent.appendChild(newsType)
            newsContent.appendChild(newsScript)
            newsContainer.appendChild(newsContent)
        }
        
        
        
    })
}
// Pagination

let limit = 4;
let skip = 0;
let prev = document.querySelector(".filter-count-section .prev")

if(skip == 0) {
    prev.id = 'no-previous-news'
}


let filterNewsCount = document.querySelectorAll(".filter-count-section li")
// Switch between News 
filterNewsCount.forEach((type) => {
    type.onclick = () => {
        newsContainer.innerHTML = ''
       
        if(type.className == "next") {
            skip = skip + 4
            fetch(`${api.url}/${api.all_items}/${api.all_news}${api.pagination(limit, skip)}${api.arabic}`, {headers: {"api-key": api.key}})
            .then((res) => res.json())
            .then((res) => {
                console.log(skip)
                getNews(res.data)
            })
        }
         if(type.className == "prev") {
            skip = skip - 4
            fetch(`${api.url}/${api.all_items}/${api.all_news}${api.pagination(limit, skip)}${api.arabic}`, {headers: {"api-key": api.key}})
            .then((res) => res.json())
            .then((res) => {
                console.log(skip)
                console.log(`${api.url}/${api.all_items}/${api.all_news}${api.pagination(limit, skip)}`)
                getNews(res.data)
            })
            
        }
        if(skip > 0) {
            prev.id = ''
        }
        if(skip == 0) {
            prev.id = 'no-previous-news'
        }
       
  
            
    }
})

// Filtering By Type
let filterNewsType = document.querySelectorAll(".filter-section li")
filterNewsType.forEach((type) => {
    type.onclick = () => {
        newsContainer.innerHTML = ''
     
        fetch(`${api.url}/${api.all_items}/${api.all_news}${api.filter(type.className)}${api.arabic}`, {headers: {"api-key": api.key}})
            .then((res) => res.json())
            .then((res) => getNews(res))
            
    }
})


