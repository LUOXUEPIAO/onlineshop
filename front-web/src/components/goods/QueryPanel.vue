<template>
    <div class="query-panel demo-border line">
        <span>商品类别：</span>
        <el-link  @click="doQuery('')" :underline="false">全部</el-link>
        <el-link  @click="doQuery('food')" :underline="false">食品</el-link>
        <el-link @click="doQuery('electric')" :underline="false">电器</el-link>
    </div>
</template>
<script>
export default {
    methods: {
        doQuery:function(type){
            //参数1： 事件名称doquery
            // 参数2：事件附带的数据：type
            this.$emit('doquery',type);
        }
    },
}
</script>
<style scoped>
    .query-panel{
        margin:24px;
        padding:24px; 
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border:1px solid rgba(0, 0, 0, 0.1);
    }
    .el-link{
        padding:24px;
        text-decoration: none;
    }
</style>