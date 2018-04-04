module.exports = function () {
    //process.env variables defined in Azure if deployed to a web app. For testing, place IDs and Keys inline
    global.searchName = process.env.AZURE_SEARCH_NAME ? process.env.AZURE_SEARCH_NAME : "dynamicsbotsearch";
    global.indexName = process.env.INDEX_NAME ? process.env.AZURE_SEARCH_NAME : "azuresql-index";
    global.searchKey = process.env.INDEX_NAME ? process.env.AZURE_SEARCH_KEY : "88440318109368A2F7FAEF978EE7E078";
    
    global. queryString = 'https://' + searchName + '.search.windows.net/indexes/' + indexName + '/docs?api-key=' + searchKey + '&api-version=2016-09-01&';
}