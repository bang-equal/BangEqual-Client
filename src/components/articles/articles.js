import * as ArticleService from "../../services/article_service.js";

export default class Articles {
  constructor(articlesCount, data) {
    this.el = document.getElementsByClassName('content-center')[0];
   // this.el.addEventListener("click", (e) => { this.onClick(e); });

   this.dbData = data;

    this.articlesCount = articlesCount; 
    this.articleCache = [];
    this.lastCacheArticleId = 0;
    this.firstCacheArticleId = 0;
    this.chunkLength = 0
    this.nextViewChunk = 0;
    this.chunkSize = 0;
    this.chunk = [];

    this.el.innerHTML = this.render();   
  }

  // onClick(evt) {
    // new Header("_");
  //}

  fillArticleCache(callback) {

    if(this.articleCache.length === 0) {
        this.travArticleCache();
        callback(true);
    }
    else {
        if ( this.articlesCount !== this.chunkSize) {
            this.travArticleCache();
        }
        callback(true);
    }
  }

  travArticleCache() {

    //separate into blocks of articlesCount
    for(let r = 0; r < this.dbData.length; r += this.articlesCount ) {
        this.articleCache.push(this.dbData.slice(r, r + this.articlesCount));
    }
    this.chunkLength = this.articleCache.length;
    //get lastchunk
    let lastChunk = this.articleCache.slice(this.articleCache.length - 1);
    //get lastobject
    let lastobj = lastChunk[0];
    //get number of items in chunk
    this.chunkSize = lastobj.length;
    //get lastpostid
    this.lastCacheArticleId = lastobj[lastobj.length - 1].id;

    let chunk = this.articleCache[this.nextViewChunk];
    this.firstCacheArticleId = chunk[0].id;
 }

 render() {
    let innerHTML = ` `;
    this.fillArticleCache(callback => {
        if(callback) {
            for(let ch of this.articleCache[this.nextViewChunk]) {
                //Create html using template strings for data (ie. ch.title)
                innerHTML += this.template(ch.articleTitle, ch.articleContent);
            }
        }
    });

    return innerHTML;
 }

 template(title, content) {

    return `
        <div class="mini-article">
                <div class="article-stats-bar">
                    <div>
                        <i class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i>
                        <h5 style="margin-top:.5rem">4</h5>
                    </div>
                    <div>
                        <i class="fa fa-commenting fa-lg" aria-hidden="true"></i>
                        <h5 style="margin-top:.5rem">2</h5>  
                    </div>              
                </div>
                <div class="article-preview">
                    <div class="article-title"><a class="article-title-link" href="#" >${title}</a></div>
                    <div class="article-meta">
                        <div class="article-author">by Author Tudor</div>
                        <div class="article-tags">tags</div>
                    </div>
                    <div class="article-preview-body">${content}</div> 
                </div>   
        </div>
    `;



 }
}