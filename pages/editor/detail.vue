<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <a href>
              <img :src="article.author.image" />
            </a>
            <div class="info">
              <a href class="author">{{ article.author.username }}</a>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click.prevent="editArt">
              <i class="ion-edit"></i>
              &nbsp;
              Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary" @click.prevent="delArt">
              <i class="ion-trash-a"></i>
              DeleteArticle
            </button>
          </div>
        </div>
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            {{ article.body }}
          </div>
        </div>
                  <div class="col-md-12 tag-list">
            <span v-for="tag in article.tagList" :key="tag">{{tag}}</span>
          </div>
        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <a href>
              <img :src="article.author.image" />
            </a>
            <div class="info">
              <a href class="author">{{ article.author.username }}</a>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click.prevent="editArt">
              <i class="ion-edit"></i>
              &nbsp;
              Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary" @click.prevent="delArt">
              <i class="ion-trash-a"></i>
              DeleteArticle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, deleteArticle } from '@/api/article';
export default {
    name: 'EditArticle',
    async asyncData({ params }){
        const slug = params.slug
        const { data } = await getArticle(slug)
        const { article } = data
        return {
            article,
            slug
        }
    },
    methods:{
        // 编辑文章
        editArt(){
            this.$router.push({
                path: '/editor', 
                query: { 
                    'slug': this.slug,
                    'isEdit': true
                    }
                })
        },
        // 删除文章
        async delArt(){
            try{
                await deleteArticle(this.slug)
                alert('删除成功')
                this.$router.push('/editor')
            }catch(err){
                console.dir(err)
            }

        }
    }
};
</script>

<style scoped>
.tag-list {
    margin-top: 20px;
}
.tag-list span{
  display: inline-block;
  margin: 5px;
  padding: 4px 8px;
  background-color: #eee;
  border-radius: 4px;
}
</style>