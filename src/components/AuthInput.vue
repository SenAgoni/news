<template>
  <div>
    <input
      class="input"
      :class="{
         success : package === true ,
         error: package === false
     }"
      :placeholder="placeholder"
      :errormsg="errormsg"
      :value="value"
      @input="handelsubmit"
      :rule="rule"
      @blur="handelTips"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      package: ""
    }
  },
  props: [
    "placeholder",
    "value",

    "input",
    "rule",
    "errormsg"
  ],
  methods: {
    handelsubmit(event) {
      // 这一个是把用户修改后的value的值,一个对象结构里面的value的值出来 
      let { value } = event.target;
      // 然后就调用父组件中的方法,把数据传递到父组件中
      this.$emit('input', value);
      if (value.trim() !== '') {
        // 因为手机号码的规则是要在书写的时候就要验证的,所以可以写在这一个事件中
        if (this.rule) {
          // 如果符合正则表达式则返回一个true ,不符合就返回false
          if (this.rule.test(value)) {
            //要是不符合边框要变动一个边框的颜色来提示用户这个时候的一个类名也是要有所变换的,因为类名变换的时候样式也跟着变了
            this.package = true;
          } else {
            this.package = false;
          }
        }
      }
    },
    handelTips(event){
        let { value } = event.target;
        if (!this.rule.test(value)){
            // 提示信息一定是要一个动态的,所以需要那边调用的时候传值过来
            this.$toast(this.errormsg)
        }
    }
  }
}
</script>

<style scoped lang="less">
.input {
  border: none;
  border-bottom: 2px solid #757575;
  color: #a29b96;
  height: 38 / 360 * 100vw;
  width: 100%;
  font-size:18px;
  margin-bottom:10px;
  padding-bottom:5px;
}
.success {
  border-bottom: 2px solid green;
}
.error {
  border-bottom: 2px solid red;
}
</style>