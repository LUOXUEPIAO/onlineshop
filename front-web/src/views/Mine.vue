<template>
    <div>
        this is Mine
    </div>
</template>
<script>
export default {
    name:'mine',
    beforeMount() {
      this.querydata();
    },
    methods: {
        querydata(){
             this.$http.get('/api/mine').then(response => {
                console.log(response.data.data);
            })
        }
    },
}
</script>