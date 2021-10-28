console.log("This is Index.js");

let accordionNews = document.getElementById('accordionNews');
// let source = "bbc-news"
// let source = "bloomberg"
// let source = "business-insider"
let source = "espn-cric-info"
let  ApiKey = "3230cc27fc5e4af29257502f145d8ab0";
let count = "in";
// Cretae XHR Object
let xhr = new XMLHttpRequest();
// Note - Country is not mandatory and it's spelling is "cuntry" as following  
xhr.open('GET',`https://newsapi.org/v2/top-headlines?cuntry=${count}&sources=${source}&apiKey=${ApiKey}`,true)

xhr.onload = function () {
    if(this.status == 200){
        console.log("Suuccessfully  Fetched",JSON.parse(this.responseText));
        let article  = JSON.parse(this.responseText)["articles"];
        console.log(article);
        console.log(typeof article);
        let newsHTML  ="";
        article.forEach(function(news,index) {
            let newNews = `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    Breaking News ${index+1}: ${news["title"]}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  ${news["description"]}. <a target="_blank"  href="${news["url"]} target="_blank" >Read More Here</a>
                </div>
            </div>
        </div>`
            newsHTML+= newNews;
        });
        accordionNews.innerHTML = newsHTML
    }
    else{
        console.log('Error occured');
    }
}

xhr.send();