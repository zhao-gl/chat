package routes

import (
	"bytes"
	"chat/internal/models"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"os"
)

func QueryAI() {
	Router.GET("/qwen", func(c *gin.Context) {
		// 创建 HTTP 客户端
		client := &http.Client{}
		// 构建请求体
		requestBody := models.QWenRequestBody{
			// 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
			Model: "qwen-turbo",
			Messages: []models.QWenMessage{
				{
					Role:    "system",
					Content: "You are a helpful assistant.",
				},
				{
					Role:    "user",
					Content: "你是谁？",
				},
			},
		}
		jsonData, err1 := json.Marshal(requestBody)
		if err1 != nil {
			log.Fatal("err1", err1)
		}
		//w.Write([]byte("ai"))
		// 创建 POST 请求
		req, err2 := http.NewRequest("POST", os.Getenv("QWen_URL"), bytes.NewBuffer(jsonData))
		if err2 != nil {
			log.Fatal("err2", err2)
		}
		// 设置请求头
		// 若没有配置环境变量，请用阿里云百炼API Key将下行替换为：apiKey := "sk-xxx"
		apiKey := os.Getenv("QWen_KEY")
		req.Header.Set("Authorization", "Bearer "+apiKey)
		req.Header.Set("Content-Type", "application/json")
		// 发送请求
		resp, err3 := client.Do(req)
		if err3 != nil {
			log.Fatal(err3)
		}
		// 读取响应体
		bodyText, err4 := io.ReadAll(resp.Body)
		if err4 != nil {
			log.Fatal(err4)
		}
		// 打印响应内容
		fmt.Printf("%s\n", bodyText)

		defer func(Body io.ReadCloser) {
			err := Body.Close()
			if err != nil {
				fmt.Println("Body关闭失败:", err)
			}
		}(resp.Body)
	})

}
