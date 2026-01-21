# Backend Development from First Principles → Advanced (Theory + Practical Code)

This is  **complete backend roadmap**: REST + HTTP semantics, API design, pagination (offset + cursor), validation, authentication/authorization, cookies, caching (Redis + ETag), ORM design with FastAPI, scaling (vertical vs horizontal), performance, background jobs (RQ/Celery), testing (pytest), and CI.

> Examples use **FastAPI + Python** because they are concise and show backend concepts clearly. The principles apply to any backend stack.

---

## 0) First principles: what a backend *is*

A backend exists to do four fundamental jobs:

1. **Expose capabilities** via a stable interface (usually HTTP APIs).
2. **Enforce correctness** (validation + business rules).
3. **Control access** (authentication + authorization).
4. **Manage state reliably** (databases, caches, queues) and **operate** under load (performance, scaling, observability).

Everything else (frameworks, ORMs, caches, message queues) is a tool to serve these jobs.

---

## 1) The ground: network + HTTP

### 1.1 Request → Response
HTTP is a message protocol:
- client sends a **request** (method, path, headers, body)
- server sends a **response** (status code, headers, body)

### 1.2 Methods (verbs)
Common methods:
- `GET` read
- `POST` create/submit action
- `PUT` replace
- `PATCH` partial update
- `DELETE` delete
- `HEAD` like GET but no body
- `OPTIONS` capabilities / CORS preflight

### 1.3 Status codes (API “physics”)
Use status codes consistently:
- `200 OK` success read/update
- `201 Created` success create
- `202 Accepted` accepted for async job
- `204 No Content` success with no response body
- `400 Bad Request` invalid request format
- `401 Unauthorized` not authenticated
- `403 Forbidden` authenticated but not allowed
- `404 Not Found` resource not found
- `409 Conflict` duplicates / version conflict
- `422 Unprocessable Entity` validation errors (FastAPI default)
- `429 Too Many Requests` rate limited
- `500 Internal Server Error` unexpected failure

---

## 2) What is a REST API?

REST is an **architecture style** defined by constraints. It’s not a library.

### 2.1 REST = Representation + State + Transfer
- **Representation (RE)**: how the resource is represented (JSON, HTML, XML).
- **State (S)**: current properties of the resource.
- **Transfer (T)**: movement of representation via HTTP (GET/POST/…).

Example:
- `GET /tasks/123` transfers a JSON representation of task #123.

### 2.2 REST constraints (your list, clarified)
1. **Client–Server separation**
   - UI logic stays on the client; data + rules stay on the server.
2. **Uniform interface**
   - consistent endpoints, methods, status codes, and payload shapes.
3. **Layered system**
   - intermediaries (load balancer, gateway, proxy) can exist; each layer interacts with adjacent layer only.
4. **Cacheable**
   - responses explicitly declare if caching is allowed and for how long.
5. **Stateless**
   - server does not rely on stored client context between requests (unless you choose sessions explicitly).
6. **Code on demand (optional)**
   - server may send executable code (e.g., JavaScript) to extend client functionality.

---

## 3) Method semantics: safe + idempotent (critical for reliability)

These properties matter for retries, caching, and correctness.

### 3.1 Safe
A **safe** operation should not change server state:
- `GET`, `HEAD`, `OPTIONS`

### 3.2 Idempotent
An operation is **idempotent** if repeating it yields the same end state:
- `GET` idempotent (and safe)
- `PUT` idempotent (replace)
- `DELETE` idempotent (delete again → still deleted)
- `POST` usually **not** idempotent (creates a new resource each time)
- `PATCH` depends on implementation (often not guaranteed)

**Why it matters:** if the client retries due to network failure, idempotent methods prevent duplicate side effects.

---

## 4) Resources: design by nouns

A **resource** is any noun-like business object:
- `users`, `tasks`, `tags`, `orders`, `documents`

### 4.1 Good URL patterns
- collection: `/tasks`
- item: `/tasks/{id}`
- nested: `/users/{id}/tasks`

Keep URLs:
- noun-based (no verbs in path if possible)
- stable
- consistent across the API

### 4.2 CRUD mapping
- Create: `POST /tasks`
- Read: `GET /tasks`, `GET /tasks/{id}`
- Update full: `PUT /tasks/{id}`
- Update partial: `PATCH /tasks/{id}`
- Delete: `DELETE /tasks/{id}`

