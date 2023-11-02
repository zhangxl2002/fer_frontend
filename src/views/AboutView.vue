<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="file" @change="chooseFile" multiple >
    <button @click="uploadImages">上传图片</button>
    <button @click="recognizeImage">识别图片</button>
    <div v-if="images">
      <div v-for="image in images" :key="image">
          <img :src="image" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        images: [],
        selectedFiles: []
      }
    },
    methods: {
      chooseFile(event) {
        this.images = []
        this.selectedFiles = []
        const files = event.target.files
        for (let i = 0; i < files.length; i++) {
          const file = files[i];        
          if (file.type !== 'image/jpeg') {
            continue;
          }
          this.selectedFiles.push(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
        // this.selectedFile = event.target.files[0];
        // if (this.selectedFile == null
        // || this.selectedFile.type !== 'image/jpeg') {
        //   this.image = null
        //   return 
        // } 
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   this.image = e.target.result;
        // };
        // reader.readAsDataURL(this.selectedFile);
        
      },
      async recognizeImage() {
        const formData = new FormData();
        formData.append('file',this.selectedFiles[0])
        const response = await axios.post("http://localhost:8000/api/v1/upload/",formData)
        console.log(response)
      },
      async uploadImages() {



        /////////////////////
        if (this.images.length == 0) {
          console.log("选中的文件中不包含图片")
          return
        }
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        for (let i = 0; i < this.selectedFiles.length; i++) {
          const formData = new FormData();
          formData.append('file',this.selectedFiles[i]) //这里一定得是文件形式
          const api = axios.create({
            baseURL: 'http://localhost:8100', // 替换成你的API URL
            headers: {
              'Authorization': `Bearer ${token}`, // 将token添加到请求头中
              // 'Content-Type': 'multipart/form-data',
            }
          });
          try {
            // 发送文件到服务器的逻辑
            const response = await api.post(`/api/v1/users/${userId}/image`, formData);
          } catch (error) {
            console.error("文件上传失败: ", this.selectedFiles[i].name);
            // const tmp_img = this.images[0]
            // this.images = this.images.slice(1,this.images.length)
            // this.images.push(tmp_img)
            // continue
          }
        }
        this.images = []
        this.selectedFiles = []
      }
    }
  }
</script>
