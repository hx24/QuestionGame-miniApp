Component({
  properties: {
    userName: String   // 声明会接收的属性和类型，使用的时候与data中的数据相同
  },
  data: {
    str: '',
  },
  attached(){
    this.triggerEvent('getRandomNum', Math.random());  // 也可传对象
  },
  methods: {
    onTap() {
      console.log(this.properties.userName);
      this.triggerEvent('getRandomNum', Math.random());  // 也可传对象
    }
  },
})