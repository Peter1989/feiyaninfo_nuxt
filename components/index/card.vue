<template>
    <div class="card_wrap">
        <div class="card" v-if="content.shape === 0">
            <a class="link" :href="content.content">
                <div class="link-text">{{content.title}}</div>
                <div>(详情请点击链接)</div>
            </a>
        </div>
        <div class="card" v-else-if="content.shape === 1">
            <div class="title">{{content.title}}</div>
            <div class="content">{{content.content}}</div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'card',
  props: {
    content: {}
  },
  created(){console.log('card created')},
  //serverCacheKey: props => props.content.id,
}
</script>
<style lang='stylus' scoped>
.card_wrap
  padding: 4vw
  text-align: center
  .card
    padding: 5vw
    display: inline-block
    box-shadow: 0 1vw 2vw 0 rgba(0,0,0,0.2);
    transition: 0.3s
    width: 90%;
    border-radius: 2vw
    text-align: left
    line-height: 7vw
    .link
      font-size: 4vw
      margin-bottom: 3vw
      .link-text
        text-align: middle
    .title
      font-size: 4vw
    .content
      font-size: 3vw
</style>
