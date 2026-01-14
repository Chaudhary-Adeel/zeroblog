package models

import (
	"time"

	"gorm.io/gorm"
)

// Tenant represents a multi-tenant organization/blog workspace
type Tenant struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"index;not null" json:"name"`
	Slug        string         `gorm:"uniqueIndex;not null" json:"slug"`
	Domain      string         `gorm:"uniqueIndex" json:"domain"`
	Logo        string         `json:"logo"`
	Description string         `json:"description"`
	IsActive    bool           `gorm:"default:true" json:"is_active"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Users      []User     `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Roles      []Role     `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Posts      []Post     `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Categories []Category `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
}

// TableName specifies the table name for Tenant
func (Tenant) TableName() string {
	return "tenants"
}
