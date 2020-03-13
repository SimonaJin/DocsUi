// 1. 插件
let Vue;
//2. VueRouter类
export default class VueRouter {
    constructor(options){
        //声明map 把path和component映射起来
        this.routeMap = {}
        //current 保存当前hash
        //vue使其是响应式的
        this.app = new Vue({
            data:{
                current: '/'
            }
        })
    }
    init(){
        //1.事件监听
        this.bindEvents()
        //2.创建路由映射
        this.createRouteMap()
        //3.声明两个全局组件
        this.initComponent()
    }
    bindEvents(){
        window.addEventListener('hashchange', this.onHashChange.bind(this))//为了不改变this
        window.addEventListener('load', this.onHashChange)
    }
    onHashChange(){
        //拿hash
        this.app.current= window.location.hash.slice(1) || '/'
    }
    //解析routes选项
    createRouteMap(){
        this.$options.routes.forEach(item => {
            this.routeMap[item.path] = item.component;
        })
    }
    // 声明两个组件
    initComponent(){
        //vue.component()
        Vue.component('router-link',{
            props: {
                to: {type: String, required: true},
            },
            render(h){
                // 1.生产虚拟dom 
                //2.描述渲染Dom结构
                //3.h(tag,data,children)
               //方法一 return h('a',{attrs:{href: this.to}}, [this.$slots.default]) //匿名插槽
               //方法二
                return <a href={this.to}>{this.$slots.default}</a>
            }
        });
        Vue.component('router-view',{
            render: h => {
                //this 指向vueRouter实例
                const component = this.routeMap[this.app.current].component;
                return h(component)
            }
        })
    }
}
// 插件要求实现install方法
VueRouter.install = function (_Vue){//接受vue的构造函数
    Vue = _Vue
    // 混入
    Vue.mixin({
        beforeCreate(){// 代码在组件创建时执行
            // this只当前组件实例
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
                //初始化
                this.$options.router.init()
            }
        }
    })
}