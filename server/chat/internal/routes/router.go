package routes

import (
	"github.com/gin-gonic/gin"
)

// Router 创建一个默认的 Gin 路由引擎
var Router = gin.Default()

func OpenServer() {
	Common()
	User()
	Login()
	Chat()
	// 启动 HTTP 服务并监听 3000 端口
	err := Router.Run(":3000")
	if err != nil {
		panic(err)
	}
}
