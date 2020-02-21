<template>
<div>
    <div class="top_head">
      <div class="top_text">新型冠状病毒肺炎</div>
      <div class="btm_text">信息共享平台</div>
    </div>
</div>
</template>
<script>
export default {
  name: 'banner'
}
</script>
<style lang='stylus' scoped>
// @import '~styles/varibles.styl'
.top_head
  width: 100%;
  height: 22vh;
  background-image : url("../../assets/images/top_head.png");
  background-size : 100% 22vh;
  .top_text
    color: #fff;
    font-size: 4.5vw;
    padding-top: 6vh;
    margin-left: 10vw;
  .btm_text
    color: #fff;
    font-size: 9vw;
    margin-top: 2vh;
    margin-left: 10vw;
</style>