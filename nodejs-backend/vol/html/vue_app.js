let clock = new Vue({ 
    el: '#clock',
    data: {
        clock_date: '',
        clock_time: ''
    },
    mounted: function() {
        let timerID = setInterval(this.updateTime, 500); 
    }, 
    methods: { 
        updateTime: function() { 
            const to_day = ['日', '月', '火', '水', '木', '金', '土']
            let cur_date = new Date();
            this.clock_date = String(1900 + cur_date.getYear()) + '/' + 
                              String(cur_date.getMonth() + 1).padStart(2, '0') + '/' + 
                              String(cur_date.getDate()).padStart(2, '0') + '(' + 
                              to_day[cur_date.getDay()] + ')';

            this.clock_time = String(cur_date.getHours()).padStart(2, '0') + ':' + 
                              String(cur_date.getMinutes()).padStart(2, '0') + ':' + 
                              String(cur_date.getSeconds()).padStart(2, '0');
        }
    }
});


let app = new Vue({ 
    el: '#app',
    data: {
        update_time: '---',
        temp: '---',
        humid: '---',
        pressure: '---'
    },
    mounted: function() {
        let timerID = setInterval(this.getRoomdata, 5000); 
    }, 
    methods: { 
        getRoomdata: function() { 
            axios.get("/api/v1/roomdata")
              .then((res) => {
                console.log(res);
                let update_time_obj = new Date(res.data.members[0].time * 1000)
                this.update_time = update_time_obj.toLocaleDateString() + " " + 
                                   update_time_obj.toLocaleTimeString()
                this.temp = res.data.members[0].room_temp
                this.humid = res.data.members[0].room_humid
                this.pressure = res.data.members[0].room_pressure
              })
              .catch((err) => {
                console.log(err);
              });
        }
    }
});


let tabehoudai = new Vue({ 
    el: '#price',
    data: {
        adult_num: 0,
        child_num: 0
    },
    computed: {
        total_price: function() {
            console.log(this.adult_num, this.child_num)
            const adult_price = 1200
            const child_price = 800
            let price = this.adult_num*adult_price + this.child_num*child_price

            if ((this.adult_num == 0) && (this.child_num == 0)) {
                return "いらっしゃいませ！何名さまですか？"
            } else {
                return "料金は大人" + this.adult_num + "名、小人" + this.child_num + "名で合計" + price + "円です！"
            }   
        }
    }
});


let memo_app  = new Vue({ 
    el: '#memo',
    data: {
        memos: '',
        memo_message: ''
    },
    methods: {
        readMemo: function () {
            axios.get('/api/v1/memo')
                .then(res => (
                    console.log(res),
                    this.memos = res.data.members
                )
            )
        },
        addMemo: function() {
            axios.post("/api/v1/memo", {
                message: this.memo_message
            }).then(response => (this.readMemo()))
        }
    }
});