<template>
  <div id="app" :class="[showMenu ? 'show-menu' : '', 'app']">
    <sideMenu />
    <main>
      <navBar />
      <section>
        <inputer />
        <outputer />
      </section>
    </main>
  </div>
</template>

<script>
    import sideMenu from "./components/sideMenu";
    import navBar from "./components/navBar";
    import inputer from "./components/inputer";
    import outputer from "./components/outputer";

    export default {
        components: {
            sideMenu: sideMenu,
            navBar: navBar,
            inputer: inputer,
            outputer: outputer
        },
        mounted: function () {
            this.$store.dispatch("loadCache");
            this.$store.dispatch("loadTemplates");
        },
        computed: {
            showMenu: function () {
                return this.$store.state.showMenu;
            }
        }
    };
</script>

<style lang="less">
  @import url('assets/markdown.less');
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: Microsoft Yahei, "PingHei", "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif;
    height: 100%;
    overflow: hidden;
    background-color: #e0e0e0;
  }
  .app {
    position: relative;
    left: -220px;
    height: 100%;
    transition: all ease .5s;
    &.show-menu {
      left: 0;
      main {
        section {
          padding-right: 230px;
        }
      }
    }
    main {
      margin-left: 220px;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      section {
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        padding-bottom: 55px;
        display: flex;
        justify-content: center;
        transition: all ease .5s;
      }
    }
  }

  *::-webkit-scrollbar {
      display: block;
      width: 5px;
      background: #FAFAFA;
  }
  *::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #E0E0E0;
  }
  *::-webkit-scrollbar-thumb:hover {
      background: #BDBDBD;
  }
</style>
