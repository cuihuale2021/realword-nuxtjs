<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" v-model="user.image" placeholder="URL of profile picture" />
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text"  v-model="user.username" placeholder="Your Name" />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                     v-model="user.bio"
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text"  v-model="user.email" placeholder="Email" />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                     v-model="user.password"
                    placeholder="Password"
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="submitUpdate">Update Settings</button>
              </fieldset>
            </form>
          </div>
        </div>
        <!-- 退出登录 -->
        <hr />
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <button class="btn btn-md btn-danger" @click.prevent="logout">click here to logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "SettingsIndex",
  middleware: "authenticated",
  data(){
      return {
        user: {
          email: "", 
          username: "", 
          password: "", 
          image: "", 
          bio: ""
        }
      }
  },
  async mounted(){
    const { data } = await getUser()
    // console.log(data)
    this.user = data.user
  },
  methods: {
    // 提交修改
    async submitUpdate(){
      try{
        const { status, statusText } = await updateUser({'user': this.user})
        if(status == '200' && statusText == 'OK') {
          alert('个人信息更新成功！')
        }
      }catch(err){
        console.dir(err)
      }
    },
    // 退出登录
    logout(){
      // 清除 vuex 中的user信息
      this.$store.commit('setUser', null)
      // 删除 Cookie
      Cookie.remove('user')
      // 跳转登录页
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>