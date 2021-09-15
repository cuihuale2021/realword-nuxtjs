<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <article-meta :article="article" />
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12" v-html="article.body">
            <!-- 文章正文 -->
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <article-meta :article="article" />
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <article-comments :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
export default {
  name: "ArticleIndex",
  // 中间件
  middleware: "authenticated",
  // 数据
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    console.log(data, 'article')
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article
    };
  },
  // 组件
  components: {
    ArticleMeta,
    ArticleComments
  },
  // 设置meta 的 SEO
  head() {
    return {
      title: `${this.article.title} - realworld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description
        }
      ]
    };
  }
};
</script>

<style>
</style>