package services

import (
	"chat/internal/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func LoginService(c *gin.Context, params models.LoginModel) {
	fmt.Println("LoginService")
	fmt.Println(params)
	c.JSON(http.StatusOK, models.ResponseData{
		Code:    200,
		Message: "登录成功",
		Data:    nil,
	})
}

func RegService() {
	fmt.Println("reg")
}
