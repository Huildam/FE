-- 후일담 초기 데이터 삽입

-- 지역 데이터 삽입
INSERT INTO regions (id, name, code, level, coordinates) VALUES
('region_seoul', '서울특별시', 'SEOUL', 1, '{"lat": 37.5665, "lng": 126.9780}'),
('region_busan', '부산광역시', 'BUSAN', 1, '{"lat": 35.1796, "lng": 129.0756}'),
('region_incheon', '인천광역시', 'INCHEON', 1, '{"lat": 37.4563, "lng": 126.7052}'),
('region_gyeonggi', '경기도', 'GYEONGGI', 1, '{"lat": 37.4138, "lng": 127.5183}'),
('region_bucheon', '부천시', 'BUCHEON', 2, '{"lat": 37.4989, "lng": 126.7831}'),
('region_pohang', '포항시', 'POHANG', 2, '{"lat": 36.0190, "lng": 129.3435}');

-- 카테고리 데이터 삽입
INSERT INTO categories (id, name, description, color, icon) VALUES
('cat_food_safety', '식품안전', '식중독, 유통기한, 위생 관련 사건', '#FF6B6B', 'utensils'),
('cat_env_safety', '환경안전', '대기오염, 수질오염, 토양오염 관련 사건', '#4ECDC4', 'leaf'),
('cat_industrial', '산업안전', '공장사고, 화재, 폭발 관련 사건', '#45B7D1', 'factory'),
('cat_traffic', '교통안전', '교통사고, 도로 관련 사건', '#96CEB4', 'car'),
('cat_construction', '건설안전', '건축물 붕괴, 공사장 사고 관련 사건', '#FFEAA7', 'hard-hat'),
('cat_other', '기타', '기타 안전 관련 사건', '#DDA0DD', 'alert-circle');

-- 관리자 사용자 생성
INSERT INTO users (id, email, username, password_hash, role, reputation_score, email_verified) VALUES
('user_admin', 'admin@hujildam.com', 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'admin', 1000, true),
('user_mod1', 'mod1@hujildam.com', 'moderator1', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'moderator', 500, true),
('user_reporter1', 'reporter1@example.com', '시민기자1', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'user', 150, true);

-- 사건 데이터 삽입
INSERT INTO incidents (id, title, summary, description, region_id, category_id, status, start_date, created_by, view_count, tags, is_verified, verified_by) VALUES
('incident_bucheon_shabu', 
 '부천시 샤브샤브 식당 집단 구토 사건',
 '부천시 소재 샤브샤브 식당에서 집단 식중독 발생. 보건소 조사 결과 노로바이러스 검출.',
 '2024년 1월 15일 부천시 원미구 소재 샤브샤브 전문점에서 식사한 고객들이 집단으로 구토와 설사 증상을 호소하는 사건이 발생했습니다. 초기에는 20여 명의 피해자가 신고되었으나, 추가 조사를 통해 총 35명의 피해자가 확인되었습니다. 보건소의 역학조사 결과 노로바이러스가 원인으로 밝혀졌으며, 식당은 임시 폐쇄 후 위생 개선을 거쳐 재개장했습니다.',
 'region_bucheon',
 'cat_food_safety',
 'resolved',
 '2024-01-15',
 'user_reporter1',
 1250,
 '["식중독", "노로바이러스", "부천시", "샤브샤브", "집단구토"]',
 true,
 'user_mod1'),

('incident_incheon_water',
 '인천시 붉은 수돗물 사건',
 '인천 서구 일대에서 붉은 수돗물이 나오는 현상 발생. 상수도 관로 교체 작업 완료.',
 '2024년 2월 20일 인천광역시 서구 일대에서 수돗물이 붉게 나오는 현상이 발생했습니다. 주민들의 신고가 잇따르면서 인천시는 즉시 급수를 중단하고 원인 조사에 착수했습니다. 조사 결과 노후된 상수도 관로에서 녹이 발생한 것으로 확인되었으며, 해당 구간의 관로를 전면 교체하는 작업을 진행했습니다. 약 2주간의 공사를 거쳐 수질이 정상화되었습니다.',
 'region_incheon',
 'cat_env_safety',
 'resolved',
 '2024-02-20',
 'user_reporter1',
 2100,
 '["수돗물", "인천시", "상수도", "관로교체", "수질오염"]',
 true,
 'user_mod1'),

('incident_pohang_fire',
 '포항제철소 화재 사고',
 '포항제철소 내 화재 발생으로 인한 대기오염 우려. 환경부 조사 진행 중.',
 '2024년 3월 10일 포항제철소 내부에서 화재가 발생했습니다. 소방당국이 신속히 진화했지만, 화재로 인한 연기와 유해물질 배출로 인해 인근 지역 주민들이 대기오염을 우려하고 있습니다. 현재 환경부에서 대기질 측정 및 환경영향 조사를 진행하고 있으며, 포스코 측은 재발 방지 대책 마련에 나섰습니다.',
 'region_pohang',
 'cat_industrial',
 'investigating',
 '2024-03-10',
 'user_reporter1',
 890,
 '["포항제철소", "화재", "대기오염", "환경부조사", "포스코"]',
 false,
 null);

