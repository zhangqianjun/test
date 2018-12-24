define(function (require, exports, module) {
  require('./index.css')
  var photoBrowser = api.require('photoBrowser');
  var pdfReader = api.require('pdfReader');
  module.exports = {
    props: ['imagelist','filelist','title'],
    data: function () {
      return {
        
      }
    },
    mounted: function () {
      
    },
    methods: {
      showImage: function (imagelist, index) {
        var images = []
        $g.forEach(imagelist, function (v) {
          images.push(v.url);
        })
        photoBrowser.open({
          images: images,
          bgColor: '#fff',
          activeIndex: index
        }, function (ret) {
          // ret = {"eventType":"show","index":5}
          if (ret.eventType == 'click') {
            photoBrowser.close();
          }
        })
      },
      showFile: function (path) {
        var arr = path.split('.')
        var ext = arr[arr.length - 1]
        if (ext == 'pdf') {
          pdfReader.open({
            path: path
          });
        } else {
          api.openFrame({
            name: 'file',
            url: path
          })
          setTimeout(function () {
            api.closeFrame({
              name: 'file'
            })
          }, 1e3);
        }
      }
    },
    template: $g.getTemplate('Components/attach/index.html')
  }
})