### 4.3 Beyond CRUD (actions)
Sometimes you need an action:
- `POST /tasks/{id}/complete`
- `POST /payments/{id}/refund`

Prefer modeling as state change (e.g., `done=true`) when possible.

---

## 5) API interface design in practice (Postman/Insomnia)

Postman/Insomnia helps you:
- test endpoints and payloads
- validate status codes
- keep “collections” as a living contract

A professional habit:
- test **success** and **all failure modes**:
  - invalid input → 422
  - unauthenticated → 401
  - unauthorized → 403
  - not found → 404
  - conflict → 409

---

## 6) Pagination + sorting + filtering

### 6.1 Why pagination is not optional
Without pagination:
- responses become huge
- DB gets overloaded
- UI becomes slow (especially infinite scroll)

### 6.2 Offset pagination (page + limit)
Query:
- `GET /tasks?limit=20&page=2&sort=-created_at`

Rules:
- `limit` must have bounds (e.g. 1..100)
- `page` starts at 1
- provide defaults: `limit=20`, `page=1`, `sort=-created_at`

**Pros:** easy  
**Cons:** slow/unstable for deep pages, duplicates when data changes

### 6.3 Cursor pagination (best for infinite scroll)
Instead of `page`, you use a cursor token (like `created_at` + `id`):
- `GET /tasks?limit=20&cursor=2026-01-20T12:00:00Z|a1b2...`

**Pros:** stable and scalable  
**Cons:** more complex

---

## 7) Serialization & deserialization

- **Deserialization**: request JSON → typed objects
- **Serialization**: typed objects → response JSON

In FastAPI, Pydantic handles:
- type coercion
- validation
- schema generation (OpenAPI docs)

---

## 8) Validation (trust nothing from the network)

Validation is your boundary against:
- bugs
- corrupted data
- security issues

Examples:
- `title` length
- required fields
- acceptable ranges
- formats (email, UUID)

---

## 9) Authentication vs Authorization

- **Authentication**: Who are you?
- **Authorization**: What are you allowed to do?

### 9.1 Typical approaches
- **Session cookie** (stateful)
- **JWT Bearer token** (stateless)
- **API keys** (simple but limited)

### 9.2 Cookies (short but important)
For browser-based auth:
- `HttpOnly` prevents JS reading cookies
- `Secure` ensures HTTPS-only
- `SameSite` reduces CSRF risk

---

## 10) Caching (speed by remembering)

Caching can exist at many layers:
- browser cache
- CDN
- reverse proxy (Nginx)
- app cache (Redis)
- DB indexes (not cache, but essential performance)

### 10.1 HTTP caching with ETag (best for GET)
Idea:
- server sends `ETag`
- client sends `If-None-Match`
- server returns `304 Not Modified` if unchanged

---

# 11) Scaling: vertical vs horizontal (with concrete examples)

### 11.1 Vertical scaling (scale up)
You increase resources on one machine:
- more CPU
- more RAM
- faster disk

**Example**
- A single VM: upgrade from 2 CPU / 4GB RAM → 8 CPU / 16GB RAM

**Pros:** simple  
**Cons:** hard limit; single point of failure

### 11.2 Horizontal scaling (scale out)
You run multiple replicas of your service:
- 2, 4, 10 backend instances
- a load balancer distributes requests

**Pros:** scalable + resilient  
**Cons:** requires stateless design + shared state in DB/cache

### 11.3 Horizontal scaling example with Docker + Nginx load balancing

**docker-compose.yml**
```yaml
services:
  api:
    build: .
    deploy:
      replicas: 3  # (works in swarm; for local dev use multiple services or docker compose scale)
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/app
    depends_on:
      - db

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
```

**nginx.conf**
```nginx
events {}

http {
  upstream api_upstream {
    # in real setups, you'd list service DNS names or use service discovery
    # Example conceptually:
    server api:8000;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://api_upstream;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}
```

> Key point: in horizontal scaling, your API must be **stateless** (or store session state in Redis / DB).

---

# 12) Performance: what matters most

### 12.1 The backend performance hierarchy (typical)
1. **Database queries** dominate latency
2. External API calls dominate latency
3. CPU-heavy work blocks worker threads/processes

### 12.2 Practical rules
- paginate lists
- index columns used in filters/sorts
- avoid N+1 queries
- cache expensive reads
- use async for I/O waits (DB/network), not for CPU work
- add timeouts for external calls

---

