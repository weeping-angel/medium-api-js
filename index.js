class Medium {
    constructor(api_key) {
        this.api_key = api_key
        this.calls = 0
    }

    __get_resp(endpoint) {
        const base_url = "https://medium2.p.rapidapi.com";
        this.calls += 1;
        return fetch(base_url + endpoint, {
            headers: {
                "x-rapidapi-key": this.api_key,
                "User-Agent": "medium-api-js-sdk"
            }
        }).then(res => res.json());
    }

    async get_welcome() {
        const resp = await this.__get_resp('/')
        return resp;
    }

    async get_user_id(username) {
        const resp = await this.__get_resp('/user/id_for/'+username);
        return resp['id'];
    }

    async get_user_info(user_id) {
        const resp = await this.__get_resp('/user/'+user_id);
        return resp;
    }

    async get_article_info(article_id) {
        const resp = await this.__get_resp('/article/'+article_id);
        return resp;
    }

    async get_article_content(article_id) {
        const resp = await this.__get_resp('/article/'+article_id+'/content')
        return resp['content'];
    }

    async get_article_responses(article_id) {
        const resp = await this.__get_resp('/article/'+article_id+'/responses');
        return resp['responses'];
    }

    async get_topfeeds(tag, mode) {
        const resp = await this.__get_resp('/topfeeds/' + tag + '/' + mode);
        if(isEmpty(resp['topfeeds']))
            return []

        return resp['topfeeds'];
    }
}

module.exports = Medium