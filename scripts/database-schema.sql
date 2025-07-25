-- 후일담 데이터베이스 스키마 (MongoDB 컬렉션 구조를 SQL로 표현)

-- 사용자 컬렉션
-- users collection
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(24) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(500),
    bio TEXT,
    region VARCHAR(50),
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    reputation_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP
);

-- 지역 컬렉션
-- regions collection
CREATE TABLE IF NOT EXISTS regions (
    id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    parent_region_id VARCHAR(24),
    level INT NOT NULL, -- 1: 시도, 2: 시군구, 3: 읍면동
    coordinates JSON, -- {lat: number, lng: number}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 카테고리 컬렉션
-- categories collection
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7), -- hex color code
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사건 컬렉션
-- incidents collection
CREATE TABLE IF NOT EXISTS incidents (
    id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    description LONGTEXT NOT NULL,
    region_id VARCHAR(24) NOT NULL,
    category_id VARCHAR(24) NOT NULL,
    status ENUM('ongoing', 'resolved', 'investigating') DEFAULT 'investigating',
    start_date DATE NOT NULL,
    end_date DATE,
    created_by VARCHAR(24) NOT NULL,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    bookmark_count INT DEFAULT 0,
    tags JSON, -- array of strings
    coordinates JSON, -- {lat: number, lng: number}
    is_verified BOOLEAN DEFAULT false,
    verified_by VARCHAR(24),
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (region_id) REFERENCES regions(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- 타임라인 이벤트 컬렉션
-- timeline_events collection
CREATE TABLE IF NOT EXISTS timeline_events (
    id VARCHAR(24) PRIMARY KEY,
    incident_id VARCHAR(24) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME,
    source_type ENUM('news', 'official', 'user', 'social') NOT NULL,
    source_name VARCHAR(255) NOT NULL,
    source_url VARCHAR(500),
    created_by VARCHAR(24) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    verified_by VARCHAR(24),
    verified_at TIMESTAMP,
    attachments JSON, -- array of file objects
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (incident_id) REFERENCES incidents(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- 댓글 컬렉션
-- comments collection
CREATE TABLE IF NOT EXISTS comments (
    id VARCHAR(24) PRIMARY KEY,
    incident_id VARCHAR(24) NOT NULL,
    parent_comment_id VARCHAR(24), -- for nested comments
    user_id VARCHAR(24) NOT NULL,
    content TEXT NOT NULL,
    like_count INT DEFAULT 0,
    dislike_count INT DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (incident_id) REFERENCES incidents(id),
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 북마크 컬렉션
-- bookmarks collection
CREATE TABLE IF NOT EXISTS bookmarks (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    incident_id VARCHAR(24) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_bookmark (user_id, incident_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
);

-- 좋아요 컬렉션
-- likes collection
CREATE TABLE IF NOT EXISTS likes (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    target_type ENUM('incident', 'comment', 'timeline_event') NOT NULL,
    target_id VARCHAR(24) NOT NULL,
    is_like BOOLEAN NOT NULL, -- true for like, false for dislike
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (user_id, target_type, target_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 신고 컬렉션
-- reports collection
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(24) PRIMARY KEY,
    reporter_id VARCHAR(24) NOT NULL,
    target_type ENUM('incident', 'comment', 'timeline_event', 'user') NOT NULL,
    target_id VARCHAR(24) NOT NULL,
    reason ENUM('spam', 'inappropriate', 'false_info', 'harassment', 'other') NOT NULL,
    description TEXT,
    status ENUM('pending', 'reviewed', 'resolved', 'dismissed') DEFAULT 'pending',
    reviewed_by VARCHAR(24),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- 알림 컬렉션
-- notifications collection
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    type ENUM('new_timeline', 'comment_reply', 'incident_update', 'like', 'bookmark') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_id VARCHAR(24), -- incident_id, comment_id, etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 검색 로그 컬렉션 (분석용)
-- search_logs collection
CREATE TABLE IF NOT EXISTS search_logs (
    id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24),
    search_query VARCHAR(255) NOT NULL,
    search_filters JSON, -- region, category, date range, etc.
    result_count INT,
    clicked_incident_id VARCHAR(24),
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (clicked_incident_id) REFERENCES incidents(id)
);

-- 인덱스 생성
CREATE INDEX idx_incidents_region_category ON incidents(region_id, category_id);
CREATE INDEX idx_incidents_status_date ON incidents(status, start_date);
CREATE INDEX idx_incidents_created_at ON incidents(created_at);
CREATE INDEX idx_timeline_events_incident_date ON timeline_events(incident_id, event_date);
CREATE INDEX idx_comments_incident ON comments(incident_id);
CREATE INDEX idx_search_logs_query ON search_logs(search_query);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
