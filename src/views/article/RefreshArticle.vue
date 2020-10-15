<template>
    <div class="wrapper" :style="{display: display}">
        <p class="time">{{resDate}}</p>
        <ArticleItem :article="refreshDate"/>
    </div>
</template>

<script>
import ArticleItem from './ArticleItem'

export default {
    props: {
        refreshDate: {
            type: Array
        },
        resDate: {
            type: Number
        },
        display: {
            type: String
        }

    },
    components: {
        ArticleItem
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    margin-top: 30px;
    border-top: 2px solid #C1C8D6;

    .time{
        margin-top: 10px;
        padding: 10px;
        font-size: 14px;
        color: #ec8181;
    }
}
</style>