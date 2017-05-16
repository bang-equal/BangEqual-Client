import * as rest from './rest';

let url = "https://bangequal.herokuapp.com/home/";
//let url = "http://localhost:5000/blog/blogarticle";

export let findByType = type => rest.get(url + type, true);

//export let findByName = name => rest.get(url, {name});

export let findById = id => rest.get(url  + id);

export let createItem = blogarticle => rest.post(url, blogarticle);

export let updateItem = blogarticle => rest.put(url, blogarticle);

export let deleteItem = id => rest.del(url + "/" + id);


//Article Previews (not full article)

export let previewFindNext = id => rest.get(url + "/" + id + "/previewnext");

export let previewFindBack = id => rest.get(url + "/" + id + "/previewback");
