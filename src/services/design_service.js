import * as rest from './rest';

//let url = "http://bangequal-server.herokuapp.com/blog/blogarticle";
let url = "http://localhost:5000/shop/shopdesign";

export let findAll = sort => rest.get(url, true);

//export let findByName = name => rest.get(url, {name});

export let findById = id => rest.get(url + "/" + id);

export let createItem = shopdesign => rest.post(url, shopdesign);

export let updateItem = shopdesign => rest.put(url, shopdesign);

export let deleteItem = id => rest.del(url + "/" + id);
