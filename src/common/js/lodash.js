import img from "./image/WechatIMG1.jpeg";
import "./common/sass/style.scss";
import "./common/css/index.css";
import _ from "lodash"
console.log("webpack 4.x-main")
// import axios from "axios";
// axios.get("/api/info").then(res=>{
//     console.log(res.data)
// })
if (module.hot) {
	module.hot.accept();
}
const arr = [new Promise(() => {}),new Promise(() => {})];
arr.map(item=>{
    console.log(item)
})



console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))
console.log(_.join(["a","b","c"]))