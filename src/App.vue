<template>
   <div class="container">
    <div class="item" v-if="show">
      <router-link
      class="link"
      :class="{active:isActive}"
      to="/index"
      >
      首页
      </router-link>
      <router-link 
      class="link"
      to="/introduction"
      >
      自我介绍
      </router-link>
      <router-link 
      class="link"
      to="/skills"
      >
      技能
      </router-link>
      <router-link 
      class="link"
      to="/projects"
      >
      项目经验
      </router-link>
      <router-link 
      class="link"
      to="/information"
      >
      联系信息
      </router-link>
      <div class="link" @click="showOn">
        收起
      </div>
    </div>
    <div class="cricle" @click="showOn" v-else>
      More
    </div>
    
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
    data:()=>({
      show:false,
      isActive:true,
    }),
    methods:{
      showOn(){
        this.show = !this.show;
      }
    }
}
</script>

<style lang="less" scoped>
@import './less/normalize.less';
@import './less/app.less';
@import './less/container.less';
@import './less/animation.less';
</style>
