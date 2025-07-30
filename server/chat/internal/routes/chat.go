package routes

import (
	"bufio"
	"chat/internal/handlers"
	"chat/internal/models"
	"github.com/gin-gonic/gin"
	"io"
	"strings"
)

func Chat() {
	Router.POST("/chat", func(c *gin.Context) {
		var cType = c.PostForm("type")
		var role = c.PostForm("role")
		var content = c.PostForm("content")
		var model = c.PostForm("model")
		println(role, content)

		// 设置 SSE 头部
		c.Header("Content-Type", "text/event-stream")
		c.Header("Cache-Control", "no-cache")
		c.Header("Connection", "keep-alive")
		c.Header("Access-Control-Allow-Origin", "*")

		bodyTxt := handlers.HandleChat(models.RequestContent{
			Type:    cType,
			Role:    role,
			Content: content,
			Model:   model,
		})

		// 逐行读取并处理流数据
		reader := bufio.NewReader(strings.NewReader(string(bodyTxt)))
		for {
			line, err := reader.ReadString('\n')
			if err != nil {
				if err == io.EOF {
					break
				}
				c.SSEvent("error", err.Error())
				return
			}

			// 处理 SSE 数据行
			line = strings.TrimSpace(line)
			if strings.HasPrefix(line, "data:") {
				data := strings.TrimSpace(strings.TrimPrefix(line, "data:"))

				// 检查是否结束
				if data == "[DONE]" {
					c.SSEvent("end", "stream finished")
					break
				}

				// 发送消息内容
				if data != "" {
					c.SSEvent("message", data)
					c.Writer.Flush()
				}
			}
		}
	})
}
