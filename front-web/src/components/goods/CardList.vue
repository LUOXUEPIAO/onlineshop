<template>
    <div>
        <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="6" :lg="4" v-for="(one,index) in listData" :key="index" >
                <router-link :to="{name:'Gooddetail',params:{id:one.id}}">
                    
                    <el-card :body-style="{ padding: '0px'}">
                        <div style="text-align:center">
                            <img :src='one.image' class="image" ref="cardimg">
                        </div>
                        <div class = "card-text">
                            <span>{{one.name}}</span>
                            <span class="price">{{one.price}}</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">加入购物车</el-button>
                            </div>
                        </div>
                    </el-card>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        display: inline-block;
  height: auto;
  max-width: 100%;
        
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .el-row {
        padding-left: 24px;
    }

    .el-card {
        margin-bottom: 24px;
    }

    .price {
        float: right;
        font-size: 1.2em;
    }

    .card-text{
        margin:16px;
    }
</style>

<script>
    export default {
       
        props: [
            'listData'
        ],
        mounted() {
           
        },

    }
</script>