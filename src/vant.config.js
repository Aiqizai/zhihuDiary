import {
    Tabbar,
    TabbarItem,
    Lazyload,
    Swipe,
    SwipeItem,
    Toast,
    Search,
    Form,
    field,
    button,
    Icon,
    Collapse, 
    CollapseItem,
    Notify,
    Popup,
    ShareSheet,
    Empty,
    Loading,
    PullRefresh,
    List,
    cell,
    SwipeCell,
    Dialog,
    Calendar,
    Image as VanImage       
} from 'vant'

const vants = [
    Tabbar,
    TabbarItem,
    Lazyload, 
    Swipe, 
    SwipeItem, 
    Toast, 
    Search, 
    Form, 
    field, 
    button, 
    Icon,
    Collapse, 
    CollapseItem,
    Notify,
    Popup,
    ShareSheet,
    Empty,
    Loading,
    PullRefresh,
    List,
    cell,
    SwipeCell,
    Dialog,
    Calendar,
    VanImage       
]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }
}