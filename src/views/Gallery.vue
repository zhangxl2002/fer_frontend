<template>
    <div class="flex-container">
        <div class="left-section">
            <div v-for="name in names" :key="name" class="item">
                <p> {{name}} </p>
                <button @click="handlePreview(name)"> preview </button>
            </div>
        </div>

        <div class="right-section">
            <div class="right-aligned-image">
                <img v-if="imageUrl" :src="imageUrl" alt="Image" />
                <button @click="recognizeImage">识别图片</button>
                <p v-if="recognizeResult">识别结果: {{recognizeResult}}</p>
            </div>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            names: [],
            response: null,
            image: null,
            imageUrl: "",
            recognizeResponse: null,
            recognizeResult: ""
        }
    },
    async mounted() {
        //在挂载前发送请求，将该用户所有的图片加载进来
        // 可能还是得将图片名字存数据库，然后请求一遍所有图片的名字，再依次请求图片
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const api = axios.create({
            baseURL: 'http://localhost:8100', // 替换成你的API URL
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        try {
            this.response = await api.get(`/api/v1/users/${userId}/images`)
            let namesStr = this.response.data.imageList
            namesStr = namesStr.slice(1, namesStr.length-1)
            this.names = namesStr.split(",").map(item => item.trim())
        } catch (error) {
            console.error(error)
            console.error("获取图片失败")
        }
    },
    methods: {
        async handlePreview(name) {
            const userId = localStorage.getItem('userId')
            const token = localStorage.getItem('token')
            const api = axios.create({
                baseURL: 'http://localhost:8100', // 替换成你的API URL
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            try {
                this.response = await api.get(`/api/v1/users/${userId}/image/${name}`,{ responseType: 'blob' })
                this.image = this.response.data;
                this.imageUrl = URL.createObjectURL(this.image); // 设置图片 URL
            } catch (error) {
                console.error(error)
                console.error("获取图片失败")
            }
        },
        async recognizeImage() {
            const emotionMap = new Map([
                [0, "Angry"],
                [1, "Disgust"],
                [2, "Fear"],
                [3, "Happy"],
                [4, "Sad"],
                [5, "Surprise"],
                [6, "Neutral"]
            ]);
            const formData = new FormData();
            formData.append('file',this.image)
            try {
                this.recognizeResponse = await axios.post("http://localhost:8000/api/v1/upload/",formData)
            } catch (error) {
                console.error("表情识别失败")
                return
            }
            if (this.recognizeResponse.status >= 200 && this.recognizeResponse.status < 300) {
                this.recognizeResult = emotionMap.get(this.recognizeResponse.data)
            }
        }
    }
}
</script>

<style>
    .flex-container {
        display: flex;
        flex-wrap: wrap; /* 允许换行 */
    }

    .item {
        margin-top: 10px; /* 可选的外边距 */
        border: 0;
        background: grey;
        padding: 10px 20px;
        margin: 20px;
        color: white;
        border-radius: 10px;
    }
    .right-aligned-image {
        margin-left: auto; /* 将图片推到右侧 */
        margin-bottom: auto;
     }
     .left-section {
        flex: 1; /* 左侧部分占满可用宽度 */
    }
    .middle-section {

    }
    .right-section {
        flex: 1; /* 右侧部分占满可用宽度 */
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>