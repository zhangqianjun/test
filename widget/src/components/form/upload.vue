<template>
  <div class="weui-cells weui-cells_form" style="padding-bottom:10px;overflow:hidden;">
    <div class="weui-cell"
      id="uploader">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <div class="weui-uploader__title">附件</div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files"
              id="uploaderFiles"></ul>
            <div class="weui-uploader__input-box">
              <input id="uploaderInput"
                class="weui-uploader__input"
                type="file"
                accept="image/*"
                @change="uploadFile($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="item in fileList"
      :key="item.fileUrl"
      style="boder:1px solid black;width:100px;height:100px;overflow:hidden;margin: 5px;float:left;">
      <img :src="`${HOST}${item.fileUrl}`"
        alt="" style="width:100px;">
    </div>
    <!-- <div style="boder:1px solid black;width:100px;height:100px;overflow:hidden;margin: 5px;float:left;">
      <input id="uploaderInput"
      placeholder="select"
          type="file"
          accept="image/*"
          @change="uploadFile($event)" />
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
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
      // if (!$g.checkFile(file.name)) {
      //   return
      // }
      // $g._log(file);
      // var loading = weui.loading('loading');
      $g.upload(file, (file, res) => {
        console.log(JSON.stringify(res))
        // loading.hide();
        // $g.log(res);
        if (res.code == 400) {
          // $g.toastMsg(res.error)
          return
        }
        this.fileList.push({
          fileName: file.name,
          fileUrl: res.data
        })
        console.log(JSON.stringify(this.fileList))
        api.toast({
          msg: '上传成功',
          duration: 2000,
          location: 'bottom'
        })
      })
    },
  }
}
</script>