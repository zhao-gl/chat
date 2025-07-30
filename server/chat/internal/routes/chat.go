package routes

import (
	"bufio"
	"chat/internal/handlers"
	"chat/internal/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"strings"
)

func Chat() {
	Router.POST("/chat", func(c *gin.Context) {
		var req models.RequestContent
		// 绑定 JSON 数据到结构体
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		fmt.Println(req.Type, req.Role, req.Content, req.Model)

		// 设置 SSE 头部
		c.Header("Content-Type", "text/event-stream")
		c.Header("Cache-Control", "no-cache")
		c.Header("Connection", "keep-alive")
		c.Header("Access-Control-Allow-Origin", "*")

		bodyTxt := handlers.HandleChat(models.RequestContent{
			Type:    req.Type,
			Role:    req.Role,
			Content: req.Content,
			Model:   req.Model,
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
