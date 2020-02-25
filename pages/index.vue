<template>
<div>
    <banner></banner>
    <tabs :value="tabValue" @change="handleChangeTab">
        <tab v-for="(label,index) in tabLabels" :label="label" :index="index" :key="index"></tab>
    </tabs>
    <div class="tabContent">
        <card class="card" v-for="content in list" :key="content.id" :content="content"></card>
    </div>
    <div class="beianhao">
        &copy;2019-2020 suishouji.net ICP证：<a href="http://www.beian.miit.gov.cn">京ICP备15026525号</a>
    </div>
</div>
</template>
<script>
import banner from '~/components/index/banner'
import card from '~/components/index/card'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    banner,
    card
  },
  async asyncData({app}){
    try{
        let result = await axios.post(
            `http://www.suishouji.net/n/`,
            {"type": 0}
        );
        console.log(result.data)
        return {list: result.data}
    } catch(e){
        console.log(e)
    }
  },
  mounted () {
    this.getHomeList(this.tabValue)
  },
  data () {
      return {
          tabValue: 0,
          tabLabels: ['爱心募捐', '口罩购买', '医护关爱'],
          inputContent: '',
          list: []
      }
  },
  methods: {
      handleChangeTab(value){
          this.tabValue = value
          this.getHomeList(value)
      },
      async getHomeList(tabValue){
        try{  
            let result = await axios.post(`/n/`,{"type": tabValue});
            console.log('mount', result.data)
            this.list = result.data
        } catch(e){
            console.log(e)
        }
      }
  }
}
</script>
<style lang="stylus" scoped>
.tabContent
    overflow: auto
.beianhao
    font-size: 8px
    position: relative
    bottom: 0px
</style>