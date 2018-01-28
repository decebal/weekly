<template>
	<div>
		<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' @drop.stop.prevent='dragging' autofocus></textarea>
	</div>
</template>

<script>
    export default {
        computed: {
            rawTxt: function () {
                return this.$store.getters.articleRaw;
            }
        },
        methods: {
            inputting: function (e) {
                this.$store.dispatch("textInput", e.target.value);
                this.$store.dispatch("saveToCache");
            },
            syncStroll: function (e) {
                const outputer = document.querySelector(".outputer");
                outputer.scrollTop = e.target.scrollTop;
            },
            dragging: function (e) {
                const self = this;
                const dt = e.dataTransfer;
                const files = dt.files;
                const fileReader = new FileReader();
                fileReader.readAsText(files[0], "UTF-8");
                fileReader.onloadend = (event) => {
                    const value = event.target.result;
                    self.$store.dispatch("textInput", value);
                    self.$store.dispatch("saveToCache");
                };
            }
        }
    };
</script>

<style scoped lang="less">
	div {
		width: 50%;
		height: 100%;
		margin-right: 10px;
		textarea {
			box-sizing: border-box;
			height: 100%;
			width: 100%;
	    vertical-align: top;
	    padding: 15px;
	    resize: none;
	    border: none;
	    background-color: #f5f5f5;
	    outline: none;
	    font-family: inherit;
	    font-size: 18px;
	    color: #616161;
	    box-shadow: 4px 5px 3px #aaa;
	    transition: all ease .3s;
		}
	}
</style>
