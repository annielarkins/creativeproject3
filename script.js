let app = new Vue({
    el: '#app',
    data: {
        colors: [],
        numColors: 0,
        drag: {},
        tempColor: ''
    },
    created() {
        //this.randomColor();
    },
    methods: {
        async randomColor() {
            try {
                const response = await axios.get('http://www.colr.org/json/color/random');
                this.colors[this.numColors] = '#' + response.data.colors[0].hex;
                this.tempColor = '#' + response.data.colors[0].hex;
                this.numColors += 1;
                console.log(this.colors[this.numColors - 1]);
                this.dragItem(this.colors[0]);
                this.dropItem(this.colors[0]);
            } catch (error) {
                console.log(error);
            }
        },
        addColor() {
            this.dragItem(this.colors[0]);
            this.dropItem(this.colors[0]);
            this.randomColor();
            this.dragItem(this.colors[0]);
            this.dropItem(this.colors[0]);
        },
        clearColors() {
            this.colors = [];
            this.numColors = 0;
        },
        deleteColor(color) {
            var index = this.colors.indexOf(color);
            if (index > -1) {
                this.colors.splice(index, 1);
                this.numColors -= 1;
            }
            console.log("DELETING");
        },
        async changeColor(color) {
            var index = this.colors.indexOf(color);
            if (index > -1) {
                try {
                    const response = await axios.get('http://www.colr.org/json/color/random');
                    this.colors[index] = '#' + response.data.colors[0].hex;
                    this.tempColor = '#' + response.data.colors[0].hex;
                    this.dragItem(this.colors[0]);
                    this.dropItem(this.colors[0]);
                } catch (error) {
                    console.log(error);
                }
            }
            //            this.randomColor();
            //            var index = this.colors.indexOf(color);
            //            if (index > -1) {
            //                this.colors[index] = this.tempColor;
            //                console.log("ABOUT TO DELETING");
            //                this.colors.splice(this.numColors, 1);
            //                this.numColors -= 1;
            //            }
        },
        dragItem(color) {
            this.drag = color;
        },
        dropItem(color) {
            const indexItem = this.colors.indexOf(this.drag);
            const indexTarget = this.colors.indexOf(color);
            this.colors.splice(indexItem, 1);
            this.colors.splice(indexTarget, 0, this.drag);
        },
    }
})
