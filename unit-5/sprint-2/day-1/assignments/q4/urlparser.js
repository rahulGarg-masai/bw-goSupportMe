const {URL , URLSearchParams} = require('url');

function playwithurl(myUrl){
    return {
        'hostname' : myUrl.hostname,
        'pathname' : myUrl.pathname,
         'query' : {
            'name' : myUrl.searchParams.get('name'),
            'duration' : myUrl.searchParams.get('duration')
         }
    }
}

module.exports = playwithurl;