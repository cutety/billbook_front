<template>
  <div class="container">
    <el-row class="form-body">
      <h2>登录</h2>
      <el-form ref="form" :model="loginForm" label-width="0px">
        <el-form-item class="form-item">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span=16>
            <el-image
              @click="refreshCode"
              style="height: 40px"
              :src="url"
              :fit=fit[3]></el-image>
          </el-col>
          <el-col :span=8>
            <el-link type="primary" underline="underline" @click="refreshCode">换一张</el-link>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-input class="codeClass" placeholder="请输入验证码" v-model="loginForm.captcha"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="form-confirm">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toRegister" class="form-confirm">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'iota',
        password: 'admin'
      },
      url: '',
      captchaKey:'',
      fit: ['fill', 'contain', 'cover', 'none', 'scale-down']
    }
  },
  created() {
    const _this =this;
    this.axios.get('/captcha/init').then((response) => {
      _this.url = response.data.base64Img
      _this.captchaKey = response.data.captchaKey;
    })
  },
  methods: {
    onSubmit() {
      const _this = this
      this.axios.post("/user/login", {
        username: this.loginForm.username,
        password: this.loginForm.password,
        captcha:this.loginForm.captcha,
        captchaKey:this.captchaKey
      })
        .then(function (response) {
          if(response.data.status === "200") {
            console.log(response.data.msg)
            console.log(response.data.token)
            console.log(response.data.object)
            window.localStorage.setItem("userInfo",response.data.object)
            _this.$store.commit('login', response.data.token)
            _this.$router.push({path: '/'})
            //const path = _this.$route.query.redirect
            _this.$router.replace({path: path === undefined ? '/' : path})
          } else if (response.data.status === "401") {
            alert(response.data.msg)
          } else if (response.data.status === "4012") {
            alert(response.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toRegister() {
      this.$router.replace('/register')
    },
    refreshCode() {
      const _this =this;
      this.axios.get('/captcha/'+this.captchaKey).then((response) => {
        _this.url = response.data.base64Img
        _this.captchaKey = response.data.captchaKey
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background-image: url("../../static/HomeMask.jpg");
  background-size: cover;
  position: fixed;
  left: 0px;
  top: 0px;
  padding-top: 30px;
}

.form-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 10px;
  margin: 0 auto;
  width: 25%;
  min-width: 300px;
  padding: 30px 30px 15px 30px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.9);
}

.form-confirm {
  width: 100%;
  background-color: #585858;
  border: 2px solid #484848;
  border-radius: 4px;
}
</style>
