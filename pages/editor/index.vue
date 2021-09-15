<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    v-model="article.title"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?" />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    v-model="article.body"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input type="text" class="form-control" v-model="tag" @keyup.enter="pushTag" placeholder="Enter tags" />
                  <div class="tag-list">
                    <span v-for="tag in article.tagList" :key="tag">{{ tag}}</span> 
                  </div>
                </fieldset>
                <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="submitArticle">Publish Article</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'
export default {
  name: "EditorIndex",
  middleware: "authenticated",
  data(){
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: ''
    }
  },
  methods: {
    // 添加标签
    pushTag(e){
      // console.log(e.target.value)
      let val = e.target.value
      if(val){
        this.article.tagList.push(val)
      }
      this.tag = ''
    },
    async submitArticle(){
      try{
        const { status, statusText } = await createArticle({ 'article': this.article})
        if(status == '200' && statusText == 'OK'){
          // 清空表单
          Object.keys(this.article).forEach(key => this.article[key] = '')
          alert('文章发表成功！')
        }
      }catch(err){
        console.dir(err)
      }
    }
  }
};
</script>

<style scoped>
.tag-list span{
  display: inline-block;
  margin: 5px;
  padding: 3px 5px;
  background-color: #eee;
  border-radius: 2px;
}
</style>