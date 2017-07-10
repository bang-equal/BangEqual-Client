import * as rest from './rest';

let url = "https://bangequal.herokuapp.com/home/";
//let url = "http://localhost:5000/home/";

export let findByType = (type, chunksize) => rest.get(url + type + "/" + chunksize, true);

export let findByTopic = (topic, chunksize, type) => rest.get(url + "topic/" + type + "/" + topic + "/" + chunksize, true);

export let getAllTopics = (type) => rest.get(url + "topic/getall/" + type)

//export let findByName = name => rest.get(url, {name});

export let findById = id => rest.get(url  + id);

export let createItem = blogarticle => rest.post(url, blogarticle);

export let updateItem = blogarticle => rest.put(url, blogarticle);

export let deleteItem = id => rest.del(url + "/" + id);


//Article Previews (not full article)

export let previewFindNext = id => rest.get(url + "/" + id + "/previewnext");

export let previewFindBack = id => rest.get(url + "/" + id + "/previewback");
