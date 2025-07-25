package models

// Message 消息结构体
type Message struct {
	Type    string `json:"type"`    // "user" 或 "ai"
	Content string `json:"content"` // 消息内容
	Time    string `json:"time"`    // 时间戳
}
