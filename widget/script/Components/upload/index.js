define(function (require, exports, module) {
  require('./index.css')
  module.exports = {
    props: ['label', 'value', 'filelist', 'imagelist'],
    data: function () {
      return {
      }
    },
    mounted: function () {
      this.initImageUpload()
    },
    methods: {
      initImageUpload: function () {
        var _this = this;
        var uploadCount = 0;
        var image = {};
        weui.uploader('#uploader', {
          url: $g.uploadUrl,
          auto: true,
          type: 'file',
          fileVal: 'file',
          compress: {
            width: 1600,
            height: 1600,
            quality: .8
          },
          onBeforeQueued: function (files) {
            // `this` 是轮询到的文件, `files` 是所有文件
            if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
              weui.alert('请上传图片');
              return false; // 阻止文件添加
            }
            if (this.size > 10 * 1024 * 1024) {
              weui.alert('请上传不超过10M的图片');
              return false;
            }
            if (files.length > 5) { // 防止一下子选择过多文件
              weui.alert('最多只能上传5张图片，请重新选择');
              return false;
            }
            if (uploadCount + 1 > 5) {
              weui.alert('最多只能上传5张图片');
              return false;
            }
            ++uploadCount;
          },
          onQueued: function () {
          },
          onBeforeSend: function (data, headers) {
            $g.log(data)
            image.fileName = data.name;
            headers.token = $g.getToken()
            // $g.assign(data, { test: 1 });
            // $g.assign(headers, { token: $api.getStorage('token') });
          },
          onProgress: function (procent) {
          },
          onSuccess: function (ret) {
            $g.log(ret);
            image.fileUrl = ret.data.data;
            _this.imagelist.push($g.cloneDeep(image));
          },
          onError: function (err) {
            $g.log(err)
          }
        });
        // 缩略图预览
        document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
          var target = e.target;
          while (!target.classList.contains('weui-uploader__file') && target) {
            target = target.parentNode;
          }
          if (!target) return;

          var url = target.getAttribute('style') || '';
          var id = target.getAttribute('data-id');

          if (url) {
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
          }
          // 预览图片
          var gallery = weui.gallery(url, {
            className: 'custom-name',
            onDelete: function onDelete() {
              // 删除图片
              weui.confirm('确定删除该图片？', function () {
                --uploadCount;
                _this.imagelist.splice(_this.index(target), 1);
                target.remove();
                gallery.hide();
              });
            }
          });
        });
      },
      index: function (ele) {
        var elems = ele.parentNode.children;
        for (var i = 0; i < elems.length; i++) {
          if (elems[i] == ele) {
            return i;
          }
        }
      },
      uploadFile: function (e) {
        var _this = this;
        var file = e.target.files[0];
        if (!file) {
          return
        }
        if (!$g.checkFile(file.name)) {
          return
        }
        $g._log(file);
        var loading = weui.loading('loading');
        $g.upload(file, function (file, res) {
          loading.hide();
          $g.log(res);
          if (res.code == 400) {
            $g.toastMsg(res.error)
            return
          }
          _this.filelist.push({
            fileName: file.name,
            fileUrl: res.data.data
          })
        })
      },
      delFile: function (index) {
        this.filelist.splice(index, 1)
      }
    },
    template: $g.getTemplate('Components/upload/index.html')
  }
})