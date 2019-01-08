<template>
  <div class="weui-cells weui-cells_form" style="padding-bottom:10px;overflow:hidden;">
    <div class="weui-cell"
      id="uploader">
        <div v-for="item in fileList"
        :key="item.fileUrl"
        style="boder:1px solid black;width:100px;height:100px;overflow:hidden;margin: 5px;float:left;">
        <img :src="`${HOST}${item.fileUrl}`"
          alt="" style="width:100px;">
        </div>
        <div style="position:relative;width:100px;height:100px;float:left;margin: 5px;">
          <input id="uploaderInput"
            value="123"
            class="weui-uploader__input"
            type="file"
            accept="image/*"
            style="opacity: 0;width:100px;height:100px;position:absolute;top:0;left:0;"
            @change="uploadFile($event)" />
            <div class="file-upload">+ </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      files: [],
      HOST: window.HOST
    }
  },
  methods: {
    uploadFile(e) {
      // var _this = this;
      var file = e.target.files[0];
      if (!file) {
        return
      }
      $g.upload(file, (file, res) => {
        console.log(JSON.stringify(res))
        if (res.code == 400) {
          return
        }
        this.fileList.push({
          fileName: file.name,
          fileUrl: res.data
        })
        this.files.push(res.data)
        this.$emit('inputFile', this.files)
        console.log(JSON.stringify(this.fileList))
        api.toast({
          msg: '上传成功',
          duration: 2000,
          location: 'middle'
        })
      })
    },
  }
}
</script>
<style>
.file-upload{
    border:1px solid #E6E6E6;
    color:#333333;
    width:100px;
    height:100px;
    line-height:90px;
    text-align: center;
    font-size:60px;
}
</style>