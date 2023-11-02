<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="file" @change="chooseFile" >
    <button @click="uploadImage">上传图片</button>
    <div v-if="image">
      <img :src="image" alt="">
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        selectedFile: null,
        image: null
      }
    },
    methods: {
      chooseFile(event) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile == null
        || this.selectedFile.type !== 'image/jpeg') {
          this.image = null
          return 
        } 
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
        
      },
      async uploadImage() {
        if (this.selectedFile == null) {
          console.log("文件不能为空")
          return
        }
        if (this.selectedFile.type !== 'image/jpeg'){
          console.log("文件必须是图片类型")
          return
        }
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token')
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
          // 上传成功后，清空
          this.selectedFile = null
          this.image = null
        } catch (error) {
          console.error("文件上传失败: ", error);
        }
      }
    }
  }
</script>
