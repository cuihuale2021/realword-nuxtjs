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
                  <input
                    type="text"
                    v-model="article.description"
                    class="form-control"
                    placeholder="What's this article about?"
                  />
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
                  <input
                    type="text"
                    class="form-control"
                    v-model="tag"
                    @keyup.enter="addTag"
                    placeholder="Enter tags"
                  />
                  <div class="tag-list">
                    <span v-for="(tag, index) in article.tagList" :key="tag">
                      <i class="ion-close-circled" @click="deleteTag(index)"></i>
                      {{tag}}
                    </span>
                  </div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click="submitArticle"
                >Publish Article</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from "@/api/article";
export default {
  name: "EditorIndex",
  middleware: "authenticated",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      },
      tag: ""
    };
  },
  async mounted() {
    const query = this.$route.query;
    if (query.isEdit) {
      const { data } = await getArticle(query.slug);
      this.article = data.article;
    }
  },
  methods: {
    // 添加标签
    addTag(e) {
      let val = e.target.value;
      if (val) {
        this.article.tagList.push(val);
      }
      this.tag = "";
    },
    // 删除标签
    deleteTag(index) {
      this.article.tagList.splice(index, 1);
    },
    // 提交文章
    async submitArticle() {
      if (this.article.slug) {
        // 修改文章
        await updateArticle({ article: this.article });
        alert("文章修改成功！");
        this.$router.push({
          name: "detail",
          params: {
            slug: this.article.slug
          }
        });
      } else {
        // 新增文章
        try {
          const res = await createArticle({ article: this.article });
          if (res.status == "200" && res.statusText == "OK") {
            // 清空表单
            Object.keys(this.article).forEach(key => (this.article[key] = ""));
            alert("文章发表成功！");
            const article = res.data.article;
            // 跳转到文章详情页
            this.$router.push({
              name: "detail",
              params: {
                slug: article.slug
              }
            });
          }
        } catch (err) {
          console.dir(err);
        }
      }
    }
  }
};
</script>

<style scoped>
.tag-list span {
  display: inline-block;
  margin: 5px;
  padding: 4px 8px;
  background-color: #eee;
  border-radius: 4px;
}
</style>