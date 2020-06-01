<template>

  <div>
    <querypanel @doquery="querydata"></querypanel>
    <cardlist :listData="goods"></cardlist>
  </div>
</template>
<script>
  import cardlist from '@/components/goods/CardList.vue'
  import querypanel from '@/components/goods/QueryPanel.vue'
  export default {
    name: 'Goods',
    props: {
      msg: String
    },
    components: {
      cardlist,
      querypanel
    },
    data: function () {
      return {
        goods: "",
      }
    },
    beforeMount() {
      this.querydata('');
    },
    methods: {
      querydata: function (data) {
        let that = this;
        let url = '/api/goods';//保持上节课的代码
        if (data != '') {
          url = url + '?type=' + data;
        }
        this.$http.get(url).then(response => {
            // handle success
            that.goods = response.data.data;
        })
      }
    }
  }
</script>
<style lang="">
  
</style>