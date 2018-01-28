<template>
  <div class="menu">
    <!--<h1>-->
    <!--<img src="../../img/logo.png" alt="">-->
    <!--</h1>-->
    <!--<label for="template-list" class="menu-label"><i class="fa fa-file-code-o" aria-hidden="true"></i> Templates</label>-->
    <!--<ul class="files" id="template-list">-->
      <!--<template v-for='i in templateList.length'>-->
        <!--<li :class='{"current": templateList[i - 1].current}'>-->
          <!--<span @click='selectThis(i)'>{{ templateList[i - 1].title }}</span>-->
          <!--<button v-if='templateList.length > 1' class="delete-btn" @click='deleteThis(i)'><i class="fa fa-times"></i>-->
          <!--</button>-->
        <!--</li>-->
      <!--</template>-->
    <!--</ul>-->
    <label for="archive-list" class="menu-label"><i class="fa fa-archive" aria-hidden="true"></i> Archive</label>
    <ul class="files" id="archive-list">
      <template v-for='i in archiveList.length'>
        <li :class='{"current": archiveList[i - 1].current}'>
            <span @click='selectThis(i)'>{{ archiveList[i - 1].title }}</span>
          <button v-if='archiveList.length > 1' class="delete-btn" @click='deleteThis(i)'><i class="fa fa-times"></i>
          </button>
        </li>
      </template>
    </ul>
    <ul class="options">
      <!--<li>-->
        <!--<button class="add-one-btn" @click='newArticle'>-->
          <!--<i class="fa fa-plus"></i>-->
        <!--</button>-->
      <!--</li>-->
      <li>
        <a :href='htmlDataUrl' :download='titleHtml' @mouseenter='createUrl("html")'>
          <i class="fa fa-html5"></i>
          Save as .html
        </a>
      </li>
      <li>
        <a :href='mdDataUrl' :download='titleMd' @mouseenter='createUrl("md")'>
          <i class="fa fa-download"></i>
          Save as .md
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
                htmlDataUrl: "",
                mdDataUrl: ""
            };
        },
        computed: {
            archiveList: function () {
                return this.$store.getters.archiveList;
            },
            templateList: function () {
                return this.$store.getters.templateList;
            },
            titleHtml: function () {
                return this.$store.getters.articleRaw.split("\n")[0] + ".html";
            },
            titleMd: function () {
                return this.$store.getters.articleRaw.split("\n")[0] + ".md";
            }
        },
        methods: {
            selectThis: function (i) {
                this.$store.dispatch("selectThis", i - 1);
            },
            newArticle: function () {
                const filesBox = document.querySelector(".files");
                this.$store.dispatch("newArticle");
                setTimeout(() => {
                    filesBox.scrollTop = filesBox.scrollHeight + 180;
                }, 100);
            },
            deleteThis: function (i) {
                this.$store.dispatch("deleteThis", i - 1);
            },
            saveToCache: function () {
                this.$store.dispatch("saveToCache");
            },
            readFromCache: function () {
                this.$store.dispatch("readFromCache");
            },
            createUrl: function (mode) {
                const self = this;
                let val = "";
                if (mode === "md") {
                    val = self.$store.getters.articleRaw;
                    const blobObj = new Blob([val]);
                    self.mdDataUrl = URL.createObjectURL(blobObj);
                } else {
                    val = self.$store.getters.articleMd;
                    const blobObj = new Blob([val]);
                    self.htmlDataUrl = URL.createObjectURL(blobObj);
                }
            }
        }
    };
</script>

<style scoped lang="less">
  .menu {
    box-sizing: border-box;
    position: relative;
    float: left;
    height: 100%;
    width: 220px;
    box-shadow: 4px 5px 3px #aaa;
    background-color: #f5f5f5;
    .menu-label{
      margin: 0;
      padding: 0 10px;
      height: 55px;
      line-height: 55px;
      text-align: left;
      font-size: 16px;
      .fa {
        display: inline-block;
        width: 24px;
        font-size: 24px;
        margin: 0 15px;
      }
    }
    h1 {
      margin: 0;
      height: 75px;
      line-height: 75px;
      text-align: center;
      img {
        width: 125px;
        vertical-align: middle;
      }
    }
    .files {
      padding: 10px 0 0 0;
      margin: 0;
      max-height: 295px;
      list-style: none;
      border-bottom: 1px solid #bdbdbd;
      overflow-y: scroll;
      li {
        position: relative;
        padding: 0;
        color: #9E9E9E;
        transition: all ease .3s;
        cursor: default;
        span {
          box-sizing: border-box;
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 15px;
          white-space: normal;
          word-break: break-all;
        }
        .delete-btn {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          display: none;
          background: none;
          border: none;
          outline: none;
          &:hover {
            background: #EF5350;
            .fa {
              color: #fff;
            }
          }
          &:active {
            background: #F44336;
            .fa {
              color: #fff;
            }
          }
        }
        &.current {
          color: #616161;
          border-left: 6px solid #009688;
        }
        &:hover {
          background: #eee;
          .delete-btn {
            display: inline-block;
          }
        }
      }
    }
    .options {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        color: #616161;
        transition: all ease .3s;
        padding: 0 5px;
        height: 55px;
        line-height: 55px;
        &:hover {
          background: #e0e0e0;
        }
        &:active {
          background: #bdbdbd;
        }
        button,
        a {
          display: inline-block;
          padding: 0 5px;
          width: 100%;
          height: 100%;
          background: none;
          border: none;
          outline: none;
          text-align: left;
          color: inherit;
          font-size: 16px;
          text-decoration: none;
          cursor: default;
          &.add-one-btn {
            text-align: center;
          }
          .fa {
            display: inline-block;
            width: 24px;
            font-size: 24px;
            margin: 0 15px;
          }
        }
      }
    }
    .copy-right {
      position: absolute;
      bottom: 10px;
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: #9E9E9E;
    }
  }
</style>