-- 타임라인 이벤트 데이터 삽입 (부천 샤브샤브 사건)
INSERT INTO timeline_events (id, incident_id, title, description, event_date, source_type, source_name, source_url, created_by, is_verified, verified_by) VALUES
('timeline_1_1', 'incident_bucheon_shabu', '집단 식중독 신고 접수', '부천시 보건소에 샤브샤브 식당 이용 고객들의 집단 구토 신고 접수. 초기 신고자 20명.', '2024-01-15', 'official', '부천시 보건소', null, 'user_reporter1', true, 'user_mod1'),
('timeline_1_2', 'incident_bucheon_shabu', '식당 임시 폐쇄 및 역학조사 시작', '해당 식당 임시 폐쇄 조치. 보건소 역학조사팀 현장 조사 실시.', '2024-01-16', 'news', '부천뉴스', 'https://www.bucheonnews.net/news/articleView.html?idxno=48201', 'user_reporter1', true, 'user_mod1'),
('timeline_1_3', 'incident_bucheon_shabu', '피해자 규모 확대', '추가 신고를 통해 피해자 총 35명으로 확인. 모두 같은 날 해당 식당 이용.', '2024-01-18', 'official', '경기도청', null, 'user_reporter1', true, 'user_mod1'),
('timeline_1_4', 'incident_bucheon_shabu', '검사 결과 노로바이러스 검출', '식품 및 환경 검체에서 노로바이러스 검출. 식중독 원인 확인.', '2024-01-22', 'official', '질병관리청', null, 'user_reporter1', true, 'user_mod1'),
('timeline_1_5', 'incident_bucheon_shabu', '식당 운영자 과태료 부과', '식품위생법 위반으로 식당 운영자에게 과태료 500만원 부과.', '2024-01-25', 'official', '부천시청', null, 'user_reporter1', true, 'user_mod1'),
('timeline_1_6', 'incident_bucheon_shabu', '위생 개선 후 재개장 허가', '위생시설 개선 및 직원 교육 완료 후 영업 재개 허가.', '2024-02-01', 'official', '부천시 보건소', null, 'user_reporter1', true, 'user_mod1'),
('timeline_1_7', 'incident_bucheon_shabu', '피해자 배상 합의', '식당 측과 피해자들 간 배상 합의 완료. 1인당 평균 50만원 배상.', '2024-02-05', 'user', '사용자 제보', null, 'user_reporter1', false, null),
('timeline_1_8', 'incident_bucheon_shabu', '사건 종료', '모든 행정처분 및 배상 절차 완료. 사건 공식 종료.', '2024-02-10', 'official', '부천시청', null, 'user_reporter1', true, 'user_mod1');

-- 타임라인 이벤트 데이터 삽입 (인천 수돗물 사건)
INSERT INTO timeline_events (id, incident_id, title, description, event_date, source_type, source_name, created_by, is_verified, verified_by) VALUES
('timeline_2_1', 'incident_incheon_water', '붉은 수돗물 신고 접수', '인천 서구 주민들로부터 붉은 수돗물 신고가 잇따라 접수됨.', '2024-02-20', 'official', '인천시청', 'user_reporter1', true, 'user_mod1'),
('timeline_2_2', 'incident_incheon_water', '급수 중단 조치', '인천시, 해당 지역 급수 즉시 중단. 임시 급수차 운영 시작.', '2024-02-20', 'official', '인천시 상수도사업본부', 'user_reporter1', true, 'user_mod1'),
('timeline_2_3', 'incident_incheon_water', '원인 조사 착수', '상수도 관로 점검 및 수질 검사 실시. 노후 관로에서 녹 발생 확인.', '2024-02-21', 'official', '인천시 상수도사업본부', 'user_reporter1', true, 'user_mod1'),
('timeline_2_4', 'incident_incheon_water', '관로 교체 공사 시작', '문제가 된 상수도 관로 구간 전면 교체 공사 착수.', '2024-02-23', 'news', '인천일보', 'user_reporter1', true, 'user_mod1'),
('timeline_2_5', 'incident_incheon_water', '공사 완료 및 수질 검사', '관로 교체 공사 완료. 수질 안전성 검사 실시.', '2024-03-03', 'official', '인천시 상수도사업본부', 'user_reporter1', true, 'user_mod1'),
('timeline_2_6', 'incident_incheon_water', '정상 급수 재개', '수질 검사 결과 정상 확인. 해당 지역 정상 급수 재개.', '2024-03-05', 'official', '인천시청', 'user_reporter1', true, 'user_mod1');

-- 댓글 데이터 삽입
INSERT INTO comments (id, incident_id, user_id, content, like_count) VALUES
('comment_1_1', 'incident_bucheon_shabu', 'user_reporter1', '저도 그 날 그 식당에서 식사했는데 다행히 증상은 없었습니다. 빠른 조치로 더 큰 피해를 막을 수 있어서 다행이네요.', 5),
('comment_1_2', 'incident_bucheon_shabu', 'user_mod1', '식품안전 관리가 정말 중요하다는 것을 다시 한번 느끼게 되는 사건입니다. 업주분들도 더욱 주의해주시길 바랍니다.', 8),
('comment_2_1', 'incident_incheon_water', 'user_reporter1', '우리 동네도 그때 물이 이상했는데, 이런 원인이었군요. 상세한 정리 감사합니다.', 3);

-- 북마크 데이터 삽입
INSERT INTO bookmarks (id, user_id, incident_id) VALUES
('bookmark_1', 'user_reporter1', 'incident_incheon_water'),
('bookmark_2', 'user_mod1', 'incident_bucheon_shabu');

-- 좋아요 데이터 삽입
INSERT INTO likes (id, user_id, target_type, target_id, is_like) VALUES
('like_1', 'user_reporter1', 'incident', 'incident_bucheon_shabu', true),
('like_2', 'user_mod1', 'incident', 'incident_incheon_water', true),
('like_3', 'user_reporter1', 'comment', 'comment_1_2', true);
