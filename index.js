class Medium {
    #apiKey;
    #baseUrl;
    #headers;

    /**
    * Initializes the MediumClass with the API key.
    * @param {string} apiKey - The API key for accessing the Medium API.
    */
    constructor(apiKey) {
        this.#apiKey = apiKey;
        this.#baseUrl = 'https://medium2.p.rapidapi.com/';
        this.#headers = {
            'x-rapidapi-key': this.#apiKey,
            'user-agent': 'medium-api-js-sdk',
        };
    }

    /**
    * Private method to make API requests using fetch.
    * @param {string} endpoint - The API endpoint to call.
    * @param {object} [params={}] - Query parameters to include in the request.
    * @returns {Promise<object>} - The response data from the API.
    */
    async #makeRequest(endpoint, params = {}) {
        const url = new URL(`${this.#baseUrl}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url, {
            method: 'GET',
            headers: this.#headers
        });

        if (!response.ok) {
            const errorText = `Failed to fetch ${endpoint}: ${response.statusText}`;
            console.error(errorText);
            return { error: errorText }; // Return an error object instead of throwing
        }

        return response.json();
    }

    // User-related Methods ==============================

    /**
    * Fetches the user ID for a given username.
    * @param {string} username - The username to lookup.
    * @returns {Promise<object>} - The user ID details.
    */
    async getUserId(username) {
        return this.#makeRequest(`user/id_for/${username}`);
    }

    /**
    * Fetches information about a user by ID.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user information.
    */
    async getUserInfo(userId) {
        return this.#makeRequest(`user/${userId}`);
    }

    /**
    * Fetches the list of publications a user is associated with.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user's publications.
    */
    async userPublications(userId) {
        return this.#makeRequest(`user/${userId}/publications`);
    }

    /**
    * Fetches articles authored by a user.
    * @param {string} userId - The unique identifier of the user whose articles are being fetched.
    * @param {string} next - The pagination cursor for fetching the next set of articles (optional).
    * @returns {Promise<object>} - The user's articles.
    */
    async getUserArticles(userId, next = "") {
        return this.#makeRequest(`user/${userId}/articles`,{next});
    }

    /**
    * Fetches the lists created by a user.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user's lists.
    */
    async getUserListsById(userId) {
        return this.#makeRequest(`user/${userId}/lists`);
    }

    /**
    * Fetches the list of followers for a specific user.
    * @param {string} userId - The unique identifier of the user whose followers are being fetched.
    * @param {number} count- The number of followers to retrieve (optional). Defaults to all available followers if null.
    * @param {string} after- A cursor for pagination to fetch followers after a specific point (optional).
    * @returns {Promise<object>} - A promise that resolves to an object containing the user's followers.
    */
    async getUserFollowers(userId, count = "", after = "") {
        return this.#makeRequest(`user/${userId}/followers`, { count, after });
    }


    /**
    * Fetches the interests of a user.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user's interests.
    */
    async getUserInterests(userId) {
        return this.#makeRequest(`user/${userId}/interests`);
    }

    /**
    * Fetches the accounts the user is following.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The accounts followed by the user.
    */
    async getUserFollowing(userId) {
        return this.#makeRequest(`user/${userId}/following`);
    }

    /**
    * Fetches the publications followed by a user.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user's followed publications.
    */
    async getUserPublicationFollowing(userId) {
        return this.#makeRequest(`user/${userId}/publication_following`);
    }

    /**
    * Fetches the user's top articles.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user's top articles.
    */
    async getUserTopArticles(userId) {
        return this.#makeRequest(`user/${userId}/top_articles`);
    }

    /**
    * Fetches the books added by a user.
    * @param {string} userId - The ID of the user.
    * @returns {Promise<object>} - The user's books.
    */
    async getUserBooks(userId) {
        return this.#makeRequest(`user/${userId}/books`);
    }

    // Article-related Methods ==============================

    /**
    * Fetches detailed information about an article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - The article information.
    */
    async getArticleInfo(articleId) {
        return this.#makeRequest(`article/${articleId}`);
    }

    /**
    * Fetches the markdown content of an article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - The markdown content.
    */
    async getArticleMarkdown(articleId) {
        return this.#makeRequest(`article/${articleId}/markdown`);
    }

    /**
    * Fetches the HTML content of a specific articles
    * @param {string} articleId - The unique identifier of the article.
    * @param {boolean} fullpage - A flag indicating whether to fetch the full-page HTML (optional). Defaults to false.
    * @param {string} style_file- The URL or identifier of a custom stylesheet to apply to the HTML content (optional).
    * @returns {Promise<object>} - A promise that resolves to an object containing the article's HTML content.
    */
    async getArticleHTML(articleId, fullpage = "true", style_file = "https://mediumapi.com/styles/dark.css") {
        return this.#makeRequest(`article/${articleId}/html`, { fullpage, style_file });
    }

    /**
    * Fetches the assets of an article.
    * @param {string} articleId - fThe ID of the article.
    * @returns {Promise<object>} - The assets of the article.
    */
    async getArticleAssets(articleId) {
        return this.#makeRequest(`article/${articleId}/assets`);
    }

    /**
    * Fetches the responses to an article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - The responses to the article.
    */
    async getArticleResponses(articleId) {
        return this.#makeRequest(`article/${articleId}/responses`);
    }

    /**
    * Fetches the fans of an article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - The fans of the article.
    */
    async getArticleFans(articleId) {
        return this.#makeRequest(`article/${articleId}/fans`);
    }

    /**
    * Fetches the content of an article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - The content of the article.
    */
    async getArticleContent(articleId) {
        return this.#makeRequest(`article/${articleId}/content`);
    }

    /**
    * Fetches related articles for a given article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - A list of related articles.
    */
    async getRelatedArticles(articleId) {
        return this.#makeRequest(`article/${articleId}/related`);
    }

    /**
    * Fetches recommended articles based on a given article.
    * @param {string} articleId - The ID of the article.
    * @returns {Promise<object>} - A list of recommended articles.
    */
    async getRecommendedArticles(articleId) {
        return this.#makeRequest(`article/${articleId}/recommended`);
    }

    // Publication-related Methods ==============================

    /**
    * Fetches the publication ID for a given slug.
    * @param {string} publicationSlug - The slug of the publication.
    * @returns {Promise<object>} - The publication ID details.
    */
    async getPublicationId(publicationSlug) {
        return this.#makeRequest(`publication/id_for/${publicationSlug}`);
    }

    /**
    * Fetches information about a publication.
    * @param {string} publicationId - The ID of the publication.
    * @returns {Promise<object>} - The publication details.
    */
    async getPublicationInfo(publicationId) {
        return this.#makeRequest(`publication/${publicationId}`);
    }

    /**
    * Fetches the list of articles associated with a specific publication.
    * @param {string} publicationId - The unique identifier of the publication whose articles are being fetched.
    * @param {string} from - A cursor or date string indicating the starting point for fetching articles (optional).
    * @returns {Promise<object>} - A promise that resolves to an object containing the publication's articles.
    */
    async getPublicationArticles(publicationId, from = "") {
        return this.#makeRequest(`publication/${publicationId}/articles`,{from});
    }

    /**
    * Fetches newsletter details for a publication.
    * @param {string} publicationId - The ID of the publication.
    * @returns {Promise<object>} - The newsletter details.
    */
    async getPublicationNewsletter(publicationId) {
        return this.#makeRequest(`publication/${publicationId}/newsletter`);
    }


    // Platform-related Methods ==============================

    /**
    * Fetches archived articles for a specific tag with optional filtering by year, month, and pagination.
    * @param {string} tag - The tag associated with the archived articles to fetch.
    * @param {number} year - The year to filter the archived articles (optional).
    * @param {number} month - The month to filter the archived articles (optional).
    * @param {string} next - A pagination cursor for fetching the next set of articles (optional).
    * @returns {Promise<object>} - A promise that resolves to an object containing the archived articles data.
    */
    async getArchivedArticles(tag, year = "", month = "", next = "") {
        return this.#makeRequest(`archived_articles/${tag}`,{year,month,next});
    }

    /**
    * Fetches the recommended feed for a specific tag and page.
    * @param {string} tag - The tag to fetch the recommended feed for.
    * @param {number} page - The page number to retrieve(optional).
    * @returns {Promise<object>} - The recommended feed data.
    */
    async getRecommendedFeed(tag, page = "") {
        return this.#makeRequest(`recommended_feed/${tag}`,{page});
    }

    /**
    * Fetch top writers for a specific topic with an optional count parameter
    * @param {string} topicSlug - The topic slug to fetch top writers for.
    * @param {number|null} count - The number of Top Writers to retrieve (optional).
    * @returns {Promise<object>} - The top writers data.
    */
    async getTopWriters(topicSlug, count="") {
        return this.#makeRequest(`top_writers/${topicSlug}`,{count});
    }

    /**
    * Fetches the latest posts for a specific topic.
    * @param {string} topicSlug - The topic slug to fetch latest posts for.
    * @returns {Promise<object>} - The latest posts data.
    */
    async getLatestPosts(topicSlug) {
        return this.#makeRequest(`latestposts/${topicSlug}`);
    }

    /**
    * Fetches the top feeds for a specific tag and mode.
    * @param {string} tag - The tag to fetch top feeds for.
    * @param {string} mode - The mode to specify (e.g., "hot", "new", "top_week", "top_month", "top_year", "top_all_time").
    * @returns {Promise<object>} - The top feeds data.
    */
    async getTopFeeds(tag, mode) {
        return this.#makeRequest(`topfeeds/${tag}/${mode}`);
    }

    /**
    * Fetches related tags for a specific tag.
    * @param {string} tag - The tag to fetch related tags for.
    * @returns {Promise<object>} - The related tags.
    */
    async getRelatedTags(tag) {
        return this.#makeRequest(`related_tags/${tag}`);
    }

    /**
    * Fetches information about a specific tag.
    * @param {string} tag - The tag to fetch information for.
    * @returns {Promise<object>} - The tag information.
    */
    async getTagInfo(tag) {
        return this.#makeRequest(`tag/${tag}`);
    }

    /**
    * Fetches the root tags available in the platform.
    * @returns {Promise<object>} - The root tags data.
    */
    async getRootTags() {
        return this.#makeRequest(`root_tags`);
    }

    /**
    * Fetches recommended users for a specific tag and platform.
    * @param {string} tag - The tag to fetch recommended users for.
    * @returns {Promise<object>} - The recommended users.
    */
    async getRecommendedUsers(tag) {
        return this.#makeRequest(`recommended_users/${tag}`);
    }

    /**
    * Fetches recommended lists associated with a specific tag.
    * @param {string} tag - The tag for which to fetch recommended lists.
    * @returns {Promise<object>} - The recommended lists.
    */
    // async getRecommendedLists(tag) {
    //     return this.#makeRequest( `recommended_lists/${tag}`);
    // }

    // List-related Methods ==============================

    /**
    * Fetches information about a specific list by its ID.
    * @param {string} listId - The ID of the list.
    * @returns {Promise<object>} - The list details.
    */
    async getListInfo(listId) {
        return this.#makeRequest(`list/${listId}`);
    }

    /**
    * Fetches articles in a specific list by its ID.
    * @param {string} listId - The ID of the list.
    * @returns {Promise<object>} - The list articles.
    */
    async getListArticles(listId) {
        return this.#makeRequest(`list/${listId}/articles`);
    }

    /**
    * Fetches responses to a specific list by its ID.
    * @param {string} listId - The ID of the list.
    * @returns {Promise<object>} - The list responses.
    */
    async getListResponses(listId) {
        return this.#makeRequest(`list/${listId}/responses`);
    }

    // Search-related Methods ==============================

    /**
    * Searches for users by query.
    * @param {string} query - The search query for users.
    * @returns {Promise<object>} - The search results for users.
    */
    async getSearchUsers(query) {
        return this.#makeRequest('search/users', { query });
    }
   
    /**
    * Searches for publications by query.
    * @param {string} query - The search query for publications.
    * @returns {Promise<object>} - The search results for publications.
    */
    async getSearchPublications(query) {
        return this.#makeRequest('search/publications', { query });
    }

    /**
    * Searches for lists by query.
    * @param {string} query - The search query for lists.
    * @returns {Promise<object>} - The search results for lists.
    */
    async getSearchLists(query) {
        return this.#makeRequest('search/lists', { query });
    }

    /**
    * Searches for tags by query.
    * @param {string} query - The search query for tags.
    * @returns {Promise<object>} - The search results for tags.
    */
    async getSearchTags(query) {
        return this.#makeRequest('search/tags', { query });
    }

    /**
    * Searches for articles by query.
    * @param {string} query - The search query for articles.
    * @returns {Promise<object>} - The search results for articles.
    */
    async getSearchArticles(query) {
        return this.#makeRequest('search/articles', { query });
    }

    /**
    * Extracts `article_id` from the Article's URL.
    * @param {string} articleUrl - The article URL as a string.
    * @returns {string|null} - Returns `article_id` as a string for valid URLs, or `null` if invalid.
    */
    extractArticleId(articleUrl) {
        const regex = /(https?:\/\/[^\s]+)/;
        const urls = articleUrl.match(regex);
        if (urls) {
            const urlPath = new URL(urls[0]).pathname;
            if (urlPath) {
                const lastLocation = urlPath.split('/').pop();
                const articleId = lastLocation.split('-').pop();
                if (/^[a-zA-Z0-9]+$/.test(articleId)) { // Check if alphanumeric
                    return articleId;
                }
            }
        }
        return null;
    }
}

module.exports = Medium;