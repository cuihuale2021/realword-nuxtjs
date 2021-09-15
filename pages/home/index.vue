<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">Constantines With Hell</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <!-- 登录后才展示 -->
                <li class="nav-item" v-if="user">
                  <nuxt-link
                    exact
                    class="nav-link"
                    :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                    :class="{ active: tab === 'your_feed'}"
                  >Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    exact
                    class="nav-link"
                    :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                    :class="{ active: tab === 'global_feed'}"
                  >Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                    name: 'home',
                    query: {
                      tab: 'tab',
                      tag: tag
                    }
                  }"
                    :class="{ active: tab === 'tag'}"
                  >#{{ tag }}</nuxt-link>
                </li>
              </ul>
            </div>

            <!-- 文章列表 -->
            <div class="article-preview" v-for="article in articles" :key="article.slug">
              <div class="article-meta">
                <nuxt-link
                  :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
                >
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
                    class="author"
                  >{{ article.author.username }}</nuxt-link>
                  <span class="date">{{ article.createdAt | date('MMM DD, YYYY ') }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  @click.prevent="onFavorite(article)"
                  :disabled="article.favoriteDisabled"
                >
                  <i class="ion-heart"></i>
                  {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>

            <!-- 分页 -->
            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{active: item === page}"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                  >{{ item }}</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>

          <!-- 标签列表 -->
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              <div class="tag-list">
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      tag: item,
                      tab: 'tag'
                    }
                  }"
                  class="tag-pill tag-default"
                  v-for="item in tags"
                  :key="item"
                >{{ item }}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  async asyncData({ query, store }) {
    // 参数 context : query, app, store 等
    // 获取文章列表
    const page = Number.parseInt(query.page || 1);
    const limit = 20; // 每页条数
    const { tag } = query;
    const tab = query.tab || "global_feed";
    const loadArticles =
      store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;
    // const { data } = await getArticles({
    //   limit,
    //   offset: (page - 1) * limit // 数据偏移量
    // });
    // console.log(data, "data");

    // 获取标签列表
    // const { data: tagData } = await getTags()
    // console.log(tagData)

    // 并行任务优化
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit, // 数据偏移量
        tag
      }),
      await getTags()
    ]);
    const { articles, articlesCount } = articleRes.data;
    // console.log(articles, 'articles')
    const { tags } = tagRes.data;
    // 点赞按钮防抖
    articles.forEach(article => (article.favoriteDisabled = false));

    return {
      // articles: data.articles,
      // articlesCount: data.articlesCount,
      articles,
      articlesCount,
      page,
      limit,
      // tags: tagData.tags
      tags,
      tag,
      tab
    };
  },
  watchQuery: ["page", "tag", "tab"], // 监听参数变化，更新 asyncData
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"])
  },
  methods: {
    async onFavorite(article) {
      console.log(article.slug, 'article.slug')
      // console.log(article)
      // 防抖，请求期间按钮禁用
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 已经点赞的，取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    }
  }
};
</script>

<style>
</style>