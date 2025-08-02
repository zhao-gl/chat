package routes

import (
	"chat/internal/models"
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

func SendResponse(c *gin.Context, code int, data interface{}, message string) {
	c.JSON(code, models.Response{
		Code:    code,
		Data:    data,
		Message: message,
	})
}
