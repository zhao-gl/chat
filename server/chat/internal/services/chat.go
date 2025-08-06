package services

import (
	"chat/config"
	"chat/internal/models"
	"chat/internal/services/ai"
	"fmt"
)

// CreateSession 创建新会话
func CreateSession() (models.Session, error) {
	newSession := models.Session{
		Title: "新会话",
	}
	// 执行SQL
	_, err := config.DB.Exec("INSERT INTO session(title) VALUES(?)", newSession.Title)
	return newSession, err
}

// Chat 处理聊天请求
func Chat(reqContent models.RequestContent) []byte {
	fmt.Println("type", reqContent.Type)
	if reqContent.Type == "qwen" {
		return ai.QueryQWen(reqContent)
	}
	return []byte{0}
}

// QuerySessionById 查询会话
func QuerySessionById(sessionId string) (models.Session, error) {
	fmt.Println(sessionId)
	return models.Session{}, nil
}

// QueryAllSessions 查询所有会话
func QueryAllSessions() ([]models.Session, error) {
	// 分页逻辑
	return []models.Session{}, nil
}

// DelSession 删除会话
func DelSession(sessionId string) (bool, error) {
	return true, nil
}

func Ask(reqContent models.RequestContent) []byte {
	return ai.QueryQWen(reqContent)
}
