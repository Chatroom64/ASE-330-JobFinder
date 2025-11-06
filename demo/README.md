# ResumeMatch - Job Search Demo

이 데모는 이력서 기반 채용공고 검색 서비스를 위한 웹 인터페이스입니다.

## 기능

1. **메인 페이지**
   - "Search by Resume" 버튼
   - About/Contact 네비게이션 링크
   - Account 버튼

2. **Job Search Form 페이지**
   - **Job Title / Technology**: 기본 4개의 입력 필드, + 버튼으로 추가 가능
   - **Years of Experience**: 기본 4개의 입력 필드, + 버튼으로 추가 가능
   - **Insert Keywords**: 키워드 입력 텍스트 박스
   - **Submit / Cancel 버튼**

## 실행 방법

1. 브라우저에서 `index.html` 파일을 열기
2. 또는 로컬 서버 실행:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   
   # 또는 다른 정적 파일 서버 사용
   ```

3. 브라우저에서 `http://localhost:8000` 접속

## 파일 구조

```
demo/
├── index.html      # HTML 구조
├── styles.css      # 스타일링
├── script.js       # JavaScript 기능
└── README.md       # 이 파일
```

## 주요 기능 설명

- **동적 필드 추가/제거**: + 버튼으로 필드 추가, × 버튼으로 제거
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **폼 검증**: 기본 HTML5 검증 포함
- **현대적인 UI**: 깔끔하고 직관적인 디자인

## 사용자 인터랙션

1. 메인 페이지에서 "Search by Resume" 버튼 클릭
2. Job Search Form 페이지에서 조건 입력
3. 필요시 + 버튼으로 필드 추가
4. Submit 또는 Cancel 버튼 클릭