# 13) ORM design (FastAPI + SQLAlchemy) with created_at/updated_at + sorting

This is a realistic minimal stack:
- SQLAlchemy ORM
- SQLite for demo (swap to Postgres in production)

## 13.1 Install
```bash
pip install fastapi uvicorn sqlalchemy
```

## 13.2 db.py
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # sqlite only
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## 13.3 models.py (with created_at / updated_at)
```python
from sqlalchemy import Column, String, Boolean, DateTime, func
from uuid import uuid4
from db import Base

class TaskORM(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    title = Column(String, nullable=False)
    done = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
```

## 13.4 schemas.py
```python
from pydantic import BaseModel, Field
from datetime import datetime

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    done: bool = False

class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    done: bool | None = None

class TaskOut(BaseModel):
    id: str
    title: str
    done: bool
    created_at: datetime
    updated_at: datetime
```

## 13.5 main.py (CRUD + pagination + sorting)
```python
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc
from db import Base, engine, SessionLocal
from models import TaskORM
from schemas import TaskCreate, TaskUpdate, TaskOut

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI + ORM (First Principles → Realistic)")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def apply_sort(query, sort: str):
    # sort examples: "created_at", "-created_at", "title", "-title"
    mapping = {
        "created_at": TaskORM.created_at,
        "updated_at": TaskORM.updated_at,
        "title": TaskORM.title,
        "done": TaskORM.done,
    }
    direction = desc if sort.startswith("-") else asc
    key = sort[1:] if sort.startswith("-") else sort
    col = mapping.get(key)
    if not col:
        return query  # ignore unknown sort (or raise 400)
    return query.order_by(direction(col), desc(TaskORM.id))

@app.post("/tasks", response_model=TaskOut, status_code=201)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    task = TaskORM(title=payload.title, done=payload.done)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@app.get("/tasks/{task_id}", response_model=TaskOut)
def get_task(task_id: str, db: Session = Depends(get_db)):
    task = db.get(TaskORM, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.get("/tasks", response_model=list[TaskOut])
def list_tasks(
    limit: int = Query(20, ge=1, le=100),
    page: int = Query(1, ge=1),
    sort: str = Query("-created_at"),
    db: Session = Depends(get_db),
):
    offset = (page - 1) * limit
    q = db.query(TaskORM)
    q = apply_sort(q, sort)
    return q.offset(offset).limit(limit).all()

@app.patch("/tasks/{task_id}", response_model=TaskOut)
def patch_task(task_id: str, payload: TaskUpdate, db: Session = Depends(get_db)):
    task = db.get(TaskORM, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    data = payload.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(task, k, v)

    db.commit()
    db.refresh(task)
    return task

@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: str, db: Session = Depends(get_db)):
    task = db.get(TaskORM, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return
```

Run:
```bash
uvicorn main:app --reload
```

---

# 14) Cursor pagination example (conceptual + code)

Cursor pagination usually needs:
- a stable sort: `(created_at, id)`
- a cursor token: `"created_at|id"`

**Endpoint idea**
- `GET /tasks?limit=20&cursor=<created_at>|<id>`

**Pseudo-implementation**
```python
# where tasks are ordered by created_at desc, id desc
# cursor = "2026-01-20T12:00:00Z|<id>"

# Fetch items with (created_at, id) < cursor tuple in same order.
```

In production you also:
- sign/encrypt the cursor token
- validate token format
- return `next_cursor` in response

---

# 15) Authorization (role-based) + JWT (minimal example)

> This is intentionally minimal to show the concept; production JWT must include key rotation, stronger claims validation, etc.

Install:
```bash
pip install python-jose[cryptography] passlib[bcrypt]
```

**Idea**
- user logs in → receives JWT
- requests include `Authorization: Bearer <token>`
- backend checks token → extracts `sub` + `role`

---

# 16) Redis cache + ETag support for GET

### 16.1 Redis cache (concept)
Cache read-heavy endpoints:
- store serialized response for a key (e.g., `tasks:list:limit=20&page=1`)
- invalidate cache when tasks change (create/update/delete)

### 16.2 ETag (HTTP caching)
If client has ETag and content unchanged → return `304`.

---

# 17) Background jobs (RQ / Celery) for heavy tasks

### Why background jobs exist
- keep API fast
- prevent timeouts
- improve throughput
- enable retries safely

### Common pattern
- `POST /jobs` → returns `job_id` (202 Accepted)
- `GET /jobs/{job_id}` → status/result

