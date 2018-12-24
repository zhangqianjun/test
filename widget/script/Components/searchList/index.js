define(function (require, exports, module) {
  require('./index.css')
  var header = require('../header/index.js')
  var search = require('../search/index.js')
  module.exports = {
    components: {
      'v-header': header,
      'v-search': search,
    },
    props: ['requestname', 'list', 'name', 'resultname'],
    data: function () {
      return {
        page: 0,
        pageSize: 20,
        hasMore: true,
        searchValue: '',
        keyword: ''
      }
    },
    mounted: function () {
      this.loadMore();
      this.scroll2bottom();
    },
    methods: {
      search: function () {
        this.list = []
        this.page = 0
        this.hasMore = true
        this.keyword = this.searchValue
        this.loadMore()
      },
      scroll2bottom: function () {
        var _this = this;
        $g.topLoading({
          success: function (res) {
            console.log('到底部');
            _this.loadMore();
          }
        });
      },
      loadMore: function () {
        if (!this.hasMore) {
          return
        }
        this.page += 1
        var data = {
          keyword: this.keyword,
          page: this.page,
          limit: this.pageSize
        }
        var _this = this;
        $http[this.requestname](data, function (res) {
          var list = _this.resultname ? res[_this.resultname] : res
          $g.forEach(list, function (v) {
            v.checked = false
          })
          if (list.length < _this.pageSize) {
            _this.hasMore = false
          }
          _this.list = _this.list.concat(list)
        })
      },
      click: function (item) {
        this.$emit('click', item, this.list)
      }
    },
    template: $g.getTemplate('Components/searchList/index.html')
  }
})