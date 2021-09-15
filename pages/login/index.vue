<!-- 登录、注册共用这一个页面-->
<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
            <p class="text-xs-center">
              <!-- a 会刷新页面，统一使用  nuxt-link  -->
              <!-- <a href>Have an account?</a> -->
              <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
              <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
            </p>

            <ul class="error-messages">
              <!-- <li>That email is already taken</li> -->
              <!-- 使用 template 遍历不会生成额外的节点 -->
              <template v-for="(messages, field) in errors">
                <li v-for="(msg, index) in messages" :key="index">{{field}} {{msg}}</li>
              </template>
            </ul>

            <form @submit.prevent="onSubmit">
              <fieldset class="form-group" v-if="!isLogin">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                  minlenth="8"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
              >{{ isLogin ? 'Sign in' : 'Sign up'}}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 仅在 客户端加载 js-cookie
const Cookie = process.client ? require("js-cookie") : undefined; // process.client || process.server

export default {
  name: "LoginIndex",
  middleware: "notAuthenticated",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单，请求登录 / 注册
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
          // console.log(data, 'data')
        // 保存用户的登录状态
        this.$store.commit("setUser", data.user);
        // 为了防止刷新页面vuex数据丢失,将数据存入 Cookie, 【数据持久化】
        // js-cookie 需要使用 2.x 版本，否则会出错
        Cookie.set("user", data.user);
        // 登录成功后，跳转到首页
        this.$router.push("/");
      } catch (err) {
        // console.dir(err)
        // 将错误信息显示到页面
        this.errors = err.response.data.errors;
      }
    }
  }
};
</script>

<style>
</style>