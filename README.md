# Volunteer Platform 🌟

Оюутан залуус болон сурагчдыг волонтёр ажилтай холбож байгаа цахим платформ.

## Онцлог
- ✅ User регистрация ба login
- ✅ Волонтёр ажлын жагсаалт
- ✅ Ажилд бүртгүүлэх
- ✅ Сертификат үүсгэх
- ✅ Эзэмшсэн ачаалал бүхий тайлан
- ✅ Хэрэглэгчийн профайл удирдлага

## Технологи
- **Frontend**: React 18, Axios, React Router
- **Backend**: Node.js, Express, JWT
- **Database**: MongoDB
- **Аюулгүй байдал**: bcrypt, JWT tokens

## Суулгалт

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Нэвтрэх
- `GET /api/volunteers` - Волонтёр ажлуудын жагсаалт
- `POST /api/volunteers/register` - Ажилд бүртгүүлэх
- `GET /api/users/:id/certificates` - Сертификатын жагсаалт
- `GET /api/users/:id/report` - Тайлан авах

## Project Structure
```
volunteer_platform/
├── frontend/          # React application
├── backend/           # Node.js API server
├── docs/              # Documentation
└── README.md
```