(See the full RQ/Celery section near the end of this file if you want a ready copy-paste block.)

---

# 18) Testing with pytest (backend quality)

Install:
```bash
pip install pytest httpx
```

Example test using FastAPI TestClient:
```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_and_get_task():
    r = client.post("/tasks", json={"title": "hello", "done": False})
    assert r.status_code == 201
    task = r.json()
    assert task["title"] == "hello"

    r2 = client.get(f"/tasks/{task['id']}")
    assert r2.status_code == 200
    assert r2.json()["id"] == task["id"]
```

Test principles:
- unit tests for pure functions (fast)
- integration tests for API endpoints
- database tests using temporary DB (or test containers)

---

# 19) CI (GitHub Actions) minimal pipeline

`.github/workflows/ci.yml`
```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest -q
```

---

# 20) Security essentials (must-have mental model)
- validate input (always)
- authn + authz
- rate limiting
- CORS configuration
- avoid leaking stack traces in production
- secrets in env vars, not in repo
- log carefully (no passwords/tokens)

---

# 21) Observability (operate your backend)
- structured logs (JSON logs)
- request IDs / correlation IDs
- metrics (latency, error rate, throughput)
- traces (distributed tracing if microservices)

---

# 22) Full Background Jobs section (copy-paste ready)

## Background jobs for heavy tasks (Celery / RQ) — first principles

### Why background jobs exist
HTTP request/response is meant for fast interactions. If you do heavy work inside a request:
- the API becomes slow
- requests time out
- web workers get blocked
- retries can duplicate work

So we separate execution into two planes:
1. Web plane: validate + authorize + enqueue work → return quickly
2. Worker plane: execute heavy work → store results → handle retries

### Option A: RQ (Redis Queue) — simplest
Install:
```bash
pip install rq redis fastapi uvicorn
```

worker.py
```python
import time

def heavy_task(n: int) -> dict:
    time.sleep(5)
    return {"input": n, "output": n * n}
```

queue.py
```python
import os
from redis import Redis
from rq import Queue

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
redis_conn = Redis.from_url(REDIS_URL)
q = Queue("default", connection=redis_conn)
```

FastAPI submit + poll:
```python
from fastapi import FastAPI, HTTPException
from rq.job import Job
from queue import q, redis_conn
from worker import heavy_task

app = FastAPI()

@app.post("/jobs", status_code=202)
def submit_job(n: int):
    job = q.enqueue(heavy_task, n)
    return {"job_id": job.id}

@app.get("/jobs/{job_id}")
def job_status(job_id: str):
    try:
        job = Job.fetch(job_id, connection=redis_conn)
    except Exception:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"job_id": job.id, "status": job.get_status(), "result": job.result}
```

Run:
```bash
docker run -p 6379:6379 redis:7
rq worker -u redis://localhost:6379/0 default
uvicorn app:app --reload
```

### Option B: Celery — more powerful
Install:
```bash
pip install celery redis fastapi uvicorn
```

celery_app.py
```python
import os
from celery import Celery

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery = Celery("tasks", broker=REDIS_URL, backend=REDIS_URL)
```

tasks.py
```python
import time
from celery_app import celery

@celery.task(bind=True, autoretry_for=(Exception,), retry_backoff=True, retry_kwargs={"max_retries": 5})
def heavy_task(self, n: int) -> dict:
    time.sleep(5)
    return {"input": n, "output": n * n}
```

FastAPI submit + poll:
```python
from fastapi import FastAPI
from celery_app import celery
from tasks import heavy_task

app = FastAPI()

@app.post("/jobs", status_code=202)
def submit_job(n: int):
    res = heavy_task.delay(n)
    return {"job_id": res.id}

@app.get("/jobs/{job_id}")
def job_status(job_id: str):
    res = celery.AsyncResult(job_id)
    return {"job_id": job_id, "status": res.status, "result": res.result if res.successful() else None}
```

Run:
```bash
docker run -p 6379:6379 redis:7
celery -A celery_app.celery worker --loglevel=INFO
uvicorn app:app --reload
```

---

## Final checklist: backend maturity
When you build any feature, ask:
1) What is the resource + contract?  
2) What validation and invariants must hold?  
3) What authn/authz rules apply?  
4) Where is truth stored (DB)?  
5) How will it scale (stateless + cache + queue)?  
6) How is it tested and deployed?  
7) How do I observe it in production?

