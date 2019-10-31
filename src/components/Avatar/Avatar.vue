<template>
  <div class="avatar">
    <div v-html="svg"></div>
  </div>
</template>

<script>
import jdenticon from 'jdenticon';
export default {
  name: 'Avatar',
  props: {
    data: {
      type: String,
      required: true
    }
  },
  computed: {
    svg: function () {
      return jdenticon.toSvg(this.data, 200);
    }
  },
  // watch: {
  //   data: function (d) {
  //     console.log(d)
  //     this.$refs.avatar = jdenticon.toSvg(d, 200);
  //   }
  // },
  // mounted: function () {
  //   console.log(this.$refs)
  //   this.$refs.avatar = jdenticon.toSvg(this.data, 200);
  // }
}
</script>

<style scoped>
  .avatar {
    width: 200px;
    height: 100px;
  }
</style>
