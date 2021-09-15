<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="postComment">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
                username: comment.author.username
            }
        }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>&nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
                username: comment.author.username
            }
        }"
          class="comment-author"
        >{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY')}}</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments } from "@/api/article";
import { mapState } from 'vuex'

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      comment: {
        body: ''
      }
    };
  },
  async mounted() {
    // 不需要SEO， 放到mounted中即可
    const { data } = await getComments(this.article.slug);
    // console.log(data, 'comments')
    this.comments = data.comments;
  },
  computed:{
    ...mapState(['user'])
  },
  methods: {
    async postComment(){
      // addComments 接口暂不可用
      const res = await addComments(this.article.slug, { 'comment': this.comment.body })
      // console.log(res)
    }
  }
};
</script>

<style>
</style>