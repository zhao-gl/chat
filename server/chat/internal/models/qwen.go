package models

type QWenMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}
type QWenRequestBody struct {
	Model    string        `json:"model"`
	Messages []QWenMessage `json:"messages"`
}
