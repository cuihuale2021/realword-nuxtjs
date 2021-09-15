<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <p>{{ profile.bio }}</p>
              <button
                class="btn btn-sm"
                :class="[ profile.following ? 'btn-primary' : 'btn-outline-secondary' ]"
                @click="onFollow(profile)"
              >
                <i :class="[profile.following ? 'ion-minus-round' : 'ion-plus-round']"></i>
                &nbsp;
                Follow {{ profile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link exact :to="{
                    name: 'profile',
                    params:{
                      username: profile.username
                    },
                  }" class="nav-link active">My Articles</nuxt-link>
                </li>
                <!-- <li class="nav-item">
                  <nuxt-link exact :to="{
                    name: 'profile',
                    params:{
                      username: profile.username
                    },
                    query: {
                      tab: 'favorited_articles'
                    }
                  }" class="nav-link" :class="{active: tab === 'favorited_articles'}">Favorited Articles</nuxt-link>
                </li> -->
              </ul>
            </div>

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
                  >{{ article.author.username}}</nuxt-link>
                  <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
              >{{ article.description }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, followUser, unFollowUser } from "@/api/profile";
import { getArticles } from "@/api/article";

export default {
  name: "ProfileIndex",
  middleware: "authenticated",
  data() {
    return {
      profile: {
        username: "",
        image: "",
        bio: "new code coming soon...",
        following: false
      },
      articles: [],
      // tab: ""
    };
  },
  async mounted() {
    const username = this.$route.params.username;
    // 获取用户信息，自己的文章列表，喜欢的文章列表
    const [userData, articleData] = await Promise.all([
      getProfile(username),
      getArticles({ params: { author: username } })
    ]);
    this.profile = userData.data.profile;
    this.articles = articleData.data.articles;
    // console.log(this.articles);
  },

  methods: {
    async onFollow(profile) {
      if (profile.following) {
        // 已经关注过
        await unFollowUser(profile.username);
        this.profile.following = false;
      } else {
        //未关注过
        await followUser(profile.username);
        this.profile.following = true;
      }
    }
  }
};
</script>

<style>
</style>