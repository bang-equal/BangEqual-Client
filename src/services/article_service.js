import * as rest from './rest';

let url = "https://bangequal.herokuapp.com/home/";
//let url = "http://localhost:5000/articles/";

export let getArticles = (chunksize) => rest.get(url + chunksize, true);

export let getArticlesByTag = (chunksize, tag) => rest.get(url + chunksize + "/" + tag, true);

export let getArticleTextById = (id) => rest.get(url + "text/" + id);

export let getArticlesTagsAll = () => rest.get(url + "tags")

//export let findByName = name => rest.get(url, {name});



export let createItem = blogarticle => rest.post(url, blogarticle);

export let updateItem = blogarticle => rest.put(url, blogarticle);

export let deleteItem = id => rest.del(url + "/" + id);


//Article Previews (not full article)

export let previewFindNext = id => rest.get(url + "/" + id + "/previewnext");

export let previewFindBack = id => rest.get(url + "/" + id + "/previewback");
